/* PhotoMagic by RK - Progress Timeline Component */

export function renderProgressTimeline(steps) {
  const stepsHTML = steps.map(step => {
    let nodeIcon = step.id;
    if (step.status === 'completed') nodeIcon = '✓';
    if (step.status === 'active') nodeIcon = '●';

    return `
      <div class="timeline-step ${step.status}" data-step="${step.id}" title="${step.label} - ${step.date}">
        <div class="step-node">${nodeIcon}</div>
        <span class="step-label">${step.label}</span>
      </div>
    `;
  }).join('');

  return `
    <section class="card card-glass" style="margin-top: 24px;">
      <div class="section-title-group">
        <h2 class="section-title">
          <span>🚀</span> Project Progress Timeline
        </h2>
        <span class="badge badge-gold">Phase 6 of 8: Album Design</span>
      </div>

      <div class="timeline-container">
        <div class="timeline-track">
          <div class="timeline-line-bg"></div>
          <div class="timeline-line-progress"></div>
          ${stepsHTML}
        </div>
      </div>
    </section>
  `;
}
