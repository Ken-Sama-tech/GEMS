import MakeServerRequest from "../services/js/ServerRequests";
import {
    EventListener,
    GlobalEventListeners
} from "../includes/utils/js/domHelper";

//utility intances -------------------------------------------
const eventListener = new EventListener();
const event = new GlobalEventListeners();

eventListener.callEvent(document, 'DOMContentLoaded', () => {

    class ValidateSelectedViolation {

        constructor() {
            this.ok;
        }

        validate(callback) {

            const article = selectArticle.value;
            const section = selectSection.value;
            const sanction = selectSanction.value;

            const serverReq = new MakeServerRequest('../../services/php/ValidateViolations', `article= ${encodeURIComponent(article)} & section= ${encodeURIComponent(section)} & sanction= ${encodeURIComponent(sanction)}`);

            serverReq.sendData(() => {
                let data = serverReq.data;

                if (data.article != 'ok') {
                    throw new Error(data.article);
                }

                if (data.section != 'ok') {
                    throw new Error(data.section);
                }

                if (data.sanction != 'ok') {
                    throw new Error(data.sanction);
                }

                this.ok = true;

                if (callback) {
                    callback(this.ok);
                }
            });
        }
    }

    //local instances -------------------------------------------
    const VSV = new ValidateSelectedViolation();

    //global vars ------------------------------------------------
    const violatorStdID = document.querySelector('#std-id');
    const showViolationDetailsBtn = document.getElementById('show-details');
    const submitViolationFormBtn = document.getElementById('submit-violation-form');
    const resetViolationBtn = document.getElementById('reset-violations');
    const selectArticle = document.getElementById('article');
    const selectSection = document.getElementById('article-section');
    const selectSanction = document.getElementById('sanction');
    const violationDate = document.getElementById('violation-date');
    const nameHolder = document.getElementById('name-holder');

    //table tr's double click event
    event.globalEvent('dblclick', '[selected]', e => {

        const name = e.target.name;
        const lrn = e.target.lrn;
        const sex = e.target.sex;
        const stdId = e.target.stdId;

        nameHolder.textContent = `${name} — ${lrn} — ${sex}`;

        violatorStdID.value = stdId;

        const trs = document.querySelectorAll('#ANV-table-row');

        trs.forEach(tr => {
            tr.classList.remove('bg-warning');
        });

        let selected = e.target.closest('tr');

        if (selected.lrn == lrn) {
            selected.classList.add('bg-warning');
        }
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
                    console.error('Error: ' + error.message);

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
        violationDate.value = '';

        nameHolder.textContent = '';

        const trsWithSelectedAttribute = document.querySelectorAll('[selected]');

        trsWithSelectedAttribute.forEach(tr => {
            tr.classList.remove('bg-warning');
        });

        violatorStdID.value = '';
    });

    //submit btn
    eventListener.callEvent(submitViolationFormBtn, 'click', (e) => {
        e.preventDefault();
        function addViolator(url, formID) {

            const form = document.querySelector(formID);
            let serverReq;
            if (!form.checkValidity()) {
                form.classList.add('was-validated');
            } else {
                const formData = new FormData(form);
                serverReq = new MakeServerRequest(url, formData);
            }

            serverReq.sendDataForm(() => {
                let data = serverReq.data;

                if (data.error) {
                    throw new Error(data.error);
                }

                if (data.success) {
                    const modal = new bootstrap.Modal('#staticBackdrop');
                    modal.show();

                    const modalText = document.getElementById('staticModalBody');

                    modalText.textContent = data.success;
                    modalText.className = 'text-success ';

                    const okayBtn = document.getElementById('promtOkayButton');

                    eventListener.callEvent(okayBtn, 'click', () => {
                        window.location.reload();
                    })
                }
            });
        }

        VSV.validate(() => {
            if (VSV.ok) {
                addViolator('../../services/php/AddViolator.php', '#add-violator-form');
            }
        });
    });

});

