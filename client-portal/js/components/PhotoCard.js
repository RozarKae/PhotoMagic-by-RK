/* PhotoMagic by RK - PhotoCard Component */

export function renderPhotoCard(photo) {
  const selectedClass = photo.isSelected ? 'selected' : '';
  const favClass = photo.isFavorite ? 'active-fav' : '';
  const selectClass = photo.isSelected ? 'active-select' : '';

  return `
    <div class="photo-card ${selectedClass}" data-photo-id="${photo.id}">
      <div class="selected-badge-icon">✓</div>
      
      <img src="${photo.src}" alt="${photo.title}" loading="lazy" />
      <div class="photo-watermark">PHOTOMAGIC BY RK</div>

      <div class="photo-card-overlay">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 0.75rem; font-weight: 600; color: #fff; background: rgba(0,0,0,0.6); padding: 2px 8px; border-radius: 4px;">
            ${photo.code}
          </span>
        </div>

        <div style="display: flex; gap: 8px; justify-content: flex-end;">
          <button class="action-btn-circle ${favClass}" data-fav-btn="${photo.id}" title="Toggle Favorite">
            ♥
          </button>
          <button class="action-btn-circle ${selectClass}" data-select-btn="${photo.id}" title="Select for Album">
            ✓
          </button>
        </div>
      </div>
    </div>
  `;
}
