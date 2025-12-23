export function renderTaskList(
  tasks,
  onDelete,
  // onToggleComplete,
  onStatusChange,
  onPriorityChange
) {
  const tableElement = document.getElementById("taskTable");
  tableElement.innerHTML = "";

  tasks.forEach((task) => {
    // const checkboxElement = createCheckbox(task, onToggleComplete);
    const selectStatusElement = createStatusSelect(task, onStatusChange);
    const deleteBtnElement = createDeleteBtn(task, onDelete);
    const selectPriorityElement = createPrioritySelect(task, onPriorityChange);

    const tr = document.createElement("tr");

    // Funkcja pomocnicza do tworzenia komórek
    const createTd = (content, className) => {
      const td = document.createElement("td");
      td.className = className;
      // Sprawdzamy czy content to element HTML czy zwykły tekst
      if (content instanceof HTMLElement) {
        td.appendChild(content);
      } else {
        td.innerText = content;
      }
      return td;
    };

    // Dodajemy komórki do wiersza
    // tr.appendChild(createTd(checkboxElement, "checkboxData"));
    tr.appendChild(createTd(task.title, "titleData"));
    tr.appendChild(createTd(task.date, "dateData"));
    tr.appendChild(createTd(selectPriorityElement, "priorityData"));
    tr.appendChild(createTd(selectStatusElement, "statusData"));
    tr.appendChild(createTd(deleteBtnElement, "deleteData"));

    tableElement.appendChild(tr);
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
