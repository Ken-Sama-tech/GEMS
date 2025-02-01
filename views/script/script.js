import MakeServerRequest from "../../services/js/ServerRequests";
import {
    Selector,
    CreateElement,
    SetAttribute,
    Append,
    EventListener,
    ClassList,
    Debounce
} from "../../includes/utils/js/domHelper";

document.addEventListener('DOMContentLoaded', () => {

    //utility instances ------------------------------
    const sel = new Selector();
    const attr = new SetAttribute();
    const appEl = new Append();
    const crte = new CreateElement();
    const eventListener = new EventListener();
    const useClassList = new ClassList();
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

                    const template = sel.getElemById(document, 'profile-box-temp');

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

                        const p = sel.querySelectAll(clone, 'p')
                        const img = sel.getElemById(clone, 'std-profile-img');

                        const name = `${data.lastName}, ${data.firstName} ${data.middleName} ${data.extensionName}`;
                        const lrn = data.learnerReferenceNumber;
                        const currAdd = data.current_address;
                        const permAdd = data.permanent_address;

                        const profileBox = sel.getElemById(clone, 'profile-box');
                        const pContainer = sel.getElemById(clone, 'p-container');

                        attr.setCusAttr(profileBox, 'data', 'visible');
                        attr.setCusAttr(profileBox, 'lrn', lrn);
                        attr.setCusAttr(pContainer, 'lrn', lrn);

                        p.forEach(ps => {
                            attr.setCusAttr(ps, 'lrn', lrn);
                        });

                        img.src = data.studentImg;
                        attr.setCusAttr(img, 'lrn', lrn);
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

                        appEl.appChild(profileBoxContainer, clone);

                        return {
                            name: name, lrn: lrn, elem: profileBox, sex: data.sex, currAdd: currAdd, permAdd: permAdd
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

                    useClassList.addClassList(data.elem, 'd-none');
                    attr.setCusAttr(data.elem, 'data', 'hidden');

                    const lrn = data.lrn.toString();

                    if (data.name.includes(person)) {
                        attr.setCusAttr(data.elem, 'data', 'visible');
                        useClassList.remClassList(data.elem, 'd-none');
                    }

                    if (lrn.includes(person)) {
                        attr.setCusAttr(data.elem, 'data', 'visible');
                        useClassList.remClassList(data.elem, 'd-none');
                    }

                    const female = sel.getElemById(document, 'filter-female');
                    const male = sel.getElemById(document, 'filter-male');

                    if (female.checked || male.checked) {
                        if (male.checked && data.sex !== "MALE") {
                            useClassList.addClassList(data.elem, 'd-none');
                            attr.setCusAttr(data.elem, 'data', 'hidden');
                        }

                        if (female.checked && data.sex !== "FEMALE") {
                            useClassList.addClassList(data.elem, 'd-none');
                            attr.setCusAttr(data.elem, 'data', 'hidden');
                        }

                        if (female.checked && male.checked && data.name.includes(person)) {
                            attr.setCusAttr(data.elem, 'data', 'visible');
                            useClassList.remClassList(data.elem, 'd-none');
                        }
                    }

                    const personAdd = filterViaAddress.value.toUpperCase();

                    if (!data.currAdd.includes(personAdd) && !data.permAdd.includes(personAdd)) {
                        useClassList.addClassList(data.elem, 'd-none');
                        attr.setCusAttr(data.elem, 'data', 'hidden');
                    }

                    const result = sel.querySelectAll(document, '[data = visible]');

                    if (result.length <= 0) {
                        profileBoxContainer.innerHTML = '<h1> No result found <h1>';
                    }

                });
            });
        }

        // filter(sex) {
        //     this.displayStudentData(() => {
        //         this.data.forEach(data => {

        //             if (sex !== data.sex) {
        //                 useClassList.addClassList(data.elem, 'd-none');
        //                 attr.setCusAttr(data.elem, 'data', 'hidden');
        //             }
        //         });
        //     });
        // }

    }

    class AddNewStudent {

        constructor() {
            this.data = [];
        }

        displayStudentData(templateId, whereToAppend, callback) {
            const serverReq = new MakeServerRequest('../../services/php/AllStdData.php');
            const showData = () => {

                serverReq.requestData(() => {

                    const template = sel.querySelect(document, templateId);
                    const parent = sel.querySelect(document, whereToAppend);
                    parent.innerHTML = '';
                    let rowNum = 0;

                    const data = serverReq.data;
                    this.data = data.map(dta => {
                        const clone = template.content.cloneNode(true);

                        const clonedRowNum = sel.getElemById(clone, 'row-num');
                        const clonedLrn = sel.getElemById(clone, 'td-lrn');
                        const clonedName = sel.getElemById(clone, 'td-name');
                        const clonedSex = sel.getElemById(clone, 'td-sex');
                        const clonedBtn = sel.querySelect(clone, 'button');
                        const clonedTr = sel.querySelect(clone, 'tr');

                        const dataLrn = `${dta.learnerReferenceNumber}`;
                        const dataName = `${dta.firstName} ${dta.middleName} ${dta.lastName} ${dta.extensionName}`;
                        const dataSex = `${dta.sex}`;

                        rowNum = rowNum + 1

                        clonedRowNum.textContent = rowNum;
                        clonedLrn.textContent = dataLrn;
                        clonedName.textContent = dataName;
                        clonedSex.textContent = dataSex;
                        clonedBtn.value = dataLrn;

                        attr.setCusAttr(clonedTr, 'state', 'is-visible');

                        appEl.appChild(parent, clone);

                        return { lrn: dataLrn, name: dataName, tr: clonedTr };
                    });

                    if (callback) {
                        callback(this.data);
                    }

                    const result = sel.querySelectAll(parent, '[state = is-visible]');

                    if (result.length <= 0) {
                        parent.innerHTML = '<h2>No Result Found<h2>';
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
                    useClassList.addClassList(dta.tr, 'd-none');
                    attr.setCusAttr(dta.tr, 'state', 'is-hidden');

                    if (dta.name.includes(search)) {
                        useClassList.remClassList(dta.tr, 'd-none');
                        attr.setCusAttr(dta.tr, 'state', 'is-visible');
                    }

                    if (dta.lrn.toString().includes(search)) {
                        useClassList.remClassList(dta.tr, 'd-none');
                        attr.setCusAttr(dta.tr, 'state', 'is-visible');
                    }
                });


            });
        }

    }

    class AddNewViolator {
        displayStudentOnTable() {
            const serverReq = new MakeServerRequest('../../services/php/AllStdData.php');

            const fetchStudentsData = () => {
                serverReq.requestData(() => {
                    const data = serverReq.data;
                    let num = 0;
                    const tBody = sel.getElemById(document, 'ANV-tbody');
                    const template = sel.getElemById(document, 'ANV-table-template');

                    data.forEach(dta => {

                        const clone = template.content.cloneNode(true);
                        const rowNum = sel.getElemById(clone, 'row-num');
                        const lrn = sel.getElemById(clone, 'td-lrn');
                        const name = sel.getElemById(clone, 'td-name');
                        const sex = sel.getElemById(clone, 'td-sex');
                        const selectedElement = sel.querySelectAll(clone, '[selected]');

                        const dataName = `${dta.firstName} ${dta.middleName} ${dta.lastName} ${dta.extensionName}`;
                        const dataLrn = dta.learnerReferenceNumber;
                        const dataSex = dta.sex;
                        num = num + 1;

                        rowNum.textContent = num;
                        lrn.textContent = dataLrn;
                        name.textContent = dataName;
                        sex.textContent = dataSex;

                        selectedElement.forEach(selected => {
                            selected.value = dataLrn;
                        })

                        tBody.appendChild(clone);
                    });
                });
            }

            return fetchStudentsData();
        }
    }

    //global variables && local intances -------------------------------------------------
    const SD = new StudentDirectory();
    const ANS = new AddNewStudent();
    const ANV = new AddNewViolator();
    //SD vars
    const profileBoxContainer = sel.getElemById(document, 'std-profile-box-container');
    const stdDirSearch = sel.getElemById(document, 'std-directory-search');
    const dataOrders = sel.querySelectAll(document, '[name = order]')
    const dataOrderDsc = sel.getElemById(document, 'sort-dsc');
    const sortViaLrn = sel.getElemById(document, 'sort-via-lrn');
    const sortViaName = sel.getElemById(document, 'sort-via-name');
    const stdDirFilter = sel.querySelectAll(document, '[name = filter]');
    const filterViaAddress = sel.getElemById(document, 'filter-address');

    //ANS vars
    const editSearch = sel.getElemById(document, 'search-std-to-edit');
    const delSearch = sel.getElemById(document, 'search-std-to-delete');
    //ANV vars

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
    }, 300)

    if (delSearch || editSearch) {

        const showEditableData = () => {
            ANS.search('#ANS-edt-table-template', '#displayEditableStudentHere', editSearch);
        }
        showEditableData();

        const showDeletableData = () => {
            ANS.search('#ANS-dlt-table-template', '#displayDeletableStudentHere', delSearch);
        }

        showDeletableData();

        eventListener.callEvent(editSearch, 'input', () => {
            updateEditableDisplay();
        });

        eventListener.callEvent(delSearch, 'input', () => {
            updateDeletableDisplay();
        });
    }

    //ANV -------------------------------------------------------------------------------------------
    ANV.displayStudentOnTable();

});