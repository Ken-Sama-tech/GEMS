import MakeServerRequest from "../../services/js/ServerRequests";
import {
    EventListener,
    Debounce
} from "../../includes/utils/js/domHelper";

document.addEventListener('DOMContentLoaded', () => {

    //utility instances ------------------------------
    const eventListener = new EventListener();
    const debounce = new Debounce();

    //internal classes ---------------------------------
    class StudentDirectory {

        constructor() {
            this.data = [];
        }

        displayStudentData(callback) {

            const serverReq = new MakeServerRequest('../../services/php/AllStdData.php');
            profileBoxContainer.innerHTML = '';

            const showStudentData = () => {
                serverReq.requestData(() => {

                    let datas = serverReq.data;

                    const template = document.getElementById('profile-box-temp');

                    if (sortViaLrn.checked) {
                        if (dataOrderDsc.checked) {
                            datas.sort((a, b) => b.learnerReferenceNumber - a.learnerReferenceNumber);
                        } else {
                            datas.sort((a, b) => a.learnerReferenceNumber - b.learnerReferenceNumber);
                        }
                    }

                    if (sortViaName.checked) {
                        if (dataOrderDsc.checked) {
                            datas.sort((a, b) => b.lastName.localeCompare(a.lastName));
                        } else {
                            datas.sort((a, b) => a.lastName.localeCompare(b.lastName));
                        }
                    }

                    this.data = datas.map(data => {
                        const clone = template.content.cloneNode(true);

                        const p = clone.querySelectorAll('p')
                        const img = clone.getElementById('std-profile-img');

                        const name = `${data.lastName}, ${data.firstName} ${data.middleName} ${data.extensionName}`;
                        const lrn = data.learnerReferenceNumber;
                        const currAdd = data.current_address;
                        const permAdd = data.permanent_address;

                        const profileBox = clone.getElementById('profile-box');
                        const pContainer = clone.getElementById('p-container');

                        profileBox.setAttribute('data', 'visible');
                        profileBox.setAttribute('lrn', lrn);
                        pContainer.setAttribute('lrn', lrn);

                        p.forEach(ps => {
                            ps.setAttribute('lrn', lrn)
                        });

                        img.src = data.studentImg;
                        img.setAttribute('lrn', lrn);
                        p[0].innerHTML = `<span class="fw-bolder">Name: </span> ${name}`;
                        p[1].innerHTML = `<span class="fw-bolder">LRN: </span> ${lrn}`;
                        p[2].innerHTML = `<span class="fw-bolder">Civil Status: </span> ${data.civilStatus}`;
                        p[3].innerHTML = `<span class="fw-bolder">Birthdate: </span> ${data.birthDate}`;
                        p[4].innerHTML = `<span class="fw-bolder">Sex: </span> ${data.sex}`;
                        p[5].innerHTML = `<span class="fw-bolder">Nationality: </span> ${data.nationality}`;
                        p[6].innerHTML = `<span class="fw-bolder">Religion: </span> ${data.religion}`;
                        p[7].innerHTML = `<span class="fw-bolder">Email: </span> ${data.email}`;
                        p[8].innerHTML = `<span class="fw-bolder">Phone Number: </span> ${data.phoneNumber}`;
                        p[9].innerHTML = `<span class="fw-bolder">Current Address: </span> ${currAdd}`;
                        p[10].innerHTML = `<span class="fw-bolder">Permanent Address: </span> ${permAdd}`;

                        profileBoxContainer.appendChild(clone);

                        console.log(name);

                        const removeExtraWhiteSpaces = (param) => {

                            const arry = param.split(' ');

                            const filter = arry.filter(s => {
                                if (s !== '') {
                                    return s;
                                }
                            });

                            const str = filter.join(' ');

                            return str;
                        }

                        return {
                            name: removeExtraWhiteSpaces(name), lrn: lrn, elem: profileBox, sex: data.sex, currAdd: currAdd, permAdd: permAdd
                        };
                    });

                    if (callback) {
                        callback(this.data);
                    }
                });
            }

            return showStudentData();
        }

        search() {

            const person = stdDirSearch.value.toUpperCase();
            this.displayStudentData(() => {
                this.data.forEach(data => {

                    let box = data.elem

                    box.classList.add('d-none');
                    box.setAttribute('data', 'hidden');

                    const lrn = data.lrn.toString();

                    if (data.name.includes(person)) {
                        box.classList.remove('d-none');
                        box.setAttribute('data', 'visible');
                    }

                    if (lrn.includes(person)) {
                        box.classList.remove('d-none');
                        box.setAttribute('data', 'visible');
                    }

                    const female = document.getElementById('filter-female');
                    const male = document.getElementById('filter-male');

                    if (female.checked || male.checked) {
                        if (male.checked && data.sex !== "MALE") {
                            box.classList.add('d-none');
                            box.setAttribute('data', 'hidden');
                        }

                        if (female.checked && data.sex !== "FEMALE") {
                            box.classList.add('d-none');
                            box.setAttribute('data', 'hidden');
                        }

                        if (female.checked && male.checked && data.name.includes(person)) {
                            box.classList.remove('d-none');
                            box.setAttribute('data', 'visible');
                        }
                    }

                    const personAdd = filterViaAddress.value.toUpperCase();

                    if (!data.currAdd.includes(personAdd) && !data.permAdd.includes(personAdd)) {
                        box.classList.add('d-none');
                        box.setAttribute('data', 'hidden');
                    }

                    const result = document.querySelectorAll('[data = visible]');

                    if (result.length <= 0) {
                        profileBoxContainer.innerHTML = '<h2> No students found matching your criteria <h2>';
                    }

                });
            });
        }
    }

    class AddNewStudent {

        constructor() {
            this.data = [];
        }

        displayStudentData(templateId, whereToAppend, callback) {
            const serverReq = new MakeServerRequest('../../services/php/AllStdData.php');
            const showData = () => {

                serverReq.requestData(() => {

                    const template = document.querySelector(templateId);
                    const parent = document.querySelector(whereToAppend);
                    parent.innerHTML = '';
                    let rowNum = 0;

                    const data = serverReq.data;
                    this.data = data.map(dta => {
                        const clone = template.content.cloneNode(true);

                        const clonedRowNum = clone.getElementById('row-num');
                        const clonedLrn = clone.getElementById('td-lrn');
                        const clonedName = clone.getElementById('td-name');
                        const clonedSex = clone.getElementById('td-sex');
                        const clonedBtn = clone.querySelector('button');
                        const clonedTr = clone.querySelector('tr');

                        const dataLrn = `${dta.learnerReferenceNumber}`;
                        const dataName = `${dta.firstName} ${dta.middleName} ${dta.lastName} ${dta.extensionName}`;
                        const dataSex = `${dta.sex}`;

                        const covertDataNameToArray = dataName.split(' ');

                        const filterEmptyString = covertDataNameToArray.filter(item => item !== '');

                        const convertDataNameBackToString = filterEmptyString.join(' ');

                        rowNum = rowNum + 1

                        clonedRowNum.textContent = rowNum;
                        clonedLrn.textContent = dataLrn;
                        clonedName.textContent = dataName;
                        clonedSex.textContent = dataSex;
                        clonedBtn.value = dataLrn;

                        clonedTr.setAttribute('state', 'is-visible');

                        parent.appendChild(clone);

                        return { lrn: dataLrn, name: convertDataNameBackToString, tr: clonedTr };
                    });

                    if (callback) {
                        callback(this.data);
                    }

                    const result = parent.querySelectorAll('[state = is-visible]');

                    if (result.length <= 0) {
                        parent.innerHTML = '<h2 class="position-absolute">No students found matching your criteria<h2>';
                    }
                });
            }

            return showData();
        }

        search(templateId, whereToAppend, element) {
            this.displayStudentData(templateId, whereToAppend, () => {

                const data = this.data;
                const search = element.value.toUpperCase();

                data.forEach(dta => {

                    const tr = dta.tr;

                    tr.classList.add('d-none');
                    tr.setAttribute('state', 'is-hidden');


                    if (dta.name.includes(search)) {
                        tr.classList.remove('d-none');
                        tr.setAttribute('state', 'is-visible');
                    }



                    if (dta.lrn.toString().includes(search)) {
                        tr.classList.remove('d-none');
                        tr.setAttribute('state', 'is-visible');
                    }
                });


            });
        }

    }

    class AddNewViolator {

        constructor() {
            this.data = [];
            this.tBody = document.getElementById('ANV-tbody');
        }

        displayStudentOnTable(callback) {

            const serverReq = new MakeServerRequest('../../services/php/AllStdData.php');

            const fetchStudentsData = () => {
                serverReq.requestData(() => {
                    this.tBody.innerHTML = '';

                    const data = serverReq.data;
                    let num = 0;
                    const template = document.getElementById('ANV-table-template');

                    this.data = data.map(dta => {

                        const clone = template.content.cloneNode(true);
                        const rowNum = clone.getElementById('row-num');
                        const lrn = clone.getElementById('td-lrn');
                        const name = clone.getElementById('td-name');
                        const sex = clone.getElementById('td-sex');

                        const tableRow = clone.getElementById('ANV-table-row');
                        const selectedElement = clone.querySelectorAll('[selected]');

                        const dataName = `${dta.firstName} ${dta.middleName} ${dta.lastName} ${dta.extensionName}`;
                        const dataLrn = dta.learnerReferenceNumber;
                        const dataSex = dta.sex;
                        const studentID = dta.studentID;
                        num = num + 1;

                        rowNum.textContent = num;
                        lrn.textContent = dataLrn;
                        name.textContent = dataName;
                        sex.textContent = dataSex;

                        selectedElement.forEach(selected => {
                            selected.lrn = dataLrn;
                            selected.name = dataName;
                            selected.sex = dataSex;
                            selected.stdId = studentID;
                        });

                        this.tBody.appendChild(clone);

                        const convertedDataNameToArray = dataName.split(' ');

                        const removeEmptyString = convertedDataNameToArray.filter(name => {
                            if (name !== '') {
                                return name;
                            }
                        });

                        const convertedTheArrayBackToString = removeEmptyString.join(' ');

                        const filteredName = convertedTheArrayBackToString;

                        return { name: dataName, lrn: filteredName, row: tableRow }

                    });

                    if (callback) {
                        callback(this.data);
                    }
                });
            }

            return fetchStudentsData();
        }

        //set options on selects
        setSelectOptions(url) {
            const serverReq = new MakeServerRequest(url);

            const setOptions = () => {
                serverReq.requestData(() => {
                    const data = serverReq.data;

                    const articles = data.articles;
                    const sections = data.articleSections;
                    const sanctions = data.sanctions;

                    let num = 0;

                    articles.forEach(article => {
                        num++
                        selectArticle.innerHTML += `<option id="articles" value="${article.articleID}">${num}. ${article.article}</option>`;
                    });

                    eventListener.callEvent(selectArticle, 'change', () => {
                        selectArticleSection.innerHTML = '' + `<option value="0" id="article-sections">Select Section</option>`;
                        sections.forEach(section => {

                            if (section.articleID == selectArticle.value) {
                                selectArticleSection.innerHTML += `<option id="article-sections" value="${section.articleSectionID}">
                                 ${section.articleSection}</option>`;
                            }
                        });
                    });

                    num = 0;

                    sanctions.forEach(sanction => {
                        num++
                        selectSanction.innerHTML += `<option id="sanctions" value="${sanction.sanctionID}">${num}. ${sanction.sanction}</option>`;
                    });

                });
            }

            return setOptions();
        }
    }

    class ViolationLog {

        constructor() {
            this.data = [];
        }

        displayViolators(callback) {

            const serverReq = new MakeServerRequest('../../services/php/FetchViolators.php');

            const violators = () => {

                const tBody = document.getElementById('violation-log-tBody');

                serverReq.requestData(() => {

                    let data = serverReq.data;

                    console.log(data)

                    let rowNum = 0;
                    const template = document.getElementById('violation-log-template');

                    this.data = data.map(d => {

                        const clone = template.content.cloneNode(true);
                        const row = clone.getElementById('row-num');
                        const lrn = clone.getElementById('lrn');
                        const name = clone.getElementById('name');
                        const sex = clone.getElementById('sex');
                        const violation = clone.getElementById('violation');
                        const date = clone.getElementById('date');

                        const removeExtraWhiteSpaces = (param) => {
                            const arry = param.split(' ');

                            const filter = arry.filter(item => {
                                if (item !== '')
                                    return item
                            });

                            return filter.join(' ');

                        };

                        const showViolation = () => {

                            return `Article ${d.article}, ${d.articleSection}, Sanction: ${d.sanction}`;

                        }

                        const dLrn = d.lrn;
                        const dName = removeExtraWhiteSpaces(d.name);
                        const dSex = d.sex;
                        const dViolation = `${showViolation()}`;

                        console.log(dViolation);
                    });

                });
            };

            return violators();

        }
    }

    //global variables && local intances -------------------------------------------------
    const SD = new StudentDirectory();
    const ANS = new AddNewStudent();
    const ANV = new AddNewViolator();
    const VL = new ViolationLog();
    //SD vars
    const profileBoxContainer = document.getElementById('std-profile-box-container');
    const stdDirSearch = document.getElementById('std-directory-search');
    const dataOrders = document.querySelectorAll('[name = order]')
    const dataOrderDsc = document.getElementById('sort-dsc');
    const sortViaLrn = document.getElementById('sort-via-lrn');
    const sortViaName = document.getElementById('sort-via-name');
    const stdDirFilter = document.querySelectorAll('[name = filter]');
    const filterViaAddress = document.getElementById('filter-address');
    //ANS vars
    const editSearch = document.getElementById('search-std-to-edit');
    const delSearch = document.getElementById('search-std-to-delete');
    //ANV vars
    const selectArticle = document.getElementById('article');
    const selectArticleSection = document.getElementById('article-section');
    const selectSanction = document.getElementById('sanction');
    const addViolatorSearch = document.getElementById('add-violator-search');
    //Vl vars

    // SD -------------------------------------------------------------------------------------------
    // search event ----------------------------------------------
    // search w/ debounce
    const updateDSD = debounce.debounce(() => {
        SD.search();
    }, 300);

    //sort 
    const sortSDDisplayedData = () => {

        dataOrders.forEach(dataOrder => {
            eventListener.callEvent(dataOrder, 'change', () => {
                updateDSD();
            })
        });
    };

    if (stdDirSearch) {
        SD.displayStudentData();

        eventListener.callEvent(stdDirSearch, 'input', () => {

            updateDSD();

        });

        //filters
        stdDirFilter.forEach(box => {
            //filter is inside search function of std directory class
            //why? figure it out yourself 
            eventListener.callEvent(box, 'change', () => {
                updateDSD();
            });
        });

        eventListener.callEvent(filterViaAddress, 'input', () => {
            updateDSD();
        });

        sortSDDisplayedData();
    }

    // ANS ------------------------------------------------------------------------------------------
    //search events ----------------------------------------------
    //debounce search event.
    const updateEditableDisplay = debounce.debounce(() => {
        showEditableData();
    }, 300);

    const updateDeletableDisplay = debounce.debounce(() => {
        showDeletableData();
    }, 300);

    const showEditableData = () => {
        ANS.search('#ANS-edt-table-template', '#displayEditableStudentHere', editSearch);
    }

    const showDeletableData = () => {
        ANS.search('#ANS-dlt-table-template', '#displayDeletableStudentHere', delSearch);
    }

    if (delSearch || editSearch) {

        showEditableData();

        showDeletableData();

        eventListener.callEvent(editSearch, 'input', () => {
            updateEditableDisplay();
        });

        eventListener.callEvent(delSearch, 'input', () => {
            updateDeletableDisplay();
        });
    }

    //ANV -------------------------------------------------------------------------------------------
    //search events ----------------------------------------------
    //debounce search event.
    class AVSSearch extends AddNewViolator {

        search() {

            this.displayStudentOnTable(() => {

                let infos = this.data;

                const search = addViolatorSearch.value.toUpperCase();

                infos.forEach(info => {

                    const tr = info.row;

                    tr.setAttribute('state', 'is-visible');

                    if (!info.name.includes(search) && !info.lrn.toString().includes(search)) {
                        tr.classList.add('d-none');
                        tr.setAttribute('state', 'is-hidden');
                    }

                });

                const visibleTR = document.querySelectorAll('[state = is-visible]');

                if (visibleTR.length <= 0) {
                    this.tBody.innerHTML = '<h2> No students found matching your criteria <h2>';
                }
            });
        }
    }

    const AVSS = new AVSSearch();

    const updateAVSS = debounce.debounce(() => {
        AVSS.search();
    }, 300);

    if (addViolatorSearch) {

        eventListener.callEvent(addViolatorSearch, 'input', () => {
            updateAVSS();
        });

        ANV.displayStudentOnTable();
        ANV.setSelectOptions('../../services/php/Violations.php');
    }

    //VIOLATION LOG ---------------------------------------------------------------------------------
    VL.displayViolators();
});