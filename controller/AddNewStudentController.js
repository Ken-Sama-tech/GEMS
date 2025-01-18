import MakeServerRequest from "../services/js/ServerRequests";

document.addEventListener('DOMContentLoaded', function () {

    const submitBtnOfAddNewStudentForm = document.getElementById('submit-new-std-info');

    submitBtnOfAddNewStudentForm.addEventListener('click', function (e) {
        const newStudentForm = document.getElementById('add-std-form');
        e.preventDefault();
        if (!newStudentForm.checkValidity()) {
            newStudentForm.classList.add('was-validated');

        } else {
            const formData = new FormData(newStudentForm);

            const serverReq = new MakeServerRequest('../../services/php/SendNewStdForm.php', formData);

            serverReq.sendData(function () {
                console.log(serverReq.data);
            });
        }
    });
});