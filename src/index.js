import "./styles.css";
import { greeting } from "./functions.js";

greeting('Adebayo');

const displayEle = document.querySelector('.js-display');
const displayWarningEle = document.querySelector('.display-warning');
const titleEle = document.querySelector('.title');
const descriptionEle = document.querySelector('.description');
const dueDateEle = document.querySelector('.dueDate');
const priorityEle = document.querySelector('.priority');
const noteEle = document.querySelector('.note');
const addBtnEle = document.querySelector('.js-add-btn');

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
    const latestTask = new Todo(title, description, dueDate, priority, note);
    return latestTask;
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

console.table(myTodoList);
// console.log(myTodoList);


let totalHtml = '';

// Generate HTML elements for each todo task
function generateHtml() {
    totalHtml = '';

    myTodoList.forEach((item, index) => {
        const html = `
            <div class='title'>${item.title}</div>
            <div class='description'>${item.description}</div>
            <div class='dueDate'>${item.dueDate}</div>
            <div class='priority'>${item.priority}</div>
            <div class='note'>${item.note}</div>
            <button class='js-delete-btn' data-index='${index}'>Delete</button>
        `;

        console.log(html);
        totalHtml += html;
    });
    return totalHtml;
};

// Display all the Todo tasks on the the webpage
function renderTodoHtml() {
    generateHtml();
    displayEle.innerHTML = totalHtml;

    const deleteBtns = document.querySelectorAll('.js-delete-btn');
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.getAttribute('data-index'));
            myTodoList.splice(index, 1);
            renderTodoHtml(); // Re-render after deletion
        });
    });
};
renderTodoHtml();

// Clear data inputted by user
function clearUserInput() {
    titleEle.value = '';
    descriptionEle.value = '';
    dueDateEle.value = '';
    priorityEle.value = '';
    noteEle.value = '';
};

// Add Event Listener to Add button and check it some boxes are blank
addBtnEle.addEventListener('click', () => {
    if (titleEle.value === '' || descriptionEle.value === '' || dueDateEle.value === '' || priorityEle.value === '') {
        console.log("An important field is empty")
        totalHtml = "An important field is empty. Please, fill all the boxes!!!";
        displayEle.innerHTML = '';
        displayWarningEle.innerHTML = totalHtml;
    } else {
        const title = titleEle.value;
        const description = descriptionEle.value;
        const dueDate = dueDateEle.value;
        const priority = priorityEle.value;
        const note = noteEle.value;

        console.log({ title, description, dueDate, priority, note })
        // const inputedTask = new Todo(title, description, dueDate, priority, note);
        // addNewTask(inputedTask);
        addNewTask(createNewTask(title, description, dueDate, priority, note));
        console.log(myTodoList)
        // console.log(generateHtml())
        renderTodoHtml();
        clearUserInput();
    }
})


