export function renderTaskList(
  tasks,
  onDeleteTask,
  onAddSubTask,
  onToggleSubTaskComplete,
  onDeleteSubTask
) {
  const tableElement = document.getElementById("taskTable");
  tableElement.innerHTML = "";

  tasks.forEach((task) => {
    const deleteBtnElement = createDeleteBtn(task, onDeleteTask);

    const mainRow = document.createElement("tr");
    mainRow.classList.add("task-main-row");

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

    mainRow.appendChild(createTd(task.name, "titleData"));
    mainRow.appendChild(createTd("[data]", "dateData"));
    mainRow.appendChild(createTd("[priorytet]", "priorityData"));
    mainRow.appendChild(createTd("[statust]", "statusData"));
    mainRow.appendChild(createTd(deleteBtnElement, "deleteData"));

    tableElement.appendChild(mainRow);

    // Subtaski
    const detailsRow = document.createElement("tr");
    detailsRow.classList.add("task-details-row");

    const detailsCell = document.createElement("td");
    detailsCell.colSpan = 5;

    const descriptionSpan = document.createElement("span");
    descriptionSpan.textContent = "[opis]";

    const subTaskInput = document.createElement("input");
    subTaskInput.type = "text";
    subTaskInput.classList = "subTaskName-input";

    const subTaskAddBtn = document.createElement("button");
    subTaskAddBtn.innerText = "Add Task";
    subTaskAddBtn.onclick = () => {
      const subTaskName = subTaskInput.value;
      onAddSubTask(subTaskName, task.id);
      subTaskInput.value = "";
    };

    const subTasksList = document.createElement("ul");
    task.subtasks.forEach((subTask) => {
      const li = document.createElement("li");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = subTask.completed;
      checkbox.onchange = () => {
        onToggleSubTaskComplete(subTask);
      };

      const text = document.createElement("span");
      text.innerText = subTask.name;

      const subTaskDeleteBtn = createDeleteBtn(subTask, onDeleteSubTask);
      li.appendChild(checkbox);
      li.appendChild(text);
      li.appendChild(subTaskDeleteBtn);
      subTasksList.appendChild(li);
    });

    detailsCell.appendChild(descriptionSpan);
    detailsCell.appendChild(subTaskInput);
    detailsCell.appendChild(subTaskAddBtn);
    detailsCell.appendChild(subTasksList);
    detailsRow.appendChild(detailsCell);

    tableElement.appendChild(detailsRow);
  });
}

function createDeleteBtn(task, onDelete) {
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  deleteBtn.onclick = () => onDelete(task.id);
  return deleteBtn;
}

// function createStatusSelect(task, changeStatus) {
//   const selectStatus = document.createElement("select");
//   const statuses = ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"];

//   statuses.forEach((status) => {
//     const option = document.createElement("option");
//     option.value = status;
//     option.textContent = status
//       .split("_")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//       .join(" ");

//     if (task.status === status) {
//       option.selected = true;
//     }

//     selectStatus.appendChild(option);
//   });

//   selectStatus.onchange = (e) => {
//     changeStatus(task, e.target.value);
//   };

//   return selectStatus;
// }

// function createPrioritySelect(task, changePriority) {
//   const selectPriority = document.createElement("select");
//   const priorities = ["LOW", "MEDIUM", "HIGH"];

//   priorities.forEach((priority) => {
//     const option = document.createElement("option");
//     option.value = priority;
//     option.textContent = `${priority.charAt(0)}${priority
//       .slice(1)
//       .toLowerCase()}`;

//     if (task.priority === priority) {
//       option.selected = true;
//     }

//     selectPriority.appendChild(option);
//   });

//   selectPriority.onchange = (e) => {
//     changePriority(task, e.target.value);
//   };

//   return selectPriority;
// }
