export function renderTaskList(
  tasks,
  onDeleteTask,
  onAddSubTask,
  onToggleSubTaskComplete,
  onDeleteSubTask,
) {
  const listElement = document.getElementById("taskList");

  const activeTasks = Array.from(
    document.querySelectorAll(".task-item.active"),
  );
  // console.log(activeTasks);
  // activeTasks.forEach((e) => console.log(e.id));

  const activeTasksIds = activeTasks.map((e) => e.id);
  console.log(activeTasksIds);

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

    const taskDate = document.createElement("p");
    taskDate.innerText = "Jan 1, 2025";
    const dateCell = createData("date", taskDate);

    const taskStatus = document.createElement("p");
    taskStatus.innerText = "not started";
    const statusCell = createData("status", taskStatus);

    const taskProgress = document.createElement("p");
    taskProgress.innerText = "0/0";
    const progressCell = createData("progress", taskProgress);
    // const deleteBtnElement = createDeleteBtn(task, onDeleteTask);

    const actionIcon = createIcon("more_horiz");
    const actionCell = createData("action", actionIcon);
    actionCell.classList.add("task-action");

    taskHeader.appendChild(nameCell);
    taskHeader.appendChild(dateCell);
    taskHeader.appendChild(statusCell);
    taskHeader.appendChild(progressCell);
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
      onAddSubTask(subTaskName, task.id);
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

      li.onclick = (e) => {
        e.stopPropagation();
        onToggleSubTaskComplete(subTask);
      };

      const subTaskCheckbox = createCheckbox(subTask, onToggleSubTaskComplete);

      const text = document.createElement("p");
      text.innerText = subTask.name;
      text.className = "sub-task-text";

      const subTaskDeleteBtn = createDeleteBtn(subTask, onDeleteSubTask);
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

    // mainRow.addEventListener("click", function (e) {
    //   detailsRow.classList.toggle("active");
    // });
  });
}

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

function createCheckbox(subTask, onToggleSubTaskComplete) {
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
  checkbox.onchange = () => {
    onToggleSubTaskComplete(subTask);
  };

  label.appendChild(checkbox);
  label.appendChild(checkmark);
  return label;
}

function createDeleteBtn(task, onDelete) {
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

function createProgressBar(task) {
  const subtasks = task.subtasks;

  const completedCount = subtasks.filter((st) => st.completed).length;
  const totalCount = subtasks.length;

  const span = document.createElement("span");
  span.innerText = `${completedCount}/${totalCount}`;

  if (!subtasks.length == 0) {
    span.innerText = `${completedCount}/${totalCount}`;
  } else {
    span.innerText = "-";
  }

  return span;
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
