// Regular expressions for validation
const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/; // 3-20 characters, letters, numbers, and underscore only
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Standard email format
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char

// Get form elements
const signupForm = document.getElementById('signup-form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

// Error messages
const errorMessages = {
    username: 'Username must be 3-20 characters long and can only contain letters, numbers, and underscores',
    email: 'Please enter a valid email address',
    password: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    confirmPassword: 'Passwords do not match'
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

// Real-time validation for username
username.addEventListener('input', () => {
    if (!usernameRegex.test(username.value)) {
        showError(username, errorMessages.username);
    } else {
        removeError(username);
    }
});

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

// Real-time validation for confirm password
confirmPassword.addEventListener('input', () => {
    if (password.value !== confirmPassword.value) {
        showError(confirmPassword, errorMessages.confirmPassword);
    } else {
        removeError(confirmPassword);
    }
});

// Form submission validation
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    
    // Validate username
    if (!usernameRegex.test(username.value)) {
        showError(username, errorMessages.username);
        isValid = false;
    }
    
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
    
    // Validate confirm password
    if (password.value !== confirmPassword.value) {
        showError(confirmPassword, errorMessages.confirmPassword);
        isValid = false;
    }
    
    // If all validations pass, you can proceed with form submission
    if (isValid) {
        // Store user data in localStorage
        const userData = {
            username: username.value,
            email: email.value,
            password: password.value // In a real app, this should be hashed
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    }
});
