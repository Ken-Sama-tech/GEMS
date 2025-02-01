import MakeServerRequest from "../services/js/ServerRequests";
import { Selector, EventListener, GlobalEventListeners, SetAttribute, Debounce } from "../includes/utils/js/domHelper";

// utility intances ------------------------------
const sel = new Selector();
const eventListener = new EventListener();
const event = new GlobalEventListeners();
const attr = new SetAttribute();
const dbnc = new Debounce();

eventListener.addEventListener(document, 'DOMContentLoaded', () => {

    //global variables ---------------------------

    const uploadBtn = sel.getElemById(document, 'upload-btn');
    const uploadFormLrn = sel.getElemById(document, 'upload-form-lrn');
    const modal = new bootstrap.Modal('#staticBackdrop');
    const modalText = sel.getElemById(document, 'staticModalBody');
    const okayBtn = sel.getElemById(document, 'promtOkayButton');
    const uploadModal = new bootstrap.Modal('#changeImageModal');

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

    //show full detail
    event.globalEvent('dblclick', '[show-detail]', e => {
        const showDetailsModal = new bootstrap.Modal('#showStdDetailsModal');

        showDetailsModal.show();

        const stdImg = sel.getElemById(document, 'modal-std-profile-img');
        const name = sel.getElemById(document, 'std-name');
        const lrn = sel.getElemById(document, 'std-lrn');
        const status = sel.getElemById(document, 'std-status');
        const bDate = sel.getElemById(document, 'std-bdate');
        const age = sel.getElemById(document, 'std-age');
        const sex = sel.getElemById(document, 'std-sex');
        const nationality = sel.getElemById(document, 'std-nationality');
        const email = sel.getElemById(document, 'std-email');
        const religion = sel.getElemById(document, 'std-religion')
        const pN = sel.getElemById(document, 'std-pn');
        const cA = sel.getElemById(document, 'std-ca');
        const pA = sel.getElemById(document, 'std-pa');
        const gdnName = sel.getElemById(document, 'gdn-name');
        const gdnPn = sel.getElemById(document, 'gdn-pn');
        const mthrName = sel.getElemById(document, 'mthr-name');
        const mthrMdnName = sel.getElemById(document, 'mthr-mdn-name');
        const mthrPn = sel.getElemById(document, 'mthr-pn');
        const fthrName = sel.getElemById(document, 'fthr-name');
        const fthrPn = sel.getElemById(document, 'fthr-pn');


        // lrn of the student you were going to fetch the data, its different from the lrn abovve this. I have bad naming sense
        const alsoLrn = attr.getAttr(e.target, 'lrn');

        const serverReq = new MakeServerRequest('../../services/php/FetchAllDataOfStdUsingLrn.php', 'lrn=' + encodeURIComponent(alsoLrn));

        serverReq.sendData(() => {

            let data = serverReq.data;

            let currentDate = new Date();

            let currentYear = currentDate.getFullYear();
            let currentMonth = currentDate.getMonth() + 1;
            let currentDay = currentDate.getDate();

            let birthDate = data.birthDate;

            birthDate = new Date(birthDate);

            let birthYear = birthDate.getFullYear();
            let birthMonth = birthDate.getMonth() + 1;
            let birthDay = birthDate.getDate();

            //set the textconten of idk. the student you want see the data?

            let stdAge = currentYear - birthYear;

            if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
                stdAge = stdAge - 1;
            }

            stdImg.src = data.studentImg;
            name.innerHTML = `<span class = "fw-bolder">Name: </span> ${data.lastName}, ${data.firstName} ${data.middleName} ${data.extensionName}`;
            lrn.innerHTML = `<span class="fw-bolder">LRN: </span> ${data.learnerReferenceNumber}`;
            status.innerHTML = `<span class="fw-bolder">Civil Status: </span> ${data.civilStatus}`;
            bDate.innerHTML = `<span class="fw-bolder">Birthdate: </span> ${data.birthDate}`;
            age.innerHTML = `<span class="fw-bolder">Age: </span> ${stdAge}`;
            sex.innerHTML = `<span class="fw-bolder">Sex: </span> ${data.sex}`;
            nationality.innerHTML = `<span class="fw-bolder">Nationality: </span> ${data.nationality}`;
            email.innerHTML = `<span class="fw-bolder">Email: </span> ${data.email}`;
            religion.innerHTML = `<span class="fw-bolder">Religion: </span> ${data.religion}`;
            pN.innerHTML = `<span class="fw-bolder">Phone Number: </span> ${data.phoneNumber}`;
            cA.innerHTML = `<span class="fw-bolder">Current Address: </span> ${data.current_address}`;
            pA.innerHTML = `<span class="fw-bolder">Permanent Address: </span> ${data.permanent_address}`;

            //family details

            gdnName.innerHTML = `<span class="fw-bolder">Guardian's Name: </span>  ${data.guardianFirstName} ${data.guardianMiddleName} ${data.guardianLastName} ${data.guardianExtensionName}`;
            gdnPn.innerHTML = `<span class="fw-bolder">Guardian's Phone Number: </span> ${data.guardianPhoneNumber}`;
            mthrName.innerHTML = `<span class="fw-bolder">Mothers's Name: </span>  ${data.motherFirstName} ${data.motherMiddleName} ${data.motherLastName}`;
            mthrMdnName.innerHTML = `<span class="fw-bolder">Mother's Maiden Name: </span> ${data.motherMaidenName}`;
            mthrPn.innerHTML = `<span class="fw-bolder">Mother's Phone Number: </span> ${data.motherPhoneNumber}`;
            fthrName.innerHTML = `<span class="fw-bolder">Father's Name: </span>${data.fatherFirstName} ${data.fatherMiddleName} ${data.fatherLastName} ${data.fatherExtensionName}`;
            fthrPn.innerHTML = `<span class="fw-bolder">Father's Phone Number: </span> ${data.fatherPhoneNumber}`;
        });
    });

});