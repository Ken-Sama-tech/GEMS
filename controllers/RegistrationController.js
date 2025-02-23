import MakeServerRequest from "../services/js/ServerRequests";
import {
    EventListener,
    GlobalEventListeners,
    Debounce
} from "../includes/utils/js/domHelper";

document.addEventListener('DOMContentLoaded', () => {

    //global instances
    const evntLi = new EventListener();
    const event = new GlobalEventListeners();
    const dbnc = new Debounce();

    const allowDataDragging = () => {

        const forms = document.querySelectorAll('#registration-form');
        const selected = document.querySelectorAll('[selected]');

        forms.forEach(form => {

            if (form.dropping !== "allowed") {

                form.querySelectorAll('tr').forEach(tr => {

                    tr.state = "danger";
                    if (tr.state === "danger")
                        tr.classList.add('bg-danger', 'text-light');
                });
            }

            if (form.dropping === "allowed") {

                form.querySelectorAll('tr').forEach(tr => {

                    if (tr.state == 'dropped')
                        tr.classList.remove('bg-danger', 'text-light');
                });
            }

        });

        selected.forEach(select => {

            let tr = null;

            evntLi.callEvent(select, 'dragstart', () => {

                tr = select.closest('tr');
                tr.state = "dragging";
                tr.classList.add('bg-warning');

                if (tr !== null) {

                    const upperSection = document.getElementById('reg-upper-section');

                    evntLi.callEvent(upperSection, 'dragover', e => {
                        e.preventDefault();
                    });

                    evntLi.callEvent(upperSection, 'drop', () => {

                        if (tr !== null) {
                            const tBody = upperSection.querySelector('#reg-tBody');
                            tBody.appendChild(tr);
                        }
                    });

                    forms.forEach(form => {

                        if (form.dropping == "allowed") {

                            evntLi.callEvent(form, 'dragover', e => {
                                e.preventDefault();
                            });

                            evntLi.callEvent(form, 'drop', () => {
                                const table = form.querySelector('#form-tBody');

                                if (tr !== null && form.dropping === "allowed") {
                                    table.appendChild(tr);
                                    tr.state = "dropped";
                                }
                            });
                        }
                    });
                }
            });

            evntLi.callEvent(select, 'dragend', e => {
                updateDragging();
                updateRowOrder();
                if (tr !== null) {
                    tr.classList.remove('bg-warning');
                    tr = null;
                }
            });
        });
    }

    const updateDragging = dbnc.debounce(() => {

        allowDataDragging();
    }, 100);

    const isFormAlledDropping = () => {

        const forms = document.querySelectorAll('#registration-form');

        forms.forEach(form => {

            const gradeLev = form.querySelector('#select-grade-level');
            const gardeSec = form.querySelector('#select-grade-section');

            const dropBox = form.closest('#drop-box');

            if (gradeLev.value != 0 && gardeSec.value != 0) {

                dropBox.classList.add('border-dark')
                form.dropping = "allowed";
            } else {
                dropBox.classList.remove('border-dark');
                form.dropping = "not-allowed";
            }
        });

        allowDataDragging();
    };

    const selects = document.querySelectorAll('[reg-form-select]');

    selects.forEach(select => {

        evntLi.callEvent(select, 'change', () => {

            isFormAlledDropping();
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

    const isGradeLevelAndSectionValid = (gradeLevel, section) => {

        const serverReq = new MakeServerRequest('../../services/php/ValidateSectionAndGradeLevel.php', `gradeLevel=${gradeLevel}&gradeSection=${section}`);

        serverReq.sendData(() => {

            let data = serverReq.data;

            console.log(data)
        });
    };

    event.globalEvent('click', '#reg-btn', () => {

        const forms = document.querySelectorAll('#registration-form');

        forms.forEach(form => {

            if (form.dropping === "allowed") {
                const gradeLevel = form.querySelector('#select-grade-level');
                const section = form.querySelector('#select-grade-section');

                isGradeLevelAndSectionValid(gradeLevel.value, section.value);
            }
        });
    });
});