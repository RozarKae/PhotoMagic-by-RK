/* PhotoMagic by RK - Quick Action Cards Component */

export function renderQuickActions(actions) {
  const cardsHTML = actions.map(action => {
    let badgeClass = 'badge-gold';
    if (action.badgeType === 'warning') badgeClass = 'badge-warning';
    if (action.badgeType === 'info') badgeClass = 'badge-info';
    if (action.badgeType === 'success') badgeClass = 'badge-success';

    return `
      <div class="card card-hover action-card" data-action="${action.target}">
        <div>
          <div class="action-card-header">
            <span class="action-icon">${action.icon}</span>
            <span class="badge ${badgeClass}">${action.badge}</span>
          </div>
          <h3 class="action-title">${action.title}</h3>
          <p class="action-description">${action.description}</p>
        </div>

        <div class="action-card-footer">
          <span class="action-cta-text">${action.cta} &rarr;</span>
        </div>
      </div>
    `;
  }).join('');

  return `
    <section style="margin-top: 32px;">
      <div class="section-title-group">
        <h2 class="section-title">
          <span>⚡</span> Quick Action Hub
        </h2>
        <span style="font-size: 0.8125rem; color: var(--color-text-secondary);">Direct Portal Workspaces</span>
      </div>

      <div class="quick-actions-grid">
        ${cardsHTML}
      </div>
    </section>
  `;
}
