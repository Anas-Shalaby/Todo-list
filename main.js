var taskInput = document.querySelector("#new-task"); // Input For New Task
var addButton = document.getElementsByTagName("button")[0]; // The first button (Add)
var uncomplteTasks = document.querySelector(".incomplete-tasks"); // Uncompleted Tasks
var completedTasks = document.querySelector(".completed-tasks"); // Completed Tasks

let createNewTask = function (taskString) {
  var newList = document.createElement("li"); // New list item
  var newInput = document.createElement("input"); //Check Box
  var label = document.createElement("label"); //Label
  var editInput = document.createElement("input"); // Text
  var fButton = document.createElement("button"); // Edit Button
  var lButton = document.createElement("button"); //Delete Button
  label.innerText = taskString;
  newInput.type = "checkbox";
  editInput.type = "text";
  fButton.className = "edit";
  lButton.className = "delete";
  fButton.innerText = "Edit";
  lButton.innerText = "Delete";
  newList.appendChild(newInput);
  newList.appendChild(label);
  newList.appendChild(fButton);
  newList.appendChild(lButton);

  return newList;
};

let addNewTask = function () {
  console.log("Add Task...");
  var listItem = createNewTask(taskInput.value);
  uncomplteTasks.appendChild(listItem);
  bindTaskEvents(listItem, TaskCompleted);
  taskInput.value = "";
};

let EditTask = function () {
  var listItem = this.parentNode;
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  var containsClass = listItem.classList.contains("editMode");
  if (containsClass) {
    label.innerText = editInput.value;
  } else {
    editInput.value = label.innerText;
  }

  listItem.classList.toggle("editMode");
};

var deleteTask = function () {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
};

var TaskCompleted = function () {
  var listItem = this.parentNode;
  completedTasks.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function () {
  var listItem = this.parentNode;
  uncomplteTasks.appendChild(listItem);
  bindTaskEvents(listItem, TaskCompleted);
};

var ajaxRequest = function () {
  console.log("AJAX Request");
};

addButton.onclick = addNewTask;
addButton.addEventListener("click", addNewTask);
addButton.addEventListener("click", ajaxRequest);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
  editButton.onclick = EditTask;
  deleteButton.onclick = deleteTask;  
  checkBox.onchange = checkBoxEventHandler;
};

for (var i = 0; i < uncomplteTasks.children.length; i++) {
  bindTaskEvents(uncomplteTasks.children[i], TaskCompleted);
}

for (var i = 0; i < completedTasks.children.length; i++) {
  bindTaskEvents(completedTasks.children[i], taskIncomplete);
}
