import MakeServerRequest from "../../services/js/ServerRequests";
import {
    Selector,
    CreateElement,
    SetAttribute,
    Append
} from "../../includes/utils/js/domHelper";


document.addEventListener('DOMContentLoaded', () => {

    const selector = new Selector();
    const createElem = new CreateElement();
    const setAttr = new SetAttribute();
    const appEl = new Append();

    const displayEditableStudentsData = () => {

        const reqData = new MakeServerRequest('../../services/php/all-std-data.php');

        const template = selector.getElemById(document, 'edit-student-td-template');
        const tBody = selector.getElemById(document, 'displayEditableStudentHere');
     

        reqData.requestData(() => {

            let data = reqData.data;

           for (let i = 0; i < data.length ; i++){

            const clone = template.content.cloneNode(true);
            const tableRow = selector.querySelect(clone, 'tr');
            const tdRow = selector.querySelect(clone, '.th-row').textContent = 1 + i;
            const tdLrn = selector.querySelect(clone, '.td-lrn').textContent = data[i].learnerReferenceNumber;
            const tdName = selector.querySelect(clone, '.td-name').textContent = data[i].firstName + ' ' + data[i].lastName + ' ' + data[i].extensionName;
            const tdSex = selector.querySelect(clone, '.td-sex').textContent = data[i].sex;

            const output = [tdRow, tdLrn, tdName, tdSex];

            output.forEach(data => {
                tableRow.innerHTML += data.textContent;
            });

            tBody += tableRow.innerHTML;
           }
    
         
        });
    }

    displayEditableStudentsData();

});