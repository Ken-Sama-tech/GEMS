import MakeServerRequest from "../services/js/ServerRequests";
import {
    EventListener,
    GlobalEventListeners
} from "../includes/utils/js/domHelper";


document.addEventListener('DOMContentLoaded', () => {

    const eventListener = new EventListener();
    const event = new GlobalEventListeners();

    // ---------------- ---------------- ---------------- ---------------- --------------- --------------- 

    const lrn = document.getElementById('lrn');
    const maxLrn = 12;

    eventListener.callEvent(lrn, 'input', () => {
        const checkLrnIfLongEnough = (() => {

            if (lrn.value.length == maxLrn) {
                lrn.classList.add('is-valid');
                lrn.classList.remove('is-invalid')
            }

            if (lrn.value.length < maxLrn) {
                lrn.classList.add('is-invalid');
            }

            if (lrn.value.length > maxLrn) {
                lrn.value = lrn.value.slice(0, maxLrn);
            }

        })();
    });

    class AddEditDel {

        AddForm(url, form) {
            const modal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
            const modalText = document.getElementById('staticModalBody');
            const okayBtn = document.getElementById('promtOkayButton');
            const formData = new FormData(form);
            const serverReq = new MakeServerRequest(url, formData);

            if (!form.checkValidity()) {

                form.classList.add('was-validated');

            } else {

                serverReq.sendDataForm(() => {
                    if (serverReq.data.success) {

                        modal.show();
                        modalText.setAttribute('class', 'text-success');
                        modalText.textContent = serverReq.data.success;

                        eventListener.callEvent(okayBtn, 'click', () => {

                            modal.hide();
                            window.location.reload();

                        });

                    } else {

                        modal.show();
                        modalText.setAttribute('class', 'text-danger');
                        modalText.textContent = serverReq.data.error;

                        eventListener.callEvent(okayBtn, 'click', () => {
                            modal.hide();
                        });
                    }
                });
            }
        }

        editForm(url, form) {
            const modal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
            const modalText = document.getElementById('staticModalBody');
            const okayBtn = document.getElementById('promtOkayButton');
            const formData = new FormData(form);

            const serverReq = new MakeServerRequest(url, formData);

            if (!form.checkValidity()) {
                form.classList.add('was-validated');
            } else {

                serverReq.sendDataForm(() => {
                    if (serverReq.data.success) {
                        modal.show();
                        modalText.textContent = serverReq.data.success;
                        modalText.setAttribute('class', 'text-success')

                        eventListener.callEvent(okayBtn, 'click', () => {
                            modal.hide();
                            window.location.reload();
                        });
                    } else {
                        modal.show();
                        modalText.textContent = serverReq.data.error;
                        modalText.setAttribute('class', 'text-danger')

                        eventListener.callEvent(okayBtn, 'click', () => {
                            modal.hide();
                        });
                    }

                });

            }
        }

        deleteStudent(url, lrn) {
            const modal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
            const modalText = document.getElementById('staticModalBody');
            const serverReq = new MakeServerRequest(url, 'lrn=' + encodeURIComponent(lrn));
            const okayBtn = document.getElementById('promtOkayButton');
            const closeBtn = document.getElementById('promtCloseBtn');

            serverReq.sendData(() => {
                if (serverReq.data.success) {
                    modal.show();
                    modalText.textContent = serverReq.data.success;
                    modalText.setAttribute('class', 'text-success');

                    eventListener.callEvent(okayBtn, 'click', () => {
                        modal.hide();
                        window.location.reload();
                    });

                    eventListener.callEvent(closeBtn, 'click', () => {
                        modal.hide();
                        window.location.reload();
                    });
                }
            });
        }
    }

    const addEdDel = new AddEditDel();

    //add new student data

    const submitBtn = document.getElementById('submit-new-std-info');

    //submit
    eventListener.callEvent(submitBtn, 'click', (e) => {
        e.preventDefault();

        try {

            if (lrn.value.length !== maxLrn) {
                throw new Error('LRN length should be twelve');
            }

            const form = document.getElementById('add-std-form');
            addEdDel.AddForm('../../services/php/SendNewStdForm.php', form);

        } catch (error) {
            console.error('Error: ' + error.message);
        }



    });

    //edit btn
    event.globalEvent('click', '#edt-btn', (e) => {
        const reqData = new MakeServerRequest('../../services/php/FetchAllDataOfStdUsingLrn.php', 'lrn=' + encodeURIComponent(e.target.value));

        reqData.sendData(() => {

            //student data
            const lrn = document.getElementById('edit-lrn');
            const lastName = document.getElementById('edit-last_name');
            const firstName = document.getElementById('edit-first_name');
            const middleName = document.getElementById('edit-middle_name');
            const extensionName = document.getElementById('edit-extension_name');
            const bDate = document.getElementById('edit-bdate');
            const sex = document.getElementById('edit-sex');
            const phoneNumber = document.getElementById('edit-phoneNumber');
            const email = document.getElementById('edit-email');
            const status = document.getElementById('edit-civilStatus');
            const current_address = document.getElementById('edit-current_address');
            const permanent_address = document.getElementById('edit-permanent_address');
            const religion = document.getElementById('edit-religion');
            const nationality = document.getElementById('edit-nationality');
            const fatherLastName = document.getElementById('edit-fatherLastName');
            const fatherFirstName = document.getElementById('edit-fatherFirstName');
            const fatherMiddleName = document.getElementById('edit-fatherMiddleName');
            const fatherExtensionName = document.getElementById('edit-fatherExtensionName');
            const fatherPhoneNumber = document.getElementById('edit-fatherPhoneNumber');
            const motherLastName = document.getElementById('edit-motherLastName');
            const motherFirstName = document.getElementById('edit-motherFirstName');
            const motherMiddleName = document.getElementById('edit-motherMiddleName');
            const motherMaidenName = document.getElementById('edit-motherMaidenName');
            const motherPhoneNumber = document.getElementById('edit-motherPhoneNumber');
            const guardianLastName = document.getElementById('edit-guardianLastName');
            const guardianFirstName = document.getElementById('edit-guardianFirstName');
            const guardianMiddleName = document.getElementById('edit-guardianMiddleName');
            const guardianExtensionName = document.getElementById('edit-guardianExtensionName');
            const guardianPhoneNumber = document.getElementById('edit-guardianPhoneNumber');

            //set value 
            const data = reqData.data;

            lrn.value = data.learnerReferenceNumber;
            lastName.value = data.lastName;
            firstName.value = data.firstName;
            middleName.value = data.middleName;
            extensionName.value = data.extensionName;
            bDate.value = data.birthDate;
            sex.value = data.sex; //Yes!! 3x a day hahhahaha. Can do more that that though
            phoneNumber.value = data.phoneNumber;
            email.value = data.email;
            status.value = data.civilStatus;
            current_address.value = data.current_address;
            permanent_address.value = data.permanent_address;
            religion.value = data.religion;
            nationality.value = data.nationality;
            fatherLastName.value = data.fatherLastName;
            fatherFirstName.value = data.fatherFirstName;
            fatherMiddleName.value = data.fatherMiddleName;
            fatherExtensionName.value = data.fatherExtensionName;
            fatherPhoneNumber.value = data.fatherPhoneNumber;
            motherLastName.value = data.motherLastName;
            motherFirstName.value = data.motherFirstName;
            motherMiddleName.value = data.motherMiddleName;
            motherMaidenName.value = data.motherMaidenName;
            motherPhoneNumber.value = data.motherPhoneNumber;
            guardianLastName.value = data.guardianLastName;
            guardianFirstName.value = data.guardianFirstName;
            guardianMiddleName.value = data.guardianMiddleName;
            guardianExtensionName.value = data.guardianExtensionName;
            guardianPhoneNumber.value = data.guardianPhoneNumber;
        });
    });

    //this code right here save the changes you made when you edit a student data
    const saveBtn = document.getElementById('save-btn');

    eventListener.addEventListener(saveBtn, 'click', (e) => {
        e.preventDefault();
        const form = document.getElementById('edit-student');

        addEdDel.editForm('../../services/php/EditStudentData.php', form);
    });

    //delete btn
    event.globalEvent('click', '#dlt-btn', e => {

        const yesBtn = document.getElementById('yes');
        yesBtn.classList.add('btn-danger');

        yesBtn.setAttribute('act', 'del-std');

        const modalText = document.getElementById('custom-modal-text');
        modalText.textContent = `Delete student with LRN: ${e.target.value}?`;

        const yesBtnAction = yesBtn.getAttribute('act');

        if (yesBtnAction == 'del-std') {
            eventListener.callEvent(yesBtn, 'click', () => {
                yesBtn.classList.remove('btn-danger');

                const lrn = e.target.value;
                addEdDel.deleteStudent('../../services/php/DeleteStudentData.php', lrn);
            });
        }
    });
});