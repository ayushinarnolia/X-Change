// Regular expressions for validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Standard email format
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char

// Get form elements
const loginForm = document.getElementById('login-form');
const email = document.getElementById('email');
const password = document.getElementById('password');

// Error messages
const errorMessages = {
    email: 'Please enter a valid email address',
    password: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
};

// Function to show error message
function showError(input, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    // Remove any existing error message
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    input.parentElement.appendChild(errorDiv);
    input.classList.add('error');
}

// Function to remove error message
function removeError(input) {
    const errorDiv = input.parentElement.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
    input.classList.remove('error');
}

// Real-time validation for email
email.addEventListener('input', () => {
    if (!emailRegex.test(email.value)) {
        showError(email, errorMessages.email);
    } else {
        removeError(email);
    }
});

// Real-time validation for password
password.addEventListener('input', () => {
    if (!passwordRegex.test(password.value)) {
        showError(password, errorMessages.password);
    } else {
        removeError(password);
    }
});

// Form submission validation
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    
    // Validate email
    if (!emailRegex.test(email.value)) {
        showError(email, errorMessages.email);
        isValid = false;
    }
    
    // Validate password
    if (!passwordRegex.test(password.value)) {
        showError(password, errorMessages.password);
        isValid = false;
    }
    
    // If all validations pass, check credentials
    if (isValid) {
        const userData = JSON.parse(localStorage.getItem('userData'));
        
        if (!userData) {
            showError(email, 'No account found. Please sign up first.');
            return;
        }
        
        if (userData.email === email.value && userData.password === password.value) {
            // Login successful
            window.location.href = 'dashboard.html';
        } else {
            showError(password, 'Invalid email or password');
        }
    }
});
