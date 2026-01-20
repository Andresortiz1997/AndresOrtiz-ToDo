
class Tarea {
    constructor(id, titulo, completada = false) {
        this.id = id;
        this.titulo = titulo;
        this.completada = completada;
    }

    marcarCompleta() {
        this.completada = true;
    }
}

let tareas = [];
let contadorId = 1;

const inputTarea = document.getElementById("inputTarea");
const btnAgregar = document.getElementById("btnAgregar");
const listaTareas = document.getElementById("listaTareas");

const cargarTareas = () => {
    const datos = localStorage.getItem("tareas");

    if (datos) {
        const tareasParseadas = JSON.parse(datos);
        tareas = tareasParseadas.map(
            t => new Tarea(t.id, t.titulo, t.completada)
        );

        contadorId = tareas.length > 0
            ? Math.max(...tareas.map(t => t.id)) + 1
            : 1;
    }
};

const guardarTareas = () => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
};

const contarVisita = () => {
    let visitas = sessionStorage.getItem("visitas");

    if (!visitas) {
        sessionStorage.setItem("visitas", 1);
    } else {
        sessionStorage.setItem("visitas", Number(visitas) + 1);
    }

    console.log("Visitas en esta sesión:", sessionStorage.getItem("visitas"));
};

function agregarTarea() {
    const texto = inputTarea.value;

    if (texto === "") {
        alert("La tarea no puede estar vacía");
        return;
    }

    const nuevaTarea = new Tarea(contadorId, texto);
    tareas.push(nuevaTarea);
    contadorId++;

    guardarTareas();
    renderTareas();

    inputTarea.value = "";
}

const renderTareas = () => {
    listaTareas.innerHTML = "";

    tareas.forEach(tarea => {
        const li = document.createElement("li");
        li.textContent = tarea.titulo;

        if (tarea.completada) {
            li.classList.add("completada");
        }

        const btnCompletar = document.createElement("button");
        btnCompletar.textContent = "✔";
        btnCompletar.addEventListener("click", () => completarTarea(tarea.id));

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "✖";
        btnEliminar.addEventListener("click", () => eliminarTarea(tarea.id));

        li.appendChild(btnCompletar);
        li.appendChild(btnEliminar);
        listaTareas.appendChild(li);
    });
};

const completarTarea = function(id) {
    const tarea = tareas.find(t => t.id === id);
    tarea.marcarCompleta();
    guardarTareas();
    renderTareas();
};

const eliminarTarea = (id) => {
    tareas = tareas.filter(t => t.id !== id);
    guardarTareas();
    renderTareas();
};

btnAgregar.addEventListener("click", agregarTarea);

cargarTareas();
contarVisita();
renderTareas();
