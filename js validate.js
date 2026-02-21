// Form Validation Script
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Clear previous messages
        clearMessages();
        
        // Get form values
        const fullname = document.getElementById('fullname').value.trim();
        const age = document.getElementById('age').value.trim();
        const location = document.getElementById('location').value.trim();
        const description = document.getElementById('description').value.trim();
        
        let errors = [];
        
        // Validation rules
        if (fullname === '') {
            errors.push('Name is required');
        } else if (fullname.length < 3) {
            errors.push('Name must be at least 3 characters long');
        }
        
        if (age === '') {
            errors.push('Age is required');
        } else if (isNaN(age) || age < 1 || age > 120) {
            errors.push('Age must be a valid number between 1 and 120');
        }
        
        if (location === '') {
            errors.push('Last seen location is required');
        } else if (location.length < 5) {
            errors.push('Please provide a more detailed location');
        }
        
        if (description === '') {
            errors.push('Description is required');
        } else if (description.length < 10) {
            errors.push('Description must be at least 10 characters long');
        }
        
        // Display errors or success
        if (errors.length > 0) {
            displayErrors(errors);
        } else {
            displaySuccess();
            
            // Optional: Reset form after 2 seconds
            setTimeout(() => {
                form.reset();
                clearMessages();
            }, 2000);
        }
    });
});

function displayErrors(errors) {
    const form = document.querySelector('form');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.id = 'error-message';
    
    let errorHTML = '<strong>Please fix the following errors:</strong><ul>';
    errors.forEach(error => {
        errorHTML += `<li>${error}</li>`;
    });
    errorHTML += '</ul>';
    
    errorDiv.innerHTML = errorHTML;
    form.insertBefore(errorDiv, form.firstChild);
    
    // Add shake animation to form
    form.classList.add('shake');
    setTimeout(() => form.classList.remove('shake'), 500);
}

function displaySuccess() {
    const form = document.querySelector('form');
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.id = 'success-message';
    successDiv.innerHTML = '<strong>✓ Report submitted successfully!</strong><p>Thank you for reporting. Your information has been recorded.</p>';
    
    form.insertBefore(successDiv, form.firstChild);
}

function clearMessages() {
    const errorMsg = document.getElementById('error-message');
    const successMsg = document.getElementById('success-message');
    
    if (errorMsg) errorMsg.remove();
    if (successMsg) successMsg.remove();
}

// Real-time validation feedback
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Remove error styling if user starts correcting
            if (this.classList.contains('input-error')) {
                this.classList.remove('input-error');
            }
        });
    });
});

function validateField(field) {
    let isValid = true;
    
    if (field.id === 'fullname') {
        isValid = field.value.trim().length >= 3;
    } else if (field.id === 'age') {
        const ageValue = field.value.trim();
        isValid = !isNaN(ageValue) && ageValue >= 1 && ageValue <= 120;
    } else if (field.id === 'location') {
        isValid = field.value.trim().length >= 5;
    } else if (field.id === 'description') {
        isValid = field.value.trim().length >= 10;
    }
    
    if (!isValid && field.value.trim() !== '') {
        field.classList.add('input-error');
    } else {
        field.classList.remove('input-error');
    }
}
