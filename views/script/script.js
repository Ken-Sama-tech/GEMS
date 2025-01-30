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


    // end -------------------------------------------

    //internal classes ---------------------------------
    class AddNewStudent {

        displayEditableStudentsData = () => {

            const reqData = new MakeServerRequest('../../services/php/AllStdData.php');

            const showStudent = () => {

                const tBody = sel.getElemById(document, 'displayEditableStudentHere');

                reqData.requestData(() => {

                    let data = reqData.data;

                    for (let i = 0; i < data.length; i++) {

                        const lrn = data[i].learnerReferenceNumber;
                        const name = `${data[i].firstName} ${data[i].lastName} ${data[i].extensionName}`;
                        const sex = data[i].sex;

                        const displayedArr = [lrn, name, sex];

                        //convert edit search value to uppercase and name it person
                        const person = editSearch.value.toUpperCase();

                        if (name.includes(person) || lrn.toString().includes(person)) {

                            const tr = crte.crteElem('tr');
                            attr.setId(tr, 'editable-std');
                            appEl.appChild(tBody, tr);

                            const th = crte.crteElem('th');
                            attr.setCusAttr(th, 'scope', 'row');
                            th.textContent = i + 1;

                            appEl.appChild(tr, th);
                            displayedArr.forEach(data => {
                                const td = crte.crteElem('td');
                                td.textContent = data;

                                appEl.appChild(tr, td);
                            });

                            const btn = crte.crteElem('button');
                            btn.textContent = 'Edit';
                            attr.setId(btn, 'edtBtn');
                            btn.className = 'btn btn-success col-8';
                            btn.value = data[i].learnerReferenceNumber;
                            attr.setCusAttr(btn, 'data-bs-toggle', 'modal');
                            attr.setCusAttr(btn, 'data-bs-target', '#edit-std-modal');

                            appEl.appChild(tr, btn);
                        }

                    }
                    const result = sel.querySelectAll(document, '#editable-std');

                    if (result.length <= 0) {
                        tBody.innerHTML = '<h1> No result found <h1>';
                    }
                });
            }

            return showStudent();
        }

        displayDeletableStudentsData = () => {

            const reqData = new MakeServerRequest('../../services/php/AllStdData.php');

            const showData = () => {
                const tBody = sel.getElemById(document, 'displayDeletableStudentHere');

                reqData.requestData(() => {

                    let data = reqData.data;

                    for (let i = 0; i < data.length; i++) {

                        const lrn = data[i].learnerReferenceNumber;
                        const name = `${data[i].firstName} ${data[i].lastName} ${data[i].extensionName}`;
                        const sex = data[i].sex;

                        const displayedArr = [lrn, name, sex];

                        // convert search value to uppercase then again call it person

                        const person = delSearch.value.toUpperCase();

                        if (name.includes(person) || lrn.toString().includes(person)) {

                            const tr = crte.crteElem('tr');
                            attr.setId(tr, 'deletable-std');

                            appEl.appChild(tBody, tr);

                            const th = crte.crteElem('th');
                            attr.setCusAttr(th, 'scope', 'row');
                            th.textContent = i + 1;

                            appEl.appChild(tr, th);

                            displayedArr.forEach(data => {
                                const td = crte.crteElem('td');
                                td.textContent = data;

                                appEl.appChild(tr, td);
                            });

                            const btn = crte.crteElem('button');
                            btn.textContent = 'Delete';
                            attr.setId(btn, 'dltBtn');
                            btn.className = 'btn btn-danger col-8';
                            btn.value = data[i].learnerReferenceNumber;
                            attr.setCusAttr(btn, 'data-bs-toggle', 'modal');
                            attr.setCusAttr(btn, 'data-bs-target', '#yes-no-modal');

                            appEl.appChild(tr, btn);
                        }

                        const result = sel.querySelectAll(document, '#deletable-std');

                        if (result.length <= 0) {
                            tBody.innerHTML = '<h1> No result found <h1>';
                        }
                    }
                });
            }

            return showData();
        }

    }

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
                        p[9].innerHTML = `<span class="fw-bolder">Current Address: </span> ${data.current_address}`;
                        p[10].innerHTML = `<span class="fw-bolder">Permanent Address: </span> ${data.permanent_address}`;

                        appEl.appChild(profileBoxContainer, clone);

                        return {
                            name: name, lrn: lrn, elem: profileBox, sex: data.sex
                        };
                    });

                    if (callback) {
                        callback(this.data);
                    }
                });
            }

            return showStudentData();
        }

        search(sex) {

            const person = stdDirSearch.value.toUpperCase();
            this.displayStudentData(() => {
                this.data.forEach(data => {
                    const lrn = data.lrn.toString();

                    if (!data.name.includes(person)) {
                        useClassList.addClassList(data.elem, 'd-none');
                        attr.setCusAttr(data.elem, 'data', 'hidden');
                    }

                    if (lrn.includes(person)) {
                        attr.setCusAttr(data.elem, 'data', 'visible');
                        useClassList.remClassList(data.elem, 'd-none');
                    }

                    const female = sel.getElemById(document, 'filter-female');
                    const male = sel.getElemById(document, 'filter-male');

                    if (female.checked || male.checked) {
                        if (data.sex !== sex) {
                            useClassList.addClassList(data.elem, 'd-none');
                            attr.setCusAttr(data.elem, 'data', 'hidden');
                        }
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
    // end ---------------------------------------------

    //global variables && local intances -------------------------------------------------
    const SD = new StudentDirectory();
    const ANS = new AddNewStudent();
    const editSearch = sel.getElemById(document, 'search-std-to-edit');
    const delSearch = sel.getElemById(document, 'search-std-to-delete');
    const profileBoxContainer = sel.getElemById(document, 'std-profile-box-container');
    const stdDirSearch = sel.getElemById(document, 'std-directory-search');
    const dataOrders = sel.querySelectAll(document, '[name = order]')
    const dataOrderDsc = sel.getElemById(document, 'sort-dsc');
    const sortViaLrn = sel.getElemById(document, 'sort-via-lrn');
    const sortViaName = sel.getElemById(document, 'sort-via-name');
    const stdDirFilter = sel.querySelectAll(document, '[name = filter]');
    let sex = '';
    // const filter = 
    // end ------------------------------------------------------------------------------

    // ANS ------------------------------------------------------------------------------------------
    //search events ----------------------------------------------
    //debounce search event. (DESD) display editable student data
    const updateDESD = debounce.debounce(() => {
        ANS.displayEditableStudentsData();
    }, 500);

    //debounce search event. (DDSD) display deletable student data
    const updateDDSD = debounce.debounce(() => {
        ANS.displayDeletableStudentsData();
    }, 500);

    if (delSearch || editSearch) {
        //put this inside a if statement, so there'd be no error when other page use this js file || 177013 if you know, you know
        ANS.displayEditableStudentsData();
        ANS.displayDeletableStudentsData();

        eventListener.callEvent(editSearch, 'input', () => {
            const tBody = sel.getElemById(document, 'displayEditableStudentHere');
            tBody.innerHTML = '';
            updateDESD();
        });

        eventListener.callEvent(delSearch, 'input', () => {
            const tBody = sel.getElemById(document, 'displayDeletableStudentHere');
            tBody.innerHTML = '';
            updateDDSD();
        });
    }

    //end --------------------------------------------------------
    // end of ANS -----------------------------------------------------------------------------------

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

    //filter 

    stdDirFilter.forEach(box => {
        //filter is inside search function of std directory class
        //why? figure it out yourself 
        eventListener.callEvent(box, 'change', () => {
            const female = sel.getElemById(document, 'filter-female');
            const male = sel.getElemById(document, 'filter-male');

            if (female.checked && male.checked) {
                box.checked = false;
            }

            if (female.checked) {
                sex = 'FEMALE';
            }

            if (male.checked) {
                sex = 'MALE';
            }

            if (sex !== '') {
                SD.search(sex)
            }

        });
    })


    if (stdDirSearch) {
        SD.displayStudentData();

        eventListener.callEvent(stdDirSearch, 'input', () => {

            updateDSD();

        });

        sortSDDisplayedData();
    }



    // end -------------------------------------------------------
    // end of SD ------------------------------------------------------------------------------------
});