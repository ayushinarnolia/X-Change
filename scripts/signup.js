document.getElementById("signup-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting by default

    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
    }

    // Store user data (for now, we'll use localStorage)
    let user = {
        username: username,
        email: email,
        password: password
    };

    localStorage.setItem("user", JSON.stringify(user));
    alert("Signup successful! Redirecting to login...");
    window.location.href = "login.html";
});
