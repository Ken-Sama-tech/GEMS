import {
  EventListener,
  GlobalEventListeners,
  Debounce,
  sendAsUrlCom,

} from "../includes/utils/js/domHelper";
import MakeServerRequest from "../services/js/ServerRequests";

const evntLi = new EventListener();
const event = new GlobalEventListeners();
const utils = new Debounce();

const simpleCalculator = (() => {
  function isValidExpression(input) {
    const regex = /^-?(\d+(\.\d+)?)([+\-*/]-?(\d+(\.\d+)?))*$/;
    return regex.test(input);
  }

  function calculate(input) {
    if (!isValidExpression(input)) {
      return "Invalid input";
    }

    try {
      return eval(input);
    } catch (error) {
      return "Error in calculation";
    }
  }

  const calculateBtn = document.getElementById("calculate-btn");
  evntLi.callEvent(calculateBtn, "click", () => {
    const calculator = document.getElementById("calculator");
    const result = calculate(calculator.value);
    calculator.value = result;
  });
})();

const chartsMinMaxToggle = (() => {
  const chartsSection = document.getElementById("charts-section");
  const toggleBtn = document.querySelector(".chart-toggle-btn");

  evntLi.callEvent(toggleBtn, 'click', (e) => {
    toggleBtn.classList.toggle('active');
    chartsSection.classList.toggle('minimize');
  });

})();

const toDoList = (() => {

  let taskList = null;

  const isTaskListLoaded = () => {
    taskList = document.querySelectorAll('#to-do-list-row');

    if (taskList.length == 0) {
      //add delay to ensure tasks is loaded
      setTimeout(() => {
        isTaskListLoaded();
      }, 2000);

      return;
    }

    isTaskCompleted();
  }

  isTaskListLoaded();

  const updateTaskListLoader = utils.debounce(() => {
    isTaskListLoaded();
  }, 2000);

  const isTaskCompleted = () => {
    const checkboxes = document.querySelectorAll('[to-do-list-checkbox]');

    const updateTaskList = (tID, status) => {

      const serverReq = new MakeServerRequest('../../services/php/UpdateTaskProgress.php', `tID=${sendAsUrlCom(tID)}&status=${sendAsUrlCom(status)}`);

      serverReq.sendData();
    }

    checkboxes.forEach(checkbox => {
      evntLi.callEvent(checkbox, 'change', (e) => {
        let tID = e.target.closest('li').tID;
        if (checkbox.checked)
          updateTaskList(tID, 'COMPLETED');

        if (checkbox.checked == false)
          updateTaskList(tID, 'PENDING');
      });
    });
  }

  const addNewTask = (task) => {
    const serverReq = new MakeServerRequest('../../services/php/AddNewTask.php', `task=${sendAsUrlCom(task)}`);

    serverReq.sendData();
  }

  const deleteTask = (tID) => {
    const serverReq = new MakeServerRequest('../../services/php/DeleteTask.php', `tID=${sendAsUrlCom(tID)}`);

    serverReq.sendData();
  }

  event.globalEvent('click', '#add-new-list', () => {
    const newTask = document.getElementById('new-task');
    addNewTask(newTask.value);
    newTask.value = '';
    updateTaskListLoader();
  });

  const toDoListContainer = document.querySelector('#to-do-list-body');
  evntLi.callEvent(toDoListContainer, 'contextmenu', e => {
    e.preventDefault();

    if (toDoListContainer.contains(e.target) && e.target.matches('#to-do-list-row')) {
      console.log(e.target)
      const selectedTask = e.target.closest('#to-do-list-row');
      const contextmenu = document.querySelector('.contextmenu');
      contextmenu.classList.toggle('active');

      // deleteTask(selectedTask.tID);

      evntLi.callEvent(document, 'click', (e) => {
        if (!contextmenu.contains(e.target))
          contextmenu.classList.remove('active');
        contextmenu.classList.remove('active-effect');
      });
    }
  });
})();