import MakeServerRequest from "../services/js/ServerRequests";
import { GlobalEventListeners, sendAsUrlCom } from "../includes/utils/js/domHelper";

//instances 
const event = new GlobalEventListeners();

//vars
const regSearch = document.getElementById('find-std');
const schoolYear = document.getElementById('school-year');
const gradelevel = document.getElementById('grade-level');
const gradeSections = document.getElementById('section');
const newSY = document.getElementById('new-school-year');
const hasNoRecord = document.getElementById('has-no-record');

event.globalEvent('click', '#reg-search', () => {
    const serverReq = new MakeServerRequest('../../services/php/FindStudent.php', `lrn=${sendAsUrlCom(regSearch.value)}&sy=${sendAsUrlCom(schoolYear.value)}`);
    const template = document.getElementById('reg-table-template');

    serverReq.sendData(() => {
        let data = serverReq.data;
        const resultTable = document.getElementById('reg-search-result');
        resultTable.innerHTML = '';
        if (data.exception)
            throw new Error(data.exception);

        if (data.error)
            throw new Error(data.error);

        if (data.missing)
            resultTable.innerHTML = `<tr class="border-bottom text-center"><th col-span="4"> ${data.missing}</th></tr>`;

        if (data.success) {
            data = data.success;
            console.log(data)
            const clone = template.content.cloneNode(true);
            const lrn = clone.querySelector('[lrn]').textContent = data.lrn;
            const name = clone.querySelector('[name]').textContent = data.studentName;
            const sex = clone.querySelector('[sex]').textContent = data.sex;

            resultTable.appendChild(clone);
        }
    });
});
