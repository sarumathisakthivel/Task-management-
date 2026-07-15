// Show Register Section
function showRegister() {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("registerSection").style.display = "block";
}

// Show Login Section
function showLogin() {
    document.getElementById("registerSection").style.display = "none";
    document.getElementById("loginSection").style.display = "block";
}

// Register User
function register() {
    let username = document.getElementById("newUsername").value.trim();
    let password = document.getElementById("newPassword").value.trim();

    if (username === "" || password === "") {
        alert("Please fill all fields!");
        return;
    }

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    alert("Registration Successful!");

    document.getElementById("newUsername").value = "";
    document.getElementById("newPassword").value = "";

    showLogin();
}

// Login User
function login() {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    let savedUser = localStorage.getItem("username");
    let savedPass = localStorage.getItem("password");

    if (username === savedUser && password === savedPass) {
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("taskSection").style.display = "block";
        loadTasks();
    } else {
        alert("Invalid Username or Password!");
    }
}

// Logout
function logout() {
    document.getElementById("taskSection").style.display = "none";
    document.getElementById("loginSection").style.display = "block";

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}

// Add Task
function addTask() {
    let task = document.getElementById("taskInput").value.trim();
    let date = document.getElementById("taskDate").value;

    if (task === "") {
        alert("Please enter a task.");
        return;
    }

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push({
        task: task,
        date: date
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

    document.getElementById("taskInput").value = "";
    document.getElementById("taskDate").value = "";

    loadTasks();
}

// Load Tasks
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach((item, index) => {
        taskList.innerHTML += `
        <li>
            <div>
                <strong>${item.task}</strong><br>
                <small>${item.date}</small>
            </div>

            <div class="task-actions">
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        </li>
        `;
    });
}

// Edit Task
function editTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));

    let updatedTask = prompt("Edit Task", tasks[index].task);

    if (updatedTask !== null && updatedTask.trim() !== "") {
        tasks[index].task = updatedTask.trim();
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    }
}

// Delete Task
function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));

    if (confirm("Are you sure you want to delete this task?")) {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    }
}
