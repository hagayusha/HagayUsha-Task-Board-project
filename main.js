
function validateAndSave() {

    const taskBox = document.getElementById("taskBox");
    const dateBox = document.getElementById("dateBox");
    const timeBox = document.getElementById("timeBox");


    const myTask = taskBox.value;
    const byDate = dateBox.value;
    const byTime = timeBox.value;


    const textLength = myTask.trim().length;



    if (myTask == "" || textLength < 1) {
        alert("Must enter a task");
        return;
    }

    if (byDate == "") {
        alert("Must enter a date");
        return;
    }


    saveTask();
}


function saveTask() {

    const taskBox = document.getElementById("taskBox");
    const dateBox = document.getElementById("dateBox");
    const timeBox = document.getElementById("timeBox");


    const myTask = taskBox.value;
    const byDate = dateBox.value;
    const byTime = timeBox.value;


    const task = { myTask, byDate, byTime };


    let allTasks = [];
    let allTasksJsonString = localStorage.getItem("allTasks");
    if (allTasksJsonString != null) {
        allTasks = JSON.parse(allTasksJsonString);
    }


    allTasks.push(task);


    allTasksJsonString = JSON.stringify(allTasks);
    localStorage.setItem("allTasks", allTasksJsonString);


    displayAllTasks();


    taskBox.value = "";
    dateBox.value = "";
    timeBox.value = "";
    taskBox.focus();
}


function displayAllTasks() {


    const container = document.getElementById("container");


    let allTasks = [];
    let allTasksJsonString = localStorage.getItem("allTasks");
    if (allTasksJsonString != null) {
        allTasks = JSON.parse(allTasksJsonString);
    }


    container.innerHTML = "";


    let index = 0;
    for (const task of allTasks) {


        const noteContainer = document.createElement("div");


        noteContainer.setAttribute("class", "note");
        noteContainer.setAttribute("id", "noteContainer");
        noteContainer.setAttribute("onmouseover", "showClearButton(this)");
        noteContainer.setAttribute("onmouseout", "hideClearButton(this)");
        container.appendChild(noteContainer);


        const textDiv = document.createElement("div");
        textDiv.setAttribute("class", "taskTextCont");
        textDiv.setAttribute("id", "taskText");
        noteContainer.appendChild(textDiv);

        textDiv.innerHTML = task.myTask;


        const dateTimeDiv = document.createElement("div");
        dateTimeDiv.setAttribute("class", "dateTimeTextCont");
        dateTimeDiv.setAttribute("id", "dateTimeText");
        noteContainer.appendChild(dateTimeDiv);

        dateTimeDiv.innerHTML = task.byDate + "<br>" + task.byTime;


        const clearButton = document.createElement("button");
        clearButton.setAttribute("type", "button");
        clearButton.setAttribute("id", "clearButton");
        clearButton.setAttribute("onclick", "deleteTask(this)");

        clearButton.style.visibility = "none";


        const glyphicon = document.createElement("span");
        glyphicon.setAttribute("class", "glyphicon glyphicon-remove");
        glyphicon.setAttribute("id", "clear");

        clearButton.appendChild(glyphicon);
        noteContainer.appendChild(clearButton);

        index++;
    }
}


function showClearButton(note) {
    note.querySelector("#clearButton").style.visibility = "visible";
}


function hideClearButton(note) {
    note.querySelector("#clearButton").style.visibility = "hidden";
}


function deleteTask(note) {
    note.parentElement.remove();

    const task = note.parentElement.querySelector("#taskText").textContent;
    const allTasks = JSON.parse(localStorage.getItem("allTasks"))

    for (i = 0; i < allTasks.length; i++) {
        if (allTasks[i].myTask == task) {
            allTasks.splice(i, 1);
        }
    }


    localStorage.setItem("allTasks", JSON.stringify(allTasks));
    displayAllTasks();
}


displayAllTasks();

