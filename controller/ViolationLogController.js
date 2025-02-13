import MakeServerRequest from "../services/js/ServerRequests";
import { EventListener, GlobalEventListeners } from "../includes/utils/js/domHelper";

//utility instances
const evntLi = new EventListener();
const event = new GlobalEventListeners();

document.addEventListener('DOMContentLoaded', () => {

    const hdm = document.querySelector('#hdm-container');
    const menu = document.querySelector('.hdm-menu');

    evntLi.callEvent(hdm, 'click', () => {

        menu.classList.add('is-shown');
    });

});