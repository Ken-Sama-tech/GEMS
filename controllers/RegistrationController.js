import MakeServerRequest from "../services/js/ServerRequests";
import { EventListener, GlobalEventListeners } from "../includes/utils/js/domHelper";

document.addEventListener('DOMContentLoaded', () => {

    //global instances
    const evntLi = new EventListener();
    const event = new GlobalEventListeners();

    const dropArea = document.querySelectorAll('#form-table');

    const allowDropping = () => {

        const selected = document.querySelectorAll('[selected]');
    }

    const checkIfFormAllowedDroping = () => {

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
    };

    const selects = document.querySelectorAll('[reg-form-select]');

    selects.forEach(select => {

        evntLi.callEvent(select, 'change', () => {

            checkIfFormAllowedDroping();
        });
    })

});