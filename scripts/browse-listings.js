// JavaScript to handle sidebar toggle
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('close-btn');
const mainContent = document.getElementById('main-content'); // Added
const overlay = document.createElement('div');
overlay.classList.add('overlay');
document.body.appendChild(overlay);

// Toggle sidebar
sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    mainContent.style.marginLeft = sidebar.classList.contains('active') ? '250px' : '0'; // Added
});

// Close sidebar
closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    mainContent.style.marginLeft = '0'; // Added
});

// Close sidebar when clicking outside
overlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    mainContent.style.marginLeft = '0'; // Added
});

// JavaScript for Browse Listings Page
// Example: Handle filter functionality
const filterBtn = document.querySelector('.filter-btn');
const categoryFilter = document.getElementById('category-filter');
const conditionFilter = document.getElementById('condition-filter');

filterBtn.addEventListener('click', () => {
    const category = categoryFilter.value;
    const condition = conditionFilter.value;
    alert(`Applying Filters: Category - ${category}, Condition - ${condition}`);
    // Add filter logic here
});