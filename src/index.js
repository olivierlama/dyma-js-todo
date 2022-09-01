import "./styles.css";

const ul = document.querySelector("ul");

const todos = [
  {
    text: "je suis une todo",
    done: false,
  },
  {
    text: "Faire du javascript",
    done: true,
  },
];

function displayTodo() {
  const todosNode = todos.map((todo, index) => {
    //console.log(todo, index);
    return createTodoElement(todo, index);
  });
  ul.innerHTML = "";
  ul.append(...todosNode);
}

function createTodoElement(todo, index) {
  const li = document.createElement("li");
  li.innerHTML = `
    <span class="todo ${todo.done ? "done" : ""}"></span>  
    <p>${todo.text}</p>
    <button>Supprimer</button>
  `;
  return li;
}
displayTodo();
