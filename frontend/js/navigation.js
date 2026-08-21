/**
 * NyayaSetu Navigation & Stepper Controller
 */

const Navigation = {
  currentStep: 1,

  /**
   * Transition multi-step wizard views
   */
  goToStep(stepNumber, totalSteps = 4) {
    this.currentStep = stepNumber;
    
    // Update step view containers
    for (let i = 1; i <= totalSteps; i++) {
      const stepEl = document.getElementById(`step-view-${i}`);
      const stepInd = document.getElementById(`step-indicator-${i}`);
      
      if (stepEl) {
        stepEl.style.display = (i === stepNumber) ? 'block' : 'none';
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

window.Navigation = Navigation;
