export { addNewProjectEle }

const addNewProjectEle = document.querySelector('.add-new-project');
const addNewProjectBoxEle = document.querySelector('.add-new-project-box');
const createNewProjectBtnEle = document.querySelector('.create-new-project');
const newProjectEle = document.querySelector('.new-project');
const checklistEle = document.getElementById('checklist');
const displayProjectsEle = document.querySelector('.display-projects');

addNewProjectEle.addEventListener('click', () => {
  const newProject = newProjectEle.value;
  console.log(newProject);

  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `${newProject}`;

  const text = document.createTextNode(`${newProject}`);

  li.appendChild(checkbox);
  li.appendChild(text);

  checklistEle.appendChild(li);

  newProjectEle.value = '';

  const listProjects = checklistEle.childNodes;
  console.log(listProjects);

  // for (let i = 0; i < listProjects.length; i++) {
  //   console.log([i].childNodes)
  // }

  // let test = `listProjects[${}].innerHTML`;
  // console.log(test);

  // console.log(listProjects[0].innerHTML);
  // console.log(listProjects[1].innerHTML);

  let displayListProjects = listProjects[0].innerHTML;

  displayProjectsEle.innerHTML = displayListProjects;

  addNewProjectBoxEle.style = "display: none";
})


createNewProjectBtnEle.addEventListener('click', () => {
  addNewProjectBoxEle.style = "display: block";
})