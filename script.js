let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentTheme = localStorage.getItem("theme") || "light";

// 🌓 Apply theme on load
document.body.classList.toggle("dark", currentTheme === "dark");
document.getElementById("themeToggle").textContent = currentTheme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";

// 🎯 Theme toggle button
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  currentTheme = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", currentTheme);
  document.getElementById("themeToggle").textContent = currentTheme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
});

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <div>
        <strong>${task.text}</strong> ${task.recurring ? "🔁" : ""}
        <small>Due: ${task.date || "No date"}</small>
      </div>
      <div class="buttons">
        <button class="complete-btn" onclick="toggleComplete(${index})">✓</button>
        <button class="edit-btn" onclick="editTask(${index})">✏️</button>
        <button class="delete-btn" onclick="deleteTask(${index})">✕</button>
      </div>
    `;

    taskList.appendChild(li);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskDate = document.getElementById("taskDate");
  const recurring = document.getElementById("recurringTask").checked;

  const text = taskInput.value.trim();
  const date = taskDate.value;

  if (!text) return;

  tasks.push({
    text,
    date,
    completed: false,
    recurring
  });

  taskInput.value = "";
  taskDate.value = "";
  document.getElementById("recurringTask").checked = false;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText === null) return;

  const newDate = prompt("Edit due date (YYYY-MM-DD):", tasks[index].date);
  if (newDate === null) return;

  tasks[index].text = newText.trim() || tasks[index].text;
  tasks[index].date = newDate;
  renderTasks();
}


renderTasks();
