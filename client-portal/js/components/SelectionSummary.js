/* PhotoMagic by RK - SelectionSummary Component */

export function renderSelectionSummary(totalUploaded, selectedCount, maxQuota = 100) {
  const remaining = Math.max(0, maxQuota - selectedCount);
  const estimatedSpreads = Math.ceil(selectedCount / 2);
  const estimatedPages = estimatedSpreads * 2;

  return `
    <div class="selection-summary-card">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
        <h3 style="font-family: var(--font-serif); font-size: 1.35rem; color: var(--color-gold-light);">
          📖 Selection Summary & Album Layout Estimate
        </h3>
        <span class="badge badge-gold">12" x 18" Premium Italian Leather</span>
      </div>

      <div class="summary-row">
        <span>Total Uploaded Gallery Photos:</span>
        <strong style="color: var(--color-text-primary);">${totalUploaded} Photos</strong>
      </div>

      <div class="summary-row">
        <span>Current Chosen Photos:</span>
        <strong style="color: var(--color-gold-light);">${selectedCount} / ${maxQuota} Photos</strong>
      </div>

      <div class="summary-row">
        <span>Remaining Selection Allowance:</span>
        <strong style="color: ${remaining === 0 ? 'var(--color-success)' : 'var(--color-warning)'};">${remaining} Photos</strong>
      </div>

      <div class="summary-row">
        <span>Estimated Album Double-Page Spreads:</span>
        <strong style="color: var(--color-text-primary);">${estimatedSpreads} Spreads (${estimatedPages} Pages)</strong>
      </div>

      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--color-border-subtle); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
        <div style="font-size: 0.8125rem; color: var(--color-text-secondary); max-width: 450px;">
          ⚠️ <strong>Note:</strong> Locking your album photo selection will transition your project directly to RK Studio layout designers to craft your V1 Flipbook Proof.
        </div>

        <button class="btn btn-primary btn-lg" id="btn-submit-album-selection">
          ✨ Submit Album Selection ->
        </button>
      </div>
    </div>
  `;
}
