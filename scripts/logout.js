// Function to show logout confirmation popup
function showLogoutConfirmation() {
    // Create popup container
    const popup = document.createElement('div');
    popup.className = 'logout-popup';
    popup.innerHTML = `
        <div class="logout-popup-content">
            <h2>Logout Confirmation</h2>
            <p>Are you sure you want to logout?</p>
            <div class="logout-buttons">
                <button class="logout-yes-btn">Yes, Logout</button>
                <button class="logout-no-btn">No, Stay</button>
            </div>
        </div>
    `;

    // Add popup to body
    document.body.appendChild(popup);

    // Add event listeners to buttons
    const yesBtn = popup.querySelector('.logout-yes-btn');
    const noBtn = popup.querySelector('.logout-no-btn');

    yesBtn.addEventListener('click', () => {
        // Redirect to home page
        window.location.href = 'index.html';
    });

    noBtn.addEventListener('click', () => {
        // Remove popup
        popup.remove();
    });
}

// Add event listeners to all logout links
document.addEventListener('DOMContentLoaded', () => {
    const logoutLinks = document.querySelectorAll('a[href="logout.html"]');
    logoutLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showLogoutConfirmation();
        });
    });
}); 