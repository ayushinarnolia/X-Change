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

// Check if user is logged in and display user data
document.addEventListener('DOMContentLoaded', function() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    if (!userData) {
        // If no user data, redirect to login
        window.location.href = 'login.html';
        return;
    }

    // Update profile information
    const usernameElement = document.getElementById('username-display');
    const emailElement = document.getElementById('email-display');
    
    if (usernameElement) {
        usernameElement.textContent = userData.username;
    }
    
    if (emailElement) {
        emailElement.textContent = userData.email;
    }

    // Handle profile edit form
    const editProfileForm = document.getElementById('edit-profile-form');
    if (editProfileForm) {
        editProfileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const newUsername = document.getElementById('new-username').value;
            const newEmail = document.getElementById('new-email').value;
            
            // Update user data
            userData.username = newUsername;
            userData.email = newEmail;
            localStorage.setItem('userData', JSON.stringify(userData));
            
            // Update display
            if (usernameElement) {
                usernameElement.textContent = newUsername;
            }
            if (emailElement) {
                emailElement.textContent = newEmail;
            }
            
            alert('Profile updated successfully!');
        });
    }
});

// Handle avatar edit button
const editAvatarBtn = document.querySelector('.edit-avatar');
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = 'image/*';
fileInput.style.display = 'none';
document.body.appendChild(fileInput);

editAvatarBtn.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const avatarImg = document.querySelector('.profile-avatar img');
            avatarImg.src = e.target.result;
            
            // Here you would typically upload the image to your server
            console.log('Avatar updated. In a real app, this would be uploaded to the server.');
        };
        reader.readAsDataURL(file);
    }
});

// Load more reviews functionality
const reviewsSection = document.querySelector('.reviews');
let page = 1;

function createReviewElement(review) {
    const reviewDiv = document.createElement('div');
    reviewDiv.className = 'review';
    reviewDiv.innerHTML = `
        <div class="review-header">
            <img src="${review.avatar}" alt="${review.name}">
            <div class="review-info">
                <h4>${review.name}</h4>
                <div class="rating">
                    ${Array(5).fill('').map((_, i) => 
                        `<i class="fas fa-star${i < review.rating ? '' : '-o'}"></i>`
                    ).join('')}
                </div>
            </div>
        </div>
        <p>${review.text}</p>
    `;
    return reviewDiv;
}

// Example function to load more reviews
async function loadMoreReviews() {
    try {
        // In a real app, this would be an API call
        const newReviews = [
            {
                name: 'Alex Wilson',
                avatar: 'images/user3.jpg',
                rating: 5,
                text: 'Another great exchange! Would definitely trade with again.'
            },
            {
                name: 'Sarah Brown',
                avatar: 'images/user4.jpg',
                rating: 4,
                text: 'Very friendly and professional. Item was in great condition.'
            }
        ];

        newReviews.forEach(review => {
            reviewsSection.appendChild(createReviewElement(review));
        });

        page++;
    } catch (error) {
        console.error('Error loading more reviews:', error);
    }
}

// Lazy load more reviews when scrolling near bottom
const loadMoreThreshold = 100;
window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollHeight - scrollTop - clientHeight < loadMoreThreshold) {
        loadMoreReviews();
    }
}); 