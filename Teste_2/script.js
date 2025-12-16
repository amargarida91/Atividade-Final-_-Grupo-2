let tarefas = [];


function login() {
const user = document.getElementById('username').value;
const pass = document.getElementById('password').value;


if (!user || !pass) return alert('Preencha os dados');


localStorage.setItem('user', user);


document.getElementById('loginBox').classList.add('hidden');
document.getElementById('app').classList.remove('hidden');
}


function logout() {
localStorage.removeItem('user');
location.reload();
}


const form = document.getElementById('form-tarefa');
const list = document.getElementById('task-list');


form.addEventListener('submit', e => {
e.preventDefault();


const titulo = document.getElementById('titulo-tarefa').value;
const prioridade = document.getElementById('priority').value;


tarefas.push({ titulo, prioridade, done: false });
form.reset();
render();
});


function render() {
list.innerHTML = '';


tarefas.forEach((t, i) => {
const li = document.createElement('li');
li.className = 'task-item' + (t.done ? ' concluida' : '');


li.innerHTML = `
<span>${t.titulo} (${t.prioridade})</span>
<button class="btn" onclick="toggle(${i})">✔</button>
`;


list.appendChild(li);
});
}


function toggle(i) {
tarefas[i].done = !tarefas[i].done;
render();
}


function exportTXT() {
const txt = tarefas.map(t => `${t.titulo} - ${t.prioridade}`).join('\n');
download(txt, 'tarefas.txt');
}


function exportCSV() {
const csv = 'Título,Prioridade\n' + tarefas.map(t => `${t.titulo},${t.prioridade}`).join('\n');
download(csv, 'tarefas.csv');
}


function download(data, filename) {
const blob = new Blob([data]);
const a = document.createElement('a');
a.href = URL.createObjectURL(blob);
a.download = filename;
a.click();
}