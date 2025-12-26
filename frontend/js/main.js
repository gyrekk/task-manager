import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
  createSubTask,
  updateSubTask,
  deleteSubTask,
} from "./api.js";
import { renderTaskList } from "./ui.js";

document.getElementById("addBtn").addEventListener("click", handleAddTask);

// Subtasks
async function handleAddSubTask(subTaskName, taskId) {
  if (subTaskName.trim() === "") {
    alert("Wpisz nazwę podzadania!");
    return;
  }

  const newSubtask = {
    name: subTaskName,
    completed: false,
  };
  try {
    await createSubTask(newSubtask, taskId);
    loadAndRenderTasks();
    console.log("Dodawanie podzadania /main.js", newSubtask);
  } catch (error) {
    alert("Błąd podczas dodawania podzadania.");
  }
}

async function handleToggleSubTaskComplete(subTask) {
  const updatedSubTask = {
    ...subTask,
    completed: !subTask.completed,
  };

  try {
    await updateSubTask(subTask.id, updatedSubTask);
    loadAndRenderTasks();
  } catch (error) {
    alert("Nie udało się zmienic statusu.");
  }
}

async function handleDeleteSubtask(subTaskId) {
  if (!confirm("Na pewno usunąć?")) return;

  try {
    await deleteSubTask(subTaskId);
    loadAndRenderTasks();
    console.log("Usuwanie podzadania /main.js", subTaskId);
  } catch (error) {
    alert("Błąd podczas usuwania podzadania.");
  }
}

// Tasks
async function handleAddTask() {
  const name = document.getElementById("taskName").value;

  if (name.trim() === "") {
    alert("Wpisz tytuł!");
    return;
  }

  const newTask = {
    name: name,
  };

  try {
    await createTask(newTask);
    document.getElementById("taskName").value = "";
    loadAndRenderTasks();
    console.log("Dodawanie zadania /main.js", newTask);
  } catch (error) {
    alert("Błąd podczas dodawania zadania.");
  }
}

export async function handleDeleteTask(id) {
  if (!confirm("Na pewno usunąć?")) return;

  try {
    await deleteTask(id);
    loadAndRenderTasks();
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

async function handleStatusChange(task, value) {
  const updatedTask = {
    ...task,
    status: value,
  };

  try {
    await updateTask(task.id, updatedTask);
    loadAndRenderTasks();
  } catch (error) {
    alert("Nie udało się zmienic statusu.");
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

async function loadAndRenderTasks() {
  try {
    const tasks = await getTasks();
    renderTaskList(
      tasks,
      handleDeleteTask,
      handleAddSubTask,
      handleToggleSubTaskComplete,
      handleDeleteSubtask
      // handleToggleComplete,
      // handleStatusChange,
      // handlePriorityChange
    );
    console.log("Wyświetlanie listy zadan /main.js", tasks);
  } catch (error) {
    console.error("Nie udało się załadować zadań.");
  }
}

loadAndRenderTasks();
