import "./styles.css";

const ul = document.querySelector("ul");
const form = document.querySelector("form");
const input = document.querySelector("form > input");
console.log(form, input);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = input.value;
  input.value = "";
  addTodo(value);
});
const todos = [
  {
    text: "je suis une todo",
    done: false,
    editMode: true,
  },
  {
    text: "Faire du javascript",
    done: true,
    editMode: false,
  },
];

function displayTodo() {
  const todosNode = todos.map((todo, index) => {
    if (todo.editMode) {
      return createTodoEditElement(todo, index);
    } else {
      return createTodoElement(todo, index);
    }
  });
  ul.innerHTML = "";
  ul.append(...todosNode);
}

function createTodoElement(todo, index) {
  const li = document.createElement("li");
  const buttonDelete = document.createElement("button");
  buttonDelete.innerHTML = "Supprimer";
  const buttonEdit = document.createElement("button");
  buttonEdit.innerHTML = "Edit";
  buttonDelete.addEventListener("click", (event) => {
    event.stopPropagation();
    deleteTodo(index);
  });
  buttonEdit.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleEditMode(index);
  });
  li.innerHTML = `
    <span class="todo ${todo.done ? "done" : ""}"></span>  
    <p>${todo.text}</p>
    
  `;
  li.addEventListener("click", () => {
    toggleTodo(index);
  });

  li.append(buttonEdit, buttonDelete);
  return li;
}

function createTodoEditElement(todo, index) {
  const li = document.createElement("li");
  const input = document.createElement("input");
  input.type = "text";
  input.value = todo.text;
  const buttonSave = document.createElement("button");
  buttonSave.innerHTML = "Save";
  const buttonCancel = document.createElement("button");
  buttonCancel.innerHTML = "Cancel";
  buttonCancel.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleEditMode(index);
  });
  buttonSave.addEventListener("click", (event) => {
    editTodo(index, input);
  });
  li.append(input, buttonCancel, buttonSave);
  return li;
}
function addTodo(text) {
  todos.push({
    text,
    done: false,
  });
  displayTodo();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  displayTodo();
}

function toggleTodo(index) {
  todos[index].done = !todos[index].done;
  displayTodo();
}

function toggleEditMode(index) {
  todos[index].editMode = !todos[index].editMode;
  displayTodo();
}

function editTodo(index, input) {
  const value = input.value;
  todos[index].text = value;
  todos[index].editMode = false;
  displayTodo();
}
displayTodo();
