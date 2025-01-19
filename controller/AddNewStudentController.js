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
                if (serverReq.data.success) {

                    const promtModal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
                    promtModal.show();

                    const modalBody = document.querySelector('#staticModalBody');
                    modalBody.setAttribute('class', 'text-success');
                    modalBody.textContent = serverReq.data.success;

                    document.getElementById('promtOkayButton').addEventListener('click', () => {
                        promtModal.hide();
                        window.location.reload();
                    });

                } else {
                    const promtModal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
                    promtModal.show();

                    const modalBody = document.querySelector('#staticModalBody');
                    modalBody.setAttribute('class', 'text-danger');
                    modalBody.textContent = serverReq.data.error;

                    document.getElementById('promtOkayButton').addEventListener('click', () => {
                        promtModal.hide();
                    });
                }
            });
        }
    });

    // ---------------- ----------------
    const search = document.getElementById('search-std-to-edit');

    search.addEventListener('input', function () {
        const tpl = document.getElementById('edit-student-td-template');

        const cloneTplChild = tpl.content.cloneNode(true);

        cloneTplChild.querySelectorAll('td').forEach((td, i) => {

        })
    });
});