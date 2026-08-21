/**
 * NyayaSetu App Main Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('NyayaSetu Client Initialized');

  // Hero Search Input & Submit
  const heroInput = document.getElementById('hero-query-input');
  const heroBtn = document.getElementById('hero-submit-btn');

  if (heroBtn && heroInput) {
    const handleQuerySubmit = () => {
      const query = heroInput.value.trim();
      if (!query) return;

      // Smart routing based on query keywords or save to sessionStorage
      sessionStorage.setItem('nyaya_user_query', query);

      const qLower = query.toLowerCase();
      if (qLower.includes('rti') || qLower.includes('information') || qLower.includes('spent') || qLower.includes('sanctioned')) {
        window.location.href = '/pages/rti.html';
      } else if (qLower.includes('scholarship') || qLower.includes('eligible') || qLower.includes('scheme') || qLower.includes('kisan')) {
        window.location.href = '/pages/schemes.html';
      } else if (qLower.includes('form') || qLower.includes('certificate') || qLower.includes('fill')) {
        window.location.href = '/pages/forms.html';
      } else {
        window.location.href = '/pages/rights.html';
      }
    };

    heroBtn.addEventListener('click', handleQuerySubmit);
    heroInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleQuerySubmit();
    });
  }

  // Example Pills Handling
  const examplePills = document.querySelectorAll('.example-pill');
  examplePills.forEach(pill => {
    pill.addEventListener('click', () => {
      const text = pill.getAttribute('data-query');
      if (heroInput) {
        heroInput.value = text;
        heroBtn.click();
      }
    });
  });

  // Language Toggle Placeholder
  const langBtn = document.getElementById('lang-toggle-btn');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      alert('Language toggle: English & Devanagari Hindi support mode.');
    });
  }
});
