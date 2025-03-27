// Toggle Sidebar
const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebar-toggle");
const closeBtn = document.getElementById("close-btn");
const mainContent = document.getElementById("main-content");

sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    mainContent.style.marginLeft = sidebar.classList.contains("active") ? "250px" : "0";
});

closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("active");
    mainContent.style.marginLeft = "0";
});

// Check if user is logged in
document.addEventListener('DOMContentLoaded', function() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    if (!userData) {
        // If no user data, redirect to login
        window.location.href = 'login.html';
        return;
    }

    // Update welcome message with username
    const welcomeMessage = document.querySelector('.welcome-message');
    if (welcomeMessage) {
        welcomeMessage.textContent = `Welcome, ${userData.username}!`;
    }

    // Update profile information
    const usernameDisplay = document.getElementById('username-display');
    const emailDisplay = document.getElementById('email-display');
    
    if (usernameDisplay) {
        usernameDisplay.textContent = userData.username;
    }
    
    if (emailDisplay) {
        emailDisplay.textContent = userData.email;
    }
});