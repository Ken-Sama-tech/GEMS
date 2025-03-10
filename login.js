const form = document.getElementById('login-form');
const loginBtn = document.getElementById('log-in');

form.addEventListener('submit', (e) => {
    if (!form.checkValidity()) {
        e.preventDefault();
        form.classList.add('was-validated');
    }
});

