const sesionForm = document.getElementById('sesion-form');
let sesiones = [];

sesionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const form = new FormData(sesionForm);
    const sesionX = form.get('sesionX');
    const horario = form.get('horario');
    const titulo = form.get('titulo');
    const descripcion = form.get('descripcion');


    const sesion = {sesionX,titulo,horario,descripcion};

    sesiones.push(sesion);
    nuevaSesion(sesiones);
    guardarSesionS(sesiones);
});

const nuevaSesion = (sesiones) => {

    const listaSesion = document.getElementById("listado-sesiones");
    const div = document.createElement("div");

    listaSesion.innerHTML = '';

    sesiones.forEach(sesion => {

        div.innerHTML += `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong class="p-1">Tipo de sesion:</strong> ${sesion.sesionX}<div></div>
                    <strong class="p-1"> Horario:</strong> ${sesion.horario}
                    <strong class="p-1"> Título:</strong> ${sesion.titulo} 
                    <strong class="p-1"> Descripción:</strong> ${sesion.descripcion}
                    <button href="#" class="btn m-2 btn-outline-info rounded" id="${sesion.titulo}" name="Borrar" value="${sesion.titulo}">Borrar</button>
                </div>
            </div>
        `;
        listaSesion.appendChild(div);
    });

    document.getElementById('sesion-form').reset();

    listaSesion.addEventListener('click', (e) => {

        borrarSesion(e.target.value);
    });
};

const borrarSesion = (titulo) => {

    sesiones.forEach((sesion, index) => {
        if (sesion.titulo === titulo) {
            sesiones.splice(index, 1);
        }
    });
    nuevaSesion(sesiones);
    guardarSesionS(sesiones);
};

const guardarSesionS = (sesiones) => {

    localStorage.setItem('sesiones', JSON.stringify(sesiones));
};

const obtenerSesiones = () => {

    const sesionStorage = JSON.parse(localStorage.getItem('sesiones'));
    return sesionStorage;

};

document.addEventListener('DOMContentLoaded', () => {

    if (localStorage.getItem('sesiones')) {
        sesiones = obtenerSesiones();
        nuevaSesion(sesiones);
    }

})

