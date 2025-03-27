// DOM Elements
const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.querySelector('.sidebar-toggle');
const closeBtn = document.querySelector('.close-btn');
const mainContent = document.querySelector('.main-content');

// Sidebar Toggle
sidebarToggle.addEventListener('click', () => {
    sidebar.classList.add('active');
    mainContent.style.marginLeft = '250px';
});

closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
    mainContent.style.marginLeft = '0';
});

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target) && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        mainContent.style.marginLeft = '0';
    }
}); 