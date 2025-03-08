import MakeServerRequest from "../services/js/ServerRequests";
import {
    GlobalEventListeners,
    sendAsUrlCom
} from "../includes/utils/js/domHelper";

//instances 
const event = new GlobalEventListeners();

//vars
const regSearch = document.getElementById('find-std');
const schoolYear = document.getElementById('school-year');
const gradelevel = document.getElementById('grade-level');
const gradeSections = document.getElementById('section');
const newSY = document.getElementById('new-school-year');
const hasNoRecord = document.getElementById('has-no-record');

//search
event.globalEvent('click', '#reg-search', () => {
    let hasRecord;

    if (hasNoRecord.checked)
        hasRecord = null;
    else
        hasRecord = 'yes';
    //hasRecord is a parameter that will tell the system or whatever this is, if it will fetch on students previously enrolled or nah
    const serverReq = new MakeServerRequest('../../services/php/FindStudent.php', `lrn=${sendAsUrlCom(regSearch.value)}&sy=${sendAsUrlCom(schoolYear.value)}
    &hasRecord=${sendAsUrlCom(hasRecord)}`);
    const template = document.getElementById('reg-table-template');

    serverReq.sendData(() => {
        let data = serverReq.data;
        const resultTable = document.getElementById('reg-search-result');
        resultTable.innerHTML = '';
        console.log(data)
        if (data.exception)
            throw new Error(data.exception);

        if (data.error)
            throw new Error(data.error);

        if (data.missing)
            resultTable.innerHTML = `<tr class="border-bottom text-center"><th col-span="4"> ${data.missing}</th></tr>`;

        if (data.success) {
            data = data.success;
            document.getElementById('reg-std-lrn').value = data.lrn;
            const clone = template.content.cloneNode(true);
            clone.querySelector('[lrn]').textContent = data.lrn;
            clone.querySelector('[name]').textContent = data.studentName;
            clone.querySelector('[sex]').textContent = data.sex;

            resultTable.appendChild(clone);
        }
    });
});

enroll
event.globalEvent('click', '[enroll-btn]', () => {
    let stdData = {
        lrn: 10121212,
    }

    const serverReq = new MakeServerRequest('../../services/php/Register.php', stdData);
});