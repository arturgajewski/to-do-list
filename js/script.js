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

  const render = () => {
    let htmlString = "";
    for (const task of tasks) {
      htmlString += `
        <li 
        ${task.done ? 'style="text-decoration: line-through"' : ""}
        >
        ${task.content}
        </li>
        `;
    }
    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

  const addNewTasks = (newTaskContent) => {
    tasks.push({
      content: newTaskContent,
    });
    render();
  };
  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();
    if (newTaskContent === "") {
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
