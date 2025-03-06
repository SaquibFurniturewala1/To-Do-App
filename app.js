const taskInput = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');
const addTask = document.querySelector('#add-task');
const errorMsg = document.querySelector('#error-msg');

loadTask () 

addTask.addEventListener('click', () => {
    if (taskInput.value.trim() === '') {
        errorMsg.textContent = 'Enter a Task'
        return;
    }
    renderList(taskInput.value);
    saveTasks ()
    taskInput.value = '';
    errorMsg.textContent = ''
});

function renderList(taskText) {
    let newList = document.createElement('li');
    newList.textContent = taskText;

    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete Task';
    deleteBtn.classList.add('delete-btn');

    let taskItem = document.createElement('div');
    taskItem.classList.add('task-item');

    taskItem.appendChild(newList);
    taskItem.appendChild(deleteBtn);

    taskList.appendChild(taskItem);

    deleteBtn.addEventListener('click', () => {
        taskItem.remove();
        saveTasks ()
    });
};

function saveTasks () {
    let tasks = []

    taskList.querySelectorAll('li').forEach(function (item) {
        tasks.push(item.textContent.trim())
    })

    localStorage.setItem('myList', JSON.stringify(tasks))
}

function loadTask () {
    const tasks =  JSON.parse(localStorage.getItem('myList')) || []

    tasks.forEach(task => {
        renderList(task)
    })
};
