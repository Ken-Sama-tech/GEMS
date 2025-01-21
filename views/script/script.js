import MakeServerRequest from "../../services/js/ServerRequests";
import {
    Selector,
    CreateElement,
    SetAttribute,
    Append,
    EventListener,
    ClassList
} from "../../includes/utils/js/domHelper";

document.addEventListener('DOMContentLoaded', () => {

    const selector = new Selector();
    const setAttr = new SetAttribute();
    const appEl = new Append();
    const crte = new CreateElement();
    const eventListener = new EventListener();
    const useClassList = new ClassList();

    const displayEditableStudentsData = () => {

        const reqData = new MakeServerRequest('../../services/php/all-std-data.php');

        const tBody = selector.getElemById(document, 'displayEditableStudentHere');

        reqData.requestData(() => {

            let data = reqData.data;

            for (let i = 0; i < data.length; i++) {

                const tr = crte.crteElem('tr');
                setAttr.setId(tr, 'editable-std');

                const th = crte.crteElem('th');
                setAttr.setCusAttr(th, 'scope', 'row');
                th.textContent = i + 1;

                appEl.appChild(tr, th);

                const lrn = data[i].learnerReferenceNumber;
                const name = `${data[i].firstName} ${data[i].lastName} ${data[i].extensionName}`;
                const sex = data[i].sex;

                const displayedArr = [lrn, name, sex];

                displayedArr.forEach(data => {
                    const td = crte.crteElem('td');
                    td.textContent = data;

                    appEl.appChild(tr, td);
                });

                const btn = crte.crteElem('button');
                btn.textContent = 'Edit';
                setAttr.setId(btn, 'edtBtn');
                btn.className = 'btn btn-success col-8';
                btn.value = data[i].learnerReferenceNumber;
                setAttr.setCusAttr(btn, 'data-bs-toggle', 'modal');
                setAttr.setCusAttr(btn, 'data-bs-target', '#yes-no-modal');

                appEl.appChild(tr, btn);

                appEl.appChild(tBody, tr);

            }

            const editBtn = selector.querySelectAll(document, '#edtBtn');

            editBtn.forEach(btn => {
                eventListener.callEvent(btn, 'click', () => {

                    const modalText = selector.getElemById(document, 'custom-modal-text');
                    setAttr.setCusAttr(modalText, 'value', btn.value);
                    modalText.textContent = `Edit student with lrn ${btn.value}?`;
                });
            });

        });
    }

    displayEditableStudentsData();
});