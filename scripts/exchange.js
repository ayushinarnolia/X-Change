// JavaScript to handle sidebar toggle
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('close-btn');
const overlay = document.createElement('div');
overlay.classList.add('overlay');
document.body.appendChild(overlay);

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

// JavaScript for Exchange Page
// Handle search functionality
const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search-bar input');

searchBtn.addEventListener('click', () => {
    const query = searchInput.value;
    alert(`Searching for: ${query}`);
    // Add search logic here
});