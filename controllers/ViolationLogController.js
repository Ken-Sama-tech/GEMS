import MakeServerRequest from "../services/js/ServerRequests";
import { EventListener, GlobalEventListeners } from "../includes/utils/js/domHelper";

//utility instances
const evntLi = new EventListener();
const event = new GlobalEventListeners();

document.addEventListener('DOMContentLoaded', () => {

    class ModifyViolationRecord {

    }

    class SelectOptionsManager {

        setOptionsForEditSelects() {

            const serverReq = new MakeServerRequest('../../services/php/Violations.php');

            serverReq.requestData(() => {

                let data = serverReq.data;
                console.log(data.articleSections)

                const optionsForArticle = data.articles.map(d => {

                    return `<option id="option" value="${d.articleID}"> ${d.article}</option>`;
                });

                article.innerHTML += optionsForArticle;

                this.changeOptionOfArticleSection();

                let num = 1;

                const optionsForSanction = data.sanctions.map(d => {

                    return `<option id="option" value="${d.sanctionID}">${num++} ${d.sanction}</option>`;
                });

                sanction.innerHTML += optionsForSanction;

            });
        }

        changeOptionOfArticleSection(param = null) {

            const serverReq = new MakeServerRequest('../../services/php/Violations.php');

            serverReq.requestData(() => {

                let data = serverReq.data;

                const optionsForSection = (() => {

                    section.innerHTML = `<option value="0" id="option">Select Section</option>`;

                    data.articleSections.forEach(d => {

                        if (d.articleID == article.value)
                            section.innerHTML += `<option id="option" value="${d.articleSectionID}"> ${d.articleSection}</option>`;

                    });
                })();

                if (param != null)
                    section.value = param;

                this.displayViolationDescriptions();
            });
        }

        setOriginalSelectsValue(url, vID) {

            const serverReq = new MakeServerRequest(url, vID);

            serverReq.sendData(() => {

                let data = serverReq.data;

                article.value = data.articleID;
                this.changeOptionOfArticleSection(data.articleSectionID);
                sanction.value = data.sanctionID;

            });

            this.displayViolationDescriptions();
        }

        displayViolationDescriptions() {

            const articleDescription = document.getElementById('article-decription');
            const sectionDescription = document.getElementById('section-description');
            const sanctionDescription = document.getElementById('sanction-description');

            const descriptionsArray = [articleDescription, sectionDescription, sanctionDescription];

            const fetchDescriptions = (() => {

                descriptionsArray.forEach(item => {

                    item.innerHTML = ' ';
                });

                const serverReq = new MakeServerRequest('../../services/php/Violations.php');

                serverReq.requestData(() => {

                    let data = serverReq.data;

                    data.articles.find(d => {

                        if (d.articleID == article.value)
                            articleDescription.innerHTML = `<b>Article: </b>${d.articleDescription}`;
                    });

                    data.articleSections.find(d => {

                        if (d.articleSectionID == section.value)
                            sectionDescription.innerHTML = `<b>Section: </b>${d.articleSectionDescription}`;
                    });

                    data.sanctions.find(d => {

                        if (d.sanctionID == sanction.value)
                            sanctionDescription.innerHTML = `<b>Sanction: </b>${d.sanction}`;
                    });

                });
            })()
        };

    }

    //local instances
    const selectOptionsmanager = new SelectOptionsManager();

    selectOptionsmanager.setOptionsForEditSelects();

    //global vars
    const article = document.getElementById('article');
    const section = document.getElementById('section');
    const sanction = document.getElementById('sanction');

    evntLi.callEvent(article, 'change', () => {

        selectOptionsmanager.changeOptionOfArticleSection();
    });

    const selects = [article, section, sanction];

    selects.forEach(select => {

        evntLi.callEvent(select, 'change', () => {
            selectOptionsmanager.displayViolationDescriptions();
        });
    });

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

    const violationModifierModal = new bootstrap.Modal('#edit-violation-modal');
    const violationModifierModalText = document.getElementById('modify-violation-warning');

    //open a modal 
    event.globalEvent('dblclick', '[selected]', e => {

        violationModifierModalText.innerHTML = `Modify this record associated with <b>${e.target.name}</b> (${e.target.lrn})?`;
        violationModifierModalText.vID = e.target.vID;

        const tableRows = document.querySelectorAll('[selected]');

        tableRows.forEach(row => {

            if (row.vID == e.target.vID)
                row.classList.add('bg-warning');
            else
                row.classList.remove('bg-warning');
        });

        violationModifierModal.show();
    });

    const editViolationModal = new bootstrap.Modal('#edit-violation-record');

    //edit
    event.globalEvent('click', '#edt-violation', () => {
        //close previous modal
        violationModifierModal.hide();

        const violationID = violationModifierModalText.vID;

        //show new modal
        editViolationModal.show();

        //
        selectOptionsmanager.setOriginalSelectsValue('../../services/php/ViolationLogs.php', `vID=${violationID}`);
    });

    //delete
    event.globalEvent('click', '#dlt-violation', e => {
        alert('deleted na kunwari');
    });

});
