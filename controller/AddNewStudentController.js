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
            const serverReq = new MakeServerRequest(url, form);
            const modal = new bootstrap.Modal(selector.getElemById('staticBackdrop'));
            const modalText = selector.getElemById('staticModalBody');
            const okayBtn = selector.getElemById('promtOkayButton');

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

    const submitBtn = selector.getElemById('submit-new-std-info');

    eventListener.callEvent(submitBtn, 'click', (e) => {
        e.preventDefault();

        const form = selector.getElemById('add-std-form');
        const formData = new FormData(form);
        addEdDel.AddForm('../../services/php/SendNewStdForm.php', formData);

    });
});