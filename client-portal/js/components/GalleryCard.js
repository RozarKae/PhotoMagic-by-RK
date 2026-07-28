/* PhotoMagic by RK - GalleryCard Component */

export function renderCategoryCard(category, isActive = false) {
  return `
    <div class="category-card ${isActive ? 'active' : ''}" data-category-id="${category.id}">
      <img src="${category.cover}" alt="${category.title}" loading="lazy" />
      <div class="category-card-overlay">
        <h4 class="category-title">${category.title}</h4>
        <span class="category-count">${category.count} Photos</span>
      </div>
    </div>
  `;
}
