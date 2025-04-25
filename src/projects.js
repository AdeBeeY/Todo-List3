export { addNewProjectEle }

const addNewProjectEle = document.querySelector('.add-new-project');
const newProjectEle = document.querySelector('.new-project');
const checklistEle = document.getElementById('checklist');

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
})

