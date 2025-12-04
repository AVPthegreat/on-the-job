// This list keeps track of all our tasks
let listOfTasks = [
  {
    id: "task-1",
    title: "Design System",
    column: "todo",
    priority: "high",
    dueDate: new Date(Date.now() + 86400000).toISOString(),
  },
  {
    id: "task-2",
    title: "API Integration",
    column: "doing",
    priority: "medium",
    dueDate: new Date(Date.now() + 172800000).toISOString(),
  },
  {
    id: "task-3",
    title: "User Testing",
    column: "done",
    priority: "low",
    dueDate: new Date(Date.now() - 86400000).toISOString(),
  },
];

// Getting elements from the HTML
const taskInput = document.getElementById("txt");
const addButton = document.getElementById("add");
const priorityButton = document.getElementById("priority-btn");
const priorityText = document.getElementById("priority-text");
const datePicker = document.getElementById("date-input");

// Simple lists for our options
const priorityOptions = ["low", "medium", "high"];
const priorityNames = {
  low: "Priority: Low",
  medium: "Priority: Medium",
  high: "Priority: High",
};

// When the page loads, do this
document.addEventListener("DOMContentLoaded", function () {
  // Set the date picker to tomorrow by default
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  // Fix timezone issue
  tomorrow.setMinutes(tomorrow.getMinutes() - tomorrow.getTimezoneOffset());
  datePicker.value = tomorrow.toISOString().slice(0, 16);

  loadTasksFromComputer(); // Get saved tasks
  showTasksOnScreen(); // Show them
  drawTimeline(); // Draw the timeline
});

// --- Button Clicks ---

// Change priority when button is clicked
priorityButton.onclick = function () {
  const currentValue = priorityButton.dataset.value;
  // Find the next priority in the list
  let nextIndex = priorityOptions.indexOf(currentValue) + 1;
  if (nextIndex >= priorityOptions.length) {
    nextIndex = 0; // Go back to start
  }
  const newValue = priorityOptions[nextIndex];

  // Update the button
  priorityButton.dataset.value = newValue;
  priorityText.textContent = priorityNames[newValue];
};

// Add task when button is clicked
addButton.onclick = addNewTask;

// Add task when Enter key is pressed
taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addNewTask();
  }
});

// --- Saving and Loading ---

function saveTasksToComputer() {
  // Save our list to the browser's local storage
  const textVersion = JSON.stringify(listOfTasks);
  localStorage.setItem("kanban_tasks", textVersion);
}

function loadTasksFromComputer() {
  // Get the list back from storage
  const storedTasks = localStorage.getItem("kanban_tasks");
  if (storedTasks) {
    listOfTasks = JSON.parse(storedTasks);
  }
}

// --- Main Functions ---

function addNewTask() {
  const title = taskInput.value.trim();

  // If the box is empty, don't do anything
  if (title === "") {
    return;
  }

  // Create a new task object
  const newTask = {
    id: "task-" + Date.now(), // Unique ID using time
    title: title,
    column: "todo", // Always start in To Do
    priority: priorityButton.dataset.value,
    dueDate: datePicker.value || new Date().toISOString(),
  };

  // Add to our list
  listOfTasks.push(newTask);

  saveTasksToComputer();
  showTasksOnScreen();
  drawTimeline();

  // Clear the input box
  taskInput.value = "";
}

function removeTask(id) {
  // Keep only tasks that don't match this ID
  listOfTasks = listOfTasks.filter(function (task) {
    return task.id !== id;
  });

  saveTasksToComputer();
  showTasksOnScreen();
  drawTimeline();
}

function editTaskTitle(id) {
  // Find the task with this ID
  const task = listOfTasks.find(function (t) {
    return t.id === id;
  });

  if (!task) return;

  // Ask user for new title
  const newTitle = prompt("Edit task title:", task.title);

  if (newTitle) {
    task.title = newTitle.trim();
    saveTasksToComputer();
    showTasksOnScreen();
    drawTimeline();
  }
}

function showTasksOnScreen() {
  // Clear all columns first
  document.getElementById("todo").innerHTML = "";
  document.getElementById("doing").innerHTML = "";
  document.getElementById("done").innerHTML = "";

  // Loop through every task and put it in the right place
  listOfTasks.forEach(function (task) {
    const card = createCard(task);
    const column = document.getElementById(task.column);
    if (column) {
      column.appendChild(card);
    }
  });
}

function createCard(task) {
  const card = document.createElement("div");
  // Add classes for styling
  card.className = "dashboard-task-card priority-" + task.priority;
  card.draggable = true;
  card.id = task.id;

  // Handle dragging
  card.ondragstart = function (event) {
    event.dataTransfer.setData("text/plain", task.id);
    event.dataTransfer.effectAllowed = "move";
  };

  // Create the content inside the card
  const content = document.createElement("div");
  content.style.display = "flex";
  content.style.justifyContent = "space-between";
  content.style.alignItems = "center";

  // Task Title
  const titleText = document.createElement("span");
  titleText.textContent = task.title;
  titleText.style.color = "#fff";
  titleText.style.fontWeight = "500";

  // Right side (Date, Edit, Delete)
  const rightSide = document.createElement("div");
  rightSide.style.display = "flex";
  rightSide.style.alignItems = "center";
  rightSide.style.gap = "8px";

  // Date Badge
  const dateObj = new Date(task.dueDate);
  const dateString = dateObj.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
  const dateBadge = document.createElement("span");
  dateBadge.textContent = dateString;
  dateBadge.style.fontSize = "0.7rem";
  dateBadge.style.color = "#888";
  dateBadge.style.backgroundColor = "#222";
  dateBadge.style.padding = "2px 6px";
  dateBadge.style.borderRadius = "4px";

  // Edit Button (Pencil)
  const editButton = document.createElement("button");
  editButton.innerHTML = "✎";
  editButton.onclick = function (event) {
    event.stopPropagation(); // Don't trigger drag
    editTaskTitle(task.id);
  };
  // Basic styling for button
  editButton.style.background = "none";
  editButton.style.border = "none";
  editButton.style.color = "#666";
  editButton.style.fontSize = "1.2rem";
  editButton.style.cursor = "pointer";

  // Delete Button (X)
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "&times;";
  deleteButton.onclick = function (event) {
    event.stopPropagation();
    removeTask(task.id);
  };
  deleteButton.style.background = "none";
  deleteButton.style.border = "none";
  deleteButton.style.color = "#666";
  deleteButton.style.fontSize = "1.2rem";
  deleteButton.style.cursor = "pointer";

  // Put everything together
  rightSide.appendChild(dateBadge);
  rightSide.appendChild(editButton);
  rightSide.appendChild(deleteButton);

  content.appendChild(titleText);
  content.appendChild(rightSide);
  card.appendChild(content);

  return card;
}

// --- Drag and Drop ---

// This function runs when you drop a task
window.drop = function (event) {
  event.preventDefault();
  const id = event.dataTransfer.getData("text/plain");

  // Find the task we dropped
  const task = listOfTasks.find(function (t) {
    return t.id === id;
  });

  // Find where we dropped it
  let target = event.target;
  while (target && !target.classList.contains("task-container")) {
    target = target.parentElement;
  }

  if (task && target) {
    // Update the task's column
    task.column = target.id;

    saveTasksToComputer();
    showTasksOnScreen();
    drawTimeline();
  }
};

// --- Timeline ---

function drawTimeline() {
  const chart = document.getElementById("timeline-chart");
  const xAxis = document.getElementById("timeline-x-axis");

  if (!chart || !xAxis) return;

  // Clear old stuff
  chart.innerHTML = "";
  xAxis.innerHTML = "";

  // 1. Make the Y-Axis (Dates)
  const today = new Date();
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d);
  }

  const yAxis = document.createElement("div");
  yAxis.className = "y-axis";
  dates.forEach(function (d) {
    const span = document.createElement("span");
    span.textContent = d.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "2-digit",
    });
    yAxis.appendChild(span);
  });
  chart.appendChild(yAxis);

  // 2. Make the Grid and Capsules
  const grid = document.createElement("div");
  grid.className = "timeline-grid";

  // Draw lines for each day
  dates.forEach(function () {
    const line = document.createElement("div");
    line.className = "grid-line";
    grid.appendChild(line);
  });

  // Put tasks on the timeline
  listOfTasks.forEach(function (task) {
    // Don't show 'done' tasks
    if (task.column === "done") return;

    const dueDate = new Date(task.dueDate);

    // Find which row (date) this task goes in
    const rowIndex = dates.findIndex(function (d) {
      return (
        d.getDate() === dueDate.getDate() && d.getMonth() === dueDate.getMonth()
      );
    });

    if (rowIndex !== -1) {
      // Figure out left position (Time)
      const hours = dueDate.getHours() + dueDate.getMinutes() / 60;
      const leftPercent = (hours / 24) * 100;

      // Figure out top position (Date)
      const rowHeight = 100 / 7;
      const topPercent = rowIndex * rowHeight + rowHeight / 2;
      const capsule = document.createElement("div");
      capsule.className = "capsule " + getTaskColor(task);
      capsule.style.left = leftPercent + "%";
      capsule.style.top = topPercent + "%";

      // Make capsule draggable
      capsule.draggable = true;
      capsule.ondragstart = function (event) {
        event.dataTransfer.setData("text/plain", task.id);
        event.dataTransfer.effectAllowed = "move";
      };

      // Width is now handled by CSS (circle)

      // Calculate time left
      const diffMs = dueDate - new Date();
      const diffHrs = Math.round(diffMs / (1000 * 60 * 60));
      let timeText = "Overdue";
      if (diffHrs > 0) {
        timeText = diffHrs + "h left";
      }

      // Add Tooltip Content
      capsule.innerHTML = `
          <div class="tooltip">
              <span class="tooltip-title">${task.title}</span>
              <span class="tooltip-info">Time: ${timeText}</span>
              <span class="tooltip-info">Priority: ${task.priority}</span>
          </div>
      `;

      grid.appendChild(capsule);
    }
  });

  chart.appendChild(grid);

  // 3. Make the X-Axis (Time)
  const times = ["00:00", "06:00", "12:00", "18:00", "23:59"];
  times.forEach(function (time) {
    const span = document.createElement("span");
    span.textContent = time;
    xAxis.appendChild(span);
  });
}

function getTaskColor(task) {
  if (task.priority === "low") return "green";
  if (task.priority === "medium") return "orange";
  if (task.priority === "high") return "red";
  return "white";
}
