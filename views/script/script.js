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
    //utility instance -------------------------

    const sel = new Selector();
    const attr = new SetAttribute();
    const appEl = new Append();
    const crte = new CreateElement();
    const eventListener = new EventListener();
    const useClassList = new ClassList();
    const debounce = new Debounce();

    //global variables -------------------------------------------------

    const editSearch = sel.getElemById(document, 'search-std-to-edit');
    const delSearch = sel.getElemById(document, 'search-std-to-delete');
    //-------------------------------------------------------------------

    //search events ---------------- 
    //debounce search event. (DESD) display editable student data

    const updateDESD = debounce.debounce(() => {
        displayEditableStudentsData();
    }, 500);

    //debounce search event. (DDSD) display deletable student data
    const updateDDSD = debounce.debounce(() => {
        displayDeletableStudentsData();
    }, 500);

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

    //--------------------------------------------------------------------------

    const displayEditableStudentsData = () => {

        const reqData = new MakeServerRequest('../../services/php/AllStdData.php');

        const showStudent = () => {

            const tBody = sel.getElemById(document, 'displayEditableStudentHere');

            reqData.requestData(() => {

                let data = reqData.data;

                for (let i = 0; i < data.length; i++) {

                    const tr = crte.crteElem('tr');
                    attr.setId(tr, 'editable-std');
                    appEl.appChild(tBody, tr);

                    const lrn = data[i].learnerReferenceNumber;
                    const name = `${data[i].firstName} ${data[i].lastName} ${data[i].extensionName}`;
                    const sex = data[i].sex;

                    const displayedArr = [lrn, name, sex];

                    //convert edit search value to uppercase and name it person
                    const person = editSearch.value.toUpperCase();

                    if (name.includes(person) || lrn.toString().includes(person)) {

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
            });
        }

        return showStudent();
    }

    displayEditableStudentsData();

    const displayDeletableStudentsData = () => {

        const reqData = new MakeServerRequest('../../services/php/AllStdData.php');

        const showData = () => {
            const tBody = sel.getElemById(document, 'displayDeletableStudentHere');

            reqData.requestData(() => {

                let data = reqData.data;

                for (let i = 0; i < data.length; i++) {

                    const tr = crte.crteElem('tr');
                    attr.setId(tr, 'deletable-std');

                    appEl.appChild(tBody, tr);

                    const lrn = data[i].learnerReferenceNumber;
                    const name = `${data[i].firstName} ${data[i].lastName} ${data[i].extensionName}`;
                    const sex = data[i].sex;

                    const displayedArr = [lrn, name, sex];

                    // convert search value to uppercase then again call it person

                    const person = delSearch.value.toUpperCase();

                    if (name.includes(person) || lrn.toString().includes(person)) {

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
                }
            });
        }

        return showData();
    }
    displayDeletableStudentsData();
});