import MakeServerRequest from "../services/js/ServerRequests";
import {
    Selector,
    EventListener,
    ClassList,
    SetAttribute
} from "../includes/utils/js/domHelper";


document.addEventListener('DOMContentLoaded', () => {

    const selector = new Selector();
    const eventListener = new EventListener();
    const useClassList = new ClassList();
    const setAttr = new SetAttribute();

    // ---------------- ---------------- ---------------- ---------------- --------------- --------------- 

    class AddEditDel {

        AddForm(url, form) {
            const modal = new bootstrap.Modal(selector.getElemById(document, 'staticBackdrop'));
            const modalText = selector.getElemById(document, 'staticModalBody');
            const okayBtn = selector.getElemById(document, 'promtOkayButton');
            const formData = new FormData(form);
            const serverReq = new MakeServerRequest(url, formData);

            if (!form.checkValidity()) {
                useClassList.addClassList(form, 'was-validated');

            } else {

                serverReq.sendDataForm(() => {
                    if (serverReq.data.success) {

                        modal.show();
                        setAttr.setClass(modalText, 'text-success');
                        modalText.textContent = serverReq.data.success;

                        eventListener.callEvent(okayBtn, 'click', () => {

                            modal.hide();
                            window.location.reload();

                        });

                    } else {

                        modal.show();
                        setAttr.setClass(modalText, 'text-danger');
                        modalText.textContent = serverReq.data.error;

                        eventListener.callEvent(okayBtn, 'click', () => {
                            modal.hide();
                        });
                    }
                });
            }
        }

        editedForm(url, form) {
            const serverReq = new MakeServerRequest(url, form);

            const formData = new FormData(form);

            serverReq.sendDataForm(url, formData);
        }
    }

    const addEdDel = new AddEditDel();

    const submitBtn = selector.getElemById(document, 'submit-new-std-info');

    eventListener.callEvent(submitBtn, 'click', (e) => {
        e.preventDefault();

        const form = selector.getElemById(document, 'add-std-form');
        addEdDel.AddForm('../../services/php/SendNewStdForm.php', form);

    });


    const proceedEditBtn = selector.getElemById(document, 'yes');

    if (proceedEditBtn) {
        setAttr.setCusAttr(proceedEditBtn, 'data-bs-toggle', 'modal');
        setAttr.setCusAttr(proceedEditBtn, 'data-bs-target', '#edit-std-modal');
    }

    // eventListener.callEvent(proceedEditBtn, 'click', () => {
    //     const stdLrn = selector.getElemById(document, 'custom-modal-text').getAttribute('value');
    //     const reqData = new MakeServerRequest('../../services/php/CheckStdDataBfrEdit.php', 'lrn=' + encodeURIComponent(stdLrn));

    //     reqData.sendData(() => {

    //         //student data
    //         const lrn = selector.getElemById(document, 'edit-lrn');
    //         const lastName = selector.getElemById(document, 'edit-last_name');
    //         const firstName = selector.getElemById(document, 'edit-first_name');
    //         const middleName = selector.getElemById(document, 'edit-middle_name');
    //         const extensionName = selector.getElemById(document, 'edit-extension_name');
    //         const bDate = selector.getElemById(document, 'edit-bdate');
    //         const sex = selector.getElemById(document, 'edit-sex');
    //         const phoneNumber = selector.getElemById(document, 'edit-phoneNumber');
    //         const email = selector.getElemById(document, 'edit-email');
    //         const status = selector.getElemById(document, 'edit-civilStatus');
    //         const current_address = selector.getElemById(document, 'edit-current_address');
    //         const permanent_address = selector.getElemById(document, 'edit-permanent_address');
    //         const religion = selector.getElemById(document, 'edit-religion');
    //         const nationality = selector.getElemById(document, 'edit-nationality');
    //         const fatherLastName = selector.getElemById(document, 'edit-fatherLastName');
    //         const fatherFirstName = selector.getElemById(document, 'edit-fatherFirstName');
    //         const fatherMiddleName = selector.getElemById(document, 'edit-fatherMiddleName');
    //         const fatherExtensionName = selector.getElemById(document, 'edit-fatherExtensionName');
    //         const fatherPhoneNumber = selector.getElemById(document, 'edit-fatherPhoneNumber');
    //         const motherLastName = selector.getElemById(document, 'edit-motherLastName');
    //         const motherFirstName = selector.getElemById(document, 'edit-motherFirstName');
    //         const motherMiddleName = selector.getElemById(document, 'edit-motherMiddleName');
    //         const motherMaidenName = selector.getElemById(document, 'edit-motherMaidenName');
    //         const motherPhoneNumber = selector.getElemById(document, 'edit-motherPhoneNumber');
    //         const guardianLastName = selector.getElemById(document, 'edit-guardianLastName');
    //         const guardianFirstName = selector.getElemById(document, 'edit-guardianFirstName');
    //         const guardianMiddleName = selector.getElemById(document, 'edit-guardianMiddleName');
    //         const guardianExtensionName = selector.getElemById(document, 'edit-guardianExtensionName');
    //         const guardianPhoneNumber = selector.getElemById(document, 'edit-guardianPhoneNumber');

    //         //set value 

    //         const data = reqData.data;

    //         lrn.value = data.learnerReferenceNumber;
    //         lastName.value = data.lastName;
    //         firstName.value = data.firstName;
    //         middleName.value = data.middleName;
    //         extensionName.value = data.extensionName;
    //         bDate.value = data.birthDate;
    //         sex.value = data.sex; //Yes!! 3x a day hahhahaha. Can do more that that though
    //         phoneNumber.value = data.phoneNumber;
    //         email.value = data.email;
    //         status.value = data.civilStatus;
    //         current_address.value = data.current_address;
    //         permanent_address.value = data.permanent_address;
    //         religion.value = data.religion;
    //         nationality.value = data.nationality;
    //         fatherLastName.value = data.fatherLastName;
    //         fatherFirstName.value = data.fatherFirstName;
    //         fatherMiddleName.value = data.fatherMiddleName;
    //         fatherExtensionName.value = data.fatherExtensionName;
    //         fatherPhoneNumber.value = data.fatherPhoneNumber;
    //         motherLastName.value = data.motherLastName;
    //         motherFirstName.value = data.motherFirstName;
    //         motherMiddleName.value = data.motherMiddleName;
    //         motherMaidenName.value = data.motherMaidenName;
    //         motherPhoneNumber.value = data.motherPhoneNumber;
    //         guardianLastName.value = data.guardianLastName;
    //         guardianFirstName.value = data.guardianFirstName;
    //         guardianMiddleName.value = data.guardianMiddleName;
    //         guardianExtensionName.value = data.guardianExtensionName;
    //         guardianPhoneNumber.value = data.guardianPhoneNumber;
    //     });
    // });

    const saveBtn = selector.getElemById(document, 'save-btn');

    eventListener.addEventListener(saveBtn, 'click', () => {

        const form = selector.getElemById(document, 'edit-student');

        addEdDel.editedForm('../../services/php/EditStudentData.php', form);
    });
});