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
    let htmlString= "";
    for(const task of tasks ){
        htmlString += `
        <li>
        ${task.content}
        </li>
        `;
    }
    document.querySelector(".js-tasks").innerHTML= htmlString;
};

    const init= () => {
render();
    };
    init();
}