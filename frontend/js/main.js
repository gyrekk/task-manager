import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
  createSubTask,
  updateSubTask,
  deleteSubTask,
} from "./api.js";
import {
  renderTaskList,
  updateTaskDOM,
  createTaskElement,
  createSubTaskElement,
  createSubTaskImput,
} from "./ui.js";

// App

document
  .getElementById("openAddTaskMenuBtn")
  .addEventListener("click", function () {
    document.querySelector(".add-task-container").classList.toggle("active");
  });

document
  .getElementById("closeAddTaskMenuBtn")
  .addEventListener("click", function () {
    document.querySelector(".add-task-container").classList.toggle("active");
  });

const APP_STATE = {
  sort: "",
  search: "",
  status: "all",
};

const SORT_PATHS = {
  NEWEST: "date-desc",
  OLDEST: "date-asc",
  DEFAULT: "",
};

const sortingOptions = [
  {
    name: "Newest First",
    icon: "arrow_downward",
    sorting: SORT_PATHS.NEWEST,
  },
  {
    name: "Oldest First",
    icon: "arrow_upward",
    sorting: SORT_PATHS.OLDEST,
  },
  {
    name: "Default Order",
    icon: "sort",
    sorting: SORT_PATHS.DEFAULT,
  },
];

//----------
// Sort
//----------
let currentIndex = 0;

document.getElementById("sortBtn").addEventListener("click", function () {
  const currentOption = sortingOptions[currentIndex];

  console.log(currentOption.name);
  this.value = currentOption.name;

  APP_STATE.sort = currentOption.sorting;
  document.getElementById("taskList").dataset.sort = APP_STATE.sort;

  currentIndex++;
  if (currentIndex >= sortingOptions.length) {
    currentIndex = 0;
  }

  loadAndRenderTasks();
});

//----------
// Search
//----------
let searchTimeout;
document.getElementById("searchInput").addEventListener("input", function () {
  clearTimeout(searchTimeout);
  const input = this.value;

  searchTimeout = setTimeout(() => {
    APP_STATE.search = input;
    document.getElementById("taskList").dataset.search = APP_STATE.search;

    loadAndRenderTasks();
  }, 500);
});

//----------
// Status
//----------
document.querySelectorAll(`input[name="status"]`).forEach((e) => {
  e.addEventListener("change", function () {
    document.querySelectorAll(`input[name="status"]`).forEach((el) => {
      el.classList.remove("active");
    });
    APP_STATE.status = e.value.toUpperCase();
    e.classList.add("active");
    document.getElementById("taskList").dataset.status = APP_STATE.status;
    loadAndRenderTasks();
  });
});

// document.getElementById("btnDate").onclick = () => {
//   document.getElementById("taskList").dataset.sort = "/date";
//   console.log(document.getElementById("taskList").dataset.sort);
//   loadAndRenderTasks();
// };

// document.getElementById("btnDateDesc").onclick = () => {
//   document.getElementById("taskList").dataset.sort = "/date-desc";
//   console.log(document.getElementById("taskList").dataset.sort);
//   loadAndRenderTasks();
// };

document.getElementById("addSubTaskLabel").onclick = () => {
  const input = document.getElementById("subTaskNameInput"); // Złap input
  const newSubTaskName = input.value;

  if (newSubTaskName.trim() === "") {
    alert("Podaj nazwę podzadania!");
    return;
  }

  const div = createSubTaskImput(newSubTaskName);
  const subTasksContainer = document.getElementById("subTasksLabels");
  subTasksContainer.appendChild(div);

  input.value = "";
};

// Subtasks
async function handleAddSubTask(subTaskName, task) {
  if (subTaskName.trim() === "") {
    alert("Wpisz nazwę podzadania!");
    return;
  }

  const newSubtask = {
    name: subTaskName,
    completed: false,
  };
  try {
    const createdSubTask = await createSubTask(newSubtask, task.id);

    if (!task.subtasks) task.subtasks = [];
    task.subtasks.push(createdSubTask);

    const taskItem = document.getElementById(`task${task.id}`);
    const ul = taskItem.querySelector(".sub-task-list");

    const newSubTaskElement = createSubTaskElement(
      createdSubTask,
      task,
      handleDeleteSubtask,
      handleToggleSubTaskComplete,
      handleChangeSubtaskName,
    );
    newSubTaskElement.classList.add("slide-in-animation");
    ul.appendChild(newSubTaskElement);
    setTimeout(() => {
      newSubTaskElement.classList.remove("slide-in-animation");
    }, 600);

    await handleChangeTaskStatus(task);
    updateTaskDOM(task);
    console.log("Dodawanie podzadania /main.js", newSubtask);
  } catch (error) {
    alert("Błąd podczas dodawania podzadania.");
  }
}

async function handleToggleSubTaskComplete(subTask, parentTask) {
  const newStatus = !subTask.completed;
  const oldStatus = subTask.completed;

  const checkbox = document.getElementById(`subtask-checkbox-${subTask.id}`);
  if (checkbox) {
    checkbox.checked = newStatus;
  }

  const updatedSubTask = {
    ...subTask,
    completed: newStatus,
  };

  try {
    await updateSubTask(subTask.id, updatedSubTask);

    subTask.completed = newStatus;

    await handleChangeTaskStatus(parentTask);

    updateTaskDOM(parentTask);
  } catch (error) {
    alert("Nie udało się zmienic statusu.");

    if (checkbox) checkbox.checked = oldStatus;
    subTask.completed = oldStatus;

    updateTaskDOM(parentTask);
  }
}

async function handleDeleteSubtask(subTaskId, task) {
  if (!confirm("Na pewno usunąć?")) return;

  try {
    await deleteSubTask(subTaskId);

    if (task.subtasks) {
      task.subtasks = task.subtasks.filter((t) => t.id !== subTaskId);
    }

    const subTaskElement = document.getElementById(`subtask${subTaskId}`);

    if (subTaskElement) {
      subTaskElement.classList.add("slide-out-animation");
      setTimeout(() => {
        subTaskElement.remove();
      }, 600);
    }

    setTimeout(() => {
      subTaskElement.classList.remove("slide-out-animation");
    }, 600);

    await handleChangeTaskStatus(task);
    updateTaskDOM(task);

    console.log("Usuwanie podzadania /main.js", subTaskId);
  } catch (error) {
    alert("Błąd podczas usuwania podzadania.");
  }
}

async function handleChangeSubtaskName(subTask, subTaskName, task) {
  const updatedSubTask = {
    ...subTask,
    name: subTaskName,
  };

  try {
    await updateSubTask(subTask.id, updatedSubTask);

    // updateTaskDOM(task);

    console.log("Zmieniono nazwę podzadania /main.js", updatedSubTask);
  } catch (error) {
    alert("Nie udało się zmienic nazwy.");
  }
}

// Tasks
document
  .getElementById("addTaskForm")
  .addEventListener("submit", handleAddTask);

async function handleAddTask(e) {
  e.preventDefault();
  const name = document.getElementById("taskNameInput").value.trim();
  let date = document.getElementById("taskDateInput").value;
  const priority = document.getElementById("taskPriorityInput").value;

  if (name === "") {
    alert("Wpisz tytuł!");
    return;
  }

  if (!date) {
    date = new Date().toISOString().split("T")[0];
  }

  const subTaskLabels = document.querySelectorAll(
    "#subTasksLabels .sub-task-label p",
  );
  // Tworzymy z nich tablicę nazw
  const tempSubTasksNames = Array.from(subTaskLabels).map((el) => el.innerText);
  const newTask = {
    name: name,
    date: date,
    priority: priority,
    status: "NOT_STARTED",
    subtasks: [],
  };

  try {
    const createdTask = await createTask(newTask);

    if (tempSubTasksNames.length > 0) {
      const subTaskPromises = tempSubTasksNames.map((subName) => {
        const subTaskObj = { name: subName, completed: false };
        return createSubTask(subTaskObj, createdTask.id);
      });

      const createdSubTasks = await Promise.all(subTaskPromises);

      createdTask.subtasks = createdSubTasks;
    }

    const newTaskElement = createTaskElement(
      createdTask,
      handleDeleteTask,
      handleAddSubTask,
      handleToggleSubTaskComplete,
      handleDeleteSubtask,
      handleChangeSubtaskName,
    );

    newTaskElement.classList.add("slide-in-task-animation");

    const taskList = document.getElementById("taskList");
    const taskListItems = Array.from(
      document.querySelectorAll("#taskList .task-item"),
    );

    const currentSort =
      document.getElementById("taskList").dataset.sort || SORT_PATHS.DEFAULT;

    if (currentSort === SORT_PATHS.DEFAULT) {
      taskList.appendChild(newTaskElement);
    } else {
      const isDescending = currentSort === SORT_PATHS.NEWEST;

      const nextItem = taskListItems.find((item) => {
        const itemDateString = item.querySelector(".task-date p").dataset.date;
        const itemDate = new Date(itemDateString);
        const newDate = new Date(createdTask.date);

        if (isDescending) {
          return itemDate < newDate;
        } else {
          return itemDate > newDate;
        }
      });

      if (nextItem) {
        taskList.insertBefore(newTaskElement, nextItem);
      } else {
        taskList.appendChild(newTaskElement);
      }
    }

    setTimeout(() => {
      newTaskElement.classList.remove("slide-in-task-animation");
    }, 600);

    document.getElementById("addTaskForm").reset();
    document.getElementById("subTasksLabels").innerHTML = "";
    document.querySelector(".add-task-container").classList.remove("active");

    console.log("Dodawanie zadania /main.js", newTask);
  } catch (error) {
    alert("Błąd podczas dodawania zadania.");
  }
}

export async function handleDeleteTask(id) {
  if (!confirm("Na pewno usunąć?")) return;

  try {
    await deleteTask(id);

    const taskElement = document.getElementById(`task${id}`);
    if (taskElement) {
      taskElement.classList.add("slide-out-task-animation");
      setTimeout(() => {
        taskElement.remove();
      }, 500);
    }

    setTimeout(() => {
      taskElement.classList.remove("slide-out-task-animation");
    }, 600);
    console.log("Usuwanie zadania /main.js", id);
  } catch (error) {
    alert("Błąd podczas usuwania zadania.");
  }
}

async function handlePriorityChange(task, value) {
  const updatedTask = {
    ...task,
    priority: value,
  };

  try {
    await updateTask(task.id, updatedTask);
    loadAndRenderTasks();
  } catch (error) {
    alert("Nie udało się zmienic priorytetu.");
  }
}

async function handleChangeTaskStatus(task) {
  const subtasks = task.subtasks;

  if (!subtasks || subtasks.length === 0) {
    if (task.status !== "NOT_STARTED") {
      task.status = "NOT_STARTED";
      await updateTask(task.id, { ...task, status: "NOT_STARTED" });
    }
    return;
  }

  let completed = 0;
  for (let i = 0; i < subtasks.length; i++) {
    if (subtasks[i].completed) {
      completed++;
    }
  }

  let status = "NOT_STARTED";
  if (completed === 0) {
    status = "NOT_STARTED";
  } else if (completed === subtasks.length) {
    status = "COMPLETED";
  } else {
    status = "IN_PROGRESS";
  }

  if (task.status === status) return;

  const updatedTask = {
    ...task,
    status: status,
  };

  try {
    await updateTask(task.id, updatedTask);
    task.status = status;
  } catch (error) {
    alert("Nie udało się zmienic statusu.");
    console.error(error);
  }
}

async function loadAndRenderTasks() {
  try {
    const sort = APP_STATE.sort;
    const search = APP_STATE.search;
    const status = APP_STATE.status;

    const tasks = await getTasks(sort, search, status);

    renderTaskList(
      tasks,
      handleDeleteTask,
      handleAddSubTask,
      handleToggleSubTaskComplete,
      handleDeleteSubtask,
      handleChangeSubtaskName,

      // handleToggleComplete,
      // handleStatusChange,
      // handlePriorityChange
    );
    console.log("Wyświetlanie listy zadan /main.js", tasks);
  } catch (error) {
    alert("Nie udało się załadować zadań.");
  }
}

loadAndRenderTasks();
