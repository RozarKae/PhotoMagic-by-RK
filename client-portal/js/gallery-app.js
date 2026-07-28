/* PhotoMagic by RK - Gallery Module Application Controller */
import { mockCategories, mockPhotos } from './gallery-data.js';
import { renderNavbar } from './components/Navbar.js';
import { renderCategoryCard } from './components/GalleryCard.js';
import { renderPhotoCard } from './components/PhotoCard.js';
import { renderPhotoViewer } from './components/PhotoViewer.js';
import { renderSelectionBar } from './components/SelectionBadge.js';
import { renderGalleryToolbar } from './components/GalleryToolbar.js';
import { renderModal } from './components/Modal.js';
import { mockDashboardData } from './data.js';

let activeCategory = 'all';
let activeFilter = 'all';
let searchQuery = '';
let currentPhotoList = [...mockPhotos];
let currentLightboxIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('gallery-app');
  if (!appContainer) return;

  // Build Page Layout Shell
  appContainer.innerHTML = `
    <div id="navbar-wrapper"></div>

    <main class="dashboard-main">
      <div class="container">
        <!-- Gallery Hero Banner -->
        <section class="gallery-hero">
          <img src="./assets/cat_wedding.png" class="gallery-hero-bg" alt="Gallery Hero" />
          <div class="gallery-hero-overlay"></div>
          <div class="gallery-hero-content">
            <div style="margin-bottom: 8px;">
              <span class="badge badge-gold">🏰 Official Event Collection</span>
            </div>
            <h1 class="gallery-hero-title">Ananya & Vikram's Gallery</h1>
            <p style="color: var(--color-gold-light); font-size: 1rem;">
              1,240 High-Resolution Photos • Taj Palace, Udaipur
            </p>
          </div>
        </section>

        <!-- Category Overview Cards -->
        <section style="margin-bottom: 32px;">
          <div class="section-title-group">
            <h2 class="section-title"><span>📂</span> Event Categories</h2>
          </div>
          <div class="category-cards-grid" id="category-cards-wrapper"></div>
        </section>

        <!-- Gallery Toolbar & Filters -->
        <div id="toolbar-wrapper"></div>

        <!-- Photo Grid Section -->
        <section style="margin-top: 16px;">
          <div id="photo-grid" class="gallery-grid"></div>
          <div id="empty-state" style="display: none; text-align: center; padding: 64px 20px; background: var(--color-bg-surface); border-radius: 16px; border: 1px solid var(--color-border-subtle); margin-top: 24px;">
            <div style="font-size: 3rem; margin-bottom: 12px;">🖼️</div>
            <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--color-gold-light);">No Photos Found</h3>
            <p style="color: var(--color-text-secondary); margin-top: 4px;">Try clearing your search query or selecting a different category tab.</p>
          </div>
        </section>
      </div>
    </main>

    <!-- Selection Bar -->
    <div id="selection-bar-wrapper"></div>

    <!-- Lightbox Modal -->
    <div id="lightbox-wrapper"></div>

    <!-- Reusable Modal -->
    <div id="modal-wrapper"></div>
    <div id="toast-wrapper" class="toast-container"></div>
  `;

  // Render Sub-components
  document.getElementById('navbar-wrapper').innerHTML = renderNavbar(mockDashboardData.client);
  document.getElementById('lightbox-wrapper').innerHTML = renderPhotoViewer();
  document.getElementById('modal-wrapper').innerHTML = renderModal();

  renderCategories();
  renderToolbar();
  updatePhotoGrid();
  updateSelectionBar();
  attachGalleryEvents();
});

function renderCategories() {
  const wrapper = document.getElementById('category-cards-wrapper');
  if (!wrapper) return;
  wrapper.innerHTML = mockCategories.map(cat => renderCategoryCard(cat, activeCategory === cat.id)).join('');

  wrapper.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      activeCategory = card.getAttribute('data-category-id');
      renderCategories();
      renderToolbar();
      updatePhotoGrid();
    });
  });
}

function renderToolbar() {
  const wrapper = document.getElementById('toolbar-wrapper');
  if (!wrapper) return;
  wrapper.innerHTML = renderGalleryToolbar(mockCategories, activeCategory, activeFilter);

  // Search Input Listener
  const searchInput = document.getElementById('gallery-search-input');
  if (searchInput) {
    searchInput.value = searchQuery;
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      updatePhotoGrid();
    });
  }

  // Type Filter Pills
  wrapper.querySelectorAll('[data-type-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeFilter = btn.getAttribute('data-type-filter');
      renderToolbar();
      updatePhotoGrid();
    });
  });

  // Category Filter Pills
  wrapper.querySelectorAll('[data-cat-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.getAttribute('data-cat-filter');
      renderCategories();
      renderToolbar();
      updatePhotoGrid();
    });
  });
}

function updatePhotoGrid() {
  const grid = document.getElementById('photo-grid');
  const emptyState = document.getElementById('empty-state');

  // Filter Logic
  currentPhotoList = mockPhotos.filter(photo => {
    const matchesCategory = activeCategory === 'all' || photo.category === activeCategory;
    const matchesFilter = activeFilter === 'all' ||
      (activeFilter === 'favorites' && photo.isFavorite) ||
      (activeFilter === 'selected' && photo.isSelected);
    const matchesSearch = !searchQuery ||
      photo.code.toLowerCase().includes(searchQuery) ||
      photo.title.toLowerCase().includes(searchQuery);

    return matchesCategory && matchesFilter && matchesSearch;
  });

  if (currentPhotoList.length === 0) {
    grid.style.display = 'none';
    emptyState.style.display = 'block';
    return;
  }

  grid.style.display = 'grid';
  emptyState.style.display = 'none';

  grid.innerHTML = currentPhotoList.map(photo => renderPhotoCard(photo)).join('');

  // Attach card event listeners
  grid.querySelectorAll('.photo-card').forEach(card => {
    const photoId = card.getAttribute('data-photo-id');

    // Click card thumbnail to open Lightbox
    card.addEventListener('click', (e) => {
      if (e.target.closest('.action-btn-circle')) return; // Ignore icon button clicks
      openLightbox(photoId);
    });

    // Favorite Toggle Button
    const favBtn = card.querySelector('[data-fav-btn]');
    if (favBtn) {
      favBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(photoId);
      });
    }

    // Select Toggle Button
    const selectBtn = card.querySelector('[data-select-btn]');
    if (selectBtn) {
      selectBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleSelect(photoId);
      });
    }
  });
}

function toggleFavorite(photoId) {
  const photo = mockPhotos.find(p => p.id === photoId);
  if (photo) {
    photo.isFavorite = !photo.isFavorite;
    updatePhotoGrid();
    showToast(photo.isFavorite ? `Added ${photo.code} to Favorites ♥` : `Removed ${photo.code} from Favorites`);
  }
}

function toggleSelect(photoId) {
  const photo = mockPhotos.find(p => p.id === photoId);
  if (photo) {
    const selectedCount = mockPhotos.filter(p => p.isSelected).length;
    if (!photo.isSelected && selectedCount >= 100) {
      showToast('⚠️ Maximum album selection limit of 100 photos reached.');
      return;
    }
    photo.isSelected = !photo.isSelected;
    updatePhotoGrid();
    updateSelectionBar();
    showToast(photo.isSelected ? `Selected ${photo.code} for Album ✓` : `Removed ${photo.code} from Selection`);
  }
}

function updateSelectionBar() {
  const wrapper = document.getElementById('selection-bar-wrapper');
  if (!wrapper) return;
  const selectedCount = mockPhotos.filter(p => p.isSelected).length;
  wrapper.innerHTML = renderSelectionBar(selectedCount, 100);

  // Clear selections button
  const clearBtn = document.getElementById('btn-clear-selections');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      mockPhotos.forEach(p => p.isSelected = false);
      updatePhotoGrid();
      updateSelectionBar();
      showToast('Cleared all album photo selections.');
    });
  }

  // Submit selections button
  const submitBtn = document.getElementById('btn-submit-selection');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const modal = document.getElementById('app-modal');
      document.getElementById('modal-title').textContent = 'Confirm Album Photo Lock';
      document.getElementById('modal-body').innerHTML = `
        <p>You have selected <strong>${selectedCount} of 100 photos</strong> for your custom printed wedding album.</p>
        <p style="margin-top: 12px; font-size: 0.875rem;">Once locked, your selected list will be transmitted directly to RK Studio layout artists to begin album proofing V1.</p>
      `;
      document.getElementById('modal-action-btn').textContent = 'Confirm & Lock';
      modal.classList.add('active');

      document.getElementById('modal-action-btn').onclick = () => {
        modal.classList.remove('active');
        showToast('🎉 Selection list locked and transmitted to RK Studio!');
      };
      document.getElementById('modal-close-btn').onclick = () => modal.classList.remove('active');
      document.getElementById('modal-cancel-btn').onclick = () => modal.classList.remove('active');
    });
  }
}

function openLightbox(photoId) {
  const index = currentPhotoList.findIndex(p => p.id === photoId);
  if (index === -1) return;
  currentLightboxIndex = index;
  renderLightboxFrame();

  const modal = document.getElementById('lightbox-modal');
  if (modal) modal.classList.add('active');
}

function renderLightboxFrame() {
  const photo = currentPhotoList[currentLightboxIndex];
  if (!photo) return;

  document.getElementById('lb-code').textContent = photo.code;
  document.getElementById('lb-category').textContent = photo.category.toUpperCase();
  document.getElementById('lb-image').src = photo.src;
  document.getElementById('lb-exif-details').textContent = `${photo.iso} • ${photo.lens} • ${photo.resolution}`;

  const favBtn = document.getElementById('lb-fav-btn');
  const selectBtn = document.getElementById('lb-select-btn');

  if (favBtn) favBtn.className = `action-btn-circle ${photo.isFavorite ? 'active-fav' : ''}`;
  if (selectBtn) selectBtn.className = `action-btn-circle ${photo.isSelected ? 'active-select' : ''}`;
}

function attachGalleryEvents() {
  const modal = document.getElementById('lightbox-modal');
  const closeBtn = document.getElementById('lb-close-btn');
  const prevBtn = document.getElementById('lb-prev-btn');
  const nextBtn = document.getElementById('lb-next-btn');
  const favBtn = document.getElementById('lb-fav-btn');
  const selectBtn = document.getElementById('lb-select-btn');
  const zoomBtn = document.getElementById('lb-zoom-btn');

  if (closeBtn) closeBtn.onclick = () => modal.classList.remove('active');

  if (prevBtn) {
    prevBtn.onclick = () => {
      currentLightboxIndex = (currentLightboxIndex - 1 + currentPhotoList.length) % currentPhotoList.length;
      renderLightboxFrame();
    };
  }

  if (nextBtn) {
    nextBtn.onclick = () => {
      currentLightboxIndex = (currentLightboxIndex + 1) % currentPhotoList.length;
      renderLightboxFrame();
    };
  }

  if (favBtn) {
    favBtn.onclick = () => {
      const photo = currentPhotoList[currentLightboxIndex];
      toggleFavorite(photo.id);
      renderLightboxFrame();
    };
  }

  if (selectBtn) {
    selectBtn.onclick = () => {
      const photo = currentPhotoList[currentLightboxIndex];
      toggleSelect(photo.id);
      renderLightboxFrame();
    };
  }

  if (zoomBtn) {
    let isZoomed = false;
    zoomBtn.onclick = () => {
      const img = document.getElementById('lb-image');
      isZoomed = !isZoomed;
      img.style.transform = isZoomed ? 'scale(1.8)' : 'scale(1)';
      img.style.cursor = isZoomed ? 'zoom-out' : 'zoom-in';
      zoomBtn.textContent = isZoomed ? '🔍 Reset Zoom' : '🔍 100% Zoom';
    };
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') modal.classList.remove('active');
    if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
    if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
  });
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
