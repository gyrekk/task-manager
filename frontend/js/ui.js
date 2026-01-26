export function renderTaskList(
  tasks,
  onDeleteTask,
  onAddSubTask,
  onToggleSubTaskComplete,
  onDeleteSubTask,
  onChangeSubTaskName,
  onChangeTaskStatus,
) {
  const listElement = document.getElementById("taskList");

  const activeTasks = Array.from(
    document.querySelectorAll(".task-item.active"),
  );
  // console.log(activeTasks);
  // activeTasks.forEach((e) => console.log(e.id));

  const activeTasksIds = activeTasks.map((e) => e.id);
  // console.log(activeTasksIds);

  listElement.innerHTML = "";

  tasks.forEach((task) => {
    console.log(task);

    const taskItem = document.createElement("li");

    taskItem.classList.add("task-item");
    taskItem.id = `task${task.id}`;

    if (activeTasksIds.includes(taskItem.id)) {
      taskItem.classList.add("active");
    }

    // Task Header
    const taskHeader = document.createElement("div");
    taskHeader.classList.add("task-header");

    taskHeader.addEventListener("click", function (e) {
      taskItem.classList.toggle("active");
    });

    const activeIcon = createIcon("arrow_forward_ios");
    const activeCell = createData("active", activeIcon);
    activeCell.classList = "task-active";

    const nameCell = document.createElement("div");
    nameCell.classList = "task-name";
    nameCell.classList.add("task-item-cell");

    const taskName = document.createElement("p");
    taskName.innerText = task.name;

    nameCell.appendChild(activeCell);
    nameCell.appendChild(taskName);

    const dateContainer = document.createElement("p");
    const taskDate = formateDate(task.date);
    dateContainer.innerText = taskDate;
    const dateCell = createData("date", dateContainer);

    const taskStatus = createStatus(task);
    const statusCell = createData("status", taskStatus);

    const taskProgressBar = createProgressBar(task);
    const progressCell = createData("progress", taskProgressBar);

    const taskPriority = createPriority(task);
    const priorityCell = createData("priority", taskPriority);

    const actionIcon = createIcon("more_horiz");
    actionIcon.classList.add("action-icon");
    const actionIconClose = createIcon("close");
    actionIconClose.classList.add("action-icon-close");
    const actionBtn = document.createElement("button");
    actionBtn.classList = "task-action-btn";
    actionBtn.appendChild(actionIcon);
    actionBtn.appendChild(actionIconClose);

    const actionCell = createData("action", actionBtn);
    actionCell.classList.add("task-action");

    const actionMenu = document.createElement("div");
    actionMenu.classList = "task-action-menu";
    actionMenu.onclick = (e) => e.stopPropagation();

    const taskDeleteBtn = createDeleteTaskBtn(task, onDeleteTask);
    actionMenu.appendChild(taskDeleteBtn);

    actionCell.appendChild(actionMenu);

    actionBtn.onclick = (e) => {
      e.stopPropagation();
      actionCell.classList.toggle("active");
    };

    taskHeader.appendChild(nameCell);
    taskHeader.appendChild(dateCell);
    taskHeader.appendChild(statusCell);
    taskHeader.appendChild(progressCell);
    taskHeader.appendChild(priorityCell);
    taskHeader.appendChild(actionCell);
    // taskHeader.appendChild(deleteBtnElement);

    //Task Body
    const taskBody = document.createElement("div");
    taskBody.classList = "task-body";

    //task body content
    const taskBodyContent = document.createElement("div");
    taskBodyContent.classList = "task-body-content";

    taskBody.appendChild(taskBodyContent);

    //controls
    const subTaskControls = document.createElement("div");
    subTaskControls.classList = "sub-tasks-controls";

    const subTaskInput = document.createElement("input");
    subTaskInput.type = "text";
    subTaskInput.classList = "sub-task-input";
    subTaskInput.placeholder = "Enter subtask name";
    subTaskInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        subTaskAddBtn.click(); // Symulujemy kliknięcie w przycisk
      }
    });

    const subTaskAddBtn = document.createElement("button");
    subTaskAddBtn.classList = "add-sub-task-btn";
    subTaskAddBtn.innerText = "Add Task";
    subTaskAddBtn.onclick = () => {
      const subTaskName = subTaskInput.value;
      onAddSubTask(subTaskName, task);
      subTaskInput.value = "";
    };
    // subTaskAddBtn.addEventListener("");

    subTaskControls.appendChild(subTaskInput);
    subTaskControls.appendChild(subTaskAddBtn);

    taskBodyContent.appendChild(subTaskControls);

    // subtasks list
    const subTasksList = document.createElement("ul");
    subTasksList.classList.add("sub-task-list");

    task.subtasks.forEach((subTask) => {
      const li = document.createElement("li");
      li.classList = "sub-task-item";
      li.id = `subtask${subTask.id}`;

      li.onclick = (e) => {
        e.stopPropagation();
        onToggleSubTaskComplete(subTask, task);
      };

      const subTaskCheckbox = createCheckbox(subTask, (clickedSubTask) =>
        onToggleSubTaskComplete(clickedSubTask, task),
      );

      const text = document.createElement("input");
      text.type = "text";
      text.value = subTask.name;
      text.className = "sub-task-text";
      text.onclick = (e) => {
        e.stopPropagation();
      };
      text.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          console.log(subTask.id);
          console.log(text.value);
          onChangeSubTaskName(subTask, text.value);
        }
      });

      const subTaskDeleteBtn = createDeleteSubTaskBtn(
        subTask,
        task,
        onDeleteSubTask,
      );
      subTaskDeleteBtn.classList = "sub-task-delete-btn";

      li.appendChild(subTaskCheckbox);
      li.appendChild(text);
      li.appendChild(subTaskDeleteBtn);
      subTasksList.appendChild(li);
    });

    taskBodyContent.appendChild(subTasksList);

    taskItem.appendChild(taskHeader);
    taskItem.appendChild(taskBody);
    listElement.appendChild(taskItem);
  });
}

export function updateTaskDOM(task) {
  console.log(task);
  const taskItem = document.getElementById(`task${task.id}`);
  if (!taskItem) return;

  const progressContainer = taskItem.querySelector(".progress-container");

  if (progressContainer) {
    populateProgressBar(progressContainer, task.subtasks);
  }

  const statusContainer = taskItem.querySelector(".status-container");
  if (statusContainer) {
    populateStatus(statusContainer, task.status);
  }
}

/// sssacdsdaklfdh

function createIcon(iconName) {
  const span = document.createElement("span");
  span.classList = "material-symbols-outlined";
  span.innerText = iconName;
  return span;
}

function createData(data, component) {
  const cell = document.createElement("div");
  cell.classList = `task-${data}`;
  cell.classList.add("task-item-cell");
  cell.appendChild(component);
  return cell;
}

function createCheckbox(subTask, onToggleCallback) {
  const label = document.createElement("label");
  label.classList = "sub-task-custom-checkbox";
  label.onclick = (e) => {
    e.stopPropagation();
  };

  const checkmark = document.createElement("div");
  checkmark.classList = "sub-task-checkmark";
  const checkmarkIcon = document.createElement("span");
  checkmarkIcon.classList = "material-symbols-outlined";
  checkmarkIcon.innerText = "check";
  checkmark.appendChild(checkmarkIcon);

  const checkbox = document.createElement("input");
  checkbox.classList = "sub-task-checkbox";
  checkbox.type = "checkbox";
  checkbox.checked = subTask.completed;
  checkbox.id = `subtask-checkbox-${subTask.id}`;
  checkbox.onchange = () => {
    onToggleCallback(subTask);
  };

  label.appendChild(checkbox);
  label.appendChild(checkmark);
  return label;
}

function createDeleteTaskBtn(task, onDelete) {
  const deleteBtn = document.createElement("button");
  const span = document.createElement("span");
  span.classList = "material-symbols-outlined";
  span.innerText = "close";
  deleteBtn.appendChild(span);
  deleteBtn.onclick = (e) => {
    e.stopPropagation();
    onDelete(task.id);
  };
  return deleteBtn;
}
function createDeleteSubTaskBtn(subTask, task, onDelete) {
  const deleteBtn = document.createElement("button");
  const span = document.createElement("span");
  span.classList = "material-symbols-outlined";
  span.innerText = "close";
  deleteBtn.appendChild(span);
  deleteBtn.onclick = (e) => {
    e.stopPropagation();
    onDelete(subTask.id, task);
  };
  return deleteBtn;
}

function createPriority(task) {
  const priority = document.createElement("div");
  priority.classList = "priority-container";
  const dot = document.createElement("span");
  dot.classList = "priority-dot";

  const span = document.createElement("span");
  const text =
    task.priority[0].toUpperCase() + task.priority.slice(1).toLowerCase();
  span.innerText = text;
  span.classList = "priority-text";

  priority.classList.add(text);
  priority.appendChild(dot);
  priority.appendChild(span);
  return priority;
}

// Creators
function createProgressBar(task) {
  const progressContainer = document.createElement("div");
  progressContainer.classList = "progress-container";

  const bar = document.createElement("div");
  bar.classList = "progress-bar-background";

  const progressBar = document.createElement("div");
  progressBar.classList = "progress-bar";

  const span = document.createElement("span");
  span.classList = "progress-bar-text";

  bar.appendChild(progressBar);
  progressContainer.appendChild(bar);
  progressContainer.appendChild(span);

  populateProgressBar(progressContainer, task.subtasks);
  return progressContainer;
}

function createStatus(task) {
  const statusContainer = document.createElement("div");
  statusContainer.classList = "status-container";

  const dot = document.createElement("span");
  dot.classList = "status-dot";

  const span = document.createElement("span");
  span.classList = "status-text";

  statusContainer.appendChild(dot);
  statusContainer.appendChild(span);

  populateStatus(statusContainer, task.status);
  return statusContainer;
}

// Populators
function populateProgressBar(progressContainer, subtasks) {
  const progressBar = progressContainer.querySelector(".progress-bar");
  const progressText = progressContainer.querySelector(".progress-bar-text");

  const percentage = calculateProgress(subtasks);

  if (progressBar) {
    progressBar.style.width = `${percentage}%`;
  }
  if (progressText) {
    progressText.innerText = `${Math.round(percentage)}%`;
  }
}

function populateStatus(statusContainer, status) {
  const text = statusContainer.querySelector(".status-text");

  if (!status) return;

  const formattedText = status
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  text.innerText = formattedText;

  statusContainer.classList.remove("NOT_STARTED", "IN_PROGRESS", "COMPLETED");

  statusContainer.classList.add(status);
  console.log("Status zaktualizowany na:", status);
}
// Helpers
function calculateProgress(subtasks) {
  if (!subtasks || subtasks.length === 0) return 0;
  const completed = subtasks.filter((t) => t.completed).length;
  return (completed / subtasks.length) * 100;
}

function formateDate(date) {
  const splitDateArr = date.split("-");
  let month = "";
  switch (splitDateArr[1]) {
    case "01":
      month = "Jan";
      break;
    case "02":
      month = "Feb";
      break;
    case "03":
      month = "Mar";
      break;
    case "04":
      month = "Apr";
      break;
    case "05":
      month = "May";
      break;
    case "06":
      month = "Jun";
      break;
    case "07":
      month = "Jul";
      break;
    case "08":
      month = "Aug";
      break;
    case "09":
      month = "Sep";
      break;
    case "10":
      month = "Oct";
      break;
    case "11":
      month = "Nov";
      break;
    case "12":
      month = "Dec";
      break;
  }
  const formattedDate = `${month} ${splitDateArr[2]}, ${splitDateArr[0]}`;
  return formattedDate;
}
