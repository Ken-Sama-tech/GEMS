import MakeServerRequest from "../services/js/ServerRequests";
import {
    EventListener,
    Debounce
} from "../includes/utils/js/domHelper";

document.addEventListener('DOMContentLoaded', () => {

    //utility instances ------------------------------
    const eventListener = new EventListener();
    const util = new Debounce();

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

                    if (datas.exception)
                        throw new Error(datas.exception);

                    const template = document.getElementById('profile-box-temp');

                    // if (sortViaLrn.checked) {
                    //     if (dataOrderDsc.checked) {
                    //         datas.sort((a, b) => b.learnerReferenceNumber - a.learnerReferenceNumber);
                    //     } else {
                    //         datas.sort((a, b) => a.learnerReferenceNumber - b.learnerReferenceNumber);
                    //     }
                    // }

                    if (sortViaName.checked) {
                        if (dataOrderDsc.checked) {
                            datas.sort((a, b) => (b.lastName + ' ' + b.firstName + ' ' + b.middleName + ' ' + b.extensionName).localeCompare(a.lastName + ' ' + a.firstName + ' ' + a.middleName + ' ' + b.extensionName));
                        } else {
                            datas.sort((a, b) => (a.lastName + ' ' + a.firstName + ' ' + a.middleName + ' ' + a.extensionName).localeCompare(b.lastName + ' ' + b.firstName + ' ' + b.middleName + ' ' + b.extensionName));
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
                            name: removeExtraWhiteSpaces(name),
                            lrn: lrn,
                            elem: profileBox,
                            sex: data.sex,
                            currAdd: currAdd,
                            permAdd: permAdd
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

                    if (male.checked && data.sex == "FEMALE") {
                        box.classList.add('d-none');
                        box.setAttribute('data', 'hidden');
                    }

                    if (female.checked && data.sex == "MALE") {
                        box.classList.add('d-none');
                        box.setAttribute('data', 'hidden');
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

                    if (data.exception)
                        throw new Error(data.exception);

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

                        return {
                            lrn: dataLrn,
                            name: convertDataNameBackToString,
                            tr: clonedTr
                        };
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

                    if (data.exception)
                        throw new Error(data.exception);

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

                        return {
                            name: filteredName,
                            lrn: dataLrn,
                            row: tableRow
                        }

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

                    if (data.exception)
                        throw new Error(data.exception);

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
            this.tBody = document.getElementById('violation-log-tBody');
        }

        displayViolators(callback) {

            const serverReq = new MakeServerRequest('../../services/php/FetchViolators.php');

            const violators = () => {

                this.tBody.innerHTML = '';

                serverReq.requestData(() => {

                    let data = serverReq.data;

                    if (data.exception)
                        throw new Error(data.exception);

                    let rowNum = 1;
                    const template = document.getElementById('violation-log-template');

                    this.data = data.map(d => {

                        const clone = template.content.cloneNode(true);

                        const tr = clone.getElementById('VL-tr');
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

                        const isShowDescriptionChecked = () => {

                            if (showViolationDescription.checked)
                                return `<mark class="VL-marks" id="VL-article">${d.articleDesc}</mark>, <mark class="VL-marks" id="VL-section">${d.articleSectionDesc}</mark>, <mark class="VL-marks" id="VL-sanction">${d.sanction}</mark>`;
                            else
                                return `<mark class="VL-marks" id="VL-article"> ARTICLE ${d.article} </mark>, <mark class="VL-marks" id="VL-section">${d.articleSection}</mark>, <mark class="VL-marks" id="VL-sanction"> SANCTION: ${d.sanction}</mark`;
                        }

                        const dLrn = d.lrn;
                        const dName = removeExtraWhiteSpaces(d.name);
                        const dSex = d.sex;
                        const dViolation = `${isShowDescriptionChecked()}`;
                        const dDate = d.violationDate;

                        const setClonedObjectAttribute = (() => {
                            const arr = [tr, row, lrn, name, sex, violation, date];

                            arr.forEach(item => {
                                item.vID = d.vID;
                                item.lrn = dLrn;
                                item.name = dName
                            });
                        })();

                        row.textContent = rowNum++;
                        lrn.textContent = dLrn;
                        name.textContent = dName;
                        sex.textContent = dSex;
                        violation.innerHTML = dViolation;
                        date.textContent = dDate;

                        this.tBody.appendChild(clone);

                        return {
                            lrn: dLrn,
                            name: dName,
                            sex: dSex,
                            violation: `ARTICLE ${d.article}, ${d.articleSection}, SANCTION: ${d.sanction}`,
                            trow: tr
                        }
                    });

                    if (callback) {
                        callback(this.data);
                    }

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
    const dataOrders = document.querySelectorAll('[name = order]');
    const dataOrderDsc = document.getElementById('sort-dsc');
    // const sortViaLrn = document.getElementById('sort-via-lrn');
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
    const VLSetting = document.querySelectorAll('[name = VL-setting]');
    const showViolationDescription = document.getElementById('VL-show-description');
    const VLInputs = document.querySelectorAll('[name = VL-input]');
    const violationLogSearch = document.getElementById('VL-search');
    const filterViaViolation = document.getElementById('VL-filter-violation');
    const filterMale = document.getElementById('VL-filter-male');
    const filterFemale = document.getElementById('VL-filter-female');

    // SD -------------------------------------------------------------------------------------------
    // search event ----------------------------------------------
    // search w/ debounce
    const updateDSD = util.debounce(() => {
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
    const updateEditableDisplay = util.debounce(() => {
        showEditableData();
    }, 300);

    const updateDeletableDisplay = util.debounce(() => {
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
    class ANVSSearch extends AddNewViolator {

        search() {

            this.displayStudentOnTable(() => {

                let infos = this.data;
                console.log(infos)
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

    const ANVSS = new ANVSSearch();

    const updateANVSS = util.debounce(() => {
        ANVSS.search();
    }, 300);

    if (addViolatorSearch) {

        eventListener.callEvent(addViolatorSearch, 'input', () => {
            updateANVSS();
        });

        ANV.displayStudentOnTable();
        ANV.setSelectOptions('../../services/php/Violations.php');
    }

    // VIOLATION LOG---------------------------------------------------------------------------------
    class VLSearch extends ViolationLog {

        search() {
            this.displayViolators(() => {
                const data = this.data;

                const search = violationLogSearch.value.toUpperCase();
                const filterViolation = filterViaViolation.value.toUpperCase();

                data.forEach(d => {
                    const tr = d.trow;

                    tr.setAttribute('state', 'visible');

                    if (!d.name.includes(search) && !d.lrn.toString().includes(search)) {
                        tr.classList.add('d-none');
                        tr.setAttribute('state', 'hidden');
                    }

                    if (!d.violation.includes(filterViolation)) {
                        tr.classList.add('d-none');
                        tr.setAttribute('state', 'hidden');
                    }

                    if (filterMale.checked && d.sex == 'FEMALE') {
                        tr.classList.add('d-none');
                        tr.setAttribute('state', 'hidden');
                    }

                    if (filterFemale.checked && d.sex == 'MALE') {
                        tr.classList.add('d-none');
                        tr.setAttribute('state', 'hidden');
                    }
                });

                const result = document.querySelectorAll('[state = visible]');

                if (result.length <= 0)
                    this.tBody.innerHTML = '<h2 class="position-absolute"> No students found matching your criteria <h2>';

            });
        }
    }

    const VLS = new VLSearch();

    const updateVLS = util.debounce(() => {
        VLS.search();
    }, 300);

    if (violationLogSearch) {

        VL.displayViolators();

        VLSetting.forEach(cb => {
            eventListener.callEvent(cb, 'change', () => {

                updateVLS();
            });
        });

        eventListener.callEvent(violationLogSearch, 'input', () => {
            updateVLS();
        });

        VLInputs.forEach(inpt => {

            eventListener.callEvent(inpt, 'input', () => {
                updateVLS();
            });
        });
    }

    // Registration ------------------------------------------------------------------------------------

    //classes -----------------------------------------------------------
    class Registration {

        constructor() {
            this.data = [];
            this.tBody = document.getElementById('reg-tBody');
        }

        displayStudent(callback) {

            const serverReq = new MakeServerRequest('../../services/php/AllStdData.php');
            const template = document.getElementById('reg-table-template');


            const removeWhiteExtraWhiteSpace = (param) => {

                const arr = param.split(' ');

                const filter = arr.filter(str => {
                    if (str !== '')
                        return str;
                });

                const string = filter.join(' ');

                return string;
            };

            serverReq.requestData(() => {

                let data = serverReq.data;

                if (data.exception)
                    throw new Error(data.exception);

                let num = 1;

                this.data = data.map(d => {

                    const clone = template.content.cloneNode(true);

                    const tr = clone.querySelector('.reg-tr');
                    const rowNum = clone.getElementById('row-num');
                    const lrn = clone.getElementById('reg-td-lrn');
                    const name = clone.getElementById('reg-td-name');
                    const sex = clone.getElementById('reg-td-sex');

                    const dLrn = d.learnerReferenceNumber;
                    const dName = removeWhiteExtraWhiteSpace(`${d.firstName} ${d.middleName} ${d.lastName} ${d.extensionName}`);
                    const dSex = d.sex;

                    rowNum.textContent = num++;
                    lrn.textContent = dLrn;
                    name.textContent = dName;
                    sex.textContent = dSex;

                    tr.sID = d.studentID;

                    this.tBody.appendChild(clone);
                });

                if (callback) {
                    callback(this.data);
                }
            });
        }

        setRegistrationGradeLevelOption() {

            const serverReq = new MakeServerRequest('../../services/php/GradeLevels.php');

            serverReq.requestData(() => {

                let data = serverReq.data;

                if (data.exception)
                    throw new Error(data.exception);

                const selectGradeLevel = document.querySelectorAll('#select-grade-level');

                data.forEach(d => {

                    selectGradeLevel.forEach(select => {
                        select.innerHTML += `<option id="option" value="${d.gradeLevelID}"> ${d.educationLevel} ${d.gradeLevel}`;
                    });
                });
            })
        }

        setSectionsForEachGrade() {
            const serverReq = new MakeServerRequest('../../services/php/Sections.php');

            serverReq.requestData(() => {

                let data = serverReq.data;

                if (data.exception)
                    throw new Error(data.exception);

                const forms = [...document.querySelectorAll('#registration-form')];

                const sectionsForEachForm = (index) => {

                    const gradeLev = forms[index].querySelector('#select-grade-level');
                    const gradeSec = forms[index].querySelector('#select-grade-section');

                    eventListener.callEvent(gradeLev, 'change', () => {

                        sectionsForEachForm(index);
                    });

                    gradeSec.innerHTML = '<option id="option" value="0">Select Section</option>';

                    data.forEach(d => {
                        if (gradeLev.value != d.gradeLevelID)
                            return
                        gradeSec.innerHTML += `<option id="option" value="${d.sectionID}">${d.section}</option>`;
                    });
                }

                for (let i = 0; i < forms.length; i++) {
                    sectionsForEachForm([i]);
                }
            });
        }
    }

    //instances 
    const reg = new Registration();

    // reg.displayStudent();
    // reg.setSectionsForEachGrade();
    // reg.setRegistrationGradeLevelOption();

    // //vars
    // const regSearch = document.getElementById('reg-search');

    // eventListener.callEvent(regSearch, 'input', (e) => {

    //     reg.displayStudent();
    //     console.log(e.target.value)
    // });
});