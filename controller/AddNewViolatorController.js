import MakeServerRequest from "../services/js/ServerRequests";
import {
    Selector,
    EventListener,
    ClassList,
    SetAttribute,
    GlobalEventListeners
} from "../includes/utils/js/domHelper";

//utility intances -------------------------------------------
const sel = new Selector();
const eventListener = new EventListener();
const useClassList = new ClassList();
const attr = new SetAttribute();
const event = new GlobalEventListeners();

eventListener.callEvent(document, 'DOMContentLoaded', () => {

    event.globalEvent('click', '[selected]', e => {
        console.log(e.target.value);
    });
});