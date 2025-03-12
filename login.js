const form = document.getElementById('login-form');

const login = async (url, formData, callback) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            redirect: 'follow'
        });

        if (!response.ok) {
            throw new Error(`Network status: ${response.status} ${response.statusText}`)
        }

        const data = await response.json();

        if (callback)
            callback(data);

    } catch (error) {
        console.error(error.message)
    }
}

form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }

    const formData = new FormData(form);
    login('index.php', formData, response => {
        if (response.error) {
            const error = document.getElementById('error');
            error.innerHTML = `
                <div class="alert alert-danger d-flex align-items-center" role="alert">
                    <i class="bi bi-exclamation-triangle-fill me-2"></i>
                    <div>
                        <b>${response.error}</b>
                    </div>
                </div>
            `;
        }
        if (response.success)
            window.location.href = 'views/main/dashboard.php';
    });
});