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

// Form handling
const createListingForm = document.getElementById('create-listing-form');
const cancelBtn = document.querySelector('.cancel-btn');

// Handle form submission
createListingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(createListingForm);
    const listingData = {
        itemName: formData.get('item-name'),
        category: formData.get('category'),
        description: formData.get('description'),
        condition: formData.get('condition'),
        preferredExchange: formData.get('preferred-exchange'),
        location: formData.get('location'),
        images: formData.getAll('images')
    };

    try {
        // Here you would typically send the data to your backend
        // For now, we'll just log it and show a success message
        console.log('Listing Data:', listingData);
        
        // Show success message
        alert('Listing created successfully!');
        
        // Redirect to my-listings page
        window.location.href = 'my-listings.html';
    } catch (error) {
        console.error('Error creating listing:', error);
        alert('Error creating listing. Please try again.');
    }
});

// Handle cancel button
cancelBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to cancel? All entered data will be lost.')) {
        window.location.href = 'dashboard.html';
    }
});

// Image preview functionality
const imageInput = document.getElementById('images');
const imagePreviewContainer = document.createElement('div');
imagePreviewContainer.className = 'image-preview-container';
createListingForm.insertBefore(imagePreviewContainer, imageInput);

imageInput.addEventListener('change', (e) => {
    // Clear previous previews
    imagePreviewContainer.innerHTML = '';
    
    // Create preview for each selected image
    Array.from(e.target.files).forEach(file => {
        const reader = new FileReader();
        const preview = document.createElement('div');
        preview.className = 'image-preview';
        
        reader.onload = (e) => {
            preview.innerHTML = `
                <img src="${e.target.result}" alt="Preview">
                <button type="button" class="remove-image">&times;</button>
            `;
            
            // Add remove functionality
            preview.querySelector('.remove-image').addEventListener('click', () => {
                preview.remove();
                // Create a new FileList without the removed image
                const dt = new DataTransfer();
                const { files } = imageInput;
                for (let i = 0; i < files.length; i++) {
                    if (i !== Array.from(imagePreviewContainer.children).indexOf(preview)) {
                        dt.items.add(files[i]);
                    }
                }
                imageInput.files = dt.files;
            });
        };
        
        reader.readAsDataURL(file);
        imagePreviewContainer.appendChild(preview);
    });
}); 