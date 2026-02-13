class Tarea {
  constructor(id, titulo, descripcion, prioridad, completada = false) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.prioridad = prioridad;
    this.completada = completada;
  }

  toggleEstado() {
    this.completada = !this.completada;
  }
}

const listaTareas = document.getElementById("lista-tareas");
const modal = document.getElementById("modal-tarea");
const botonNueva = document.getElementById("boton-nueva-tarea");
const cerrarModal = document.getElementById("btn-cerrar-modal");
const formulario = document.getElementById("formulario-tarea");

let tareas = [];

async function cargarTareas() {
  const tareasGuardadas = localStorage.getItem("tareas");

  if (tareasGuardadas) {
    const data = JSON.parse(tareasGuardadas);
    tareas = data.map(
      t => new Tarea(t.id, t.titulo, t.descripcion, t.prioridad, t.completada)
    );
    renderTareas();
  } else {
    const response = await fetch("../tareas.josn");
    const data = await response.json();
    tareas = data.map(
      t => new Tarea(t.id, t.titulo, t.descripcion, t.prioridad, t.completada)
    );
    guardarEnStorage();
    renderTareas();
  }
}

function guardarEnStorage() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

function renderTareas() {
  listaTareas.innerHTML = "";

  tareas.forEach(tarea => {
    const div = document.createElement("div");
    div.classList.add("tarea");
    if (tarea.completada) div.classList.add("completada");

    div.innerHTML = `
      <div>
        <h4>${tarea.titulo}</h4>
        <p>${tarea.descripcion}</p>
        <span class="prioridad prioridad-${tarea.prioridad}">
          ${tarea.prioridad.toUpperCase()}
        </span>
      </div>
      <div>
        <button onclick="toggleTarea(${tarea.id})">✔</button>
        <button onclick="eliminarTarea(${tarea.id})">✖</button>
      </div>
    `;

    listaTareas.appendChild(div);
  });

  actualizarResumen();
  lucide.createIcons();
}

function actualizarResumen() {
  const totales = tareas.length;
  const hechas = tareas.filter(t => t.completada).length;
  const activas = totales - hechas;

  const tarjetas = document.querySelectorAll(".tarjeta-stat h3");
  tarjetas[0].textContent = totales;
  tarjetas[1].textContent = activas;
  tarjetas[2].textContent = hechas;
}

function toggleTarea(id) {
  const tarea = tareas.find(t => t.id === id);
  tarea.toggleEstado();
  guardarEnStorage();
  renderTareas();
}

function eliminarTarea(id) {
  tareas = tareas.filter(t => t.id !== id);
  guardarEnStorage();
  renderTareas();
}

formulario.addEventListener("submit", e => {
  e.preventDefault();

  const titulo = document.getElementById("tarea-nombre").value;
  const descripcion = document.getElementById("tarea-descripcion").value;
  const prioridad = document.getElementById("tarea-prioridad").value;

  const nuevaTarea = new Tarea(
    Date.now(),
    titulo,
    descripcion,
    prioridad
  );

  tareas.push(nuevaTarea);
  guardarEnStorage();
  renderTareas();
  formulario.reset();
  modal.style.display = "none";

  Swal.fire({
    icon: "success",
    title: "Tarea creada",
    timer: 1500,
    showConfirmButton: false
  });
});

botonNueva.addEventListener("click", () => {
  modal.style.display = "flex";
});

cerrarModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.toggleTarea = toggleTarea;
window.eliminarTarea = eliminarTarea;

cargarTareas();

