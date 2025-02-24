import MakeServerRequest from "../services/js/ServerRequests";
import {
    EventListener,
    GlobalEventListeners,
    Debounce,
    throttle,
} from "../includes/utils/js/domHelper";

document.addEventListener('DOMContentLoaded', () => {

    //global instances
    const evntLi = new EventListener();
    const event = new GlobalEventListeners();
    const dbnc = new Debounce();

    const allowDataDragging = () => {

        const forms = document.querySelectorAll('#registration-form');

        forms.forEach(form => {

            if (form.dropping !== "allowed") {

                form.querySelectorAll('tr').forEach(tr => {

                    tr.state = "danger";
                    if (tr.state === "danger")
                        tr.classList.add('bg-danger', 'text-light');
                });
            }

            if (form.dropping == "allowed") {

                form.querySelectorAll('tr').forEach(tr => {

                    tr.classList.remove('bg-danger', 'text-light');
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

    const isGradeLevelAndSectionValid = (gradeLevel, section) => {

        const serverReq = new MakeServerRequest('../../services/php/ValidateSectionAndGradeLevel.php', `gradeLevel=${gradeLevel}&gradeSection=${section}`);

        serverReq.sendData(() => {

            let data = serverReq.data;

            if (data.gradeLevel !== 'valid')
                throw new Error('Invalid gradelevel');

            if (data.section !== 'valid')
                throw new Error('Invalid section');

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