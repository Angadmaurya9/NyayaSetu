/**
 * NyayaSetu UI Helpers
 * Utility methods for DOM manipulation, rendering cards, loading states, and notifications.
 */

const UI = {
  /**
   * Display loading spinner in container
   */
  showLoading(container, text = 'Checking official sources...') {
    const el = typeof container === 'string' ? document.getElementById(container) : container;
    if (!el) return;
    el.innerHTML = `
      <div class="loading-container">
        <div class="spinner"></div>
        <p class="loading-text">${text}</p>
      </div>
    `;
  },

  /**
   * Render error notification block
   */
  showError(container, message) {
    const el = typeof container === 'string' ? document.getElementById(container) : container;
    if (!el) return;
    el.innerHTML = `
      <div class="alert alert-warning">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <div>
          <strong>Notice:</strong> ${message || 'Something went wrong while checking the information. Please try again.'}
        </div>
      </div>
    `;
  },

  /**
   * Render a verified source card
   */
  renderSourceCard(source) {
    return `
      <div class="source-card">
        <div class="source-card-header">
          <span class="source-title">${source.title || 'Official Document'}</span>
          <span class="badge badge-neutral">${source.type || 'Government Source'}</span>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-secondary);">
          <strong>Section / Reference:</strong> ${source.section || 'General Rule'}
        </p>
        ${source.snippet ? `<div class="source-snippet">"${source.snippet}"</div>` : ''}
        ${source.url ? `
          <div style="margin-top: 0.5rem; text-align: right;">
            <a href="${source.url}" target="_blank" rel="noopener" class="btn btn-sm btn-outline">
              View Source ↗
            </a>
          </div>
        ` : ''}
      </div>
    `;
  },

  /**
   * Render action plan list items
   */
  renderActionPlan(steps) {
    if (!steps || !steps.length) return '';
    return steps.map((step, idx) => `
      <div class="action-step-item">
        <div class="step-num-badge">${idx + 1}</div>
        <div>
          <h4 style="font-size: 1rem; margin-bottom: 0.25rem;">${step.title}</h4>
          <p style="font-size: 0.9rem; color: var(--text-secondary);">${step.description}</p>
        </div>
      </div>
    `).join('');
  }
};

window.UI = UI;
