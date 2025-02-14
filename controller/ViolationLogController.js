import MakeServerRequest from "../services/js/ServerRequests";
import { EventListener, GlobalEventListeners } from "../includes/utils/js/domHelper";

//utility instances
const evntLi = new EventListener();
const event = new GlobalEventListeners();

document.addEventListener('DOMContentLoaded', () => {

    const hdm = document.querySelector('#hdm-container');
    const menu = document.querySelector('.hdm-menu');

    evntLi.callEvent(hdm, 'click', () => {

        menu.classList.toggle('is-shown');
    });

    evntLi.callEvent(document, 'click', e => {
        if (!hdm.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.remove('is-shown');
        }
    });

});