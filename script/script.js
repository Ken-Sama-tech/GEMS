import MakeServerRequest from "../services/js/ServerRequests";
import {
  EventListener,
  GlobalEventListeners,
  Debounce,
  generateUnqId,
  sendAsUrlCom,
} from "../includes/utils/js/domHelper";

document.addEventListener("DOMContentLoaded", () => {
  //utility instances ------------------------------
  const evntLi = new EventListener();
  const utils = new Debounce();
  const event = new GlobalEventListeners();

  //internal classes ---------------------------------
  class StudentDirectory {
    constructor() {
      this.data = [];
    }

    displayStudentData(callback) {
      const serverReq = new MakeServerRequest(
        "../../services/php/AllStdData.php"
      );
      profileBoxContainer.innerHTML = "";

      const showStudentData = () => {
        serverReq.requestData(() => {
          let datas = serverReq.data;

          if (datas.exception) throw new Error(datas.exception);

          const template = document.getElementById("profile-box-temp");

          // if (sortViaLrn.checked) {
          //     if (dataOrderDsc.checked) {
          //         datas.sort((a, b) => b.learnerReferenceNumber - a.learnerReferenceNumber);
          //     } else {
          //         datas.sort((a, b) => a.learnerReferenceNumber - b.learnerReferenceNumber);
          //     }
          // }

          if (sortViaName.checked) {
            if (dataOrderDsc.checked) {
              datas.sort((a, b) =>
                (
                  b.lastName +
                  " " +
                  b.firstName +
                  " " +
                  b.middleName +
                  " " +
                  b.extensionName
                ).localeCompare(
                  a.lastName +
                  " " +
                  a.firstName +
                  " " +
                  a.middleName +
                  " " +
                  b.extensionName
                )
              );
            } else {
              datas.sort((a, b) =>
                (
                  a.lastName +
                  " " +
                  a.firstName +
                  " " +
                  a.middleName +
                  " " +
                  a.extensionName
                ).localeCompare(
                  b.lastName +
                  " " +
                  b.firstName +
                  " " +
                  b.middleName +
                  " " +
                  b.extensionName
                )
              );
            }
          }

          this.data = datas.map((data) => {
            const clone = template.content.cloneNode(true);

            const p = clone.querySelectorAll("p");
            const img = clone.getElementById("std-profile-img");

            const name = `${data.lastName}, ${data.firstName} ${data.middleName} ${data.extensionName}`;
            const lrn = data.learnerReferenceNumber;
            const currAdd = data.current_address;
            const permAdd = data.permanent_address;

            const profileBox = clone.getElementById("profile-box");
            const pContainer = clone.getElementById("p-container");

            profileBox.setAttribute("data", "visible");
            profileBox.setAttribute("lrn", lrn);
            pContainer.setAttribute("lrn", lrn);

            p.forEach((ps) => {
              ps.setAttribute("lrn", lrn);
            });

            img.src = data.studentImg;
            img.setAttribute("lrn", lrn);
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
              const arry = param.split(" ");

              const filter = arry.filter((s) => {
                if (s !== "") {
                  return s;
                }
              });

              const str = filter.join(" ");

              return str;
            };

            return {
              name: removeExtraWhiteSpaces(name),
              lrn: lrn,
              elem: profileBox,
              sex: data.sex,
              currAdd: currAdd,
              permAdd: permAdd,
            };
          });

          if (callback) {
            callback(this.data);
          }
        });
      };

      return showStudentData();
    }

    search() {
      const person = stdDirSearch.value.toUpperCase();
      this.displayStudentData(() => {
        this.data.forEach((data) => {
          let box = data.elem;

          box.classList.add("d-none");
          box.setAttribute("data", "hidden");

          const lrn = data.lrn.toString();

          if (data.name.includes(person)) {
            box.classList.remove("d-none");
            box.setAttribute("data", "visible");
          }

          if (lrn.includes(person)) {
            box.classList.remove("d-none");
            box.setAttribute("data", "visible");
          }

          const female = document.getElementById("filter-female");
          const male = document.getElementById("filter-male");

          if (male.checked && data.sex == "FEMALE") {
            box.classList.add("d-none");
            box.setAttribute("data", "hidden");
          }

          if (female.checked && data.sex == "MALE") {
            box.classList.add("d-none");
            box.setAttribute("data", "hidden");
          }

          const personAdd = filterViaAddress.value.toUpperCase();

          if (
            !data.currAdd.includes(personAdd) &&
            !data.permAdd.includes(personAdd)
          ) {
            box.classList.add("d-none");
            box.setAttribute("data", "hidden");
          }

          const result = document.querySelectorAll("[data = visible]");

          if (result.length <= 0) {
            profileBoxContainer.innerHTML =
              "<h2> No students found matching your criteria <h2>";
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
      const serverReq = new MakeServerRequest(
        "../../services/php/AllStdData.php"
      );
      const showData = () => {
        serverReq.requestData(() => {
          const template = document.querySelector(templateId);
          const parent = document.querySelector(whereToAppend);
          parent.innerHTML = "";
          let rowNum = 0;

          const data = serverReq.data;

          if (data.exception) throw new Error(data.exception);

          this.data = data.map((dta) => {
            const clone = template.content.cloneNode(true);

            const clonedRowNum = clone.getElementById("row-num");
            const clonedLrn = clone.getElementById("td-lrn");
            const clonedName = clone.getElementById("td-name");
            const clonedSex = clone.getElementById("td-sex");
            const clonedBtn = clone.querySelector("button");
            const clonedTr = clone.querySelector("tr");

            const dataLrn = `${dta.learnerReferenceNumber}`;
            const dataName = `${dta.firstName} ${dta.middleName} ${dta.lastName} ${dta.extensionName}`;
            const dataSex = `${dta.sex}`;

            const covertDataNameToArray = dataName.split(" ");

            const filterEmptyString = covertDataNameToArray.filter(
              (item) => item !== ""
            );

            const convertDataNameBackToString = filterEmptyString.join(" ");

            rowNum = rowNum + 1;

            clonedRowNum.textContent = rowNum;
            clonedLrn.textContent = dataLrn;
            clonedName.textContent = dataName;
            clonedSex.textContent = dataSex;
            clonedBtn.value = dataLrn;

            clonedTr.setAttribute("state", "is-visible");

            parent.appendChild(clone);

            return {
              lrn: dataLrn,
              name: convertDataNameBackToString,
              tr: clonedTr,
            };
          });

          if (callback) {
            callback(this.data);
          }

          const result = parent.querySelectorAll("[state = is-visible]");

          if (result.length <= 0) {
            parent.innerHTML =
              '<h2 class="position-absolute">No students found matching your criteria<h2>';
          }
        });
      };

      return showData();
    }

    search(templateId, whereToAppend, element) {
      this.displayStudentData(templateId, whereToAppend, () => {
        const data = this.data;
        const search = element.value.toUpperCase();

        data.forEach((dta) => {
          const tr = dta.tr;

          tr.classList.add("d-none");
          tr.setAttribute("state", "is-hidden");

          if (dta.name.includes(search)) {
            tr.classList.remove("d-none");
            tr.setAttribute("state", "is-visible");
          }

          if (dta.lrn.toString().includes(search)) {
            tr.classList.remove("d-none");
            tr.setAttribute("state", "is-visible");
          }
        });
      });
    }
  }

  class AddNewViolator {
    constructor() {
      this.data = [];
      this.tBody = document.getElementById("ANV-tbody");
    }

    displayStudentOnTable(callback) {
      const serverReq = new MakeServerRequest(
        "../../services/php/AllStdData.php"
      );

      const fetchStudentsData = () => {
        serverReq.requestData(() => {
          this.tBody.innerHTML = "";

          const data = serverReq.data;

          if (data.exception) throw new Error(data.exception);

          let num = 0;
          const template = document.getElementById("ANV-table-template");

          this.data = data.map((dta) => {
            const clone = template.content.cloneNode(true);
            const rowNum = clone.getElementById("row-num");
            const lrn = clone.getElementById("td-lrn");
            const name = clone.getElementById("td-name");
            const sex = clone.getElementById("td-sex");

            const tableRow = clone.getElementById("ANV-table-row");
            const selectedElement = clone.querySelectorAll("[selected]");

            const dataName = `${dta.firstName} ${dta.middleName} ${dta.lastName} ${dta.extensionName}`;
            const dataLrn = dta.learnerReferenceNumber;
            const dataSex = dta.sex;
            const studentID = dta.studentID;
            num = num + 1;

            rowNum.textContent = num;
            lrn.textContent = dataLrn;
            name.textContent = dataName;
            sex.textContent = dataSex;

            selectedElement.forEach((selected) => {
              selected.lrn = dataLrn;
              selected.name = dataName;
              selected.sex = dataSex;
              selected.stdId = studentID;
            });

            this.tBody.appendChild(clone);

            const convertedDataNameToArray = dataName.split(" ");

            const removeEmptyString = convertedDataNameToArray.filter(
              (name) => {
                if (name !== "") {
                  return name;
                }
              }
            );

            const convertedTheArrayBackToString = removeEmptyString.join(" ");

            const filteredName = convertedTheArrayBackToString;

            return {
              name: filteredName,
              lrn: dataLrn,
              row: tableRow,
            };
          });

          if (callback) {
            callback(this.data);
          }
        });
      };

      return fetchStudentsData();
    }

    //set options on selects
    setSelectOptions(url) {
      const serverReq = new MakeServerRequest(url);

      const setOptions = () => {
        serverReq.requestData(() => {
          const data = serverReq.data;

          if (data.exception) throw new Error(data.exception);

          const articles = data.articles;
          const sections = data.articleSections;
          const sanctions = data.sanctions;

          let num = 0;

          articles.forEach((article) => {
            num++;
            selectArticle.innerHTML += `<option id="articles" value="${article.articleID}">${num}. ${article.article}</option>`;
          });

          evntLi.callEvent(selectArticle, "change", () => {
            selectArticleSection.innerHTML =
              "" +
              `<option value="0" id="article-sections">Select Section</option>`;
            sections.forEach((section) => {
              if (section.articleID == selectArticle.value) {
                selectArticleSection.innerHTML += `<option id="article-sections" value="${section.articleSectionID}">
                                 ${section.articleSection}</option>`;
              }
            });
          });

          num = 0;

          sanctions.forEach((sanction) => {
            num++;
            selectSanction.innerHTML += `<option id="sanctions" value="${sanction.sanctionID}">${num}. ${sanction.sanction}</option>`;
          });
        });
      };

      return setOptions();
    }
  }

  class ViolationLog {
    constructor() {
      this.data = [];
      this.tBody = document.getElementById("violation-log-tBody");
    }

    displayViolators(callback) {
      const serverReq = new MakeServerRequest(
        "../../services/php/FetchViolators.php"
      );

      const violators = () => {
        this.tBody.innerHTML = "";

        serverReq.requestData(() => {
          let data = serverReq.data;

          if (data.exception) throw new Error(data.exception);

          let rowNum = 1;
          const template = document.getElementById("violation-log-template");

          this.data = data.map((d) => {
            const clone = template.content.cloneNode(true);

            const tr = clone.getElementById("VL-tr");
            const row = clone.getElementById("row-num");
            const lrn = clone.getElementById("lrn");
            const name = clone.getElementById("name");
            const sex = clone.getElementById("sex");
            const violation = clone.getElementById("violation");
            const date = clone.getElementById("date");
            const status = clone.getElementById("v-status");

            const removeExtraWhiteSpaces = (param) => {
              const arry = param.split(" ");

              const filter = arry.filter((item) => {
                if (item !== "") return item;
              });

              return filter.join(" ");
            };

            const isShowDescriptionChecked = () => {
              if (showViolationDescription.checked)
                return `<mark class="VL-marks" id="VL-article">${d.articleDesc}</mark>, <mark class="VL-marks" id="VL-section">${d.articleSectionDesc}</mark>, <mark class="VL-marks" id="VL-sanction">${d.sanction}</mark>`;
              else
                return `<mark class="VL-marks" id="VL-article"> ARTICLE ${d.article} </mark>, <mark class="VL-marks" id="VL-section">${d.articleSection}</mark>, <mark class="VL-marks" id="VL-sanction"> SANCTION: ${d.sanction}</mark`;
            };

            const dLrn = d.lrn;
            const dName = removeExtraWhiteSpaces(d.name);
            const dSex = d.sex;
            const dViolation = `${isShowDescriptionChecked()}`;
            const dDate = d.violationDate;
            const dStatus = d.violationStatus;

            const setClonedObjectAttribute = (() => {
              const arr = [tr, row, lrn, name, sex, violation, date, status];

              arr.forEach((item) => {
                item.vID = d.vID;
                item.lrn = dLrn;
                item.name = dName;
              });
            })();

            row.textContent = rowNum++;
            lrn.textContent = dLrn;
            name.textContent = dName;
            sex.textContent = dSex;
            violation.innerHTML = dViolation;
            date.textContent = dDate;
            status.textContent = dStatus;

            if (dStatus == 'COMPLETED')
              status.className = ('completed');

            if (dStatus == 'IN-PROGRESS')
              status.classList.add('in-progress');

            this.tBody.appendChild(clone);

            return {
              lrn: dLrn,
              name: dName,
              sex: dSex,
              violation: `ARTICLE ${d.article}, ${d.articleSection}, SANCTION: ${d.sanction}`,
              trow: tr,
              status: dStatus,
            };
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
  const profileBoxContainer = document.getElementById(
    "std-profile-box-container"
  );
  const stdDirSearch = document.getElementById("std-directory-search");
  const dataOrders = document.querySelectorAll("[name = order]");
  const dataOrderDsc = document.getElementById("sort-dsc");
  // const sortViaLrn = document.getElementById('sort-via-lrn');
  const sortViaName = document.getElementById("sort-via-name");
  const stdDirFilter = document.querySelectorAll("[name = filter]");
  const filterViaAddress = document.getElementById("filter-address");

  //ANS vars
  const editSearch = document.getElementById("search-std-to-edit");
  const delSearch = document.getElementById("search-std-to-delete");

  //ANV vars
  const selectArticle = document.getElementById("article");
  const selectArticleSection = document.getElementById("article-section");
  const selectSanction = document.getElementById("sanction");
  const addViolatorSearch = document.getElementById("add-violator-search");

  //Vl vars
  const VLSetting = document.querySelectorAll("[name = VL-setting]");
  const showViolationDescription = document.getElementById(
    "VL-show-description"
  );
  const VLInputs = document.querySelectorAll("[name = VL-input]");
  const violationLogSearch = document.getElementById("VL-search");
  const filterViaViolation = document.getElementById("VL-filter-violation");
  const filterMale = document.getElementById("VL-filter-male");
  const filterFemale = document.getElementById("VL-filter-female");
  const filterViaStatus = document.getElementById("VL-filter-status");

  // SD -------------------------------------------------------------------------------------------
  // search event ----------------------------------------------
  // search w/ debounce
  const updateDSD = utils.debounce(() => {
    SD.search();
  }, 300);

  //sort
  const sortSDDisplayedData = () => {
    dataOrders.forEach((dataOrder) => {
      evntLi.callEvent(dataOrder, "change", () => {
        updateDSD();
      });
    });
  };

  if (stdDirSearch) {
    SD.displayStudentData();

    evntLi.callEvent(stdDirSearch, "input", () => {
      updateDSD();
    });

    //filters
    stdDirFilter.forEach((box) => {
      //filter is inside search function of std directory class
      //why? figure it out yourself
      evntLi.callEvent(box, "change", () => {
        updateDSD();
      });
    });

    evntLi.callEvent(filterViaAddress, "input", () => {
      updateDSD();
    });

    sortSDDisplayedData();
  }

  // ANS ------------------------------------------------------------------------------------------
  //search events ----------------------------------------------
  //debounce search event.
  const updateEditableDisplay = utils.debounce(() => {
    showEditableData();
  }, 300);

  const updateDeletableDisplay = utils.debounce(() => {
    showDeletableData();
  }, 300);

  const showEditableData = () => {
    ANS.search(
      "#ANS-edt-table-template",
      "#displayEditableStudentHere",
      editSearch
    );
  };

  const showDeletableData = () => {
    ANS.search(
      "#ANS-dlt-table-template",
      "#displayDeletableStudentHere",
      delSearch
    );
  };

  if (delSearch || editSearch) {
    showEditableData();

    showDeletableData();

    evntLi.callEvent(editSearch, "input", () => {
      updateEditableDisplay();
    });

    evntLi.callEvent(delSearch, "input", () => {
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
        const search = addViolatorSearch.value.toUpperCase();

        infos.forEach((info) => {
          const tr = info.row;

          tr.setAttribute("state", "is-visible");

          if (
            !info.name.includes(search) &&
            !info.lrn.toString().includes(search)
          ) {
            tr.classList.add("d-none");
            tr.setAttribute("state", "is-hidden");
          }
        });

        const visibleTR = document.querySelectorAll("[state = is-visible]");

        if (visibleTR.length <= 0) {
          this.tBody.innerHTML =
            "<h2> No students found matching your criteria <h2>";
        }
      });
    }
  }

  const ANVSS = new ANVSSearch();

  const updateANVSS = utils.debounce(() => {
    ANVSS.search();
  }, 300);

  if (addViolatorSearch) {
    evntLi.callEvent(addViolatorSearch, "input", () => {
      updateANVSS();
    });

    ANV.displayStudentOnTable();
    ANV.setSelectOptions("../../services/php/Violations.php");
  }

  // VIOLATION LOG---------------------------------------------------------------------------------
  class VLSearch extends ViolationLog {
    search() {
      this.displayViolators(() => {
        const data = this.data;

        const search = violationLogSearch.value.toUpperCase();
        const filterViolation = filterViaViolation.value.toUpperCase();
        const filterStatus = filterViaStatus.value.toUpperCase();

        data.forEach((d) => {
          const tr = d.trow;

          tr.setAttribute("state", "visible");

          if (!d.name.includes(search) && !d.lrn.toString().includes(search)) {
            tr.classList.add("d-none");
            tr.setAttribute("state", "hidden");
          }

          if (!d.violation.includes(filterViolation)) {
            tr.classList.add("d-none");
            tr.setAttribute("state", "hidden");
          }

          if (!d.status.includes(filterStatus)) {
            tr.classList.add("d-none");
            tr.setAttribute("state", "hidden");
          }

          if (filterMale.checked && d.sex == "FEMALE") {
            tr.classList.add("d-none");
            tr.setAttribute("state", "hidden");
          }

          if (filterFemale.checked && d.sex == "MALE") {
            tr.classList.add("d-none");
            tr.setAttribute("state", "hidden");
          }

          if (filterFemale.checked && d.sex == "MALE") {
            tr.classList.add("d-none");
            tr.setAttribute("state", "hidden");
          }
        });

        const result = document.querySelectorAll("[state = visible]");

        if (result.length <= 0)
          this.tBody.innerHTML =
            '<h2 class="position-absolute"> No students found matching your criteria <h2>';
      });
    }
  }

  const VLS = new VLSearch();

  const updateVLS = utils.debounce(() => {
    VLS.search();
  }, 300);

  if (violationLogSearch) {
    VL.displayViolators();

    VLSetting.forEach((cb) => {
      evntLi.callEvent(cb, "change", () => {
        updateVLS();
      });
    });

    evntLi.callEvent(violationLogSearch, "input", () => {
      updateVLS();
    });

    VLInputs.forEach((inpt) => {
      evntLi.callEvent(inpt, "input", () => {
        updateVLS();
      });
    });
  }

  // Registration ------------------------------------------------------------------------------------

  //classes -----------------------------------------------------------
  class Registration {

    setSchoolYearOptions() {
      const serverReq = new MakeServerRequest('../../services/php/SchoolYears.php');

      serverReq.requestData(() => {
        let data = serverReq.data;

        if (data.exception)
          throw new Error(data.exception);

        if (data.error)
          throw new Error(data.error);

        if (data.success) {
          data = data.success;
          schoolYear.innerHTML = `<option valuue="0">Select SY</option>`;
          data.forEach(d => {
            const sy = d.schoolYear
            schoolYear.innerHTML += `<option value="${d.schoolYearID}">${sy}</option>`;
          });
        }
      })
    }

    setGradeLevelsOptions() {
      const serverReq = new MakeServerRequest('../../services/php/GradeLevels.php');

      serverReq.requestData(() => {
        let data = serverReq.data;

        if (data.exception)
          throw new Error(data.exception);

        if (data.error)
          throw new Error(data.error);

        if (data.success) {
          data = data.success;
          gradelevel.innerHTML = `<option value="0">Grade Level</option>`;
          data.forEach(d => {
            gradelevel.innerHTML += `<option value="${d.gradeLevelID}">${d.educationLevel} ${d.gradeLevel}</option>`;
          });
        }
      });
    }

    setSectionOptions(gID, sy) {
      const serverReq = new MakeServerRequest('../../services/php/Sections.php', `gID=${sendAsUrlCom(gID)}&sy=${sendAsUrlCom(sy)}`);

      serverReq.sendData(() => {
        let data = serverReq.data;

        console.log(data);

        if (data.exception)
          throw new Error(data.exception);

        if (data.error)
          throw new Error(data.error);

        if (data.success) {
          data = data.success;

          gradeSections.innerHTML = `<option value="0">section</option`;

          data.forEach(d => {
            gradeSections.innerHTML += `<option value="${d.sectionID}">${d.section}</option`;
          });
        }
      })
    }

    setNewSchoolYearOptions() {
      const serverReq = new MakeServerRequest('../../services/php/SchoolYears.php', `sy=${sendAsUrlCom(schoolYear.value)}`);

      serverReq.sendData(() => {
        let data = serverReq.data;

        if (data.exception)
          throw new Error(data.exception);

        if (data.error)
          throw new Error(data.error);

        if (data.success) {
          data = data.success;
          newSY.innerHTML = ` <option value="0">new sy</option>`;

          data.forEach(d => {
            newSY.innerHTML += ` <option value="${d.schoolYearID}">${d.schoolYear}</option>`;
          });
        }
      });
    }
  }

  class Dashboard {

    constructor() {
      this.data = [];
      this.log = document.getElementById("progress-log");
    }

    displayTaskList() {
      const serverReq = new MakeServerRequest(
        "../../services/php/ToDoLists.php"
      );
      const mainBody = document.getElementById("to-do-list-body");
      const template = document.getElementById("to-do-list-template");

      serverReq.requestData(() => {
        mainBody.innerHTML = "";
        let data = serverReq.data;

        if (data.exception) throw new Error(data.exception);

        if (data.error) throw new Error(data.error);

        if (data.success) {
          //redeclare data
          data = data.success;

          const cloneTasks = (tasks) => {
            tasks.forEach((task) => {
              let recordDate = new Date(task.lastUpdate);
              let currentDate = new Date();

              const clone = template.content.cloneNode(true);
              const row = clone.querySelector("li");
              const toDo = clone.querySelector(".task");
              const toDoStatus = clone.querySelector(".to-do-status");

              let uniqID = generateUnqId();
              const checkbox = clone.querySelector("[to-do-list-checkbox]");
              const checkboxLabel = clone.querySelector("#checkbox-label");
              checkbox.id = uniqID;
              checkboxLabel.setAttribute("for", uniqID);

              let timeDifference = Math.abs(recordDate - currentDate);

              let gapInterval = Math.floor(timeDifference / 60000);

              if (task.toDoStatus == "COMPLETED" && gapInterval >= 60) return;

              if (task.toDoStatus == "COMPLETED") {
                toDo.classList.add(
                  "text-decoration-line-through",
                  "fst-italic"
                );
                toDo.classList.remove("fw-bold");
                toDoStatus.classList.add("text-success");
                checkbox.checked = true;
              }

              row.tID = task.toDoListID;
              row.setAttribute("state", "visible");
              toDo.innerHTML = task.toDo;
              toDoStatus.innerHTML = task.toDoStatus;

              mainBody.appendChild(clone);
            });
            const toDoList = document.querySelectorAll("[state = visible]");
            //show this when no pending task
            if (tasks == data.pending && toDoList.length == 0)
              mainBody.innerHTML += `<li class="list-group-item"><span class="text-success fw-bold fs-5">No task available</span></li>`;
          };

          cloneTasks(data.pending);
          cloneTasks(data.completed);
        }
      });
    }

    displayStudentProgress(callback) {
      const serverReq = new MakeServerRequest(
        "../../services/php/FetchViolators.php"
      );
      const template = document.getElementById("progress-log-template");
      this.log.innerHTML = '';

      serverReq.requestData(() => {
        let data = serverReq.data;

        if (data.exception)
          throw new Error(data.exception);

        this.data = data.map(d => {

          let recordDate = new Date(d.lastUpdate);
          let currentDate = new Date();

          let timeDifference = Math.abs(recordDate - currentDate);

          let gapInterval = Math.floor(timeDifference / 60000);

          const clone = template.content.cloneNode(true);
          const row = clone.querySelector('li');
          const identifier = clone.querySelector('.lrn');
          const logDesc = clone.querySelector('.log-desc');
          const status = clone.querySelector('.progress-status');

          const removeExtraWhiteSpaces = (param) => {
            const arry = param.split(" ");

            const filter = arry.filter((s) => {
              if (s !== "") {
                return s;
              }
            });

            const str = filter.join(" ");

            return str;
          };

          const sanction = d.sanction;
          const vStatus = d.violationStatus;
          const student = `(${d.lrn}) ${removeExtraWhiteSpaces(d.name)} <mark class="bg-info">${d.violationDate}</mark>`;

          if (d.violationStatus == "COMPLETED" && gapInterval >= 60)
            return;

          row.vID = d.vID;
          row.vStatus = vStatus;
          identifier.innerHTML = student;
          logDesc.innerHTML = sanction;
          status.innerHTML = vStatus;

          if (vStatus == 'IN-PROGRESS')
            status.classList.add('in-progress');

          if (vStatus == 'COMPLETED') {
            status.classList.add('completed');
          }

          this.log.appendChild(clone);

          return { name: removeExtraWhiteSpaces(d.name), lrn: d.lrn, vStatus: vStatus, row: row };
        });

        if (callback)
          callback(this.data);
      });
    }

    miniSearchBar() {
      this.displayStudentProgress(() => {
        let data = this.data;

        const search = dashboardMiniSearchBar.value.toUpperCase();

        data.forEach(d => {

          if (d == null || !d)
            return;

          const lrn = d.lrn.toString();
          const row = d.row;

          row.classList.remove('d-none');
          row.setAttribute('state', 'is-visible');

          if (!d.name.includes(search) && !lrn.includes(search) && !d.vStatus.includes(search)) {
            row.classList.add('d-none');
            row.setAttribute('state', 'is-hidden');
          }
        });

        const result = document.querySelectorAll('[state=is-visible]');
        if (result.length == 0)
          this.log.innerHTML = `<li><h4>No record found matching your criteria </h4></li>`;
      });
    }
  }

  //instances
  const reg = new Registration();
  const dashboard = new Dashboard();

  //vars ---------------------------------------------------
  //registration
  const regSearch = document.getElementById('find-std');
  const schoolYear = document.getElementById('school-year');
  const gradelevel = document.getElementById('grade-level');
  const gradeSections = document.getElementById('section');
  const newSY = document.getElementById('new-school-year');

  //dashboard
  const dashboardMiniSearchBar = document.getElementById('mini-search-bar');

  //registration search

  const updateSectionsOptions = utils.debounce(() => {
    reg.setSectionOptions(gradelevel.value, schoolYear.value);
  }, 200);

  const updateNewSchoolYearOptions = utils.debounce(() => {
    reg.setNewSchoolYearOptions();
  });

  if (regSearch) {
    reg.setSchoolYearOptions();
    reg.setGradeLevelsOptions();

    evntLi.callEvent(gradelevel, 'change', () => {
      updateSectionsOptions();
    });

    evntLi.callEvent(schoolYear, 'change', () => {
      updateSectionsOptions();
      updateNewSchoolYearOptions();
    });
  }

  // dashboard
  //DDTL dashboard display task lists
  const updateDDTL = utils.debounce(() => {
    dashboard.displayTaskList();
  }, 1000);
  //DDSP dashboard display student progress
  const updateDDSP = utils.debounce(() => {
    dashboard.miniSearchBar();
  }, 500);

  if (dashboardMiniSearchBar) {
    dashboard.displayStudentProgress();
    dashboard.displayTaskList();

    event.globalEvent("click", "#add-new-list", () => {
      updateDDTL();
    });

    event.globalEvent("click", ".dlt-task-btn", () => {
      updateDDTL();
    });

    evntLi.callEvent(dashboardMiniSearchBar, 'input', () => {
      updateDDSP();
    });

    event.globalEvent('click', '[set-status-to]', () => {
      updateDDSP();
    });
  }

  // charts ---------------------------------------------------------

  class Charts {
    constructor() {
      this.doughnut = null;
      this.scatter = null;
    }
    doughnutChart(canvasID, arrLabels, arrData) {
      const canvas = document.querySelector(canvasID);

      if (!canvas) {
        console.error(`Canvas element with ID ${canvasID} not found.`);
        return;
      }

      const ctx = canvas.getContext("2d");

      this.doughnut = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: arrLabels,
          datasets: [
            {
              label: "Total",
              data: arrData,
              backgroundColor: ["#FF0000", "#FFA500", "#FFFF00"],
              hoverOffset: 2,
            },
          ],
        },
        options: {
          cutout: "60%",
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }

    scatterChart(canvasID, range, arrData, trendData) {
      const canvas = document.querySelector(canvasID);

      if (!canvas) {
        console.error(`Canvas element with ID ${canvasID} not found.`);
        return;
      }

      const ctx = canvas.getContext("2d");

      this.scatter = new Chart(ctx, {
        type: "scatter",
        data: {
          labels: range,
          datasets: [
            {
              type: "bar",
              label: "Total Violations",
              data: arrData,
              backgroundColor: "rgba(54, 162, 235, 0.6)",
              borderColor: "#FF0000",
            },
            {
              type: "line",
              label: "Average Violations",
              data: trendData,
              fill: false,
              borderColor: "rgb(54, 162, 235)",
            },
          ],
        },
        options: {
          responsive: true,
        },
      });
    }

    updateChart(chart, callback) {
      if (chart != null) chart.destroy();

      if (callback) callback();
    }
  }

  const chartSetings = (() => {
    const charts = new Charts();

    const serverReq = new MakeServerRequest('../../services/php/FetchViolators.php');

    // serverReq.requestData(() => {
    //   console.log(serverReq.data);
    // })

    const changeChartTimeRange = utils.debounce(() => {
      if (range.value == 5) {
        charts.updateChart(charts.scatter, () => {
          charts.scatterChart(
            "#violations-chart",
            [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20, 21, 22, 23, 24,
            ],
            [
              0, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0,
            ],
            [
              0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0,
            ]
          );
        });

        charts.updateChart(charts.doughnut, () => {
          charts.doughnutChart(
            "#violations-severity-chart",
            ["Critical", "Major", "Minor"],
            [14, 43, 85]
          );
        });
      }

      if (range.value == 4) {
        charts.updateChart(charts.scatter, () => {
          charts.scatterChart(
            "#violations-chart",
            [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            [12, 18, 15, 20, 25, 30, 22],
            [6, 9, 8, 10, 12, 15, 11]
          );
        });

        charts.updateChart(charts.doughnut, () => {
          charts.doughnutChart(
            "#violations-severity-chart",
            ["Critical", "Major", "Minor"],
            [14, 43, 85]
          );
        });
      }

      if (range.value == 3) {
        charts.updateChart(charts.scatter, () => {
          charts.scatterChart(
            "#violations-chart",
            ["Week 1", "Week 2", "Week 3", "Week 4"],
            [45, 50, 72, 60],
            [10, 15, 18, 14]
          );
        });

        charts.updateChart(charts.doughnut, () => {
          charts.doughnutChart(
            "#violations-severity-chart",
            ["Critical", "Major", "Minor"],
            [23, 68, 136]
          );
        });
      }

      if (range.value == 2) {
        charts.updateChart(charts.scatter, () => {
          charts.scatterChart(
            "#violations-chart",
            [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ],
            [30, 25, 40, 35, 50, 75, 90, 85, 70, 60, 45, 35],
            [10, 12, 15, 14, 20, 30, 35, 33, 28, 22, 18, 12]
          );
        });

        charts.updateChart(charts.doughnut, () => {
          charts.doughnutChart(
            "#violations-severity-chart",
            ["Critical", "Major", "Minor"],
            [64, 192, 384]
          );
        });
      }

      if (range.value == 1) {
        let latestYearTotal = 1450;

        charts.updateChart(charts.scatter, () => {
          charts.scatterChart(
            "#violations-chart",
            ["Year 1", "Year 2"],
            [1450, 1500],
            [870, 890]
          );
        });

        charts.updateChart(charts.doughnut, () => {
          charts.doughnutChart(
            "#violations-severity-chart",
            ["Critical", "Major", "Minor"],
            [1600, 500, 850]
          );
        });
      }
    }, 500);

    const range = document.getElementById("statistic-time-range");

    if (!range)
      return;

    evntLi.callEvent(range, "change", () => {
      changeChartTimeRange();
    });

    changeChartTimeRange();
  })();
});
