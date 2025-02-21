import MakeServerRequest from "../services/js/ServerRequests";
import { EventListener, GlobalEventListeners } from "../includes/utils/js/domHelper";

document.addEventListener('DOMContentLoaded', () => {

    //global instances
    const evntLi = new EventListener();
    const event = new GlobalEventListeners();

    const dropFirstForm = document.getElementById('first-form-table');

    event.globalEvent('dragstart', '[selected]', e => {

        let selected = e.target.closest('tr');
        selected.classList.add('bg-warning');

        evntLi.callEvent(dropFirstForm, 'dragover', e => {

            e.preventDefault();
        });

        evntLi.callEvent(dropFirstForm, 'drop', e => {

            selected.classList.remove('bg-warning');
            dropFirstForm.appendChild(selected);

        });
    });
});