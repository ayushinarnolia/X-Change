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
document.addEventListener('DOMContentLoaded', () => {
    const filterBtn = document.querySelector('.filter-btn');
    const categoryFilter = document.getElementById('category-filter');
    const conditionFilter = document.getElementById('condition-filter');
    const listingCards = document.querySelectorAll('.listing-card');

    // Function to filter listings
    function filterListings() {
        const selectedCategory = categoryFilter.value.toLowerCase();
        const selectedCondition = conditionFilter.value.toLowerCase();

        listingCards.forEach(card => {
            const cardCategory = card.querySelector('p:nth-of-type(1)').textContent.split(': ')[1].toLowerCase();
            const cardCondition = card.querySelector('p:nth-of-type(2)').textContent.split(': ')[1].toLowerCase();
            
            const categoryMatch = selectedCategory === 'all' || cardCategory === selectedCategory;
            const conditionMatch = selectedCondition === 'all' || cardCondition === selectedCondition;
            
            if (categoryMatch && conditionMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Event listener for filter button
    filterBtn.addEventListener('click', filterListings);

    // Add event listeners for immediate filtering when options change
    categoryFilter.addEventListener('change', filterListings);
    conditionFilter.addEventListener('change', filterListings);
});