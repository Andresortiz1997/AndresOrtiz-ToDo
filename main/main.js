

const saludo=prompt("igresa tu nombre")
console.log("Hola "+ saludo + "Bienvenido al gestor de tareas")

const menu=
"Elegi una de la siguientes opciones "+
"1-agregar tarea "+ 
"2- maotrar tarea "+ 
"3- marcar tarea como hecha "+ 
"4-eliminar tarea "+ 
"5-salir"

let opcion= ""
let tareas= []


function pedirTarea(){
    let tarea= prompt("ingresa la tarea")
    return tarea
}

const validarTarea= function(tarea){
    return tarea !== " " && tarea !== null
}

const mostrarTarea=()=>{
    console.log("Lista de Tareas")
    for(let i =0; i<tareas.length;i++){
        console.log(i+ " " + tareas[i])
    }
}