export function renderTaskList(
  tasks,
  onDelete,
  onToggleComplete,
  onStatusChange,
  onPriorityChange
) {
  const listElement = document.getElementById("taskList");
  listElement.innerHTML = "";

  tasks.forEach((task) => {
    // Task Element
    const li = document.createElement("li");
    li.classList.add("task-item");

    const checkboxElement = createCheckbox(task, onToggleComplete);
    const selectStatusElement = createStatusSelect(task, onStatusChange);
    const deleteBtnElement = createDeleteBtn(task, onDelete);
    const selectPriorityElement = createPrioritySelect(task, onPriorityChange);

    const infoElement = document.createElement("span");
    infoElement.textContent = `${task.title} ${task.description} ${task.completed} ${task.priority} ${task.status} ${task.date}`;

    li.appendChild(checkboxElement);
    li.appendChild(infoElement);
    li.appendChild(selectStatusElement);
    li.appendChild(selectPriorityElement);
    li.appendChild(deleteBtnElement);
    listElement.appendChild(li);
  });
}

function createDeleteBtn(task, onDelete) {
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  deleteBtn.onclick = () => onDelete(task.id);
  return deleteBtn;
}

function createCheckbox(task, toggleCompleted) {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.style.marginRight = "10px";

  checkbox.onchange = () => toggleCompleted(task);
  return checkbox;
}

function createStatusSelect(task, changeStatus) {
  const selectStatus = document.createElement("select");
  const statuses = ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"];

  statuses.forEach((status) => {
    const option = document.createElement("option");
    option.value = status;
    option.textContent = status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    if (task.status === status) {
      option.selected = true;
    }

    selectStatus.appendChild(option);
  });

  selectStatus.onchange = (e) => {
    changeStatus(task, e.target.value);
  };

  return selectStatus;
}

function createPrioritySelect(task, changePriority) {
  const selectPriority = document.createElement("select");
  const priorities = ["LOW", "MEDIUM", "HIGH"];

  priorities.forEach((priority) => {
    const option = document.createElement("option");
    option.value = priority;
    option.textContent = `${priority.charAt(0)}${priority
      .slice(1)
      .toLowerCase()}`;

    if (task.priority === priority) {
      option.selected = true;
    }

    selectPriority.appendChild(option);
  });

  selectPriority.onchange = (e) => {
    changePriority(task, e.target.value);
  };

  return selectPriority;
}
