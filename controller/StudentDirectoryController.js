import MakeServerRequest from "../services/js/ServerRequests";
import { Selector, EventListener, GlobalEventListeners } from "../includes/utils/js/domHelper";

// utility intances ------------------------------
const sel = new Selector();
const eventListener = new EventListener();
const event = new GlobalEventListeners();
// end -------------------------------------------

eventListener.addEventListener(document, 'DOMContentLoaded', () => {


});