import MakeServerRequest from "../services/js/ServerRequests";
import { Selector, EventListener, GlobalEventListeners, SetAttribute, Debounce } from "../includes/utils/js/domHelper";

// utility intances ------------------------------
const sel = new Selector();
const eventListener = new EventListener();
const event = new GlobalEventListeners();
const attr = new SetAttribute();
const dbnc = new Debounce();
// end -------------------------------------------

eventListener.addEventListener(document, 'DOMContentLoaded', () => {

    //local classes ------------------------------

    // end ---------------------------------------

    //global variables ---------------------------

    const uploadBtn = sel.getElemById(document, 'upload-btn');
    const uploadFormLrn = sel.getElemById(document, 'upload-form-lrn');
    const modal = new bootstrap.Modal('#staticBackdrop');
    const modalText = sel.getElemById(document, 'staticModalBody');
    const okayBtn = sel.getElemById(document, 'promtOkayButton');
    const uploadModal = new bootstrap.Modal('#changeImageModal');
    // end ---------------------------------------

    //click images 
    event.globalEvent('click', '#std-profile-img', e => {
        e.preventDefault();

        const lrn = attr.getAttr(e.target, 'lrn');

        uploadFormLrn.value = lrn;
        uploadModal.show();
    });

    //upload/change image
    eventListener.callEvent(uploadBtn, 'click', () => {

        const uploadForm = sel.getElemById(document, 'upload-form');

        const formData = new FormData(uploadForm);

        const serverReq = new MakeServerRequest('../../services/php/ChangeStdProfile.php', formData);
        serverReq.sendDataForm(() => {
            modal.show();
            let data = serverReq.data;

            if (data.success) {
                uploadModal.hide();
                modalText.textContent = data.success;
                attr.setClass(modalText, 'text-success');
                eventListener.callEvent(okayBtn, 'click', () => {
                    window.location.reload();
                });
            } else {
                modalText.textContent = data.error;
                attr.setClass(modalText, 'text-danger');
                eventListener.callEvent(okayBtn, 'click', () => {
                    modal.hide();
                })
            }
        });
    });

    //

});