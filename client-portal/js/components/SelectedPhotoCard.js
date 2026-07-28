/* PhotoMagic by RK - SelectedPhotoCard Component */

export function renderSelectedPhotoCard(photo, orderIndex) {
  return `
    <div class="selected-photo-card" data-selection-id="${photo.id}" draggable="true">
      <div class="order-number-badge">#${orderIndex + 1}</div>
      <img src="${photo.src}" alt="${photo.title}" loading="lazy" />

      <div class="card-action-bar">
        <div style="display: flex; gap: 4px;">
          <button class="order-nav-btn btn-move-left" data-move-left="${photo.id}" title="Move Left">&larr;</button>
          <button class="order-nav-btn btn-move-right" data-move-right="${photo.id}" title="Move Right">&rarr;</button>
        </div>

        <span style="font-size: 0.75rem; color: #fff; font-weight: 600; background: rgba(0,0,0,0.6); padding: 2px 6px; border-radius: 4px;">
          ${photo.code}
        </span>

        <button class="btn btn-danger btn-sm" data-remove-selection="${photo.id}" title="Remove from Selection" style="padding: 4px 8px; font-size: 0.75rem;">
          &times; Remove
        </button>
      </div>
    </div>
  `;
}
