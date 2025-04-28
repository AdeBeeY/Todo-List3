export { addNewProjectEle, Project, projects, currentProjectIndex, createNewProjectBtnEle, setupCheckboxListeners, init, titleNewProjectEle, descriptionNewProjectEle, dueDateNewProjectEle, priorityNewProjectEle, noteNewProjectEle }

import { renderTodoHtml, createNewTask, Todo, generateHtml, clearUserInput } from "./index"

const addNewProjectEle = document.querySelector('.add-new-project');
const addNewProjectBoxEle = document.querySelector('.add-new-project-box');
const createNewProjectBtnEle = document.querySelector('.create-new-project');
const newProjectEle = document.querySelector('.new-project');
const checklistEle = document.getElementById('checklist');
// const displayProjectsEle = document.querySelector('.display-projects');
const titleNewProjectEle = document.querySelector('.title-new-project');
const descriptionNewProjectEle = document.querySelector('.description-new-project');
const dueDateNewProjectEle = document.querySelector('.dueDate-new-project');
const priorityNewProjectEle = document.querySelector('.priority-new-project');
const noteNewProjectEle = document.querySelector('.note-new-project');

class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }
}

let projects = [];
let currentProjectIndex = 0;

addNewProjectEle.addEventListener('click', () => {
  const newProjectName = newProjectEle.value.trim();
  if (newProjectName === '') return;

  const newProject = new Project(newProjectName);
  projects.push(newProject);

  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "projectCheckbox";
  checkbox.value = projects.length - 1;

  const text = document.createTextNode(` ${newProjectName}`);
  li.appendChild(checkbox);
  li.appendChild(text);
  checklistEle.appendChild(li);

  const newProjectTask = createNewTask(
    titleNewProjectEle.value,
    descriptionNewProjectEle.value,
    dueDateNewProjectEle.value,
    priorityNewProjectEle.value,
    noteNewProjectEle.value
  );

  newProject.todos.push(newProjectTask);
  generateHtml(newProject.todos);
  renderTodoHtml(newProject.todos);
  clearUserInput();

  newProjectEle.value = '';
  addNewProjectBoxEle.style = "display: none";

  setupCheckboxListeners();
});

createNewProjectBtnEle.addEventListener('click', () => {
  addNewProjectBoxEle.style = "display: block";
})

// Setup project checkbox listeners
function setupCheckboxListeners() {
  const checkboxes = document.querySelectorAll('input[name="projectCheckbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
      if (this.checked) {
        checkboxes.forEach(cb => cb.checked = false);
        this.checked = true;

        currentProjectIndex = parseInt(this.value);
        renderTodoHtml();
      }
    });
  });
}

// Create default project
function init() {
  const defaultProject = new Project('Default Project');
  projects.push(defaultProject);

  console.log(projects)

  // Also display in the UI
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "projectCheckbox";
  checkbox.value = 0;
  checkbox.checked = true;

  const text = document.createTextNode(' Default Project');
  li.appendChild(checkbox);
  li.appendChild(text);
  checklistEle.appendChild(li);

  setupCheckboxListeners();
}

init(); // call init on page load