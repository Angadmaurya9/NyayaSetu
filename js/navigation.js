/**
 * NyayaSetu Navigation & Stepper Controller
 */

const Navigation = {
  currentStep: 1,

  init() {
    // Mobile Hamburger Menu Toggle
    const navToggle = document.getElementById('nav-toggle-btn');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
      navToggle.addEventListener('click', () => {
        const isExpanded = navLinks.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', isExpanded);
      });

      // Close mobile menu when a link is clicked
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('active');
          if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  },

  /**
   * Transition multi-step wizard views
   */
  goToStep(stepNumber, totalSteps = 4) {
    this.currentStep = stepNumber;
    
    // Update step view containers with page animation
    for (let i = 1; i <= totalSteps; i++) {
      const stepEl = document.getElementById(`step-view-${i}`);
      const stepInd = document.getElementById(`step-indicator-${i}`);
      
      if (stepEl) {
        if (i === stepNumber) {
          stepEl.style.display = 'block';
          stepEl.classList.remove('page-enter');
          void stepEl.offsetWidth; // Trigger reflow for animation restart
          stepEl.classList.add('page-enter');
        } else {
          stepEl.style.display = 'none';
        }
      }
      
      if (stepInd) {
        stepInd.classList.remove('active', 'completed');
        if (i === stepNumber) {
          stepInd.classList.add('active');
        } else if (i < stepNumber) {
          stepInd.classList.add('completed');
        }
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Navigation.init();
});

window.Navigation = Navigation;

