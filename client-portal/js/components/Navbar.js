/* PhotoMagic by RK - Reusable Navbar Component */

export function renderNavbar(client) {
  return `
    <header class="navbar-desktop">
      <div class="container navbar-container">
        <a href="#" class="nav-brand">
          <div class="nav-logo-mark">RK</div>
          <div class="nav-brand-text">PHOTOMAGIC BY RK</div>
        </a>

        <ul class="nav-links">
          <li><a href="./index.html" class="nav-link ${window.location.pathname.includes('gallery') ? '' : 'active'}" data-target="dashboard">Dashboard</a></li>
          <li><a href="./gallery.html" class="nav-link ${window.location.pathname.includes('gallery') ? 'active' : ''}" data-target="gallery">Gallery</a></li>
          <li><a href="./gallery.html?filter=selected" class="nav-link" data-target="selection">Selections</a></li>
          <li><a href="#" class="nav-link" data-target="album">Album Proof</a></li>
          <li><a href="#" class="nav-link" data-target="payments">Invoices</a></li>
          <li><a href="#" class="nav-link" data-target="downloads">Downloads</a></li>
        </ul>

        <div class="nav-actions">
          <button class="nav-bell-btn" id="bell-btn" title="Notifications">
            🔔
            <span class="nav-bell-badge"></span>
          </button>
          <div class="user-avatar" title="${client.name}">
            ${client.avatarInitials}
          </div>
        </div>
      </div>
    </header>

    <!-- Mobile Fixed Bottom Navigation Bar -->
    <nav class="navbar-mobile-bottom">
      <a href="./index.html" class="mobile-nav-item ${window.location.pathname.includes('gallery') ? '' : 'active'}" data-target="dashboard">
        <span class="mobile-nav-icon">🏠</span>
        <span>Home</span>
      </a>
      <a href="./gallery.html" class="mobile-nav-item ${window.location.pathname.includes('gallery') ? 'active' : ''}" data-target="gallery">
        <span class="mobile-nav-icon">🖼️</span>
        <span>Gallery</span>
      </a>
      <a href="#" class="mobile-nav-item" data-target="album">
        <span class="mobile-nav-icon">📖</span>
        <span>Proof</span>
      </a>
      <a href="#" class="mobile-nav-item" data-target="payments">
        <span class="mobile-nav-icon">💳</span>
        <span>Pay</span>
      </a>
      <a href="#" class="mobile-nav-item" data-target="downloads">
        <span class="mobile-nav-icon">📥</span>
        <span>Downloads</span>
      </a>
    </nav>
  `;
}
