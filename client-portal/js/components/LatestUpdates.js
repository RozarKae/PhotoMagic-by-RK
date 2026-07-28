/* PhotoMagic by RK - Latest Updates & Studio Message Component */

export function renderLatestUpdates(updates, studioMessage) {
  const updatesHTML = updates.map(item => `
    <div class="update-item" data-id="${item.id}">
      <div class="update-icon">${item.icon}</div>
      <div class="update-content">
        <h4 class="update-title">${item.title}</h4>
        <p style="font-size: 0.8125rem; color: var(--color-text-secondary); margin-top: 2px;">${item.description}</p>
        <span class="update-time">${item.time}</span>
      </div>
    </div>
  `).join('');

  return `
    <section style="margin-top: 32px;">
      <div class="section-title-group">
        <h2 class="section-title">
          <span>🔔</span> Latest Updates & Messages
        </h2>
      </div>

      <div class="updates-grid">
        <!-- Updates Timeline List -->
        <div class="update-list">
          ${updatesHTML}
        </div>

        <!-- Direct Studio Message Box -->
        <div class="studio-message-box">
          <div class="studio-author">
            <div class="author-avatar">${studioMessage.avatarInitials}</div>
            <div class="author-meta">
              <h4>${studioMessage.author}</h4>
              <span>${studioMessage.role} • ${studioMessage.date}</span>
            </div>
          </div>

          <div class="message-quote">
            "${studioMessage.content}"
          </div>

          <div style="margin-top: 8px;">
            <button class="btn btn-secondary btn-sm" id="btn-reply-studio">
              💬 Reply to RK Studio
            </button>
          </div>
        </div>
      </div>
    </section>
  `;
}
