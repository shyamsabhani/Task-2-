document.addEventListener('DOMContentLoaded', loadTasks);

const taskInput = document.getElementById('new-task-input');
const addTaskButton = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');

addTaskButton.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const task = {
            id: Date.now().toString(),
            text: taskText,
            completed: false
        };
        saveTask(task);
        renderTask(task);
        taskInput.value = '';
    }
}

function renderTask(task) {
    const li = document.createElement('li');
    li.setAttribute('data-id', task.id);
    if (task.completed) {
        li.classList.add('completed');
    }

    const span = document.createElement('span');
    span.textContent = task.text;
    span.addEventListener('click', () => toggleComplete(task.id));

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button');
    editButton.addEventListener('click', () => editTask(task.id));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(task.id));

    li.appendChild(span);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
}

function toggleComplete(taskId) {
    const tasks = getTasks();
    const task = tasks.find(task => task.id === taskId);
    task.completed = !task.completed;
    saveTasks(tasks);
    renderTasks();
}

function editTask(taskId) {
    const tasks = getTasks();
    const task = tasks.find(task => task.id === taskId);
    const newTaskText = prompt('Edit Task', task.text);
    if (newTaskText !== null) {
        task.text = newTaskText.trim();
        saveTasks(tasks);
        renderTasks();
    }
}

function deleteTask(taskId) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks(tasks);
    renderTasks();
}

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);
}

function renderTasks() {
    taskList.innerHTML = '';
    const tasks = getTasks();
    tasks.forEach(task => renderTask(task));
}

function loadTasks() {
    renderTasks();
}
