const form = document.getElementById('login-form');
const loginBtn = document.getElementById('log-in');

// loginBtn.addEventListener('click', e => {
//     e.preventDefault();
// });

form.addEventListener('submit', (e) => {
    if (!form.checkValidity()) {
        e.preventDefault();
        form.classList.add('was-validated');
    }
});