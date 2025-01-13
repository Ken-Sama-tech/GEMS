//services
import AsyncServerRequest from '../services/AsyncServerRequest';

document.addEventListener('DOMContentLoaded', function () {

    // Submit The Form of New Student to Server
    const submitNewStudentFormBtn = document.getElementById('submit-new-std-info');

    submitNewStudentFormBtn.addEventListener('click', function (e) {
        const form = document.getElementById('add-std-form');

        if (!form.checkValidity()) {
            e.preventDefault();
            form.classList.add('was-validated');
        } else {
            const formData = new FormData(form);
            const newStudentData = new AsyncServerRequest('../../controller/sendNewStdForm.php', formData);
            newStudentData.sendData();
        }
    });
});