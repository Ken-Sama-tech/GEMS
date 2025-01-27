import MakeServerRequest from "../../services/js/ServerRequests";
import {
    Selector,
    CreateElement,
    SetAttribute,
    Append,
    EventListener,
    ClassList,
    Debounce
} from "../../includes/utils/js/domHelper";

document.addEventListener('DOMContentLoaded', () => {

    //utility instances ------------------------------
    const sel = new Selector();
    const attr = new SetAttribute();
    const appEl = new Append();
    const crte = new CreateElement();
    const eventListener = new EventListener();
    const useClassList = new ClassList();
    const debounce = new Debounce();


    // end -------------------------------------------

    //internal classes ---------------------------------
    class AddNewStudent {

        displayEditableStudentsData = () => {

            const reqData = new MakeServerRequest('../../services/php/AllStdData.php');

            const showStudent = () => {

                const tBody = sel.getElemById(document, 'displayEditableStudentHere');

                reqData.requestData(() => {

                    let data = reqData.data;

                    for (let i = 0; i < data.length; i++) {

                        const lrn = data[i].learnerReferenceNumber;
                        const name = `${data[i].firstName} ${data[i].lastName} ${data[i].extensionName}`;
                        const sex = data[i].sex;

                        const displayedArr = [lrn, name, sex];

                        //convert edit search value to uppercase and name it person
                        const person = editSearch.value.toUpperCase();

                        if (name.includes(person) || lrn.toString().includes(person)) {

                            const tr = crte.crteElem('tr');
                            attr.setId(tr, 'editable-std');
                            appEl.appChild(tBody, tr);

                            const th = crte.crteElem('th');
                            attr.setCusAttr(th, 'scope', 'row');
                            th.textContent = i + 1;

                            appEl.appChild(tr, th);
                            displayedArr.forEach(data => {
                                const td = crte.crteElem('td');
                                td.textContent = data;

                                appEl.appChild(tr, td);
                            });

                            const btn = crte.crteElem('button');
                            btn.textContent = 'Edit';
                            attr.setId(btn, 'edtBtn');
                            btn.className = 'btn btn-success col-8';
                            btn.value = data[i].learnerReferenceNumber;
                            attr.setCusAttr(btn, 'data-bs-toggle', 'modal');
                            attr.setCusAttr(btn, 'data-bs-target', '#edit-std-modal');

                            appEl.appChild(tr, btn);
                        }

                    }
                    const result = sel.querySelectAll(document, '#editable-std');

                    if (result.length <= 0) {
                        tBody.innerHTML = '<h1> No result found <h1>';
                    }
                });
            }

            return showStudent();
        }

        displayDeletableStudentsData = () => {

            const reqData = new MakeServerRequest('../../services/php/AllStdData.php');

            const showData = () => {
                const tBody = sel.getElemById(document, 'displayDeletableStudentHere');

                reqData.requestData(() => {

                    let data = reqData.data;

                    for (let i = 0; i < data.length; i++) {

                        const lrn = data[i].learnerReferenceNumber;
                        const name = `${data[i].firstName} ${data[i].lastName} ${data[i].extensionName}`;
                        const sex = data[i].sex;

                        const displayedArr = [lrn, name, sex];

                        // convert search value to uppercase then again call it person

                        const person = delSearch.value.toUpperCase();

                        if (name.includes(person) || lrn.toString().includes(person)) {

                            const tr = crte.crteElem('tr');
                            attr.setId(tr, 'deletable-std');

                            appEl.appChild(tBody, tr);

                            const th = crte.crteElem('th');
                            attr.setCusAttr(th, 'scope', 'row');
                            th.textContent = i + 1;

                            appEl.appChild(tr, th);

                            displayedArr.forEach(data => {
                                const td = crte.crteElem('td');
                                td.textContent = data;

                                appEl.appChild(tr, td);
                            });

                            const btn = crte.crteElem('button');
                            btn.textContent = 'Delete';
                            attr.setId(btn, 'dltBtn');
                            btn.className = 'btn btn-danger col-8';
                            btn.value = data[i].learnerReferenceNumber;
                            attr.setCusAttr(btn, 'data-bs-toggle', 'modal');
                            attr.setCusAttr(btn, 'data-bs-target', '#yes-no-modal');

                            appEl.appChild(tr, btn);
                        }

                        const result = sel.querySelectAll(document, '#deletable-std');

                        if (result.length <= 0) {
                            tBody.innerHTML = '<h1> No result found <h1>';
                        }
                    }
                });
            }

            return showData();
        }

    }

    class StudentDirectory {
        displayStudentData() {

            const serverReq = new MakeServerRequest('../../services/php/AllStdData.php');

            const showStudentData = () => {
                const profileBoxContainer = sel.getElemById(document, 'std-profile-box-container');
                profileBoxContainer.innerHTML = '';
                serverReq.requestData(() => {

                    let data = serverReq.data;

                    const template = sel.getElemById(document, 'profile-box-temp');

                    for (let i = 0; i < data.length; i++) {

                        const name = `${data[i].firstName} ${data[i].middleName} ${data[i].lastName} ${data[i].extensionName}`;
                        const lrn = data[i].learnerReferenceNumber;
                        const status = data[i].civilStatus;
                        const bDate = data[i].birthDate;
                        const sex = data[i].sex;
                        const nationality = data[i].nationality;
                        const religion = data[i].religion;
                        const email = data[i].email;
                        const pN = data[i].phoneNumber;
                        const cR = data[i].current_address;
                        const pR = data[i].permanent_address;

                        const clone = template.content.cloneNode(true);

                        const profileBox = sel.getElemById(clone, 'profile-box');
                        attr.setCusAttr(profileBox, 'lrn', lrn);

                        const person = stdDirSearch.value.toUpperCase();

                        if (lrn.toString().includes(person) || name.includes(person)) {

                            const img = sel.getElemById(clone, 'std-profile-img');
                            const p = sel.querySelectAll(clone, 'p');

                            img.src = data[i].studentImg;
                            attr.setCusAttr(img, 'lrn', lrn);
                            p[0].innerHTML = `<span class="fw-bolder">Name: </span> ${name}`;
                            p[1].innerHTML = `<span class="fw-bolder">LRN: </span> ${lrn}`;
                            p[2].innerHTML = `<span class="fw-bolder">Civil Status: </span> ${status}`;
                            p[3].innerHTML = `<span class="fw-bolder">Birthdate: </span> ${bDate}`;
                            p[4].innerHTML = `<span class="fw-bolder">Sex: </span> ${sex}`;
                            p[5].innerHTML = `<span class="fw-bolder">Nationality: </span> ${nationality}`;
                            p[6].innerHTML = `<span class="fw-bolder">Religion: </span> ${religion}`;
                            p[7].innerHTML = `<span class="fw-bolder">Email: </span> ${email}`;
                            p[8].innerHTML = `<span class="fw-bolder">Phone Number: </span> ${pN}`;
                            p[9].innerHTML = `<span class="fw-bolder">Current Address: </span> ${cR}`;
                            p[10].innerHTML = `<span class="fw-bolder">Permanent Address: </span> ${pR}`;

                            appEl.appChild(profileBoxContainer, clone);
                        }

                    }

                    const result = sel.querySelectAll(document, '#profile-box');

                    if (result.length <= 0) {
                        profileBoxContainer.innerHTML = '<h1> No result found <h1>';
                    }
                });
            }

            return showStudentData();
        }

    }
    // end ---------------------------------------------

    //global variables && local intances -------------------------------------------------
    const SD = new StudentDirectory();
    const ANS = new AddNewStudent();
    const editSearch = sel.getElemById(document, 'search-std-to-edit');
    const delSearch = sel.getElemById(document, 'search-std-to-delete');
    const stdDirSearch = sel.getElemById(document, 'std-directory-search');
    // end ------------------------------------------------------------------------------

    // ANS ------------------------------------------------------------------------------------------
    //search events ----------------------------------------------
    //debounce search event. (DESD) display editable student data
    const updateDESD = debounce.debounce(() => {
        ANS.displayEditableStudentsData();
    }, 500);

    //debounce search event. (DDSD) display deletable student data
    const updateDDSD = debounce.debounce(() => {
        ANS.displayDeletableStudentsData();
    }, 500);

    if (delSearch || editSearch) {
        //put this inside a if statement, so there'd be no error when other page use this js file || 177013 if you know, you know
        ANS.displayEditableStudentsData();
        ANS.displayDeletableStudentsData();

        eventListener.callEvent(editSearch, 'input', () => {
            const tBody = sel.getElemById(document, 'displayEditableStudentHere');
            tBody.innerHTML = '';
            updateDESD();
        });

        eventListener.callEvent(delSearch, 'input', () => {
            const tBody = sel.getElemById(document, 'displayDeletableStudentHere');
            tBody.innerHTML = '';
            updateDDSD();
        });
    }

    //end --------------------------------------------------------
    // end of ANS -----------------------------------------------------------------------------------

    // SD -------------------------------------------------------------------------------------------

    // search event ----------------------------------------------
    // search w/ debounce
    const updateDSD = debounce.debounce(() => {
        SD.displayStudentData();
    });

    if (stdDirSearch) {
        SD.displayStudentData();

        eventListener.callEvent(stdDirSearch, 'input', () => {
            updateDSD();
        });
    }
    // end -------------------------------------------------------
    // end of SD ------------------------------------------------------------------------------------
});