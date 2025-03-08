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
const gradeSection = document.getElementById('section');
const newSY = document.getElementById('new-school-year');
const hasNoRecord = document.getElementById('has-no-record');
const student = document.getElementById('reg-std');
const registrationDate = document.getElementById('reg-date')

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

        if (data.exception)
            throw new Error(data.exception);

        if (data.error)
            throw new Error(data.error);

        if (data.missing)
            resultTable.innerHTML = `<tr class="border-bottom text-center"><th col-span="4"> ${data.missing}</th></tr>`;

        if (data.success) {
            data = data.success;
            student.value = data.studentID;
            const clone = template.content.cloneNode(true);
            clone.querySelector('[lrn]').textContent = data.lrn;
            clone.querySelector('[name]').textContent = data.studentName;
            clone.querySelector('[sex]').textContent = data.sex;

            resultTable.appendChild(clone);
        }
    });
});

//enroll
event.globalEvent('click', '[enroll-btn]', () => {
    let stdData = {
        sID: student.value,
        nsy: newSY.value,
        section: gradeSection.value,
        regDate: registrationDate.value
    }

    const serverReq = new MakeServerRequest('../../services/php/Register.php', JSON.stringify(stdData));
    serverReq.sendData(() => {
        let data = serverReq.data;
        const modal = new bootstrap.Modal('#staticBackdrop');
        const modalText = document.getElementById('staticModalBody');

        event.globalEvent('click', '#promtOkayButton', () => {
            modal.hide();
        });

        if (data.exception)
            throw new Error(data.exception);

        if (data.error) {
            let error = data.error;
            modal.show();
            modalText.textContent = error;
            modalText.setAttribute('class', 'text-danger');
        }

        if (data.success) {
            let success = data.success;
            modal.show();
            modalText.textContent = success;
            modalText.setAttribute('class', 'text-success');
        }
    });
});