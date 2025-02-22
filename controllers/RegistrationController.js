import MakeServerRequest from "../services/js/ServerRequests";
import {
    EventListener,
    GlobalEventListeners
} from "../includes/utils/js/domHelper";

document.addEventListener('DOMContentLoaded', () => {

    //global instances
    const evntLi = new EventListener();
    const event = new GlobalEventListeners();

    const allowDataDragging = () => {

        const forms = document.querySelectorAll('#registration-form');
        const selected = document.querySelectorAll('[selected]');

        selected.forEach(select => {

            let tr = null;

            evntLi.callEvent(select, 'dragstart', (e) => {

                tr = e.target.closest('tr');

                forms.forEach(form => {

                    evntLi.callEvent(form, 'dragover', e => {
                        e.preventDefault();
                    });

                    evntLi.callEvent(form, 'drop', () => {
                        const table = form.querySelector('#form-table');

                        if (tr !== null && form.dropping === "allowed")
                            table.appendChild(tr);

                        tr = null;
                    });
                });
            });
        });
    }

    const isFormAlledDropping = () => {

        const forms = document.querySelectorAll('#registration-form');

        forms.forEach(form => {

            const gradeLev = form.querySelector('#select-grade-level');
            const gardeSec = form.querySelector('#select-grade-section');

            const dropBox = form.closest('#drop-box');

            if (gradeLev.value != 0 && gardeSec.value != 0) {

                dropBox.classList.add('border-dark')
                form.dropping = "allowed";
                allowDataDragging();
            } else {
                dropBox.classList.remove('border-dark');
                form.dropping = "not-allowed";
            }
        });
    };

    const selects = document.querySelectorAll('[reg-form-select]');

    selects.forEach(select => {

        evntLi.callEvent(select, 'change', () => {

            isFormAlledDropping();
        });
    })

});