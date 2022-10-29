const proyectosForm = document.getElementById('proyectosForm');
let proyectos = [];

function sumarDiasP(fechaP, diasP){
    fechaP.setDate(fechaP.getDate() + diasP);
    return fechaP;
}

proyectosForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const form = new FormData(proyectosForm);
    const proyectoX = form.get('proyectoX');
    const responsable = form.get('responsable')
    const tiempoP = form.get('tiempoP');
    const PrioridadP = form.get('PrioridadP');
    const descripcionP= form.get('descripcionP');
    const fechaActualP = fechaHoy.toLocaleDateString();
    const fechaFinP = sumarDiasP(new Date(), Number(tiempoP.split(' ')[0]))
    const proyecto = {proyectoX,responsable,tiempoP,PrioridadP,descripcionP, fechaActualP: fechaActualP, fechaFinalP: fechaFinP.toLocaleDateString(), diasRestantesP: (fechaFinP - new Date())/(1000*60*60*24) };

    proyectos.push(proyecto);
    nuevoProyecto(proyectos);
    guardarProyectoStorage(proyectos);
});  

const nuevoProyecto = (proyectos) => {

    const listaProyectos = document.getElementById("listaProyectos");
    const div = document.createElement("div");

    listaProyectos.innerHTML = '';

    proyectos.forEach(proyecto => {

        div.innerHTML += `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Nombre del Proyecto:</strong> ${proyecto.proyectoX}<div></div>         
                    <strong class="p-1">Responsable:</strong> ${proyecto.responsable} 
                    <strong class="p-1">Tiempo de ejecución:</strong> ${proyecto.tiempoP} 
                    <strong class="p-1">Dias restantes:</strong> ${proyecto.diasRestantesP}
                    <strong class="p-1">Prioridad:</strong> ${proyecto.PrioridadP}
                    <strong class="p-1">Descripción:</strong> ${proyecto.descripcionP}
                    <button href="#" class="btn m-2 btn-outline-info rounded" id="${proyecto.proyectoX}" name="delete" value="${proyecto.proyectoX}">Borrar</button>
                </div>
            </div>
        `;
        listaProyectos.appendChild(div);
    });

    document.getElementById('proyectosForm').reset();

    listaProyectos.addEventListener('click', (e) => {  
        borrarProyecto(e.target.value);
    });
};

const borrarProyecto = (proyectoX) => {
    proyectos.forEach((proyecto, index) => {
        if (proyecto.proyectoX === proyectoX) {
            proyectos.splice(index, 1);
        }
    });
    nuevoProyecto(proyectos);
    guardarProyectoStorage(proyectos);
};

const guardarProyectoStorage = (proyectos) => {
    localStorage.setItem('proyectos', JSON.stringify(proyectos));
};

const obtenerProyectoStorage = () => {
    const proyectoStorage = JSON.parse(localStorage.getItem('proyectos'));
    return proyectoStorage;
};

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('proyectos')) {
        proyectos = obtenerProyectoStorage();
        nuevoProyecto(proyectos);
    }
})