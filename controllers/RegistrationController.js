import MakeServerRequest from "../services/js/ServerRequests";
import {
    EventListener,
    GlobalEventListeners,
    Debounce,
    throttle,
    sendAsUrlCom,
} from "../includes/utils/js/domHelper";

document.addEventListener('DOMContentLoaded', () => {

    //global instances
    const evntLi = new EventListener();
    const event = new GlobalEventListeners();
    const dbnc = new Debounce();

    class Registration {
        setSchoolYearOptions() {
            const serverReq = new MakeServerRequest('../../services/php/SchoolYears.php');

            serverReq.requestData(() => {
                let data = serverReq.data;

                if (data.exception)
                    throw new Error(data.exception);

                if (data.error)
                    throw new Error(data.error);

                if (data.success) {
                    data = data.success
                    const select = document.getElementById('school-year');

                    data.sort((a, b) => {
                        const getStartYear = (yearRange) => parseInt(yearRange.split("-")[0]);

                        return getStartYear(a.schoolYear) - getStartYear(b.schoolYear);
                    });

                    data.forEach(d => {
                        select.innerHTML += `<option value="${d.schoolYearID}"> ${d.schoolYear} </option> `;
                    });
                }
            });
        }

        setDefaultRegistrationDate() {
            const regDate = document.getElementById('reg-date');
            const curr_date = new Date();
            const curr_year = curr_date.getFullYear();
            const curr_month = curr_date.getMonth() + 1;
            const curr_day = curr_date.getDate();

            const addPadding = (param) => {
                return param.toString().padStart(2, '0');
            }

            regDate.value = `${curr_year}-${addPadding(curr_month)}-${addPadding(curr_day)}`;
        }

        registerStudents(form) {

            const students = form.querySelectorAll('tr');
            const section = form.querySelector('#select-grade-section');
            const regDate = document.querySelector('#reg-date');
            const sy = document.querySelector('#school-year');

            students.forEach(student => {
                const serverReq = new MakeServerRequest('../../services/php/Register.php', `sID=${sendAsUrlCom(student.sID)}&section=${sendAsUrlCom(section.value)}&sy=${sendAsUrlCom(sy.value)}&reg-date=${regDate.value}`);

                serverReq.sendData(() => {

                    let data = serverReq.data;

                    if (data.exception)
                        throw new Error(data.exception);

                    if (data.error)
                        throw new Error(data.error);

                    console.log(data);
                })
            });
        }
    }

    //instances 
    const registration = new Registration();

    registration.setSchoolYearOptions();
    registration.setDefaultRegistrationDate();
    // registration.registerStudents();

    const allowDataDragging = () => {

        const forms = document.querySelectorAll('#registration-form');

        forms.forEach(form => {

            if (form.dropping !== "allowed") {

                form.querySelectorAll('tr').forEach(tr => {

                    tr.state = "danger";
                    if (tr.state === "danger")
                        tr.classList.add('bg-danger');

                });
            }

            if (form.dropping == "allowed") {

                form.querySelectorAll('tr').forEach(tr => {

                    tr.classList.remove('bg-danger');
                });
            }

        });

        let tr = null;

        const handleDragStart = e => {
            tr = e.target.closest('tr');
            tr.state = "dragging";
            tr.classList.add('bg-warning');

            if (tr.dragging == 'true')
                return;

            tr.dragging = 'true';

            if (tr !== null) {
                const upperSection = document.getElementById('reg-upper-section');
                const tBody = upperSection.querySelector('#reg-tBody');


                function handleUpperDragOver(e) {

                    e.preventDefault();
                }

                function handleUpperDrop() {
                    if (tr !== null) {
                        tBody.appendChild(tr);
                        upperSection.removeEventListener('dragover', handleUpperDragOver);
                        upperSection.removeEventListener('drop', handleUpperDrop);
                    }
                }

                upperSection.addEventListener('dragover', handleUpperDragOver);
                upperSection.addEventListener('drop', handleUpperDrop);

                forms.forEach(form => {
                    if (form.dropping == "allowed") {

                        function handleFormDragOver(e) {
                            e.preventDefault();
                        }

                        function handleFormDrop() {
                            const table = form.querySelector('#form-tBody');
                            if (tr !== null && form.dropping === "allowed") {
                                table.appendChild(tr);
                                tr.state = "dropped";
                                form.removeEventListener('dragover', handleFormDragOver);
                                form.removeEventListener('drop', handleFormDrop);
                            }
                        }

                        form.addEventListener('dragover', handleFormDragOver);
                        form.addEventListener('drop', handleFormDrop);
                    }
                });
            }

            evntLi.callEvent(tr, 'dragend', () => {

                e.target.removeEventListener('dragstart', handleDragStart);
                updateDragging();
                updateRowOrder();

                if (tr !== null) {
                    tr.dragging = 'false';
                    tr.classList.remove('bg-warning');
                }
            });
        };

        event.globalEvent('dragstart', '[selected]', handleDragStart)

    }

    const updateDragging = throttle(() => {
        allowDataDragging();
    }, 10);

    const isFormAllowedDropping = () => {

        const forms = document.querySelectorAll('#registration-form');

        forms.forEach(form => {

            const gradeLev = form.querySelector('#select-grade-level');
            const gardeSec = form.querySelector('#select-grade-section');

            const dropBox = form.closest('#drop-box');

            if (gradeLev.value != 0 && gardeSec.value != 0) {

                dropBox.classList.add('border-success', 'border-3');
                form.dropping = "allowed";
            } else {
                dropBox.classList.remove('border-success', 'border-3');
                form.dropping = "not-allowed";
            }
        });

        allowDataDragging();
    };

    const selects = document.querySelectorAll('[reg-form-select]');

    selects.forEach(select => {

        evntLi.callEvent(select, 'change', () => {

            isFormAllowedDropping();
        });
    });

    const updateRowOrder = dbnc.debounce(() => {

        const table = document.getElementById('unreg-stds-table');
        const content = table.querySelector('tbody');
        let rows = [...content.querySelectorAll('tr')];

        rows.sort((a, b) => {
            return a.children[0].textContent - b.children[0].textContent;
        });

        rows.forEach(row => {
            content.appendChild(row);
        });
    });

    const isGradeLevelAndSectionValid = (gradeLevel, section, form) => {

        const serverReq = new MakeServerRequest('../../services/php/ValidateSectionAndGradeLevel.php', `gradeLevel=${gradeLevel}&gradeSection=${section}`);

        serverReq.sendData(() => {

            let data = serverReq.data;

            if (data.gradeLevel !== 'valid')
                throw new Error('Invalid gradelevel');

            if (data.section !== 'valid')
                throw new Error('Invalid section');

            registration.registerStudents(form);

        });
    };

    event.globalEvent('click', '#reg-btn', () => {

        const forms = document.querySelectorAll('#registration-form');

        forms.forEach(form => {

            if (form.dropping === "allowed") {
                const gradeLevel = form.querySelector('#select-grade-level');
                const section = form.querySelector('#select-grade-section');

                isGradeLevelAndSectionValid(gradeLevel.value, section.value, form);
            }
        });
    });
    const lowerSection = document.getElementById('reg-lower-section');

    const dropBoxes = document.querySelectorAll('#drop-box');

    dropBoxes.forEach(box => {

        evntLi.callEvent(box, 'dblclick', e => {

            if (box.contains(e.target))
                lowerSection.appendChild(e.target.closest('#drop-box'));
        });

        evntLi.callEvent(box, 'contextmenu', e => {
            e.preventDefault();
            if (box.contains(e.target)) {
                dropBoxes.forEach(innerBox => {
                    innerBox.classList.toggle('resize');
                });
            }

        })
    });

    const hdm = document.querySelector('#hdm-container');
    const menu = document.querySelector('.hdm-menu');

    //open the menu
    evntLi.callEvent(hdm, 'click', () => {

        menu.classList.toggle('is-shown');
    });

    //closses menu when clicked outside the target
    evntLi.callEvent(document, 'click', e => {
        if (!hdm.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.remove('is-shown');
        }
    });
});