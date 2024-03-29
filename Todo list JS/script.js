const fecha = document.querySelector('#fecha')
const lista = document.querySelector('#lista')
const input = document.querySelector('#input')
const botonEnter = document.querySelector('#enter')
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'
let id = 0
let LIST = []

//Creacion de fecha
const FECHA = new Date()
fecha.innerHTML = FECHA.toLocaleDateString('es-MX', {weekday:'long', month: 'short', day: 'numeric'})


//Funcion agregar tarea

function agregarTarea (tarea, id, realizado, eliminado) {
    if(eliminado){return}
    
    const REALIZADO = realizado ?check :uncheck
    const LINE = realizado ?check :''

    const elemento = `
                        <li id="elemento">
                        <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                        <p class="text ${LINE}">${tarea}</p>
                        <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
                        </li>
                    `
    lista.insertAdjacentHTML("beforeend", elemento)
}

//funcion tarea realizada
function tareaRealizada(element) {
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    LIST[element.id].realizado = LIST[element.id].realizado ?false :true
}

function tareaEliminada(element) {
    element.parentNode.parentNode.removeChild(element.parentNode)
}

botonEnter.addEventListener('click',()=> {
    const tarea = input.value
    if(tarea) {
        agregarTarea(tarea, id, false, false)
        LIST.push({
            nombre: tarea,
            id: id,
            realizado: false,
            eliminado: false
        })
    }
    input.value=''
    id++

})

document.addEventListener('keyup', function(event){
    if(event.key=='Enter'){
        const tarea = input.value
        if(tarea){
            agregarTarea(tarea, id, false, false)
            LIST.push({
                nombre: tarea,
                id: id,
                realizado: false,
                eliminado: false
            })
        }
    input.value=''
    id++
    }
})

lista.addEventListener('click', function(event){
    const element = event.target
    const elementData = element.attributes.data.value
    if(elementData === 'realizado'){
        tareaRealizada(element)
    }
    else if(elementData === 'eliminado'){
        tareaEliminada(element)
    }
})