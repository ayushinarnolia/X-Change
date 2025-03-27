document.getElementById("forgotPasswordForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let email = document.getElementById("email").value.trim();
    
    if (email === "") {
        alert("Please enter your email.");
        return;
    }

    // Simulating an email reset request (Replace with backend API call)
    alert("A password reset link has been sent to " + email);
    document.getElementById("forgotPasswordForm").reset();
});
