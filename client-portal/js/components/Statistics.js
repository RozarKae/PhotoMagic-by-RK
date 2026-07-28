/* PhotoMagic by RK - Statistics Metric Cards Component */

export function renderStatistics(stats) {
  const selectionPercentage = Math.round((stats.selectedPhotos / stats.maxAlbumQuota) * 100);

  return `
    <section class="stats-grid" style="margin-top: 24px;">
      <!-- Stat Card 1: Total Photos -->
      <div class="card card-hover stat-card">
        <div class="stat-icon-wrapper">🖼️</div>
        <div class="stat-info">
          <span class="stat-value">${stats.totalPhotos.toLocaleString()}</span>
          <span class="stat-label">Total High-Res Photos</span>
        </div>
      </div>

      <!-- Stat Card 2: Selected Photos -->
      <div class="card card-hover stat-card">
        <div class="stat-icon-wrapper">📋</div>
        <div class="stat-info">
          <span class="stat-value">${stats.selectedPhotos} / ${stats.maxAlbumQuota}</span>
          <span class="stat-label">Album Photos Selected (${selectionPercentage}%)</span>
        </div>
      </div>

      <!-- Stat Card 3: Pending Actions -->
      <div class="card card-hover stat-card">
        <div class="stat-icon-wrapper" style="background: rgba(243, 156, 18, 0.15); color: var(--color-warning);">⚠️</div>
        <div class="stat-info">
          <span class="stat-value" style="color: var(--color-warning);">${stats.pendingActions} Pending</span>
          <span class="stat-label">Tasks Requiring Attention</span>
        </div>
      </div>
    </section>
  `;
}
