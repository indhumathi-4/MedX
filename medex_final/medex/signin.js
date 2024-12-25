// function sign() {
//     var emaill = document.getElementById("email").value
//     var passwordd = document.getElementById("pass").value
//     var names = "abcd@gmail.com"
//     var pass = "123456"
//     if (emaill == names && passwordd == pass) {
//         window.location.href = "index.html";
//     }
//     else {
//         window.alert("Entered is invalid");
//     }

// }
// document.getElementById('signupForm').addEventListener('submit', function(event) {
//         event.preventDefault();
//         
//         const username = document.getElementById('username').value;
//         const email = document.getElementById('email').value;
//         const password = document.getElementById('password').value;
//         const confirmPassword = document.getElementById('confirmPassword').value;
//         
//         if (password !== confirmPassword) {
//             alert('Passwords do not match!');
//             return;
//         }
//         
//         alert('Sign-up successful!');
//         window.location.href = 'first.html';  // Redirect to first.html after successful signup
//     });
function sign() {
        const email = document.getElementById("email").value;
        const password = document.getElementById("pass").value;
    
        // Mock credentials (replace with server-side authentication)
        const validEmail = "abcd@gmail.com";
        const validPassword = "123456";
    
        if (email === validEmail && password === validPassword) {
            window.location.href = "basic.html";  // Redirect to the homepage on successful login
        } else {
            alert("Invalid credentials. Please try again.");
        }
    }
    