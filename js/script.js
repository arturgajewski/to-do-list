{
  const tasks = [

  ];

  const removeTask = (taskIndex) => {
    tasks.splice(taskIndex, 1);
    render();
  };

  const doneTask = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done;
    render();
  };

  const addNewTasks = (newTaskContent) => {
    tasks.push({
      content: newTaskContent,
    });
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
  const render = () => {
    let htmlString = "";
    for (const task of tasks) {
      htmlString += `
        <li 
        class="task ${task.done ? ' task__done' : ""}"
        >
        <button class="button__done js-done">  <img src="images/icon_done.png" class="icon__done"> </button>
        <button class="button__remove js-remove"> <img src="images/icon_trush.png" class="icon__trush"></button>
                   ${task.content}
        </li>
        `;
    }
    document.querySelector(".js-tasks").innerHTML = htmlString;

    bindEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();
    if (newTaskContent === "") {
      newTaskContent.focus();
      return;
    }
    addNewTasks(newTaskContent);
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");
    
    form.addEventListener("submit", onFormSubmit);
   
  };
  init();
}
