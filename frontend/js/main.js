import { getTasks, createTask, deleteTask, updateTask } from "./api.js";
import { renderTaskList } from "./ui.js";

document.getElementById("addBtn").addEventListener("click", handleAddTask);

async function handleAddTask() {
  const title = document.getElementById("taskTitle").value;
  const priority = document.getElementById("taskPriority").value;
  const date = document.getElementById("taskDate").value;

  if (title.trim() === "") {
    alert("Wpisz tytuł!");
    return;
  }

  const newTask = {
    title: title,
    description: "test",
    completed: false,
    status: "NOT_STARTED",
    priority: priority,
    date: date || new Date().toISOString().split("T")[0],
  };

  try {
    await createTask(newTask);
    document.getElementById("taskTitle").value = "";
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
    alert("Nie udało się zmienic statusu.");
  }
}

async function loadAndRenderTasks() {
  try {
    const tasks = await getTasks();
    renderTaskList(
      tasks,
      handleDeleteTask,
      handleToggleComplete,
      handleStatusChange,
      handlePriorityChange
    );
    console.log("Wyświetlanie listy zadan /main.js", tasks);
  } catch (error) {
    console.error("Nie udało się załadować zadań.");
  }
}

loadAndRenderTasks();
