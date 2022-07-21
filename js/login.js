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

function clickSave(i) {

    let saveActual = new URLSearchParams();

    saveActual.append("save", i);

    window.location.href = "/html/wordle.html?" + saveActual.toString();

}