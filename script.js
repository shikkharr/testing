const input = document.getElementById("task");
const addBtn = document.getElementById("addBtn");

// Grab all three columns at once
const columns = document.querySelectorAll(".column");

function addTask() {
  const taskText = input.value;

  if (taskText === "") {
    alert("Please type a task first!");
    return;
  }

  const task = document.createElement("div");
  task.classList.add("task");
  task.setAttribute("draggable", "true");
  task.textContent = taskText;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.addEventListener("click", function () {
    task.remove();
  });

  task.appendChild(deleteBtn);

  // New tasks always start in the "To Do" column
  document.getElementById("todo").appendChild(task);

  // Make this new task draggable too
  addDragEvents(task);

  input.value = "";
}

addBtn.addEventListener("click", addTask);

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// Give a task the ability to be dragged
function addDragEvents(task) {
  task.addEventListener("dragstart", function () {
    task.classList.add("dragging");
  });

  task.addEventListener("dragend", function () {
    task.classList.remove("dragging");
  });
}

// Set up each column to accept dropped tasks
columns.forEach(function (column) {
  column.addEventListener("dragover", function (event) {
    event.preventDefault(); // allows dropping here
    column.classList.add("drag-over");
  });

  column.addEventListener("dragleave", function () {
    column.classList.remove("drag-over");
  });

  column.addEventListener("drop", function () {
    column.classList.remove("drag-over");
    const draggingTask = document.querySelector(".dragging");
    column.appendChild(draggingTask);
  });
});