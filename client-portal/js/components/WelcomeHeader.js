/* PhotoMagic by RK - Welcome Header Component */

export function renderWelcomeHeader(client, event) {
  return `
    <section class="welcome-hero">
      <img src="./assets/hero_banner.png" alt="${event.title}" class="hero-image-bg" />
      <div class="hero-overlay"></div>
      
      <div class="hero-content">
        <div class="hero-title-group">
          <div style="margin-bottom: 8px;">
            <span class="badge badge-gold">✨ ${event.statusBadge}</span>
          </div>
          <h1>Welcome, ${client.name}</h1>
          <div class="hero-subtitle">
            <span class="hero-meta-item">🏰 ${event.title}</span>
            <span>•</span>
            <span class="hero-meta-item">📍 ${event.venue}</span>
            <span>•</span>
            <span class="hero-meta-item">📅 ${event.date}</span>
          </div>
        </div>

        <div style="margin-top: 12px;">
          <button class="btn btn-secondary btn-sm" id="btn-view-contract">
            📋 View Contract Details
          </button>
        </div>
      </div>
    </section>
  `;
}
