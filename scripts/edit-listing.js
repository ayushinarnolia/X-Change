// Sidebar Toggle Functionality
const sidebarToggle = document.querySelector('.sidebar-toggle');
const closeSidebarBtn = document.querySelector('.close-sidebar');
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');

// Create overlay for mobile
const overlay = document.createElement('div');
overlay.className = 'sidebar-overlay';
overlay.style.display = 'none';
document.body.appendChild(overlay);

// Toggle sidebar
function toggleSidebar() {
    sidebar.classList.toggle('show');
    overlay.style.display = sidebar.classList.contains('show') ? 'block' : 'none';
    mainContent.style.marginLeft = sidebar.classList.contains('show') ? '250px' : '0';
}

sidebarToggle.addEventListener('click', toggleSidebar);
closeSidebarBtn.addEventListener('click', toggleSidebar);

// Close sidebar when clicking overlay
overlay.addEventListener('click', toggleSidebar);

// Form Handling
const editListingForm = document.getElementById('editListingForm');
const imageInput = document.getElementById('images');
const imagePreviewContainer = document.querySelector('.image-preview-container');

// Handle form submission
editListingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        // Get form data
        const formData = new FormData(editListingForm);
        const listingData = {
            itemName: formData.get('itemName'),
            category: formData.get('category'),
            description: formData.get('description'),
            condition: formData.get('condition'),
            preferredExchange: formData.get('preferredExchange'),
            location: formData.get('location'),
            status: formData.get('status')
        };

        // Log the data (replace with actual API call)
        console.log('Updating listing:', listingData);
        
        // Show success message
        alert('Listing updated successfully!');
        
        // Redirect to my listings page
        window.location.href = 'my-listings.html';
    } catch (error) {
        console.error('Error updating listing:', error);
        alert('Failed to update listing. Please try again.');
    }
});

// Handle image preview
imageInput.addEventListener('change', (e) => {
    const files = e.target.files;
    
    for (let file of files) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                const imagePreview = document.createElement('div');
                imagePreview.className = 'image-preview';
                
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = 'Preview image';
                
                const removeBtn = document.createElement('button');
                removeBtn.className = 'remove-image';
                removeBtn.innerHTML = '<i class="fas fa-times"></i>';
                removeBtn.onclick = () => imagePreview.remove();
                
                imagePreview.appendChild(img);
                imagePreview.appendChild(removeBtn);
                imagePreviewContainer.appendChild(imagePreview);
            };
            
            reader.readAsDataURL(file);
        }
    }
});

// Handle remove image buttons
document.querySelectorAll('.remove-image').forEach(button => {
    button.addEventListener('click', () => {
        button.closest('.image-preview').remove();
    });
});

// Handle cancel button
const cancelBtn = document.querySelector('.cancel-btn');
cancelBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
        window.location.href = 'my-listings.html';
    }
});

// Add overlay styles
const style = document.createElement('style');
style.textContent = `
    .sidebar-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 999;
        display: none;
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', function() {
    // Sidebar Toggle Functionality
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const closeBtn = document.getElementById('close-btn');
    const mainContent = document.getElementById('main-content');

    // Open sidebar
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.add('active');
        mainContent.classList.add('shifted');
    });

    // Close sidebar
    closeBtn.addEventListener('click', function() {
        sidebar.classList.remove('active');
        mainContent.classList.remove('shifted');
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', function(event) {
        if (!sidebar.contains(event.target) && !sidebarToggle.contains(event.target)) {
            sidebar.classList.remove('active');
            mainContent.classList.remove('shifted');
        }
    });

    // Form submission handling
    const form = document.querySelector('form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        alert('Listing updated successfully!');
    });
}); 