/* PhotoMagic by RK - Main App JS */
import { mockDashboardData } from './data.js';
import { renderNavbar } from './components/Navbar.js';
import { renderWelcomeHeader } from './components/WelcomeHeader.js';
import { renderProgressTimeline } from './components/ProgressTimeline.js';
import { renderStatistics } from './components/Statistics.js';
import { renderQuickActions } from './components/QuickActions.js';
import { renderLatestUpdates } from './components/LatestUpdates.js';
import { renderModal } from './components/Modal.js';

document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app');

  if (!appContainer) return;

  // Render Skeleton Shell & Layout Structure
  appContainer.innerHTML = `
    <div id="navbar-wrapper"></div>
    <main class="dashboard-main">
      <div class="container">
        <div id="welcome-wrapper"></div>
        <div id="timeline-wrapper"></div>
        <div id="statistics-wrapper"></div>
        <div id="actions-wrapper"></div>
        <div id="updates-wrapper"></div>
      </div>
    </main>
    <div id="modal-wrapper"></div>
    <div id="toast-wrapper" class="toast-container"></div>
  `;

  // Inject Components with Data
  document.getElementById('navbar-wrapper').innerHTML = renderNavbar(mockDashboardData.client);
  document.getElementById('welcome-wrapper').innerHTML = renderWelcomeHeader(mockDashboardData.client, mockDashboardData.event);
  document.getElementById('timeline-wrapper').innerHTML = renderProgressTimeline(mockDashboardData.timelineSteps);
  document.getElementById('statistics-wrapper').innerHTML = renderStatistics(mockDashboardData.statistics);
  document.getElementById('actions-wrapper').innerHTML = renderQuickActions(mockDashboardData.quickActions);
  document.getElementById('updates-wrapper').innerHTML = renderLatestUpdates(mockDashboardData.updates, mockDashboardData.studioMessage);
  document.getElementById('modal-wrapper').innerHTML = renderModal();

  // Attach Event Listeners
  attachEventListeners();
});

function attachEventListeners() {
  // Modal Elements
  const modal = document.getElementById('app-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalCancelBtn = document.getElementById('modal-cancel-btn');
  const modalActionBtn = document.getElementById('modal-action-btn');

  const openModal = (title, bodyHTML, actionText = 'Proceed', onAction = null) => {
    modalTitle.textContent = title;
    modalBody.innerHTML = bodyHTML;
    modalActionBtn.textContent = actionText;
    modal.classList.add('active');

    modalActionBtn.onclick = () => {
      if (onAction) onAction();
      closeModal();
    };
  };

  const closeModal = () => {
    modal.classList.remove('active');
  };

  if (modalCloseBtn) modalCloseBtn.onclick = closeModal;
  if (modalCancelBtn) modalCancelBtn.onclick = closeModal;
  if (modal) {
    modal.onclick = (e) => {
      if (e.target === modal) closeModal();
    };
  }

  // Toast Functionality
  const showToast = (message, type = 'gold') => {
    const toastContainer = document.getElementById('toast-wrapper');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span>✨</span>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  };

  // Quick Action Card Clicks
  document.querySelectorAll('.action-card').forEach(card => {
    card.addEventListener('click', () => {
      const action = card.getAttribute('data-action');
      handleActionClick(action);
    });
  });

  // Navigation Links Click
  document.querySelectorAll('[data-target]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-target');
      
      // Update active styling
      document.querySelectorAll('[data-target]').forEach(l => l.classList.remove('active'));
      document.querySelectorAll(`[data-target="${target}"]`).forEach(l => l.classList.add('active'));

      handleActionClick(target);
    });
  });

  // Specific Action Handler
  function handleActionClick(target) {
    switch (target) {
      case 'gallery':
        openModal(
          'Main Gallery Workspace',
          `
            <div style="text-align: center; padding: 12px 0;">
              <img src="./assets/gallery_thumb.png" style="border-radius: 8px; margin-bottom: 16px; border: 1px solid var(--color-border-gold);" alt="Gallery" />
              <p>Launching high-resolution wedding gallery with <strong>1,240 photos</strong> across Haldi, Sangeet, Ceremony, and Reception categories.</p>
            </div>
          `,
          'Open Gallery Grid',
          () => showToast('Navigating to High-Res Gallery Grid...')
        );
        break;

      case 'selection':
        openModal(
          'Album Photo Selection Workbench',
          `
            <p>You have selected <strong>65 of 100 quota photos</strong> for your custom wedding album.</p>
            <div style="background: rgba(212,175,55,0.1); border-radius: 8px; padding: 12px; margin: 16px 0; border: 1px solid var(--color-border-gold);">
              <strong>Status:</strong> Draft in progress (Auto-saved). Select 35 more photos to lock selection.
            </div>
          `,
          'Manage Selections',
          () => showToast('Opening Selection Manager Workbench...')
        );
        break;

      case 'album':
        openModal(
          'Interactive Album Proof Review V2',
          `
            <div style="text-align: center; padding: 12px 0;">
              <img src="./assets/album_thumb.png" style="border-radius: 8px; margin-bottom: 16px; border: 1px solid var(--color-border-gold);" alt="Album Proof" />
              <p>Review 24 double-page spreads prepared by RK Studio layout artists. Pin retouch comments directly on spreads 4 and 8.</p>
            </div>
          `,
          'Open Virtual Flipbook',
          () => showToast('Launching Album Proofing Flipbook Engine...')
        );
        break;

      case 'payments':
        openModal(
          'Invoices & Statement Settlement',
          `
            <p><strong>Contract Total:</strong> $5,000.00</p>
            <p><strong>Booking Deposit Paid:</strong> -$3,000.00</p>
            <hr style="border-color: var(--color-border-subtle); margin: 12px 0;" />
            <p style="font-size: 1.1rem; color: var(--color-gold-light);"><strong>Remaining Balance Due: $2,000.00</strong></p>
            <p style="font-size: 0.8rem; margin-top: 8px; color: var(--color-text-tertiary);">Full high-resolution downloads unlock automatically upon payment settlement.</p>
          `,
          'Pay $2,000.00 Now',
          () => showToast('Connecting to Stripe 256-Bit Gateway...')
        );
        break;

      case 'downloads':
        openModal(
          'Digital Media Download Center',
          `
            <p>High-Resolution 300DPI print archives and Web-Optimized social archives are ready for <strong>Ananya & Vikram's Collection</strong>.</p>
            <ul style="margin: 12px 0 12px 20px; line-height: 1.8;">
              <li>High-Res Print Archive (Part 1 - 6GB)</li>
              <li>High-Res Print Archive (Part 2 - 6GB)</li>
              <li>Web-Res Social Media ZIP (1.2GB)</li>
            </ul>
          `,
          'Start Download',
          () => showToast('Generating high-speed ZIP download stream...')
        );
        break;

      case 'support':
        openModal(
          'Direct Studio Desk - RK Photography',
          `
            <p>Send a direct inquiry or special editing request to lead photographer <strong>Radhakrishna (RK)</strong>.</p>
            <textarea style="width: 100%; height: 90px; margin-top: 12px; background: var(--color-bg-base); border: 1px solid var(--color-border-gold); border-radius: 8px; padding: 10px; color: #fff; font-family: inherit;" placeholder="Write message to RK..."></textarea>
          `,
          'Send Message',
          () => showToast('Message dispatched directly to RK WhatsApp & Desk!')
        );
        break;

      default:
        showToast(`Workspace '${target}' activated.`);
        break;
    }
  }

  // Contract Button
  const contractBtn = document.getElementById('btn-view-contract');
  if (contractBtn) {
    contractBtn.addEventListener('click', () => {
      openModal(
        'Royal Diamond Package Contract',
        `
          <p><strong>Package Tier:</strong> Royal Diamond Photography & Cinematography</p>
          <p><strong>Event Dates:</strong> Dec 14-16, 2025 (Udaipur)</p>
          <p><strong>Deliverables Included:</strong></p>
          <ul style="margin-left: 20px; margin-top: 8px; line-height: 1.6;">
            <li>12" x 18" Premium Italian Leather Album (100 Photos / 50 Spreads)</li>
            <li>2x Parent Replica Albums (8" x 12")</li>
            <li>Full Event Cinematic 4K Teaser & Feature Film</li>
            <li>Unlimited High-Res Digital Delivery</li>
          </ul>
        `,
        'Close'
      );
    });
  }

  // Reply Studio Button
  const replyBtn = document.getElementById('btn-reply-studio');
  if (replyBtn) {
    replyBtn.addEventListener('click', () => {
      handleActionClick('support');
    });
  }

  // Bell Button
  const bellBtn = document.getElementById('bell-btn');
  if (bellBtn) {
    bellBtn.addEventListener('click', () => {
      showToast('Notifications: 2 unread updates from RK Studio.');
    });
  }

  // Timeline Step Clicks
  document.querySelectorAll('.timeline-step').forEach(step => {
    step.addEventListener('click', () => {
      const stepId = step.getAttribute('data-step');
      const stepData = mockDashboardData.timelineSteps.find(s => s.id == stepId);
      if (stepData) {
        showToast(`Step ${stepData.id}: ${stepData.label} (${stepData.date}) - Status: ${stepData.status.toUpperCase()}`);
      }
    });
  });
}
