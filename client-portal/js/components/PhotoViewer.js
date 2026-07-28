/* PhotoMagic by RK - PhotoViewer Lightbox Component */

export function renderPhotoViewer() {
  return `
    <div class="lightbox-modal" id="lightbox-modal">
      <div class="lightbox-toolbar">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span id="lb-code" style="font-weight: 600; color: var(--color-gold-light); font-size: 0.95rem;">IMG_0101.JPG</span>
          <span class="badge badge-gold" id="lb-category">Wedding</span>
        </div>

        <div style="display: flex; align-items: center; gap: 12px;">
          <button class="btn btn-secondary btn-sm" id="lb-zoom-btn">🔍 100% Zoom</button>
          <button class="action-btn-circle" id="lb-fav-btn" title="Favorite">♥</button>
          <button class="action-btn-circle" id="lb-select-btn" title="Select for Album">✓</button>

          <!-- Disabled Actions per requirements -->
          <span class="disabled-action-tag" title="Sharing disabled during review stage">🔗 Share Disabled</span>
          <span class="disabled-action-tag" title="Downloads unlock post balance payment">🔒 Download Disabled</span>

          <button class="modal-close" id="lb-close-btn" style="margin-left: 12px; font-size: 2rem;">&times;</button>
        </div>
      </div>

      <div class="lightbox-content">
        <button class="lightbox-nav-btn lightbox-nav-prev" id="lb-prev-btn">&larr;</button>
        
        <img id="lb-image" src="" alt="Full Photo View" class="lightbox-img" />

        <button class="lightbox-nav-btn lightbox-nav-next" id="lb-next-btn">&rarr;</button>
      </div>

      <div style="padding: 12px 24px; background: rgba(15, 15, 17, 0.9); border-top: 1px solid var(--color-border-subtle); display: flex; align-items: center; justify-content: space-between; font-size: 0.8125rem; color: var(--color-text-secondary);">
        <div id="lb-exif">
          📷 EXIF: <span id="lb-exif-details">ISO 200 • 85mm f/1.4 • 6000 x 4000</span>
        </div>
        <div>
          Keyboard Navigation: Use <kbd style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">&larr;</kbd> <kbd style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">&rarr;</kbd> keys • Press <kbd style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">Esc</kbd> to exit
        </div>
      </div>
    </div>
  `;
}
