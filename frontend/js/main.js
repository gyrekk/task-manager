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
} from "./ui.js";

// App
document.getElementById("openAddTaskMenuBtn").onclick = () => {
  document.querySelector(".add-task-container").classList.toggle("active");
};
document.getElementById("closeAddTaskMenuBtn").onclick = () => {
  document.querySelector(".add-task-container").classList.toggle("active");
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
      handleChangeTaskStatus,
    );
    newSubTaskElement.classList.add("slide-in-animation");
    ul.prepend(newSubTaskElement);
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

async function handleChangeSubtaskName(subTask, subTaskName) {
  const updatedSubTask = {
    ...subTask,
    name: subTaskName,
  };

  try {
    await updateSubTask(subTask.id, updatedSubTask);
    loadAndRenderTasks();
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

  const newTask = {
    name: name,
    date: date,
    priority: priority,
    status: "NOT_STARTED",
    subtasks: [],
  };

  try {
    const createdTask = await createTask(newTask);

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
    taskList.prepend(newTaskElement);

    setTimeout(() => {
      newTaskElement.classList.remove("slide-in-task-animation");
    }, 600);

    document.getElementById("addTaskForm").reset();
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

async function handleToggleComplete(task) {
  const updatedTask = {
    ...task,
    completed: !task.completed,
  };

  try {
    await updateTask(task.id, updatedTask);
    loadAndRenderTasks();
  } catch (error) {
    alert("Nie udało się zmienic statusu.");
  }
}

// async function handleStatusChange(task, value) {
//   const updatedTask = {
//     ...task,
//     status: value,
//   };

//   try {
//     await updateTask(task.id, updatedTask);
//     loadAndRenderTasks();
//   } catch (error) {
//     alert("Nie udało się zmienic statusu.");
//   }
// }

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
  }
}

async function loadAndRenderTasks() {
  try {
    const tasks = await getTasks();
    renderTaskList(
      tasks,
      handleDeleteTask,
      handleAddSubTask,
      handleToggleSubTaskComplete,
      handleDeleteSubtask,
      handleChangeSubtaskName,
      handleChangeTaskStatus,
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
