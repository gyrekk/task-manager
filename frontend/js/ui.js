export function renderTaskList(tasks, onDeleteClicked, onToggleClicked) {
  const listElement = document.getElementById("taskList");
  listElement.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.classList.add("task-item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.style.marginRight = "10px";

    checkbox.onchange = () => onToggleClicked(task);

    const span = document.createElement("span");
    span.textContent = `${task.title} ${task.description} ${task.completed} ${task.priority} ${task.date}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.onclick = () => onDeleteClicked(task.id);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    listElement.appendChild(li);
  });
}
