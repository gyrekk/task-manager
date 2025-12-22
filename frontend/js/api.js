import { url } from "./config.js";

export async function fetchTasks() {
  try {
    const response = await fetch(url);
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
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error("Błąd dodawania");
    // console.log("Dodawanie zadania /api.js", response);
    return await response.json();
  } catch (error) {
    console.error("Nie udało się dodać zadania: ", error);
    throw error;
  }
}

export async function deleteTask(id) {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Błąd usuwania");
    return true;
  } catch (error) {
    console.error("Nie udało się usunąć zadania: ", error);
    throw error;
  }
}

export async function updateTask(id, task) {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error("Błąd aktualizacji");
    return await response.json();
  } catch (error) {
    console.error("Nie udało się zmienic zadania: ", error);
    throw error;
  }
}
