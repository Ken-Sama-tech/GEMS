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
    const showViolationDetailsBtn = document.getElementById('show-details');
    const submitViolationFormBtn = document.getElementById('submit-violation-form');
    const resetViolationBtn = document.getElementById('reset-violations');
    const selectArticle = document.getElementById('article');
    const selectSection = document.getElementById('article-section');
    const selectSanction = document.getElementById('sanction');

    //table tr's double click event
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

    //show details
    eventListener.callEvent(showViolationDetailsBtn, 'click', (e) => {
        e.preventDefault();

        const serverReq = new MakeServerRequest('../../services/php/Violations.php');

        serverReq.requestData(() => {

            let data = serverReq.data;

            const articles = data.articles;
            const sections = data.articleSections;
            const sanctions = data.sanctions;

            const descModal = new bootstrap.Modal('#violation-description-modal');

            descModal.show();

            function getDescription(object, property, selectValue, descProp, sectionTextID) {

                let isValid = false;

                const sectionToAppend = document.querySelector(sectionTextID);

                try {
                    const targetObject = Object.values(object).find(value => {

                        if (value[property] == selectValue) {
                            isValid = true;
                            return value;
                        }

                    });

                    if (isValid) {
                        sectionToAppend.textContent = targetObject[descProp];
                        sectionToAppend.className = 'ps-4';
                    }

                    if (!isValid) {
                        throw new Error(`No description found for ${property} = ${selectValue}`);
                    }
                } catch (error) {
                    sectionToAppend.textContent = error.message;
                    sectionToAppend.className = 'ps-4 text-danger w-100';
                }
            }

            getDescription(articles, 'articleID', selectArticle.value, 'articleDescription', '#article-text');
            getDescription(sections, 'articleSectionID', selectSection.value, 'articleSectionDescription', '#section-text');
            getDescription(sanctions, 'sanctionID', selectSanction.value, 'sanction', '#sanction-text');

        });
    });

    //reset
    eventListener.callEvent(resetViolationBtn, 'click', (e) => {
        e.preventDefault();

        selectArticle.value = 0;
        selectSection.value = 0;
        selectSanction.value = 0;
    });

    //submit btn
    eventListener.callEvent(submitViolationFormBtn, 'click', (e) => {
        e.preventDefault();

        try {

        } catch (error) {

        }
    });

});

