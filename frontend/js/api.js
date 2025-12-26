import { taskUrl, subTaskUrl } from "./config.js";

export async function getTasks() {
  try {
    const response = await fetch(taskUrl);
    if (!response.ok) throw new Error("Błąd pobierania");
    // console.log("Wyświetlanie listy zadan /api.js", response);
    return await response.json();
  } catch (error) {
    console.error("Błąd połączenia z Backendem: ", error);
    throw error;
  }
}

export async function createTask(task) {
  try {
    const response = await fetch(taskUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error("Błąd dodawania");
    return await response.json();
  } catch (error) {
    console.error("Nie udało się dodać zadania: ", error);
    throw error;
  }
}

export async function deleteTask(id) {
  try {
    const response = await fetch(`${taskUrl}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Błąd usuwania");
    return true;
  } catch (error) {
    console.error("Nie udało się usunąć zadania: ", error);
    throw error;
  }
}

export async function updateTask(taskId, updatedTask) {
  try {
    const response = await fetch(`${taskUrl}/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });
    if (!response.ok) throw new Error("Błąd aktualizacji");
    return await response.json();
  } catch (error) {
    console.error("Nie udało się zmienic zadania: ", error);
    throw error;
  }
}

// SubTasks
export async function createSubTask(subTask, taskId) {
  try {
    const response = await fetch(`${subTaskUrl}/task/${taskId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subTask),
    });
    if (!response.ok) throw new Error("Błąd dodawania");
    return await response.json();
  } catch (error) {
    console.error("Nie udało się dodać podzadania: ", error);
    throw error;
  }
}

export async function deleteSubTask(subTaskId) {
  try {
    const response = await fetch(`${subTaskUrl}/${subTaskId}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Błąd usuwania podzadania.");
    return true;
  } catch (error) {
    console.error("Nie udało się usunąć podzadania: ", error);
    throw error;
  }
}

export async function updateSubTask(subTaskId, updatedSubTask) {
  try {
    const response = await fetch(`${subTaskUrl}/${subTaskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedSubTask),
    });
    if (!response.ok) throw new Error("Błąd aktualizacji podzadania.");
    return await response.json();
  } catch (error) {
    console.error("Nie udało się zmienić podzadania: ", error);
  }
}
