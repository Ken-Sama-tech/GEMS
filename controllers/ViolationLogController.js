import MakeServerRequest from "../services/js/ServerRequests";
import { EventListener, GlobalEventListeners } from "../includes/utils/js/domHelper";

//utility instances
const evntLi = new EventListener();
const event = new GlobalEventListeners();

document.addEventListener('DOMContentLoaded', () => {

    class ModifyViolationRecord {

        constructor() {
            this.modal = new bootstrap.Modal('#staticBackdrop');
            this.modalText = document.getElementById('staticModalBody');
            this.okBtn = document.getElementById('promtOkayButton');
        }

        saveChanges(url, form) {

            const formData = new FormData(form);

            const serverReq = new MakeServerRequest(url, formData);

            serverReq.sendDataForm(() => {

                let data = serverReq.data;

                if (data.success) {

                    editViolationModal.hide();
                    this.modal.show();
                    this.modalText.textContent = `${data.success}`;
                    this.modalText.className = 'text-success';

                    evntLi.callEvent(this.okBtn, 'click', () => {

                        this.modal.hide();
                        window.location.reload();
                    });
                }

                if (data.error) {

                    editViolationModal.hide();
                    this.modal.show();
                    this.modalText.textContent = `Failed to update. Try again later`;
                    this.modalText.className = 'text-danger';

                    evntLi.callEvent(this.okBtn, 'click', () => {

                        this.modal.hide();
                    });

                    throw new Error(data.error);
                }
            });
        }

        deleteRecord(url, vID) {

            const serverReq = new MakeServerRequest(url, vID);

            serverReq.sendData(() => {

                let data = serverReq.data;

                if (data.success) {

                    this.modal.show();
                    this.modalText.textContent = data.success;
                    this.modalText.className = 'text-success';

                    evntLi.callEvent(this.okBtn, 'click', () => {

                        this.modal.hide();
                        window.location.reload();
                    });
                }

                if (data.error) {
                    this.modal.show();
                    this.modalText.textContent = 'Deletion failed. Try again later';
                    this.modalText.className = 'text-danger';

                    evntLi.callEvent(this.okBtn, 'click', () => {

                        this.modal.hide();
                    });

                    throw new Error(data.error);
                }
            });
        }
    }

    class SelectOptionsManager {

        setOptionsForEditSelects() {

            const serverReq = new MakeServerRequest('../../services/php/Violations.php');

            serverReq.requestData(() => {

                let data = serverReq.data;

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

        setOriginalValue(url, vID) {

            const serverReq = new MakeServerRequest(url, vID);

            serverReq.sendData(() => {

                let data = serverReq.data;
                console.log(data)

                article.value = data.articleID;
                this.changeOptionOfArticleSection(data.articleSectionID);
                vDate.value = data.violationDate;
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
    const MVR = new ModifyViolationRecord();

    //
    selectOptionsmanager.setOptionsForEditSelects();

    //global vars
    const article = document.getElementById('article');
    const section = document.getElementById('section');
    const sanction = document.getElementById('sanction');
    const vDate = document.getElementById('vDate');
    const vID = document.getElementById('vID');

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

        const text = violationModifierModalText;

        text.innerHTML = `Modify this record associated with <b>${e.target.name}</b> (${e.target.lrn})?`;
        text.vID = e.target.vID;
        text.name = e.target.name;
        text.lrn = e.target.lrn;

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
        vID.value = violationID;
        selectOptionsmanager.setOriginalValue('../../services/php/ViolationLogs.php', `vID=${violationID}`);
    });

    //save changes
    event.globalEvent('click', '#save-vChanges', () => {

        const validateViolation = (() => {

            try {
                const serverReq = new MakeServerRequest('../../services/php/ValidateViolations.php', `article=${encodeURIComponent(article.value)}&section=${section.value}&sanction=${sanction.value}`);

                serverReq.sendData(() => {

                    let data = serverReq.data;

                    if (data.article === 'ok' && data.section === 'ok' && data.sanction === 'ok') {

                        const form = document.getElementById('edit-violation-record-form');
                        MVR.saveChanges('../../services/php/SaveViolationRecordChanges.php', form);
                    } else {
                        throw new Error('Invalid violation')
                    }
                });
            } catch (error) {
                console.error('Error: ' + error.message);
            }
        })();
    });

    const deleteModal = new bootstrap.Modal('#yes-no-modal');
    const deleteModaltext = document.getElementById('custom-modal-paragraph');

    //delete
    event.globalEvent('click', '#dlt-violation', () => {

        const student = violationModifierModalText;

        const yesBtn = document.getElementById('yes');

        const makeYesBtnRed = (() => {

            yesBtn.className = ' btn btn-danger';
        })();

        const name = student.name;
        const vID = student.vID;
        const lrn = student.lrn;

        console.log(vID);

        //close previous modal
        violationModifierModal.hide();

        //open delete modal
        deleteModal.show();
        deleteModaltext.innerHTML = `Delete Student <b>${name}</b> (${lrn})?`

        evntLi.callEvent(yesBtn, 'click', () => {

            deleteModal.hide();
            MVR.deleteRecord('../../services/php/DeleteViolationRecord.php', `vID=${vID}`);
        });
    });
});
