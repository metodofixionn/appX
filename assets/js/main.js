const dateNumber = document.getElementById('dateNumber');
const dateText = document.getElementById('dateText');
const dateMonth = document.getElementById('dateMonth');
const dateYear = document.getElementById('dateYear');


const setDate = () => {

    const date = new Date();
    dateNumber.textContent = date.toLocaleString('es',{day: 'numeric'});
    dateText.textContent = date.toLocaleString('es',{weekday: 'long'});
    dateMonth.textContent = date.toLocaleString('es',{month: 'short'});
    dateYear.textContent = date.toLocaleString('es',{year: 'numeric'});
};


const listaInfo = document.getElementById('info');

fetch('..data.json')
    .then((response) => response.json())
    .then((data) => {
        data.forEach((metodo) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h4 style="color: white; font-family: monospace;font-weigth: bolder;" class="text-center">${metodo.nombre}</h4>
                <p class="m-4">${metodo.descripcion}</p>
            `
            listaInfo.appendChild(li);
        })
    })

setDate();

