/* PhotoMagic by RK - SelectionDashboard Component */

export function renderSelectionDashboard(totalUploaded, selectedCount, maxQuota = 100, lastSavedTime = "Just now") {
  const remaining = Math.max(0, maxQuota - selectedCount);
  const percentage = Math.min(100, Math.round((selectedCount / maxQuota) * 100));

  return `
    <div class="selection-dashboard-card">
      <div>
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
          <span class="badge badge-gold">✨ Album Curation Workbench</span>
          <div class="save-status-badge" id="save-status-badge">
            <span class="save-pulse-dot"></span>
            <span id="save-status-text">Auto-saved (${lastSavedTime})</span>
          </div>
        </div>
        <h1 style="font-family: var(--font-serif); font-size: 2rem; color: var(--color-text-primary);">
          Album Photo Selection
        </h1>
        <p style="color: var(--color-text-secondary); font-size: 0.9rem; margin-top: 4px;">
          Drag to reorder your chosen photos. The order here dictates the sequence in your physical album layout.
        </p>
      </div>

      <div class="dashboard-metric-group">
        <div class="metric-item">
          <span class="metric-value">${totalUploaded}</span>
          <span class="metric-label">Total Uploaded</span>
        </div>

        <div class="metric-item">
          <span class="metric-value" style="color: var(--color-gold-light);">${selectedCount} / ${maxQuota}</span>
          <span class="metric-label">Photos Selected</span>
        </div>

        <div class="metric-item">
          <span class="metric-value" style="color: ${remaining === 0 ? 'var(--color-success)' : 'var(--color-warning)'};">
            ${remaining}
          </span>
          <span class="metric-label">Remaining Quota</span>
        </div>
      </div>
    </div>

    <!-- Progress Bar -->
    <div style="margin-bottom: 24px; background: var(--color-bg-surface); padding: 16px; border-radius: 12px; border: 1px solid var(--color-border-subtle);">
      <div style="display: flex; justify-content: space-between; font-size: 0.8125rem; margin-bottom: 6px; font-weight: 600;">
        <span style="color: var(--color-gold-light);">Album Fill Progress</span>
        <span style="color: var(--color-text-secondary);">${percentage}% Complete</span>
      </div>
      <div style="width: 100%; height: 8px; background: var(--color-bg-base); border-radius: 99px; overflow: hidden;">
        <div style="width: ${percentage}%; height: 100%; background: var(--gradient-gold); transition: width 0.4s ease;"></div>
      </div>
    </div>
  `;
}
