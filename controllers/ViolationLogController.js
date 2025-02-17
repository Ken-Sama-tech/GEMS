import MakeServerRequest from "../services/js/ServerRequests";
import { EventListener, GlobalEventListeners } from "../includes/utils/js/domHelper";

//utility instances
const evntLi = new EventListener();
const event = new GlobalEventListeners();

document.addEventListener('DOMContentLoaded', () => {

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

    //open a modal 
    const violationModifierModal = new bootstrap.Modal('#edit-violation-modal');
    event.globalEvent('dblclick', '[selected]', e => {

        const modalText = document.getElementById('modify-violation-warning');
        modalText.innerHTML = `Modify this record associated with <b>${e.target.name}</b> (${e.target.lrn})?`;

        violationModifierModal.show();
    });

    //edit
    event.globalEvent('click', '#edt-violation', e => {

    });

    //delete
    event.globalEvent('click', '#dlt-violation', e => {
        alert('deleted na kunwari');
    });

});
