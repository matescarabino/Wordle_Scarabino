window.onload = function () {
    //Llamo a la función  que realiza las validaciones onFocus/onBlur
    validacionesOnFocus();


    //Validación on Submit --------------------------------------------------------------------
    document.formulario.onsubmit = function (event) {

        //Validación Nombre --------------------------------------------------------------------
        let nombre = document.getElementById('nombreInput');
        let name_format = /[A-Za-z0-9_]/;

        if ((nombre.value.length < 3) || (!nombre.value.match(name_format) || (nombre.value == ""))) {
            nombre.classList.add('invalid');
            errorNombre.innerHTML = 'Ingrese un nombre no menor a 3 caracteres alfanumericos.'
            return false; //se utiliza para abortar la funcion
        }


        localStorage.setItem('nombre', nombre.value);

        obtenerSaves(nombre.value);

        event.preventDefault();
    }
}

//Validación onfocus/onblur --------------------------------------------------------------------
function validacionesOnFocus() {
     //Validación Nombre --------------------------------------------------------------------
     let nombre = document.getElementById('nombreInput');
     let name_format = /[A-Za-z0-9_]/;
 
     nombre.onblur = function () {
         if ((nombre.value.length < 3) || (!nombre.value.match(name_format))
         ) {
             nombre.classList.add('invalid');
             errorNombre.innerHTML = 'Ingrese un nombre no menor a 3 caracteres alfanumericos.'
 
         }
     };
 
     nombre.onfocus = function () {
         if (nombre.classList.contains('invalid')) {
             nombre.classList.remove('invalid');
             errorNombre.innerHTML = "&nbsp;";
         }
     };

}

function redirigir(){
    window.location.href = "./html/wordle.html";
}
function mail(){
    window.location.href = "./html/contacto.html";
}
/*------------------------ Mostrar partidas ------------------------------------------*/

function obtenerSaves(nombre) {

    // let card_save = document.getElementById('data');
    // card_save.style.display = "flex"

    //Traigo del localStorage el array "saves", si no esta le asigno "[]"
    let savesArray = JSON.parse(localStorage.getItem('saves')) || [];

    //Muestro la lista de saves para el nombre ingresado
    let body = `<button onclick="redirigir();" id="nuevaPartida">Nueva Partida</button>`;
    let c = 0
    for (var i = 0; i < savesArray.length; i++) {
        if(savesArray[i].nombre == nombre){
            c++;
            body += `<button onclick="clickSave('${i}');">Partida: ${c}<br><br>${savesArray[i].fecha}</button>`;
            var encontro = true;
        }
    }

    if(encontro){
        document.getElementById('data').innerHTML = body;
        //Muesto titulo
        let titulo_save = document.getElementById('titulo_save');
        titulo_save.style.display = 'flex';

        //Escondo card
        let card = document.getElementById('formulario');
        card.style.display = 'none';
    }else{
        redirigir()
    }
}

function clickSave(save) {

    let saveActual = new URLSearchParams();

    saveActual.append("save", save);

    window.location.href = "/html/wordle.html?" + saveActual.toString();

    // //para github
    // window.location.href = "/Wordle_Scarabino/html/wordle.html?" + saveActual.toString();

}

/*------------------------ mostrar puntajes ------------------------------------------*/

function obtenerPuntajes() {

    //Traigo del localStorage el array "puntajes", si no esta le asigno "[]"
    let puntajesArray = JSON.parse(localStorage.getItem('puntajes')) || [];

    console.log(puntajesArray)

    //Muestro la lista de puntajes ordenado por fecha de mas nueva a mas antigua
    let body = '';
    for (var i = 0; i < puntajesArray.length; i++) {
            body += `<tr role="row">
                        <td data-label="NOMBRE">${(puntajesArray[puntajesArray.length-1-i].nombre)}</td>
                        <td data-label="FECHA">${(puntajesArray[puntajesArray.length-1-i].fecha)}</td>
                        <td data-label="PUNTAJE">${(puntajesArray[puntajesArray.length-1-i].puntaje)}</td>
                        <td data-label="TIEMPO">a</td>
                    </tr>`
        }
    document.getElementById('puntajes').innerHTML = body;
}

obtenerPuntajes()

function mostrarModal() {
    // Ejecuto modal -----------------------------------------------------------
    let modal = document.getElementById("modalRegistro");
    let span = document.getElementById("close");

    // Lo hago visible
    modal.style.display = "block";

    // Si clickea el "botón" de aceptar escondo el modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // Si clickea fuera del modal, lo escondo
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}