import MakeServerRequest from "../services/js/ServerRequests";
import {
  EventListener,
  GlobalEventListeners,
  Debounce,
  generateUnqId,
  sendAsUrlCom,
  removeExtraWhiteSpaces,
  observeVisibility,
  throttle,
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

          let renderQueue = [];

          this.data = datas.map((data) => {
            const clone = template.content.cloneNode(true);

            const ps = clone.querySelectorAll("p");
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

            ps.forEach(p => {
              p.setAttribute("lrn", lrn);
            });

            img.src = data.studentImg;
            img.setAttribute("lrn", lrn);
            ps[0].innerHTML = `<span class="fw-bolder">Name: </span> ${name}`;
            ps[1].innerHTML = `<span class="fw-bolder">LRN: </span> ${lrn}`;
            ps[2].innerHTML = `<span class="fw-bolder">Civil Status: </span> ${data.civilStatus}`;
            ps[3].innerHTML = `<span class="fw-bolder">Birthdate: </span> ${data.birthDate}`;
            ps[4].innerHTML = `<span class="fw-bolder">Sex: </span> ${data.sex}`;
            ps[5].innerHTML = `<span class="fw-bolder">Nationality: </span> ${data.nationality}`;
            ps[6].innerHTML = `<span class="fw-bolder">Religion: </span> ${data.religion}`;
            ps[7].innerHTML = `<span class="fw-bolder">Email: </span> ${data.email}`;
            ps[8].innerHTML = `<span class="fw-bolder">Phone Number: </span> ${data.phoneNumber}`;
            ps[9].innerHTML = `<span class="fw-bolder">Current Address: </span> ${currAdd}`;
            ps[10].innerHTML = `<span class="fw-bolder">Permanent Address: </span> ${permAdd}`;

            renderQueue.push(clone);

            return {
              name: removeExtraWhiteSpaces(name),
              lrn: lrn,
              elem: profileBox,
              sex: data.sex,
              currAdd: currAdd,
              permAdd: permAdd,
              queue: clone
            };
          });

          observeVisibility(renderQueue, profileBoxContainer, '#profile-box');

          if (callback) {
            callback(this.data);
          }
        });
      };

      return showStudentData();
    }

    search() {
      this.displayStudentData(() => {
        this.data.forEach((data) => {
          let box = data.elem;
          const person = stdDirSearch.value.toUpperCase();
          const personAdd = filterViaAddress.value.toUpperCase();

          box.classList.add("d-none");
          box.setAttribute("data", "hidden");

          const lrn = data.lrn.toString();

          if (data.name.includes(person) || lrn.includes(person)) {
            profileBoxContainer.append(data.queue);
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

          if (
            !data.currAdd.includes(personAdd) &&
            !data.permAdd.includes(personAdd)
          ) {
            box.classList.add("d-none");
            box.setAttribute("data", "hidden");
          }

          //set delay to ensure new elements is appended before checking the result
          const delay = 2000;
          setTimeout(() => {
            const result = document.querySelectorAll("[data = visible]");

            if (result.length <= 0) {
              profileBoxContainer.innerHTML =
                "<h2> No students found matching your criteria <h2>";
            }
          }, delay);
        });
      });
    }
  }

  class AddNewStudent {
    constructor() {
      this.data = [];
      this.parent;
    }

    displayStudentData(templateId, whereToAppend, callback) {
      const serverReq = new MakeServerRequest(
        "../../services/php/AllStdData.php"
      );
      const showData = () => {
        serverReq.requestData(() => {
          const template = document.querySelector(templateId);
          this.parent = document.querySelector(whereToAppend);
          this.parent.innerHTML = "";
          let rowNum = 0;

          const data = serverReq.data;

          if (data.exception) throw new Error(data.exception);

          let renderQueue = [];

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

            rowNum = rowNum + 1;

            clonedRowNum.textContent = rowNum;
            clonedLrn.textContent = dataLrn;
            clonedName.textContent = dataName;
            clonedSex.textContent = dataSex;
            clonedBtn.value = dataLrn;

            clonedTr.setAttribute("state", "is-visible");

            renderQueue.push(clone);
            observeVisibility(renderQueue, this.parent, '#ANS-edt-tr');

            return {
              lrn: dataLrn,
              name: removeExtraWhiteSpaces(dataName),
              tr: clonedTr,
              queue: clone
            };
          });

          if (callback) {
            callback(this.data);
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
            this.parent.appendChild(dta.queue);
            tr.classList.remove("d-none");
            tr.setAttribute("state", "is-visible");
          }

          if (dta.lrn.toString().includes(search)) {
            tr.classList.remove("d-none");
            tr.setAttribute("state", "is-visible");
          }

          const delay = 2000;

          setTimeout(() => {
            const result = this.parent.querySelectorAll("[state = is-visible]");
            if (result.length <= 0) {
              this.parent.innerHTML =
                '<tr><h2 class="position-absolute">No students found matching your criteria<h2></tr>';
            }
          }, delay);
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

          let renderQueue = [];

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

            renderQueue.push(clone);

            observeVisibility(renderQueue, this.tBody, '#ANV-table-row');

            return {
              name: removeExtraWhiteSpaces(dataName),
              lrn: dataLrn,
              row: tableRow,
              queue: clone,
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

          let rowNum = 0;
          const template = document.getElementById("violation-log-template");

          let renderQueue = [];

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
            rowNum++;

            row.textContent = rowNum;
            lrn.textContent = dLrn;
            name.textContent = dName;
            sex.textContent = dSex;
            violation.innerHTML = dViolation;
            date.textContent = dDate;
            status.textContent = dStatus;

            if (dStatus == "COMPLETED") status.className = "completed";

            if (dStatus == "IN-PROGRESS") status.classList.add("in-progress");

            renderQueue.push(clone);

            observeVisibility(renderQueue, this.tBody, '#VL-tr');

            return {
              lrn: dLrn,
              name: dName,
              sex: dSex,
              violation: `ARTICLE ${d.article}, ${d.articleSection}, SANCTION: ${d.sanction}`,
              trow: tr,
              status: dStatus,
              row: rowNum,
              queue: clone
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
  const filterJump = document.getElementById("VL-filter-jump");

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

          tr.setAttribute("state", "is-hidden");
          tr.classList.add('d-none');

          if (
            info.name.includes(search) ||
            info.lrn.toString().includes(search)
          ) {
            this.tBody.appendChild(info.queue);
            tr.classList.remove("d-none");
            tr.setAttribute("state", "is-visible");
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
          tr.classList.add('d-none');
          tr.setAttribute("state", "hidden");

          if (d.name.includes(search) || d.lrn.toString().includes(search)) {
            this.tBody.appendChild(d.queue);
            tr.classList.remove("d-none");
            tr.setAttribute("state", "visible");
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

          const jump = (() => {
            if (filterJump.value == "" || filterJump.value == null) return;

            const arr = filterJump.value.split("-");

            if (arr[1] == undefined || arr[1] == null) arr.push("1");

            arr.sort((a, b) => a - b);

            if (!(d.row >= arr[0] && d.row <= arr[1])) {
              tr.classList.add("d-none");
              tr.setAttribute("state", "hidden");
            }
          })();
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
      const serverReq = new MakeServerRequest(
        "../../services/php/SchoolYears.php"
      );

      serverReq.requestData(() => {
        let data = serverReq.data;

        if (data.exception) throw new Error(data.exception);

        if (data.error) throw new Error(data.error);

        if (data.success) {
          data = data.success;
          schoolYear.innerHTML = `<option valuue="0">Select SY</option>`;

          data.forEach((d) => {
            const sy = d.schoolYear;
            schoolYear.innerHTML += `<option value="${d.schoolYearID}">${sy}</option>`;
          });
        }
      });
    }

    setGradeLevelsOptions() {
      const serverReq = new MakeServerRequest(
        "../../services/php/GradeLevels.php"
      );

      serverReq.requestData(() => {
        let data = serverReq.data;

        if (data.exception) throw new Error(data.exception);

        if (data.error) throw new Error(data.error);

        if (data.success) {
          data = data.success;
          gradelevel.innerHTML = `<option value="0">Grade Level</option>`;
          data.forEach((d) => {
            gradelevel.innerHTML += `<option value="${d.gradeLevelID}">${d.educationLevel} ${d.gradeLevel}</option>`;
          });
        }
      });
    }

    setSectionOptions(gID, sy) {
      const serverReq = new MakeServerRequest(
        "../../services/php/Sections.php",
        `gID=${sendAsUrlCom(gID)}&sy=${sendAsUrlCom(sy)}`
      );

      serverReq.sendData(() => {
        let data = serverReq.data;

        if (data.exception) throw new Error(data.exception);

        if (data.error) throw new Error(data.error);

        if (data.success) {
          data = data.success;

          gradeSections.innerHTML = `<option value="0">section</option`;

          data.forEach((d) => {
            gradeSections.innerHTML += `<option value="${d.sectionID}">${d.section}</option`;
          });
        }
      });
    }

    setNewSchoolYearOptions() {
      const serverReq = new MakeServerRequest(
        "../../services/php/SchoolYears.php",
        `sy=${sendAsUrlCom(schoolYear.value)}`
      );

      serverReq.sendData(() => {
        let data = serverReq.data;

        if (data.exception) throw new Error(data.exception);

        if (data.error) throw new Error(data.error);

        if (data.success) {
          data = data.success;
          newSY.innerHTML = ` <option value="0">new sy</option>`;

          data.forEach((d) => {
            newSY.innerHTML += ` <option value="${d.schoolYearID}">${d.schoolYear}</option>`;
          });
        }
      });
    }
  }

  class ViewRegisteredStudent {
    constructor() {
      this.data = [];
    }
    setSchoolYearRange() {
      const serverReq = new MakeServerRequest(
        "../../services/php/SchoolYears.php"
      );

      serverReq.requestData(() => {
        let data = serverReq.data;

        syRange.innerHTML = "";

        if (data.exception) throw new Error(data.exception);

        if (data.error) throw new Error(data.error);

        if (data.success) {
          data = data.success;

          data.forEach((d) => {
            syRange.innerHTML += `<option value="${d.schoolYearID}">${d.schoolYear}</option>`;
          });

          this.displayEnrolledStudent();
        }
      });
    }

    setGradeLevelRange() {
      const serverReq = new MakeServerRequest('../../services/php/GradeLevels.php');

      serverReq.requestData(() => {
        let data = serverReq.data;

        if (data.exception) throw new Error(data.exception);

        if (data.error) throw new Error(data.error);

        gLevelRange.innerHTML = '';

        if (data.success) {
          data = data.success;

          data.forEach(d => {
            gLevelRange.innerHTML += `<option value="${d.gradeLevelID}"> ${d.gradeLevel}</option>`;
          });
        }

      });
    }

    displayEnrolledStudent(callback) {
      const serverReq = new MakeServerRequest(
        "../../services/php/FetchEnrolledStd.php",
        `sy=${sendAsUrlCom(syRange.value)}&gLevel=${gLevelRange.value}`
      );

      serverReq.sendData(() => {
        let data = serverReq.data;
        viewRegTbody.innerHTML = "";
        const template = document.getElementById("view-reg-tb-template");

        if (data.exception) throw new Error(data.exception);

        if (data.error) throw new Error(data.error);

        if (data.success) {
          data = data.success;

          let num = 1;
          this.data = data.map((d) => {
            const clone = template.content.cloneNode(true);
            const row = clone.querySelector("tr");
            clone.querySelector("[row-num]").textContent = num++;
            clone.querySelector("[lrn]").textContent = d.lrn;
            clone.querySelector("[name]").textContent = removeExtraWhiteSpaces(
              d.studentName
            );
            clone.querySelector("[sex]").textContent = d.sex;
            clone.querySelector("[grade-level]").textContent = d.gradeLevel;
            clone.querySelector("[section]").textContent = d.section;
            viewRegTbody.appendChild(clone);

            return {
              lrn: d.lrn,
              name: removeExtraWhiteSpaces(d.studentName),
              row: row,
            };
          });

          if (callback) {
            callback(this.data);
          }
        }
      });
    }

    search() {
      this.displayEnrolledStudent(() => {
        let data = this.data;

        const search = VRSSearch.value.toUpperCase();

        data.forEach((d) => {
          const lrn = d.lrn.toString();
          const name = d.name;
          const row = d.row;
          row.classList.remove("d-none");
          row.setAttribute("state", "visible");

          if (!name.includes(search) && !lrn.includes(search)) {
            row.classList.add("d-none");
            row.setAttribute("state", "hidden");
          }
        });
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
      this.log.innerHTML = "";

      serverReq.requestData(() => {
        let data = serverReq.data;

        if (data.exception) throw new Error(data.exception);

        this.data = data.map((d) => {
          let recordDate = new Date(d.lastUpdate);
          let currentDate = new Date();

          let timeDifference = Math.abs(recordDate - currentDate);

          let gapInterval = Math.floor(timeDifference / 60000);

          const clone = template.content.cloneNode(true);
          const row = clone.querySelector("li");
          const identifier = clone.querySelector(".lrn");
          const logDesc = clone.querySelector(".log-desc");
          const status = clone.querySelector(".progress-status");

          const sanction = d.sanction;
          const vStatus = d.violationStatus;
          const student = `(${d.lrn}) ${removeExtraWhiteSpaces(
            d.name
          )} <mark class="bg-info">${d.violationDate}</mark>`;

          if (d.violationStatus == "COMPLETED" && gapInterval >= 60) return;

          row.vID = d.vID;
          row.vStatus = vStatus;
          identifier.innerHTML = student;
          logDesc.innerHTML = sanction;
          status.innerHTML = vStatus;

          if (vStatus == "IN-PROGRESS") status.classList.add("in-progress");

          if (vStatus == "COMPLETED") {
            status.classList.add("completed");
          }

          if (vStatus == "PENDING") this.log.prepend(clone);
          else this.log.appendChild(clone);

          return {
            name: removeExtraWhiteSpaces(d.name),
            lrn: d.lrn,
            vStatus: vStatus,
            row: row,
          };
        });

        if (callback) callback(this.data);
      });
    }

    miniSearchBar() {
      this.displayStudentProgress(() => {
        let data = this.data;

        const search = dashboardMiniSearchBar.value.toUpperCase();

        data.forEach((d) => {
          if (d == null || !d) return;

          const lrn = d.lrn.toString();
          const row = d.row;

          row.classList.remove("d-none");
          row.setAttribute("state", "is-visible");

          if (
            !d.name.includes(search) &&
            !lrn.includes(search) &&
            !d.vStatus.includes(search)
          ) {
            row.classList.add("d-none");
            row.setAttribute("state", "is-hidden");
          }
        });

        const result = document.querySelectorAll("[state=is-visible]");
        if (result.length == 0)
          this.log.innerHTML = `<li><h4>No record found matching your criteria </h4></li>`;
      });
    }
  }

  //instances
  const reg = new Registration();
  const dashboard = new Dashboard();
  const VRS = new ViewRegisteredStudent();

  //vars ---------------------------------------------------
  //registration
  const regSearch = document.getElementById("find-std");
  const schoolYear = document.getElementById("school-year");
  const gradelevel = document.getElementById("grade-level");
  const gradeSections = document.getElementById("section");
  const newSY = document.getElementById("new-school-year");
  const regDate = document.getElementById("reg-date");
  const regSelectOption = document.querySelectorAll("[select-option]");
  const hasNoRecord = document.getElementById("has-no-record");

  //vrs (view registered...)
  const syRange = document.getElementById("reg-sy-range");
  const VRSSearch = document.getElementById("view-reg-std-search");
  const viewRegTbody = document.getElementById("view-reg-tb");
  const gLevelRange = document.getElementById('reg-gl-range');

  //dashboard
  const dashboardMiniSearchBar = document.getElementById("mini-search-bar");

  //registration search
  const updateSectionsOptions = utils.debounce(() => {
    reg.setSectionOptions(gradelevel.value, newSY.value);
  }, 200);

  const updateNewSchoolYearOptions = utils.debounce(() => {
    reg.setNewSchoolYearOptions();
    updateSectionsOptions();
  }, 200);

  if (regSearch) {
    reg.setSchoolYearOptions();
    reg.setGradeLevelsOptions();
    //all select option except select for section
    regSelectOption.forEach((select) => {
      evntLi.callEvent(select, "change", () => {
        updateSectionsOptions();
      });
    });
    //sy
    evntLi.callEvent(schoolYear, "change", () => {
      updateNewSchoolYearOptions();
    });

    // checkbox (has no record)
    evntLi.callEvent(hasNoRecord, "change", () => {
      if (hasNoRecord.checked) {
        schoolYear.value = 0;
        schoolYear.classList.add("d-none");
        updateNewSchoolYearOptions();
      } else {
        updateNewSchoolYearOptions();
        schoolYear.classList.remove("d-none");
      }
    });

    const regDateDefault = (() => {
      const addPadding = (param) => {
        return param.toString().padStart(2, "0");
      };

      const curr_date = new Date();
      const curr_year = curr_date.getFullYear();
      const curr_month = addPadding(curr_date.getMonth() + 1);
      const curr_day = addPadding(curr_date.getDate());

      regDate.value = `${curr_year}-${curr_month}-${curr_day}`;
    })();
  }

  //vrs search
  const updateVRSD = utils.debounce(() => {
    VRS.search();
  }, 500);

  if (VRSSearch) {
    VRS.setSchoolYearRange();

    VRS.setGradeLevelRange();

    evntLi.callEvent(syRange, "change", () => {
      updateVRSD();
    });

    evntLi.callEvent(VRSSearch, "input", () => {
      updateVRSD();
    });

    evntLi.callEvent(gLevelRange, "change", () => {
      updateVRSD();
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

    evntLi.callEvent(dashboardMiniSearchBar, "input", () => {
      updateDDSP();
    });

    event.globalEvent("click", "[set-status-to]", () => {
      updateDDSP();
    });
  }

  // charts ---------------------------------------------------------

  class Charts {
    constructor() {
      this.doughnut = null;
      this.scatter = null;
    }
    doughnutChart(canvasID, arrLabels, dataset) {
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
          datasets: [{
            label: "Total",
            data: dataset,
            backgroundColor: ["#FF0000", "#FFA500", "#FFFF00"],
            hoverOffset: 2,
          }, ],
        },
        options: {
          cutout: "60%",
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }

    scatterChart(canvasID, range, dataset, trendData) {
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
          datasets: [{
              type: "bar",
              label: "Total Violations",
              data: dataset,
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

    const getTimelineData = (trend = null, callback) => {
      const serverReq = new MakeServerRequest(
        "../../services/php/ChartsData.php",
        `trend=${sendAsUrlCom(trend)}`
      );

      serverReq.sendData(() => {
        let dataset = serverReq.data;

        if (dataset.exception) throw new Error(dataset.exception);

        if (dataset.error) throw new Error(dataset.error);

        const label = (param) => {
          return dataset[param].label;
        };

        const data = (param) => {
          return dataset[param].data;
        };

        let datasetArr = Object.entries(dataset);

        if (trend == "daily") {
          callback({
            label: datasetArr.map(([key]) => label(key)),
            data: datasetArr.map(([key]) => data(key)),
          });
        }

        if (trend == "weekly") {
          callback({
            label: datasetArr.map(([key]) => label(key)),
            data: datasetArr.map(([key]) => data(key)),
          });
        }

        if (trend == "monthly") {
          callback({
            label: datasetArr.map(([key]) => label(key)),
            data: datasetArr.map(([key]) => data(key)),
          });
        }

        if (trend == "yearly") {
          callback({
            label: datasetArr.map(([key]) => label(key)),
            data: datasetArr.map(([key]) => data(key)),
          });
        }

        if (trend == "overall") {
          callback({
            label: datasetArr.map(([key]) => label(key)),
            data: datasetArr.map(([key]) => data(key)),
          });
        }
      });
    };

    const changeChartTimeRange = utils.debounce(() => {
      if (range.value == 5) {
        getTimelineData("daily", (hourly) => {
          let data = hourly.data;
          let label = hourly.label;
          let average = Array.from(data, (d) => d.average);
          let total = Array.from(data, (d) => d.total);
          let minor_violations = Array.from(data, (d) => d.minor_violations);
          let major_violations = Array.from(data, (d) => d.major_violations);
          let critical_violations = Array.from(
            data,
            (d) => d.critical_violations
          );

          minor_violations = minor_violations.reduce((a, b) => a + b, 0);
          major_violations = major_violations.reduce((a, b) => a + b, 0);
          critical_violations = critical_violations.reduce((a, b) => a + b, 0);

          charts.updateChart(charts.scatter, () => {
            charts.scatterChart(
              "#violations-chart",
              //label
              label,
              //data
              total,
              //average
              average
            );
          });

          charts.updateChart(charts.doughnut, () => {
            charts.doughnutChart(
              "#violations-severity-chart",
              ["Critical", "Major", "Minor"],
              [critical_violations, major_violations, minor_violations]
            );
          });
        });
      }

      if (range.value == 4) {
        getTimelineData("weekly", (daily) => {
          let data = daily.data;
          let label = daily.label;
          let total = Array.from(data, (d) => d.total);
          let average = Array.from(data, (d) => d.average);
          let minor_violations = Array.from(data, (d) => d.minor_violations);
          let major_violations = Array.from(data, (d) => d.major_violations);
          let critical_violations = Array.from(
            data,
            (d) => d.critical_violations
          );

          minor_violations = minor_violations.reduce((a, b) => a + b, 0);
          major_violations = major_violations.reduce((a, b) => a + b, 0);
          critical_violations = critical_violations.reduce((a, b) => a + b, 0);

          charts.updateChart(charts.scatter, () => {
            charts.scatterChart("#violations-chart", label, total, average);
          });

          charts.updateChart(charts.doughnut, () => {
            charts.doughnutChart(
              "#violations-severity-chart",
              ["Critical", "Major", "Minor"],
              [critical_violations, major_violations, minor_violations]
            );
          });
        });
      }

      if (range.value == 3) {
        getTimelineData("monthly", (weekly) => {
          let data = weekly.data;
          let label = weekly.label;
          let total = Array.from(data, (d) => d.total);
          let average = Array.from(data, (d) => d.average);
          let minor_violations = Array.from(data, (d) => d.minor_violations);
          let major_violations = Array.from(data, (d) => d.major_violations);
          let critical_violations = Array.from(
            data,
            (d) => d.critical_violations
          );

          minor_violations = minor_violations.reduce((a, b) => a + b, 0);
          major_violations = major_violations.reduce((a, b) => a + b, 0);
          critical_violations = critical_violations.reduce((a, b) => a + b, 0);

          charts.updateChart(charts.scatter, () => {
            charts.scatterChart("#violations-chart", label, total, average);
          });

          charts.updateChart(charts.doughnut, () => {
            charts.doughnutChart(
              "#violations-severity-chart",
              ["Critical", "Major", "Minor"],
              [critical_violations, major_violations, minor_violations]
            );
          });
        });
      }

      if (range.value == 2) {
        getTimelineData("yearly", (monthly) => {
          let data = monthly.data;
          let label = monthly.label;
          let total = Array.from(data, (d) => d.total);
          let average = Array.from(data, (d) => d.average);
          let minor_violations = Array.from(data, (d) => d.minor_violations);
          let major_violations = Array.from(data, (d) => d.major_violations);
          let critical_violations = Array.from(
            data,
            (d) => d.critical_violations
          );

          minor_violations = minor_violations.reduce((a, b) => a + b, 0);
          major_violations = major_violations.reduce((a, b) => a + b, 0);
          critical_violations = critical_violations.reduce((a, b) => a + b, 0);

          charts.updateChart(charts.scatter, () => {
            charts.scatterChart("#violations-chart", label, total, average);
          });

          charts.updateChart(charts.doughnut, () => {
            charts.doughnutChart(
              "#violations-severity-chart",
              ["Critical", "Major", "Minor"],
              [critical_violations, major_violations, minor_violations]
            );
          });
        });
      }

      if (range.value == 1) {
        getTimelineData("overall", (yearly) => {
          let data = yearly.data;
          let label = yearly.label;
          let average = Array.from(data, (d) => d.average);
          let total = Array.from(data, (d) => d.total);
          let minor_violations = Array.from(data, (d) => d.minor_violations);
          let major_violations = Array.from(data, (d) => d.major_violations);
          let critical_violations = Array.from(
            data,
            (d) => d.critical_violations
          );

          minor_violations = minor_violations.reduce((a, b) => a + b, 0);
          major_violations = major_violations.reduce((a, b) => a + b, 0);
          critical_violations = critical_violations.reduce((a, b) => a + b, 0);

          charts.updateChart(charts.scatter, () => {
            charts.scatterChart(
              "#violations-chart",
              //label
              label,
              //data
              total,
              //average
              average
            );
          });

          charts.updateChart(charts.doughnut, () => {
            charts.doughnutChart(
              "#violations-severity-chart",
              ["Critical", "Major", "Minor"],
              [critical_violations, major_violations, minor_violations]
            );
          });
        });
      }
    }, 500);

    const range = document.getElementById("statistic-time-range");

    if (!range) return;

    evntLi.callEvent(range, "change", () => {
      changeChartTimeRange();
    });

    changeChartTimeRange();

    const gradeCards = document.querySelectorAll("#cards");

    gradeCards.forEach(card => {
      evntLi.callEvent(card, 'click', e => {
        if (card.contains(e.target)) {
          card.classList.toggle('active');
          card.setAttribute('card-state', 'active');
        }

        gradeCards.forEach(alsoCard => {
          if (!alsoCard.contains(e.target)) {
            alsoCard.classList.remove('active');
            alsoCard.setAttribute('card-state', 'in-active');
          }
        });
      });
    });

  })();
});