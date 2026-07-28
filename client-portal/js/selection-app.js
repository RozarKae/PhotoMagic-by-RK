/* PhotoMagic by RK - Photo Selection Workspace Controller */
import { mockPhotos } from './gallery-data.js';
import { mockDashboardData } from './data.js';
import { renderNavbar } from './components/Navbar.js';
import { renderSelectionDashboard } from './components/SelectionDashboard.js';
import { renderSelectedPhotoCard } from './components/SelectedPhotoCard.js';
import { renderSelectionToolbar } from './components/SelectionToolbar.js';
import { renderSelectionSummary } from './components/SelectionSummary.js';
import { renderModal } from './components/Modal.js';

let selectionList = [];
let activeFilter = 'selected';
let currentSort = 'selection_time';
let searchQuery = '';
let autoSaveTimer = null;
let lastSavedTimestamp = "Just now";

document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('selection-app');
  if (!appContainer) return;

  // Initialize selection array from mock data
  selectionList = mockPhotos.filter(p => p.isSelected);

  // Build Shell Layout
  appContainer.innerHTML = `
    <div id="navbar-wrapper"></div>

    <main class="dashboard-main">
      <div class="container">
        <!-- Dashboard Summary Header -->
        <div id="dashboard-header-wrapper"></div>

        <!-- Toolbar Bar -->
        <div id="toolbar-wrapper"></div>

        <!-- Selected Photos Drag & Drop Grid -->
        <section style="margin-top: 16px;">
          <div id="drag-drop-grid" class="drag-drop-grid"></div>
          
          <!-- Empty State -->
          <div id="empty-state" style="display: none; text-align: center; padding: 64px 20px; background: var(--color-bg-surface); border-radius: 16px; border: 1px solid var(--color-border-subtle); margin-top: 24px;">
            <div style="font-size: 3.5rem; margin-bottom: 12px;">📋</div>
            <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--color-gold-light);">No Photos Selected Yet</h3>
            <p style="color: var(--color-text-secondary); margin-top: 4px; max-width: 450px; margin-left: auto; margin-right: auto;">
              Browse your event gallery and select photos to include in your printed wedding album.
            </p>
            <div style="margin-top: 20px;">
              <a href="./gallery.html" class="btn btn-primary">Browse Gallery Photos &rarr;</a>
            </div>
          </div>
        </section>

        <!-- Summary & Submission Card -->
        <div id="summary-wrapper"></div>
      </div>
    </main>

    <!-- Modal Container -->
    <div id="modal-wrapper"></div>
    <div id="toast-wrapper" class="toast-container"></div>
  `;

  // Render Sub-components
  document.getElementById('navbar-wrapper').innerHTML = renderNavbar(mockDashboardData.client);
  document.getElementById('modal-wrapper').innerHTML = renderModal();

  renderAllViews();
  startAutoSaveLoop();
});

function renderAllViews() {
  const totalUploaded = mockPhotos.length;
  const selectedCount = selectionList.length;

  document.getElementById('dashboard-header-wrapper').innerHTML = 
    renderSelectionDashboard(totalUploaded, selectedCount, 100, lastSavedTimestamp);

  document.getElementById('toolbar-wrapper').innerHTML = 
    renderSelectionToolbar(activeFilter, currentSort, searchQuery);

  document.getElementById('summary-wrapper').innerHTML = 
    renderSelectionSummary(totalUploaded, selectedCount, 100);

  updateGrid();
  attachToolbarEvents();
  attachSubmissionEvents();
}

function updateGrid() {
  const grid = document.getElementById('drag-drop-grid');
  const emptyState = document.getElementById('empty-state');

  // Filter & Search Logic
  let displayList = [...selectionList];

  if (activeFilter === 'favorites') {
    displayList = displayList.filter(p => p.isFavorite);
  } else if (activeFilter === 'unselected') {
    displayList = mockPhotos.filter(p => !p.isSelected);
  } else if (activeFilter === 'all') {
    displayList = [...mockPhotos];
  }

  if (searchQuery) {
    displayList = displayList.filter(p => 
      p.code.toLowerCase().includes(searchQuery) || 
      p.title.toLowerCase().includes(searchQuery)
    );
  }

  if (displayList.length === 0) {
    grid.style.display = 'none';
    emptyState.style.display = 'block';
    return;
  }

  grid.style.display = 'grid';
  emptyState.style.display = 'none';

  grid.innerHTML = displayList.map((photo, index) => renderSelectedPhotoCard(photo, index)).join('');

  attachDragAndDropHandlers();
  attachCardActionHandlers();
}

function attachDragAndDropHandlers() {
  const cards = document.querySelectorAll('.selected-photo-card');
  let draggedCard = null;
  let draggedIndex = null;

  cards.forEach((card, index) => {
    card.addEventListener('dragstart', (e) => {
      draggedCard = card;
      draggedIndex = index;
      card.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
    });

    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
      cards.forEach(c => c.classList.remove('drag-over'));
    });

    card.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      card.classList.add('drag-over');
    });

    card.addEventListener('dragleave', () => {
      card.classList.remove('drag-over');
    });

    card.addEventListener('drop', (e) => {
      e.preventDefault();
      card.classList.remove('drag-over');

      const targetIndex = index;
      if (draggedIndex !== null && targetIndex !== draggedIndex) {
        // Swap or reorder in selectionList array
        const [movedItem] = selectionList.splice(draggedIndex, 1);
        selectionList.splice(targetIndex, 0, movedItem);
        
        triggerAutoSave('Reordered photos');
        renderAllViews();
      }
    });
  });
}

function attachCardActionHandlers() {
  // Move Left
  document.querySelectorAll('[data-move-left]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-move-left');
      const idx = selectionList.findIndex(p => p.id === id);
      if (idx > 0) {
        const [item] = selectionList.splice(idx, 1);
        selectionList.splice(idx - 1, 0, item);
        triggerAutoSave('Moved order');
        renderAllViews();
      }
    });
  });

  // Move Right
  document.querySelectorAll('[data-move-right]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-move-right');
      const idx = selectionList.findIndex(p => p.id === id);
      if (idx < selectionList.length - 1) {
        const [item] = selectionList.splice(idx, 1);
        selectionList.splice(idx + 1, 0, item);
        triggerAutoSave('Moved order');
        renderAllViews();
      }
    });
  });

  // Remove selection
  document.querySelectorAll('[data-remove-selection]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-remove-selection');
      const photo = mockPhotos.find(p => p.id === id);
      if (photo) {
        photo.isSelected = false;
        selectionList = selectionList.filter(p => p.id !== id);
        triggerAutoSave(`Removed ${photo.code}`);
        renderAllViews();
        showToast(`Removed ${photo.code} from selection.`);
      }
    });
  });
}

function attachToolbarEvents() {
  const searchInput = document.getElementById('selection-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      updateGrid();
    });
  }

  // Filter pills
  document.querySelectorAll('[data-sel-filter]').forEach(pill => {
    pill.addEventListener('click', () => {
      activeFilter = pill.getAttribute('data-sel-filter');
      renderAllViews();
    });
  });

  // Sort dropdown
  const sortSelect = document.getElementById('selection-sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      if (currentSort === 'code') {
        selectionList.sort((a, b) => a.code.localeCompare(b.code));
      } else if (currentSort === 'capture_time') {
        selectionList.sort((a, b) => a.id.localeCompare(b.id));
      }
      triggerAutoSave('Sorted selection');
      renderAllViews();
    });
  }

  // Select All
  const selectAllBtn = document.getElementById('btn-select-all');
  if (selectAllBtn) {
    selectAllBtn.addEventListener('click', () => {
      mockPhotos.forEach(p => p.isSelected = true);
      selectionList = [...mockPhotos];
      triggerAutoSave('Selected all photos');
      renderAllViews();
      showToast('Selected all 12 photos for album.');
    });
  }

  // Deselect All
  const deselectAllBtn = document.getElementById('btn-deselect-all');
  if (deselectAllBtn) {
    deselectAllBtn.addEventListener('click', () => {
      mockPhotos.forEach(p => p.isSelected = false);
      selectionList = [];
      triggerAutoSave('Deselected all');
      renderAllViews();
      showToast('Deselected all photos.');
    });
  }

  // Manual Save Button
  const saveBtn = document.getElementById('btn-manual-save');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      triggerAutoSave('Manual save');
      showToast('💾 Selection saved to studio cloud!');
    });
  }
}

function attachSubmissionEvents() {
  const submitBtn = document.getElementById('btn-submit-album-selection');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const modal = document.getElementById('app-modal');
      document.getElementById('modal-title').textContent = 'Confirm Final Album Lock & Submission';
      document.getElementById('modal-body').innerHTML = `
        <div style="text-align: center; padding: 12px 0;">
          <div style="font-size: 3rem; margin-bottom: 8px;">🔒</div>
          <h4 style="color: var(--color-gold-light); font-size: 1.25rem;">Are you sure you want to submit your album selection?</h4>
          <p style="margin-top: 12px; font-size: 0.9rem; color: var(--color-text-secondary);">
            You have selected <strong>${selectionList.length} photos</strong>. After submission, your photo order will be locked and sent directly to RK Studio layout designers. Modifications may be restricted during the layout proofing phase.
          </p>
        </div>
      `;
      document.getElementById('modal-action-btn').textContent = 'Confirm & Submit Album';
      modal.classList.add('active');

      document.getElementById('modal-action-btn').onclick = () => {
        modal.classList.remove('active');
        showToast('🎉 Album selection locked and transmitted to RK Studio layout team!');
      };
      document.getElementById('modal-close-btn').onclick = () => modal.classList.remove('active');
      document.getElementById('modal-cancel-btn').onclick = () => modal.classList.remove('active');
    });
  }
}

function triggerAutoSave(reason = '') {
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  lastSavedTimestamp = timeStr;
  
  const statusText = document.getElementById('save-status-text');
  if (statusText) {
    statusText.textContent = `Auto-saved at ${timeStr}`;
  }
}

function startAutoSaveLoop() {
  if (autoSaveTimer) clearInterval(autoSaveTimer);
  autoSaveTimer = setInterval(() => {
    triggerAutoSave('Background loop');
  }, 12000);
}

function showToast(message) {
  const toastContainer = document.getElementById('toast-wrapper');
  if (!toastContainer) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>✨</span><span>${message}</span>`;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
