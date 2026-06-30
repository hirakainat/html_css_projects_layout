const taskinput = document.querySelector('#inputtask');
const addtask = document.querySelector('#addtask');
const showtasks = document.querySelector('#showtasks');
const dateinput = document.querySelector('#inputdate');

// ✅ SAVE function - sahi naam
function saveTasks() {
    localStorage.setItem("tasks", showtasks.innerHTML);
}

// ✅ Events attach karo loaded tasks pe
function attachEvents() {
    document.querySelectorAll(".donebutton").forEach(function (button) {
        button.onclick = function () {
            this.closest("li").classList.toggle("done");
            saveTasks();
        };
    });

    document.querySelectorAll(".deletebutton").forEach(function (button) {
        button.onclick = function () {
            this.closest("li").remove();
            saveTasks();
        };
    });
}

// ✅ Page load pe saved tasks dikha do - SIRF EK BAAR
const savedTasks = localStorage.getItem("tasks");
if (savedTasks) {
    showtasks.innerHTML = savedTasks;
    attachEvents(); // buttons ko dobara active karo
}

// ✅ Add button
addtask.addEventListener('click', function () {
    const inputtext = taskinput.value.trim();
    const date = dateinput.value;

    if (inputtext === '') return;

    const li = document.createElement('li');
    li.className = 'task-item';

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = inputtext;

    const datepan = document.createElement('span');
    datepan.textContent = date;

    const today = new Date().toISOString().split('T')[0];
    if (date < today) {
        li.classList.add('overdue');
    }

    const donebtn = document.createElement('button');
    donebtn.className = 'donebutton';
    donebtn.textContent = 'done';
    donebtn.onclick = function () {
        li.classList.toggle("done");
        saveTasks();
    };

    const delbtn = document.createElement('button');
    delbtn.className = 'deletebutton';
    delbtn.textContent = 'delete';
    delbtn.onclick = function () {
        li.remove();
        saveTasks();
    };

    const btngroup = document.createElement('div');
    btngroup.className = 'buttongroup';
    btngroup.appendChild(datepan);
    btngroup.appendChild(donebtn);
    btngroup.appendChild(delbtn);

    li.appendChild(span);
    li.appendChild(btngroup);
    showtasks.appendChild(li);

    saveTasks(); // ✅ save ho ga
    taskinput.value = "";
    dateinput.value = "";
});