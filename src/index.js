import "./styles.css";
import { addNewProjectEle, Project, projects, currentProjectIndex, createNewProjectBtnEle, setupCheckboxListeners, init, titleNewProjectEle, descriptionNewProjectEle, dueDateNewProjectEle, priorityNewProjectEle, noteNewProjectEle } from "./projects";

export { renderTodoHtml, createNewTask, Todo, generateHtml, clearUserInput }

const displayEle = document.querySelector('.js-display');
const titleEle = document.querySelector('.title');
const descriptionEle = document.querySelector('.description');
const dueDateEle = document.querySelector('.dueDate');
const priorityEle = document.querySelector('.priority');
const noteEle = document.querySelector('.note');
const addBtnEle = document.querySelector('.js-add-btn');
const addNewTaskBtnEle = document.querySelector('.add-new-task');
const inputContainerEle = document.querySelector('.input-container');

let myTodoList = [];
class Todo {
    constructor(title, description, dueDate, priority, note) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.note = note;
    }
}

// Create a new Task
function createNewTask(title, description, dueDate, priority, note) {
    return new Todo(title, description, dueDate, priority, note);
}

// Add task into myTodoList
function addNewTask(todo) {
    myTodoList.push(todo);
    return myTodoList;
}

// Add new tasks into an array
addNewTask(createNewTask('Study', 'DevOps', '05-05-2025', 'Urgent', 'It should be taken seriously!'));
addNewTask(createNewTask('Go Shopping', 'Food Stuff and beverages', '10-05-2025', 'Normal', 'Withdraw some cash on the way'));
addNewTask(createNewTask('Cinema', 'John Wick', '15-05-2025', 'Normal', 'Go with your Queen'));
addNewTask(createNewTask('Vacation', 'London with family', '06-05-2025', 'Important', 'Remember to top-up Debit cards'));
addNewTask(createNewTask('Tour', 'U.S', '08-05-2025', 'Normal', 'See things a new'));

let totalHtml = '';

function generateHtml(array) {
    totalHtml = '';

    array.forEach((todo, index) => {
        totalHtml += `
        <div class='title'>${todo.title}</div>
        <div class='description'>${todo.description}</div>
        <div class='dueDate'>${todo.dueDate}</div>
        <div class='priority'>${todo.priority}</div>
        <div class='note'>${todo.note}</div>
        <button class='js-delete-btn' data-index='${index}'>Delete</button>
      `;
    });
    return totalHtml;
};

function renderTodoHtml(array) {
    generateHtml(array);
    displayEle.style = 'display: grid';
    displayEle.innerHTML = totalHtml;

    const deleteBtns = document.querySelectorAll('.js-delete-btn');
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.getAttribute('data-index'));
            myTodoList.splice(index, 1);
            renderTodoHtml(myTodoList); // Re-render after deletion
        });
    });
};
renderTodoHtml(myTodoList);

// Clear user input
function clearUserInput(task) {
    if (task === 'newTask') {
        titleEle.value = '';
        descriptionEle.value = '';
        dueDateEle.value = '';
        priorityEle.value = '';
        noteEle.value = '';
        console.log("New Task");
    } else {
        titleNewProjectEle.value = '';
        descriptionNewProjectEle.value = '';
        dueDateNewProjectEle.value = '';
        priorityNewProjectEle.value = '';
        noteNewProjectEle.value = '';
        console.log("Project Task");
    }
}

// Add Event Listener to Add button and check it some boxes are blank
addBtnEle.addEventListener('click', () => {
    // Check if the required boxes are filled
    if (titleEle.value === '' || descriptionEle.value === '' || dueDateEle.value === '' || priorityEle.value === '') {
        displayEle.style = 'display: block; color: red; font-size: 25px; font-weight: 800; background-color: white;';
        displayEle.innerHTML = "An important field is empty. Please, fill all the boxes!!!";
        return;
    }

    const newTask = createNewTask(
        titleEle.value,
        descriptionEle.value,
        dueDateEle.value,
        priorityEle.value,
        noteEle.value
    );

    myTodoList.push(newTask);
    renderTodoHtml(myTodoList);
    clearUserInput('newTask');
    addNewTaskBtnEle.style = "display: grid";
    inputContainerEle.style = "display: none";
})

addNewTaskBtnEle.addEventListener('click', () => {
    inputContainerEle.style = "display: grid";
    addNewTaskBtnEle.style = "display: none";
})