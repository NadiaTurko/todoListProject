const newTask = document.querySelector("#new-task input");
const taskDiv = document.querySelector("#tasks");
const addButton = document.querySelector("#push");

let deleteTask, editTasks, tasks, count;
let updateNote = "";

window.onload = () => {
  updateNote = "";
  count = Object.keys(localStorage).length;
  displayTasks();
};

const displayTasks = () => {
  if (Object.keys(localStorage).length > 0) {
    taskDiv.style.display = "inline-block";
  } else {
    taskDiv.style.display = "none";
  }
  taskDiv.innerHTML = "";
  let tasks = Object.keys(localStorage);
  tasks = tasks.sort();

  for (let key of tasks) {
    let classValue = "";
    let value = localStorage.getItem(key);
    let taskInnerDiv = document.createElement("div");
    taskInnerDiv.classList.add("task");
    taskInnerDiv.setAttribute("id", key);
    taskInnerDiv.innerHTML = `<span id="taskname">${key.split("_")[1]}</span>`;

    let editButton = document.createElement("button");
    editButton.classList.add("edit");
    editButton.innerHTML = `<i class= "fa-solid fa-pen-to-square"></i>`;

    if (!JSON.parse(value)) {
      editButton.style.visibility = "visibility";
    } else {
      editButton.style.visibility = "hidden";
      taskInnerDiv.classList.add("completed");
    }

    taskInnerDiv.appendChild(editButton);
    taskInnerDiv.innerHTML += `<button class = "delete"><i class="fa-solid fa-trash"></i></button>`;
    taskDiv.appendChild(taskInnerDiv);
  }

  tasks = document.querySelectorAll(".task");
  tasks.forEach((el) => {
    el.onclick = () => {
      if (el.classList.contains("completed")) {
        updateStorage(el.id.split("_")[0], el.innerText, false);
      } else {
        updateStorage(el.id.split("_")[0], el.innerText, true);
      }
    };
  });

  editTasks = document.getElementsByClassName("edit");
  Array.from(editTasks).forEach((el) => {
    el.addEventListener("click", (event) => {
      event.stopPropagation();
      disableButtons(true);
      let parent = el.parentElement;
      newTask.value = parent.querySelector("#taskname").innerText;
      updateNote = parent.id;
      parent.remove();
    });
  });

  deleteTask = document.getElementsByClassName("delete");
  Array.from(deleteTask).forEach((el) => {
    el.addEventListener("click", (event) => {
      event.stopPropagation();
      disableButtons(true);
      let parent = el.parentElement;
      removeTask(parent.id);
      parent.remove();
      count -= 1;
    });
  });
};

const disableButtons = (btn) => {
  let editButtons = document.getElementsByClassName("edit");

  Array.from(editButtons).forEach((element) => {
    element.disabled = btn;
  });
};

addButton.addEventListener("click", () => {
  disableButtons(false);
  if (newTask.value == "") {
    alert("Please enter a task");
  } else {
    if (updateNote == "") {
      updateStorage(count, newTask.value, false);
    } else {
      let exestingCount = updateNote.split("_")[0];
      removeTask(updateNote);
      updateStorage(exestingCount, newTask.value, false);
      updateNote = "";
    }
    count += 1;
    newTask.value = "";
  }
});

const removeTask = (taskValue) => {
  localStorage.removeItem(taskValue);
  displayTasks();
};

const updateStorage = (index, taskValue, completed) => {
  localStorage.setItem(`${index}_${taskValue}`, completed);
  displayTasks();
};
