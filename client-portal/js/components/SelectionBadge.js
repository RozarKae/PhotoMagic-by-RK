/* PhotoMagic by RK - SelectionBadge Component */

export function renderSelectionBar(selectedCount, maxQuota = 100) {
  const percentage = Math.min(100, Math.round((selectedCount / maxQuota) * 100));

  return `
    <div class="selection-sticky-bar" id="selection-bar">
      <div style="display: flex; align-items: center; gap: 16px;">
        <span style="font-size: 1.25rem;">📋</span>
        <div>
          <div class="selection-count-text">
            ${selectedCount} of ${maxQuota} Photos Selected for Album (${percentage}%)
          </div>
          <div style="width: 200px; height: 6px; background: var(--color-bg-base); border-radius: 99px; margin-top: 4px; overflow: hidden;">
            <div style="width: ${percentage}%; height: 100%; background: var(--gradient-gold); transition: width 0.3s ease;"></div>
          </div>
        </div>
      </div>

      <div style="display: flex; align-items: center; gap: 12px;">
        <button class="btn btn-ghost btn-sm" id="btn-clear-selections">Clear All</button>
        <button class="btn btn-primary btn-sm" id="btn-submit-selection">
          Lock & Submit Selection
        </button>
      </div>
    </div>
  `;
}
