// JavaScript to handle sidebar toggle
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

// Filter functionality
const statusFilter = document.getElementById('status-filter');
const categoryFilter = document.getElementById('category-filter');
const listingsGrid = document.getElementById('listings-grid');

// Sample listings data (replace with actual data from backend)
const listings = [
    {
        id: 1,
        title: 'Watch',
        category: 'Accessories',
        description: 'Excellent condition luxury watch. Looking to exchange for other accessories or electronics.',
        status: 'completed',
        image: 'images/watch.jpg'
    },
    {
        id: 2,
        title: 'T-Shirt',
        category: 'Clothing',
        description: 'Brand new designer t-shirt. Open to exchange for other clothing items.',
        status: 'active',
        image: 'images/tshirt.webp'
    },
    {
        id: 3,
        title: 'Shoes',
        category: 'Footwear',
        description: 'Used but well-maintained shoes. Looking for similar footwear in different style.',
        status: 'pending',
        image: 'images/shoes.jpg'
    }
    // Add more listings as needed
];

// Function to filter listings
function filterListings() {
    const selectedStatus = statusFilter.value;
    const selectedCategory = categoryFilter.value;

    const filteredListings = listings.filter(listing => {
        const statusMatch = selectedStatus === 'all' || listing.status === selectedStatus;
        const categoryMatch = selectedCategory === 'all' || listing.category.toLowerCase() === selectedCategory;
        return statusMatch && categoryMatch;
    });

    displayListings(filteredListings);
}

// Function to display listings
function displayListings(listingsToShow) {
    listingsGrid.innerHTML = '';

    listingsToShow.forEach(listing => {
        const listingCard = createListingCard(listing);
        listingsGrid.appendChild(listingCard);
    });

    // Show message if no listings match the filters
    if (listingsToShow.length === 0) {
        listingsGrid.innerHTML = `
            <div class="no-listings">
                <p>No listings found matching your filters.</p>
            </div>
        `;
    }
}

// Function to create a listing card
function createListingCard(listing) {
    const card = document.createElement('div');
    card.className = 'listing-card';
    card.innerHTML = `
        <div class="listing-image">
            <img src="${listing.image}" alt="${listing.title}">
            <span class="status-badge ${listing.status}">${listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}</span>
        </div>
        <div class="listing-details">
            <h3>${listing.title}</h3>
            <p class="category">${listing.category}</p>
            <p class="description">${listing.description}</p>
            <div class="listing-actions">
                <button class="edit-btn" onclick="editListing(${listing.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="delete-btn" onclick="deleteListing(${listing.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `;
    return card;
}

// Function to edit a listing
function editListing(listingId) {
    // Redirect to edit listing page with the listing ID
    window.location.href = `edit-listing.html?id=${listingId}`;
}

// Function to delete a listing
function deleteListing(listingId) {
    if (confirm('Are you sure you want to delete this listing? This action cannot be undone.')) {
        // Here you would typically make an API call to delete the listing
        // For now, we'll just remove it from the DOM
        const listingCard = document.querySelector(`[data-listing-id="${listingId}"]`);
        if (listingCard) {
            listingCard.remove();
        }
        
        // Show success message
        alert('Listing deleted successfully!');
    }
}

// Add event listeners for filters
statusFilter.addEventListener('change', filterListings);
categoryFilter.addEventListener('change', filterListings);

// Initialize the listings display
displayListings(listings);

// Pagination functionality
const pageButtons = document.querySelectorAll('.page-btn');
let currentPage = 1;

pageButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.disabled) return;

        // Remove active class from all buttons
        pageButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');

        // Update current page
        if (button.querySelector('.fa-chevron-left')) {
            currentPage = Math.max(1, currentPage - 1);
        } else if (button.querySelector('.fa-chevron-right')) {
            currentPage++;
        } else {
            currentPage = parseInt(button.textContent);
        }

        // Update pagination buttons
        updatePaginationButtons();

        // Here you would typically fetch new data for the current page
        // For now, we'll just log the current page
        console.log(`Loading page ${currentPage}`);
    });
});

// Function to update pagination buttons
function updatePaginationButtons() {
    const totalPages = 3; // Replace with actual total pages from backend

    // Update previous button
    pageButtons[0].disabled = currentPage === 1;

    // Update next button
    pageButtons[pageButtons.length - 1].disabled = currentPage === totalPages;

    // Update number buttons
    for (let i = 1; i < pageButtons.length - 1; i++) {
        pageButtons[i].classList.toggle('active', i === currentPage);
    }
} 