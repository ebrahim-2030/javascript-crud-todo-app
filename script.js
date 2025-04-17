// DOM Elements
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");

// Load existing todos from local storage or default to empty array
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Save todos to local storage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Render todos
function renderTodos() {
  todoList.innerHTML = ""; 

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = "todo-item";
    if (todo.completed) li.classList.add("completed");

    // Checkbox for completion status
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.onchange = () => {
      todos[index].completed = checkbox.checked;
      saveTodos();
      renderTodos();
    };

    // Input field for todo text (disabled by default)
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = todo.text;
    inputField.disabled = true;

    // Edit button to enable/disable input field for editing
    const editBtn = document.createElement("i");
    editBtn.className = "fas fa-edit";
    editBtn.id = "editBtn";
    editBtn.onclick = () => {
      inputField.disabled = !inputField.disabled;
      if (inputField.disabled) {
        todos[index].text = inputField.value;
        saveTodos();
        renderTodos();
      }
    };

    // Delete button to remove todo item
    const deleteBtn = document.createElement("i");
    deleteBtn.className = "fas fa-trash";
    deleteBtn.id = "deleteBtn";
    deleteBtn.onclick = () => {
      todos.splice(index, 1); 
      saveTodos();
      renderTodos();
    };

    // Action buttons container
    const actionsDiv = document.createElement("div");
    actionsDiv.className = "actions";
    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);

    // Append all elements to the list item
    li.appendChild(checkbox);
    li.appendChild(inputField);
    li.appendChild(actionsDiv);
    todoList.appendChild(li);
  });
}

// Add new todo to list
function addTodo() {
  const text = todoInput.value.trim();
  if (text === "") return; 

  todos.push({ text, completed: false }); 
  todoInput.value = ""; 
  saveTodos();
  renderTodos();
}

// Initialize app on page load
window.onload = renderTodos;
