let currentUser = localStorage.getItem("user");
let filter = "all";

const loginBox = document.getElementById("loginBox");
const app = document.getElementById("app");
const list = document.getElementById("taskList");

if (currentUser) showApp();

function login() {
    const user = document.getElementById("username").value.trim();
    if (!user) return;

    localStorage.setItem("user", user);
    currentUser = user;
    showApp();
}


function logout() {
    localStorage.removeItem("user");
    location.reload();
}

function showApp() {
    loginBox.classList.add("hidden");
    app.classList.remove("hidden");
    loadTasks();
}

document.getElementById("taskForm").addEventListener("submit", e => {
    e.preventDefault();

    const text = taskInput.value;
    const priority = prioritySelect.value;

    const task = { text, priority, done: false };
    const tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);
    renderTasks();
    e.target.reset();
});

function getTasks() {
  const tarefasJSON = localStorage.getItem("TAREFAS");
  if (!tarefasJSON) return [];
  try {
    return JSON.parse(tarefasJSON);
  } catch (e) {
    console.error("Erro ao parsear TAREFAS:", e);
    return [];
  }
}

function saveTasks(tarefas) {
  localStorage.setItem("TAREFAS", JSON.stringify(tarefas));
}

function loadTasks() {
    renderTasks();
}

function setFilter(type) {
    filter = type;
    renderTasks();
}

function renderTasks() {
    list.innerHTML = "";
    let tasks = getTasks();

    tasks = tasks.filter(t => {
        if (filter === "pending") return !t.done;
        if (filter === "done") return t.done;
        if (filter === "alta") return t.priority === "alta";
        return true;
    });

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = task.priority + (task.done ? " done" : "");

        const span = document.createElement("span");
        span.textContent = task.text;
        span.onclick = () => {
            task.done = !task.done;
            saveTasks(getTasks());
            renderTasks();
        };
function adicionarTarefa(titulo) {
  const tarefas = getTarefas();
  const novaTarefa = {
    id: Date.now(),
    titulo,
    concluida: false
  };
  tarefas.push(novaTarefa);
  saveTarefas(tarefas);
  mostrarTarefas();
}
function removerTarefa(idTarefa) {
  const tarefas = getTarefas();
  const idx = tarefas.findIndex(t => t.id === idTarefa);
  if (idx === -1) return; // não encontrada
  tarefas.splice(idx, 1);
  saveTarefas(tarefas);
  mostrarTarefas();
}

        const actions = document.createElement("div");
        actions.className = "actions";

        const del = document.createElement("button");
        del.textContent = "Excluir";
        del.onclick = () => {
            const tasks = getTasks();
            tasks.splice(index, 1);
            saveTasks(tasks);
            renderTasks();
        };

        actions.appendChild(del);
        li.append(span, actions);
        list.appendChild(li);
    });
}
