document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form from submitting

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Password confirmation check
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;  // Stop the form from proceeding
    }

    // Basic validation passed
    alert('Sign-up successful!');
    window.location.href = 'first.html';  // Redirect after successful sign-up
});
