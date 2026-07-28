/* PhotoMagic by RK - SelectionToolbar Component */

export function renderSelectionToolbar(activeFilter = 'selected', currentSort = 'selection_time', searchQuery = '') {
  return `
    <div class="selection-toolbar">
      <div class="toolbar-left">
        <!-- Search input -->
        <div class="search-input-wrapper" style="max-width: 260px;">
          <span class="search-icon">🔍</span>
          <input type="text" class="search-input" id="selection-search-input" value="${searchQuery}" placeholder="Search selected..." />
        </div>

        <!-- Filter tabs -->
        <div class="filter-pills">
          <button class="filter-pill ${activeFilter === 'selected' ? 'active' : ''}" data-sel-filter="selected">Selected</button>
          <button class="filter-pill ${activeFilter === 'favorites' ? 'active' : ''}" data-sel-filter="favorites">♥ Favorites</button>
          <button class="filter-pill ${activeFilter === 'unselected' ? 'active' : ''}" data-sel-filter="unselected">Not Selected</button>
          <button class="filter-pill ${activeFilter === 'all' ? 'active' : ''}" data-sel-filter="all">All Photos</button>
        </div>
      </div>

      <div class="toolbar-right">
        <!-- Sort dropdown -->
        <select id="selection-sort-select" style="background: var(--color-bg-base); border: 1px solid var(--color-border-subtle); color: var(--color-text-primary); padding: 8px 12px; border-radius: var(--radius-sm); font-size: 0.8125rem; cursor: pointer;">
          <option value="selection_time" ${currentSort === 'selection_time' ? 'selected' : ''}>Sort: Selection Order</option>
          <option value="capture_time" ${currentSort === 'capture_time' ? 'selected' : ''}>Sort: Capture Time</option>
          <option value="code" ${currentSort === 'code' ? 'selected' : ''}>Sort: Photo Code</option>
        </select>

        <!-- Bulk Action Buttons -->
        <button class="btn btn-secondary btn-sm" id="btn-select-all">Select All</button>
        <button class="btn btn-ghost btn-sm" id="btn-deselect-all">Deselect All</button>
        <button class="btn btn-secondary btn-sm" id="btn-manual-save">💾 Save Selection</button>
      </div>
    </div>
  `;
}
