import MakeServerRequest from "../services/js/ServerRequests";
import {
    Selector,
    EventListener,
    ClassList,
    SetAttribute,
    GlobalEventListeners
} from "../includes/utils/js/domHelper";


document.addEventListener('DOMContentLoaded', () => {

    const sel = new Selector();
    const eventListener = new EventListener();
    const useClassList = new ClassList();
    const attr = new SetAttribute();
    const event = new GlobalEventListeners();

    // ---------------- ---------------- ---------------- ---------------- --------------- --------------- 

    class AddEditDel {

        AddForm(url, form) {
            const modal = new bootstrap.Modal(sel.getElemById(document, 'staticBackdrop'));
            const modalText = sel.getElemById(document, 'staticModalBody');
            const okayBtn = sel.getElemById(document, 'promtOkayButton');
            const formData = new FormData(form);
            const serverReq = new MakeServerRequest(url, formData);

            if (!form.checkValidity()) {
                useClassList.addClassList(form, 'was-validated');

            } else {

                serverReq.sendDataForm(() => {
                    if (serverReq.data.success) {

                        modal.show();
                        attr.setClass(modalText, 'text-success');
                        modalText.textContent = serverReq.data.success;

                        eventListener.callEvent(okayBtn, 'click', () => {

                            modal.hide();
                            window.location.reload();

                        });

                    } else {

                        modal.show();
                        attr.setClass(modalText, 'text-danger');
                        modalText.textContent = serverReq.data.error;

                        eventListener.callEvent(okayBtn, 'click', () => {
                            modal.hide();
                        });
                    }
                });
            }
        }

        editForm(url, form) {
            const modal = new bootstrap.Modal(sel.getElemById(document, 'staticBackdrop'));
            const modalText = sel.getElemById(document, 'staticModalBody');
            const okayBtn = sel.getElemById(document, 'promtOkayButton');
            const formData = new FormData(form);

            const serverReq = new MakeServerRequest(url, formData);

            serverReq.sendDataForm(() => {
                if (serverReq.data.success) {
                    modal.show();
                    modalText.textContent = serverReq.data.success;
                    attr.setClass(modalText, 'text-success');

                    eventListener.callEvent(okayBtn, 'click', () => {
                        modal.hide();
                        window.location.reload();
                    });
                } else {
                    modal.show();
                    modalText.textContent = serverReq.data.error;
                    attr.setClass(modalText, 'text-danger');

                    eventListener.callEvent(okayBtn, 'click', () => {
                        modal.hide();
                    });
                }

            });
        }

        deleteStudent(url, lrn) {
            const modal = new bootstrap.Modal(sel.getElemById(document, 'staticBackdrop'));
            const modalText = sel.getElemById(document, 'staticModalBody');
            const serverReq = new MakeServerRequest(url, 'lrn=' + encodeURIComponent(lrn));
            const okayBtn = sel.getElemById(document, 'promtOkayButton');
            const closeBtn = sel.getElemById(document, 'promtCloseBtn');

            serverReq.sendData(() => {
                if (serverReq.data.success) {
                    modal.show();
                    modalText.textContent = serverReq.data.success;
                    attr.setClass(modalText, 'text-success');

                    eventListener.callEvent(okayBtn, 'click', () => {
                        modal.hide();
                        window.location.reload();
                    });

                    eventListener.callEvent(closeBtn, 'click', () => {
                        modal.hide();
                        window.location.reload();
                    });
                } else {
                    alert('basta may error');
                }
            });
        }
    }

    const addEdDel = new AddEditDel();

    //add new student data

    const submitBtn = sel.getElemById(document, 'submit-new-std-info');

    eventListener.callEvent(submitBtn, 'click', (e) => {
        e.preventDefault();

        const form = sel.getElemById(document, 'add-std-form');
        addEdDel.AddForm('../../services/php/SendNewStdForm.php', form);

    });

    //edit btn
    event.globalEvent('click', '#edtBtn', (e) => {
        const reqData = new MakeServerRequest('../../services/php/FetchAllDataOfStdUsingLrn.php', 'lrn=' + encodeURIComponent(e.target.value));

        reqData.sendData(() => {

            //student data
            const lrn = sel.getElemById(document, 'edit-lrn');
            const lastName = sel.getElemById(document, 'edit-last_name');
            const firstName = sel.getElemById(document, 'edit-first_name');
            const middleName = sel.getElemById(document, 'edit-middle_name');
            const extensionName = sel.getElemById(document, 'edit-extension_name');
            const bDate = sel.getElemById(document, 'edit-bdate');
            const sex = sel.getElemById(document, 'edit-sex');
            const phoneNumber = sel.getElemById(document, 'edit-phoneNumber');
            const email = sel.getElemById(document, 'edit-email');
            const status = sel.getElemById(document, 'edit-civilStatus');
            const current_address = sel.getElemById(document, 'edit-current_address');
            const permanent_address = sel.getElemById(document, 'edit-permanent_address');
            const religion = sel.getElemById(document, 'edit-religion');
            const nationality = sel.getElemById(document, 'edit-nationality');
            const fatherLastName = sel.getElemById(document, 'edit-fatherLastName');
            const fatherFirstName = sel.getElemById(document, 'edit-fatherFirstName');
            const fatherMiddleName = sel.getElemById(document, 'edit-fatherMiddleName');
            const fatherExtensionName = sel.getElemById(document, 'edit-fatherExtensionName');
            const fatherPhoneNumber = sel.getElemById(document, 'edit-fatherPhoneNumber');
            const motherLastName = sel.getElemById(document, 'edit-motherLastName');
            const motherFirstName = sel.getElemById(document, 'edit-motherFirstName');
            const motherMiddleName = sel.getElemById(document, 'edit-motherMiddleName');
            const motherMaidenName = sel.getElemById(document, 'edit-motherMaidenName');
            const motherPhoneNumber = sel.getElemById(document, 'edit-motherPhoneNumber');
            const guardianLastName = sel.getElemById(document, 'edit-guardianLastName');
            const guardianFirstName = sel.getElemById(document, 'edit-guardianFirstName');
            const guardianMiddleName = sel.getElemById(document, 'edit-guardianMiddleName');
            const guardianExtensionName = sel.getElemById(document, 'edit-guardianExtensionName');
            const guardianPhoneNumber = sel.getElemById(document, 'edit-guardianPhoneNumber');

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
    const saveBtn = sel.getElemById(document, 'save-btn');

    eventListener.addEventListener(saveBtn, 'click', (e) => {
        e.preventDefault();
        const form = sel.getElemById(document, 'edit-student');

        addEdDel.editForm('../../services/php/EditStudentData.php', form);
    });

    //delete btn
    event.globalEvent('click', '#dltBtn', e => {

        const yesBtn = sel.getElemById(document, 'yes');
        useClassList.addClassList(yesBtn, 'btn-danger');

        attr.setCusAttr(yesBtn, 'act', 'del-std');

        const modalText = sel.getElemById(document, 'custom-modal-text');
        modalText.textContent = `Delete student with LRN: ${e.target.value}?`;

        const yesBtnAction = attr.getAttr(yesBtn, 'act');

        if (yesBtnAction == 'del-std') {
            eventListener.callEvent(yesBtn, 'click', () => {
                useClassList.remClassList(yesBtn, 'btn-danger');

                const lrn = e.target.value;
                addEdDel.deleteStudent('../../services/php/DeleteStudentData.php', lrn);
            });
        }
    });
});