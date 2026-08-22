/**
 * NyayaSetu App Main Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('NyayaSetu Client Initialized');

  // Hero Search Input & Voice Setup
  const heroInput = document.getElementById('hero-query-input');
  const heroBtn = document.getElementById('hero-submit-btn');
  const clearBtn = document.getElementById('clear-text-btn');
  const confirmationContainer = document.getElementById('confirmation-container');

  // Initialize Web Speech Voice Input
  if (window.VoiceInput) {
    VoiceInput.init({
      target: heroInput,
      button: document.getElementById('mic-btn')
    });
  }

  // Auto-grow textarea & Clear Button toggle
  if (heroInput) {
    heroInput.addEventListener('input', () => {
      heroInput.style.height = 'auto';
      heroInput.style.height = `${Math.min(heroInput.scrollHeight, 240)}px`;
      if (clearBtn) {
        clearBtn.style.display = heroInput.value.trim().length > 0 ? 'inline-block' : 'none';
      }
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        heroInput.value = '';
        heroInput.style.height = 'auto';
        clearBtn.style.display = 'none';
        if (confirmationContainer) confirmationContainer.innerHTML = '';
        heroInput.focus();
      });
    }
  }

  // Hero Natural Language Submission & Extraction Flow
  if (heroBtn && heroInput) {
    const handleQuerySubmit = async () => {
      const query = heroInput.value.trim();
      if (!query) {
        heroInput.focus();
        if (confirmationContainer) {
          confirmationContainer.innerHTML = `
            <div class="alert alert-info" style="margin-top: 1rem; flex-direction: column; align-items: flex-start;">
              <strong>Tell us a little about what you're trying to solve.</strong>
              <span style="font-size: 0.875rem;">You can type your problem above, select one of the example prompts below, or click the microphone button to speak.</span>
            </div>
          `;
          confirmationContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        return;
      }

      // Show loading micro-interaction on button
      const origBtnHtml = heroBtn.innerHTML;
      heroBtn.disabled = true;
      heroBtn.innerHTML = `
        <div class="spinner" style="width: 1.25rem; height: 1.25rem; border-width: 2px; border-top-color: #FFFFFF;"></div>
        <span>Understanding your request...</span>
      `;

      try {
        // Call Orchestrator Extraction API
        const orchestration = await API.orchestrateQuery(query);
        renderExtractionConfirmation(orchestration, query);
      } catch (err) {
        console.warn('Orchestration fallback to local rule routing:', err);
        // Fallback fallback rule routing
        renderExtractionConfirmation({
          intent: detectFallbackIntent(query),
          confidence: 'high',
          summary: 'Civic Inquiry Analysis',
          extracted: {
            issue_type: query.length < 15 ? `Inquiry regarding ${query}` : 'Civic Issue Guidance',
            location: detectLocationInQuery(query),
            amount: '',
            duration: '',
            actions_taken: []
          },
          missing_information: []
        }, query);
      } finally {
        heroBtn.disabled = false;
        heroBtn.innerHTML = origBtnHtml;
      }
    };

    heroBtn.addEventListener('click', handleQuerySubmit);
    heroInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleQuerySubmit();
      }
    });
  }

  // Example Pills Handling
  const examplePills = document.querySelectorAll('.example-pill');
  examplePills.forEach(pill => {
    pill.addEventListener('click', () => {
      const text = pill.getAttribute('data-query');
      if (heroInput) {
        heroInput.value = text;
        heroInput.dispatchEvent(new Event('input'));
        if (heroBtn) heroBtn.click();
      }
    });
  });

  // Language Toggle Handler
  const langBtn = document.getElementById('lang-toggle-btn');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      const textSpan = document.getElementById('current-lang-text');
      if (textSpan.textContent.includes('EN')) {
        textSpan.textContent = 'हिंदी / EN';
        alert('Devanagari Hindi assistance active. Interface labels rendered in bilingual format.');
      } else {
        textSpan.textContent = 'EN / हिंदी';
      }
    });
  }
});

function renderExtractionConfirmation(data, rawQuery) {
  const container = document.getElementById('confirmation-container');
  if (!container) return;

  const intentMap = {
    rights: { name: 'Rights Navigator', path: '/pages/rights.html', color: 'var(--accent-rights)' },
    rti: { name: 'RTI Application Builder', path: '/pages/rti.html', color: 'var(--accent-rti)' },
    scheme: { name: 'Scheme Eligibility Checker', path: '/pages/schemes.html', color: 'var(--accent-scheme)' },
    form: { name: 'Guided Form Filler', path: '/pages/forms.html', color: 'var(--accent-form)' }
  };

  const matched = intentMap[data.intent] || intentMap.rights;
  const extracted = data.extracted || {};
  const missingInfo = data.missing_information || [];

  container.innerHTML = `
    <div class="confirmation-modal-card">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem;">
        <div>
          <span class="badge badge-success" style="margin-bottom: 0.4rem;">Intelligent Information Extraction</span>
          <h3 style="font-size: 1.25rem;">We understood your situation as:</h3>
        </div>
        <span class="badge badge-neutral">Confidence: ${data.confidence || 'High'}</span>
      </div>

      <div class="confirmation-grid">
        <div class="confirmation-item">
          <span class="confirmation-item-label">Issue Category</span>
          <span class="confirmation-item-value">${extracted.issue_type || data.summary || 'Civic Matter'}</span>
        </div>
        ${extracted.location ? `
          <div class="confirmation-item">
            <span class="confirmation-item-label">Location / State</span>
            <span class="confirmation-item-value" id="confirmed-location">${extracted.location}</span>
          </div>
        ` : ''}
        ${extracted.amount ? `
          <div class="confirmation-item">
            <span class="confirmation-item-label">Amount Mentioned</span>
            <span class="confirmation-item-value">${extracted.amount}</span>
          </div>
        ` : ''}
        ${extracted.duration ? `
          <div class="confirmation-item">
            <span class="confirmation-item-label">Duration</span>
            <span class="confirmation-item-value">${extracted.duration}</span>
          </div>
        ` : ''}
      </div>

      ${!extracted.location ? `
        <div class="alert alert-info" style="margin-bottom: 1.25rem; flex-direction: column;">
          <strong>Quick Clarification Needed:</strong>
          <span style="font-size: 0.875rem;">Enter your state/location so we apply correct local rules:</span>
          <input type="text" id="missing-state-input" class="form-control" placeholder="e.g. Uttar Pradesh, Karnataka, Delhi" style="max-width: 320px; margin-top: 0.5rem;">
        </div>
      ` : ''}

      <div style="display: flex; gap: 1rem; align-items: center; justify-content: space-between; flex-wrap: wrap; border-top: 1px solid var(--border-color); padding-top: 1rem;">
        <div style="font-size: 0.95rem; color: var(--text-secondary);">
          We think <strong style="color: ${matched.color};">${matched.name}</strong> is the best place to start.
        </div>

        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <button class="btn btn-outline btn-sm" id="cancel-confirmation-btn">Choose Another Service</button>
          <button class="btn btn-primary" id="proceed-confirmation-btn" style="background-color: ${matched.color}; border-color: ${matched.color};">
            <span>Continue to ${matched.name} →</span>
          </button>
        </div>
      </div>
    </div>
  `;

  container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Handle proceed
  const proceedBtn = document.getElementById('proceed-confirmation-btn');
  if (proceedBtn) {
    proceedBtn.addEventListener('click', () => {
      const missingStateInput = document.getElementById('missing-state-input');
      const finalState = missingStateInput ? missingStateInput.value.trim() : (extracted.location || '');

      sessionStorage.setItem('nyaya_user_query', rawQuery);
      sessionStorage.setItem('nyaya_extracted', JSON.stringify({
        ...extracted,
        location: finalState || extracted.location || ''
      }));

      window.location.href = matched.path;
    });
  }

  // Handle edit/cancel
  const cancelBtn = document.getElementById('cancel-confirmation-btn');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      container.innerHTML = '';
      const heroInput = document.getElementById('hero-query-input');
      if (heroInput) heroInput.focus();
    });
  }
}

function detectFallbackIntent(query) {
  const qLower = query.toLowerCase();
  if (qLower.includes('rti') || qLower.includes('information') || qLower.includes('spent') || qLower.includes('road')) return 'rti';
  if (qLower.includes('scholarship') || qLower.includes('scheme') || qLower.includes('kisan')) return 'scheme';
  if (qLower.includes('form') || qLower.includes('certificate')) return 'form';
  return 'rights';
}

function detectLocationInQuery(query) {
  const known = ["Prayagraj", "Varanasi", "Lucknow", "Delhi", "Bengaluru", "Mumbai", "Jaipur", "Uttar Pradesh", "Karnataka"];
  for (const k of known) {
    if (query.toLowerCase().includes(k.toLowerCase())) return k;
  }
  return '';
}

