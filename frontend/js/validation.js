/**
 * NyayaSetu Validation Controller
 * Handles inline client-side validation for form inputs.
 */

const Validation = {
  validateField(inputEl) {
    if (!inputEl) return true;
    const formGroup = inputEl.closest('.form-group');
    const isRequired = inputEl.hasAttribute('required');
    const value = inputEl.value.trim();

    if (isRequired && !value) {
      if (formGroup) formGroup.classList.add('has-error');
      return false;
    }

    if (formGroup) formGroup.classList.remove('has-error');
    return true;
  },

  validateForm(formContainer) {
    const inputs = formContainer.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  }
};

window.Validation = Validation;
