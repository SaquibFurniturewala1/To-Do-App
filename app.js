const taskInput = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');
const addTask = document.querySelector('#add-task');
const errorMsg = document.querySelector('#error-msg');

loadTask()

addTask.addEventListener('click', () => {
    if (taskInput.value.trim() === '') {
        errorMsg.textContent = 'Enter a Task'
        return;
    } 
    if (taskInput.value.length > 25) {
        errorMsg.textContent = 'Task length should be less than 25 characters';
        return;
    }    
    renderList(taskInput.value);
    saveTasks()
    taskInput.value = '';
    errorMsg.textContent = ''
});


function renderList(taskText) {

    let newList = document.createElement('li');
    newList.textContent = taskText;
    newList.classList.add('new-list');
    newList.style.cursor = 'Pointer'

    markTaskAsCompleted()

    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete Task';
    deleteBtn.classList.add('delete-btn');

    let taskItem = document.createElement('div');
    taskItem.classList.add('task-item');

    taskItem.appendChild(newList);
    taskItem.appendChild(deleteBtn);

    taskList.appendChild(taskItem);

    function markTaskAsCompleted() {

        newList.addEventListener('click', () => {
            newList.classList.toggle('completed')
            if (newList.classList.contains('completed')) {
                deleteBtn.textContent = 'Task Completed'
                deleteBtn.classList.add('completed-btn')
                deleteBtn.classList.remove('delete-btn');
                deleteBtn.disabled = true
            } else {
                deleteBtn.textContent = 'Delete Task'
                deleteBtn.classList.add('delete-btn');
                deleteBtn.classList.remove('completed-btn')
                deleteBtn.disabled = false
            }
            saveTasks()
        });
    }

    deleteBtn.addEventListener('click', () => {
        taskItem.remove();
        saveTasks();
    });

};


function saveTasks() {
    let tasks = []

    taskList.querySelectorAll('li').forEach(function (item) {
        tasks.push(item.textContent.trim())
    })

    localStorage.setItem('myList', JSON.stringify(tasks))
};


function loadTask() {
    const tasks = JSON.parse(localStorage.getItem('myList')) || []

    tasks.forEach(task => {
        renderList(task)
    })
};
