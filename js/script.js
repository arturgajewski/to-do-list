let tasks = [];

let hideDoneTasks = false;

const removeTask = (taskIndex) => {
  tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];
  render();
};

const doneTask = (taskIndex) => {
  tasks = [
    ...tasks.slice(0, taskIndex),
    { ...tasks[taskIndex], done: !tasks[taskIndex].done },
    ...tasks.slice(taskIndex + 1),
  ];
  render();
};

const addNewTasks = (newTaskContent) => {
  tasks = [...tasks, { content: newTaskContent,done:false }];
  render();
};
const bindEvents = () => {
  const removeButtons = document.querySelectorAll(".js-remove");
  removeButtons.forEach((removeButton, index) => {
    removeButton.addEventListener("click", () => {
      removeTask(index);
    });
  });

  const doneButtons = document.querySelectorAll(".js-done");
  doneButtons.forEach((doneButton, index) => {
    doneButton.addEventListener("click", () => {
      doneTask(index);
    });
  });
};


const toggleAllDoneTask = (task) => {
  tasks = tasks.map((task) => ({ ...tasks, done: true }));
  render();
};

const toggleHideDoneTasks = () => {
  hideDoneTasks = !hideDoneTasks;
  render();
};


const renderTasks = () => {
  let htmlString = "";
  for (const task of tasks) {
    htmlString += `
      <li class="taskContent  ${
        task.done && hideDoneTasks ? "list__item--hide" : ""
}">
      
        <button class="button__task button__task--done js-done"> 
        ${task.done ? "✓" : ""} 
        </button>
      <div class="task${task.done ? " task__done" : ""}">  
       ${task.content} 
       </div>
        <button class="button__task button__task--remove js-remove">
          🗑
          </button>
        </li>
        `;
  }
  document.querySelector(".js-tasks").innerHTML = htmlString;
};

const renderButtons = () => {
  let htmlButtonsString = "";

  if (!tasks.length) {
    return;
  }
  htmlButtonsString += `
  <button class=" hidden__item js-hideDoneTask"> ${
    hideDoneTasks ? "Pokaż " : "Ukryj "
  }ukończone</button>
  <button class="js-markAllDone hidden__item"${
    tasks.every((task) => task.done) ? "disabled" : ""
  }> Ukończ wszystkie</button>`;

  document.querySelector(".js-doneButtons").innerHTML = htmlButtonsString;
};

const toggleAllDone = () => {
  tasks = tasks.map((task) => ({
    ...task,
    done: true,
  }));

  render();
};

const bindButtonsEvents = () => {
  const markAllDoneButton = document.querySelector(".js-markAllDone");

  if (markAllDoneButton) {
    markAllDoneButton.addEventListener("click", toggleAllDone);
  }

  const toggleHideDoneButton = document.querySelector(".js-hideDoneTask");

  if (toggleHideDoneButton) {
    toggleHideDoneButton.addEventListener("click", toggleHideDoneTasks);
  }
};

const render = () => {
  renderTasks();
  renderButtons();
  bindEvents();
  bindButtonsEvents();
};

const onFormSubmit = (event) => {
  event.preventDefault();

  const newTaskElement = document.querySelector(".js-newTask");
  const newTaskContent = newTaskElement.value.trim();

  if (newTaskContent !== "") {
    addNewTasks(newTaskContent);
    newTaskElement.value = "";
  }
  newTaskElement.focus();
};

const init = () => {
  render();

  const form = document.querySelector(".js-form");

  form.addEventListener("submit", onFormSubmit);
};
init();
