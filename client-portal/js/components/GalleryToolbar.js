/* PhotoMagic by RK - GalleryToolbar Component */

export function renderGalleryToolbar(categories, activeCategory = 'all', activeFilter = 'all') {
  const pillsHTML = categories.map(cat => `
    <button class="filter-pill ${activeCategory === cat.id ? 'active' : ''}" data-cat-filter="${cat.id}">
      ${cat.title} (${cat.count})
    </button>
  `).join('');

  return `
    <div class="gallery-toolbar-card">
      <!-- Search Bar -->
      <div class="search-input-wrapper">
        <span class="search-icon">🔍</span>
        <input type="text" class="search-input" id="gallery-search-input" placeholder="Search photos by code or title (e.g. IMG_0101)..." />
      </div>

      <!-- Quick Filter Pills -->
      <div class="filter-pills">
        <button class="filter-pill ${activeFilter === 'all' ? 'active' : ''}" data-type-filter="all">All Photos</button>
        <button class="filter-pill ${activeFilter === 'favorites' ? 'active' : ''}" data-type-filter="favorites">♥ Favorites</button>
        <button class="filter-pill ${activeFilter === 'selected' ? 'active' : ''}" data-type-filter="selected">✓ Album Selections</button>
      </div>
    </div>

    <!-- Category Pills Row -->
    <div class="filter-pills" style="margin-bottom: 24px;">
      ${pillsHTML}
    </div>
  `;
}
