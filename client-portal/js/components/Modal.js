/* PhotoMagic by RK - Reusable Modal Component */

export function renderModal() {
  return `
    <div class="modal-backdrop" id="app-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title" id="modal-title">Workspace Notice</h3>
          <button class="modal-close" id="modal-close-btn">&times;</button>
        </div>
        <div class="modal-body" id="modal-body" style="color: var(--color-text-secondary); font-size: 0.9375rem; line-height: 1.6;">
          <!-- Modal content injected dynamically -->
        </div>
        <div class="modal-footer" id="modal-footer" style="margin-top: 24px; display: flex; justify-content: flex-end; gap: 12px;">
          <button class="btn btn-secondary" id="modal-cancel-btn">Close</button>
          <button class="btn btn-primary" id="modal-action-btn">Proceed</button>
        </div>
      </div>
    </div>
  `;
}
