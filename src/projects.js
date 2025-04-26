export { addNewProjectEle }
export { Project }
export { projects }
export { currentProjectIndex }
export { createNewProjectBtnEle }
export { setupCheckboxListeners }
export { init }

import { renderTodoHtml } from "./index"

const addNewProjectEle = document.querySelector('.add-new-project');
const addNewProjectBoxEle = document.querySelector('.add-new-project-box');
const createNewProjectBtnEle = document.querySelector('.create-new-project');
const newProjectEle = document.querySelector('.new-project');
const checklistEle = document.getElementById('checklist');
const displayProjectsEle = document.querySelector('.display-projects');

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

  console.log(projects)

  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "projectCheckbox";
  checkbox.value = projects.length - 1;

  console.log(checkbox)

  const text = document.createTextNode(` ${newProjectName}`);
  li.appendChild(checkbox);
  li.appendChild(text);
  checklistEle.appendChild(li);

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
    console.log(checkbox)
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