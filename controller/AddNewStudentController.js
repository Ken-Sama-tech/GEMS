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

    // ---------------- ----------------


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

                serverReq.sendData(() => {
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
    }

    const addEdDel = new AddEditDel();

    const submitBtn = selector.getElemById(document, 'submit-new-std-info');

    eventListener.callEvent(submitBtn, 'click', (e) => {
        e.preventDefault();

        const form = selector.getElemById(document, 'add-std-form');
        const formData = new FormData(form);
        addEdDel.AddForm('../../services/php/SendNewStdForm.php', form);

    });
});