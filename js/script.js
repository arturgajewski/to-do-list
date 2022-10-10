{
  const tasks = [
    {
      content: "odrobić zadanie domowe",
      done: false,
    },
    {
      content: "wysłać pracę domową na slack",
      done: true,
    },
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
        class="taskContent ${task.done ? " task__done" : ""}"
        >
        <button class="button__task button__task--done js-done"> ${
          task.done ? "✓" : ""
        } </button>
                <div class="task">   ${task.content} </div>
                <button class="button__task button__task--remove js-remove">  🗑
                </button>
        </li>
        `;
    }
    document.querySelector(".js-tasks").innerHTML = htmlString;

    bindEvents();
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
}
