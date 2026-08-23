/**
 * NyayaSetu UI Helpers
 * Utility methods for DOM manipulation, rendering cards, loading states, and notifications.
 */

const UI = {
  /**
   * Display loading spinner or skeleton in container
   */
  showLoading(container, text = 'Checking official sources...', useSkeleton = false) {
    const el = typeof container === 'string' ? document.getElementById(container) : container;
    if (!el) return;

    if (useSkeleton) {
      el.innerHTML = `
        <div class="card" style="padding: 2rem;">
          <div class="skeleton-box" style="width: 40%; height: 1.75rem;"></div>
          <div class="skeleton-box" style="width: 90%; height: 1.1rem; margin-top: 1rem;"></div>
          <div class="skeleton-box" style="width: 75%; height: 1.1rem;"></div>
          <div class="skeleton-box" style="width: 85%; height: 1.1rem;"></div>
          <div style="margin-top: 1.5rem; text-align: center; color: var(--primary-navy); font-weight: 600;">
            ${text}
          </div>
        </div>
      `;
    } else {
      el.innerHTML = `
        <div class="loading-container">
          <div class="spinner"></div>
          <p class="loading-text">${text}</p>
        </div>
      `;
    }
  },

  /**
   * Render human-readable error notification block
   */
  showError(container, message = 'Something went wrong while checking the information.', onRetryFn = null) {
    const el = typeof container === 'string' ? document.getElementById(container) : container;
    if (!el) return;
    el.innerHTML = `
      <div class="alert alert-warning" style="flex-direction: column; gap: 0.75rem;">
        <div style="display: flex; gap: 0.75rem; align-items: center;">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <div>
            <strong>Notice:</strong> ${message}
          </div>
        </div>
        <div style="display: flex; gap: 0.5rem; margin-top: 0.25rem;">
          <button class="btn btn-sm btn-outline" onclick="location.reload()">Try Again</button>
        </div>
      </div>
    `;
  },

  /**
   * Render compact expandable official sources view (Default collapsed)
   */
  renderCompactSources(sources) {
    if (!sources || !sources.length) return '';
    const count = sources.length;
    return `
      <div class="card compact-sources-card">
        <details style="cursor: pointer;">
          <summary style="display: flex; justify-content: space-between; align-items: center; font-weight: 600; list-style: none;">
            <div style="display: flex; align-items: center; gap: 0.6rem;">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="var(--success-green)" stroke-width="2.5" style="width: 1.25rem; height: 1.25rem;">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Official sources checked (${count} government source${count > 1 ? 's' : ''})</span>
            </div>
            <span class="btn btn-sm btn-outline" style="pointer-events: none;">View sources →</span>
          </summary>
          <div style="margin-top: 1rem; border-top: 1px solid var(--border-color); padding-top: 1rem;">
            ${sources.map(s => this.renderSourceCard(s)).join('')}
          </div>
        </details>
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
          <span class="source-title">${source.title || 'Official Government Document'}</span>
          <span class="badge badge-neutral">${source.type || 'Verified Source'}</span>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-secondary);">
          <strong>Section / Reference:</strong> ${source.section || 'General Provision'}
        </p>
        ${source.snippet ? `<div class="source-snippet">"${source.snippet}"</div>` : ''}
        ${source.url ? `
          <div style="margin-top: 0.65rem; text-align: right;">
            <a href="${source.url}" target="_blank" rel="noopener" class="btn btn-sm btn-outline">
              View Official Source ↗
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
          <h4 style="font-size: 1.05rem; margin-bottom: 0.25rem; color: var(--primary-navy);">${step.title}</h4>
          <p style="font-size: 0.925rem; color: var(--text-secondary); line-height: 1.5;">${step.description}</p>
        </div>
      </div>
    `).join('');
  },

  /**
   * Render interactive document checklist
   */
  renderChecklist(items) {
    if (!items || !items.length) return '';
    return items.map((item, idx) => `
      <label class="checklist-item">
        <input type="checkbox" id="chk-${idx}">
        <span>${item}</span>
      </label>
    `).join('');
  }
};

window.UI = UI;

