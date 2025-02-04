import MakeServerRequest from "../services/js/ServerRequests";
import {
    EventListener,
    GlobalEventListeners
} from "../includes/utils/js/domHelper";

//utility intances -------------------------------------------
const eventListener = new EventListener();
const event = new GlobalEventListeners();

eventListener.callEvent(document, 'DOMContentLoaded', () => {

    //global vars ------------------------------------------------
    const violatorLrn = document.querySelector('#violator-lrn');

    event.globalEvent('dblclick', '[selected]', e => {

        const nameHolder = document.getElementById('name-holder');
        const trsWithSelectedAttribute = document.querySelectorAll('[selected]');

        const name = e.target.name;
        const lrn = e.target.lrn;
        const sex = e.target.sex;

        nameHolder.textContent = `${name} — ${lrn} — ${sex}`;

        violatorLrn.value = lrn;

        trsWithSelectedAttribute.forEach(tr => {

            if (tr.lrn === e.target.lrn) {
                tr.classList.add('bg-warning');
            } else {
                tr.classList.remove('bg-warning');
            }

        });

        eventListener.callEvent(nameHolder, 'click', () => {

            nameHolder.textContent = '';

            trsWithSelectedAttribute.forEach(tr => {
                tr.classList.remove('bg-warning');
            });

            violatorLrn.value = '';

        });
    });


});

