// Sidebar Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const closeBtn = document.getElementById('close-btn');
    const mainContent = document.getElementById('main-content');

    // Toggle sidebar
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.add('active');
        mainContent.style.marginLeft = '250px';
    });

    // Close sidebar
    closeBtn.addEventListener('click', function() {
        sidebar.classList.remove('active');
        mainContent.style.marginLeft = '0';
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', function(event) {
        if (!sidebar.contains(event.target) && !sidebarToggle.contains(event.target)) {
            sidebar.classList.remove('active');
            mainContent.style.marginLeft = '0';
        }
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Basic validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });

    // Add input validation feedback
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = '#ff4444';
            } else {
                this.style.borderColor = '#ddd';
            }
        });
    });
}); 