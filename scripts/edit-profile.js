// Check if user is logged in
document.addEventListener('DOMContentLoaded', function() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    if (!userData) {
        // If no user data, redirect to login
        window.location.href = 'login.html';
        return;
    }

    // Populate form with existing user data
    const fullNameInput = document.getElementById('full-name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const locationInput = document.getElementById('location');
    const bioInput = document.getElementById('bio');
    const preferredCategoriesSelect = document.getElementById('preferred-categories');

    if (fullNameInput) fullNameInput.value = userData.username || '';
    if (emailInput) emailInput.value = userData.email || '';
    if (phoneInput) phoneInput.value = userData.phone || '';
    if (locationInput) locationInput.value = userData.location || '';
    if (bioInput) bioInput.value = userData.bio || '';
    if (preferredCategoriesSelect && userData.preferredCategories) {
        Array.from(preferredCategoriesSelect.options).forEach(option => {
            option.selected = userData.preferredCategories.includes(option.value);
        });
    }

    // Handle profile picture upload
    const uploadTrigger = document.getElementById('upload-trigger');
    const profilePicture = document.getElementById('profile-picture');
    const profilePreview = document.getElementById('profile-preview');
    const removePicture = document.getElementById('remove-picture');

    if (uploadTrigger && profilePicture) {
        uploadTrigger.addEventListener('click', () => {
            profilePicture.click();
        });

        profilePicture.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    profilePreview.src = e.target.result;
                    userData.profilePicture = e.target.result;
                    localStorage.setItem('userData', JSON.stringify(userData));
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (removePicture) {
        removePicture.addEventListener('click', () => {
            profilePreview.src = 'images/default-avatar.png';
            userData.profilePicture = null;
            localStorage.setItem('userData', JSON.stringify(userData));
        });
    }

    // Handle form submission
    const editProfileForm = document.getElementById('edit-profile-form');
    if (editProfileForm) {
        editProfileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Update user data
            userData.username = fullNameInput.value;
            userData.email = emailInput.value;
            userData.phone = phoneInput.value;
            userData.location = locationInput.value;
            userData.bio = bioInput.value;
            userData.preferredCategories = Array.from(preferredCategoriesSelect.selectedOptions).map(option => option.value);
            
            // Save updated user data
            localStorage.setItem('userData', JSON.stringify(userData));
            
            // Show success message
            alert('Profile updated successfully!');
            
            // Redirect back to profile page
            window.location.href = 'profile.html';
        });
    }

    // Handle cancel button
    const cancelBtn = document.querySelector('.cancel-btn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            window.location.href = 'profile.html';
        });
    }
});

// Sidebar Toggle Functionality
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('close-btn');
const mainContent = document.getElementById('main-content');
const overlay = document.createElement('div');
overlay.classList.add('overlay');

// Toggle sidebar
sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    mainContent.style.marginLeft = sidebar.classList.contains('active') ? '250px' : '0';
});

// Close sidebar
closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    mainContent.style.marginLeft = '0';
});

// Close sidebar when clicking outside
overlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    mainContent.style.marginLeft = '0';
});

// Add overlay styles
const style = document.createElement('style');
style.textContent = `
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 999;
        display: none;
    }
    
    .overlay.active {
        display: block;
    }
`;
document.head.appendChild(style);

// Profile Picture Functionality
const profilePicture = document.getElementById('profile-picture');
const uploadTrigger = document.getElementById('upload-trigger');
const removePictureBtn = document.getElementById('remove-picture');
const profilePreview = document.getElementById('profile-preview');
const defaultAvatar = 'images/default-avatar.jpg';

// Trigger file input when clicking the upload button
uploadTrigger.addEventListener('click', () => {
    profilePicture.click();
});

// Handle profile picture change
profilePicture.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            profilePreview.src = e.target.result;
            // Here you would typically upload the image to your server
            console.log('Profile picture updated. In a real app, this would be uploaded to the server.');
        };
        reader.readAsDataURL(file);
    }
});

// Handle profile picture removal
removePictureBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to remove your profile picture?')) {
        profilePreview.src = defaultAvatar;
        profilePicture.value = '';
        // Here you would typically notify the server to remove the profile picture
        console.log('Profile picture removed. In a real app, this would be removed from the server.');
    }
});

// Form Handling
const editProfileForm = document.getElementById('edit-profile-form');
const cancelBtn = document.querySelector('.cancel-btn');

// Handle form submission
editProfileForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        // Get form data
        const formData = new FormData(editProfileForm);
        const profileData = {
            fullName: formData.get('full-name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            location: formData.get('location'),
            bio: formData.get('bio'),
            preferredCategories: Array.from(document.getElementById('preferred-categories').selectedOptions).map(option => option.value),
            notifications: Array.from(formData.getAll('notifications')),
            visibility: formData.get('visibility')
        };

        // Here you would typically send the data to your server
        console.log('Profile Data:', profileData);
        
        // Show success message
        alert('Profile updated successfully!');
        
        // Redirect to profile page
        window.location.href = 'profile.html';
    } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
    }
});

// Handle cancel button
cancelBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
        window.location.href = 'profile.html';
    }
});

// Form Validation
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');

// Email validation
emailInput.addEventListener('input', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        emailInput.setCustomValidity('Please enter a valid email address');
    } else {
        emailInput.setCustomValidity('');
    }
});

// Phone number validation
phoneInput.addEventListener('input', () => {
    const phoneRegex = /^\+?[\d\s-()]+$/;
    if (phoneInput.value && !phoneRegex.test(phoneInput.value)) {
        phoneInput.setCustomValidity('Please enter a valid phone number');
    } else {
        phoneInput.setCustomValidity('');
    }
});

// Multiple select enhancement
const preferredCategories = document.getElementById('preferred-categories');
preferredCategories.addEventListener('mousedown', (e) => {
    if (e.target.tagName === 'OPTION') {
        e.preventDefault();
        e.target.selected = !e.target.selected;
        const event = new Event('change');
        e.target.parentElement.dispatchEvent(event);
    }
}); 