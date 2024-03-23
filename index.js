console.log("script is running fine");
checkDarkMode();
function checkDarkMode() {
  console.log(window.matchMedia("(prefers-color-scheme:dark)"));
  if (window.matchMedia("(prefers-color-scheme:dark)")) {
    document.querySelector("body").className = "dark";
  } else {
    document.querySelector("body").className = "light";
  }
}

const toggleDarkMode = document.getElementsByClassName("toggleDarkMode")[0];
toggleDarkMode.addEventListener("click", () => {
  if (document.querySelector("body").className === "dark") {
    document.querySelector("body").className = "light";
  } else {
    document.querySelector("body").className = "dark";
  }
});
const inputForm = document.querySelector("form");
const taskInput = document.getElementById("taskInput");
let taskInputValue = "";
let todoList = [];

// tracking input onBlur
taskInput.addEventListener("blur", (event) => {
  taskInputValue = event.target.value;
});

// tracking input on pressing Enter

inputForm.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    taskInputValue = event.target.value;
  }
});

// Updating the todoList and appending new todo
inputForm.addEventListener("submit", (event) => {
  event.preventDefault();
  todoList = [
    ...todoList,
    {
      id: new Date().getTime(),
      task: taskInputValue,
      date: new Date()
        .toISOString()
        .split("T")[0]
        .split("-")
        .reverse()
        .join("/"),
      checked: false,
    },
  ];
  taskInputValue = "";
  showTodoList();
  inputForm.reset();
});

const todoTasks = document.getElementsByClassName("tasks")[0];

// Function to render the list on UI

showTodoList();
function showTodoList() {
  todoTasks.innerHTML = "";
  let list = document.createElement("li");
  if (todoList.length === 0) {
    list.innerText = `No tasks defined`;
  } else {
    list.innerText = `To do`;
  }
  todoTasks.appendChild(list);
  todoList.map((item) => {
    let list = document.createElement("li");
    list.className = "taskAdded";
    list.innerHTML = `
      <label for="">
        <ion-icon name="checkmark-circle-outline" class="${
          item?.checked ? "taskChecked" : "taskUnChecked"
        }" onClick="handleChecked(${item.id})" ></ion-icon>
        <span class="${
          item?.checked ? "taskChecked" : "taskUnChecked"
        }">${item.task.slice(0, 50)}...</span>
      </label>
      <span><ion-icon name="trash-outline" class="deleteIcon" onClick="handleRemove(${
        item.id
      })"></ion-icon></span>
    `;
    todoTasks.appendChild(list);
  });
}

// Delete a todo
function handleRemove(id) {
  todoList = todoList.filter((item) => item.id !== id);
  showTodoList();
}

// Mark as complete a todo
function handleChecked(id) {
  todoList = todoList.map((item) =>
    item.id === id ? { ...item, checked: true } : item
  );
  showTodoList();
}
