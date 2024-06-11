// login.js
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the username and password from the form
        const username = loginForm.elements['username'].value;
        const password = loginForm.elements['password'].value;

        // Perform your login logic here
        // For demonstration, let's just log the username and password
        console.log('Username:', username);
        console.log('Password:', password);

        window.location.href = "index.php";
    });
});
