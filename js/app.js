window.onload = () => {
    declararVaribles();

    obtenerPuntajes();
}

async function declararVaribles(){

    let saveActual = new URLSearchParams(window.location.search);

    let save = saveActual.get("save");

    await obtenerListaPalabras()
    .then(data => {
         listaPalabras = data;
    })

    if(save){
        //Traigo del localStorage el array "saves"
        let savesArray = JSON.parse(localStorage.getItem('saves'));

        window.palabra = savesArray[save].palabra
        window.principal = savesArray[save].principal
        window.colores = savesArray[save].colores
        window.fila = savesArray[save].fila
        window.columna = savesArray[save].columna
        window.hours = savesArray[save].hours
        window.minutes = savesArray[save].minutes
        window.seconds = savesArray[save].seconds

        window.nombre = localStorage.getItem('nombre');

        window.appendHours = document.getElementById("hours");
        window.appendMinutes = document.getElementById("minutes");
        window.appendSeconds = document.getElementById("seconds");
        window.Interval;

        cargarJuego();
    }else{

        await cargarPalabraJugadora()
            .then(data => {
                 palabras = data;
        })

        elegirPalabra();

        window.principal = [
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', '']];

        window.colores = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]];

        window.fila = 0;
        window.columna = 0;

        window.hours = 0;
        window.minutes = 0;
        window.seconds = 0;
        window.appendHours = document.getElementById("hours");
        window.appendMinutes = document.getElementById("minutes");
        window.appendSeconds = document.getElementById("seconds");
        window.Interval;

        window.nombre = localStorage.getItem('nombre');

        cargarJuego();
    }
    //Eliminar esta linea luego de rendir final
    console.log(palabra)
}

/*------------------------ cargarPalabra y listaPalabras ------------------------------------------*/
async function cargarPalabraJugadora(){
    let url = '../Storage/palabrasJugadoras.json';
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
}

function elegirPalabra(){
    //me aseguro que la palabra nunca sea la misma 2 veces seguidas guardado en localStorage la anterior
    let idAnterior = JSON.parse(localStorage.getItem('idPalabraAnterior')) || 0;
    let idActual = 0;

    do{
        idActual = Math.floor(Math.random() * palabras.length);
    }while(idActual == idAnterior);

    localStorage.setItem("idPalabraAnterior", idActual)

    palabraAleatoria = (palabras[idActual]).toUpperCase()

    palabra = palabraAleatoria.split('')

}

async function obtenerListaPalabras(){
    let url = '../Storage/listaPalabras.json';
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
}

/*------------------------ cargar juego ------------------------------------------*/
function cargarJuego(){

    for (var index = 0; index < principal.length; index++) {

        for (var celda = 0; celda < principal[index].length; celda++) {

            let valor = document.getElementById(`${index}${celda}`)

            valor.innerHTML = principal[index][celda];
        }
    }

    pintarTablero();

    pintarTeclado();

    start();
}

function pintarTablero(){
    for (var index = 0; index < colores.length; index++) {

        for (var celda = 0; celda < colores[index].length; celda++) {

            let valor = document.getElementById(`${index}${celda}`)
                
                switch (colores[index][celda]) {

                    case 1:
                        valor.classList.add('girar');
                        valor.style.backgroundColor = '#33cc33';
                        valor.style.color = '#000';
                        break;

                    case 2:
                        valor.classList.add('girar');
                        valor.style.backgroundColor = '#ffff00';
                        valor.style.color = '#000';
                        break;

                    case 3:
                        valor.classList.add('girar');
                        valor.style.backgroundColor = '#121213';
                        valor.style.border = '1px solid #3a3a3c';
                        break;

                    default:
                        break;
                }
        }
    }
}

function pintarTeclado() {
    for (var index = 0; index < colores.length; index++) {

        for (var celda = 0; celda < colores[index].length; celda++) {

            let tecla = document.getElementById(principal[index][celda]);

            switch (colores[index][celda]) {

                case 1:
                    tecla.style.backgroundColor = '#33cc33'
                    tecla.style.color = '#000'
                    break;

                case 2:
                    tecla.style.backgroundColor = '#ffff00'
                    tecla.style.color = '#000'
                    break;

                case 3:
                    if ((tecla.style.backgroundColor != 'rgb(51, 204, 51)') && (tecla.style.backgroundColor != 'rgb(255, 255, 0)')) {
            
                        tecla.style.backgroundColor = '#1a1a1a'
                        tecla.style.color = '#fff'
                    }
                    break;

                default:
                    break;
            }
        }
    }
}
/*------------------------ funciones del teclado ------------------------------------------*/

function clickTecla(tecla){
    //Sonido click
    const audio = new Audio();
    audio.src = "../sounds/click.mp3"
    audio.play();

    if(columna < 5){
        principal[fila][columna] = tecla;
        valor = document.getElementById(`${fila}${columna}`);
        valor.innerHTML = tecla;
        columna++;

        if (columna == 5){
            let enter = document.getElementById('ENTER');
            enter.style.backgroundColor = '#33cc33';
        }
        if (columna != 0){
            let del = document.getElementById('<<');
            del.style.backgroundColor = '#ff3333';
        }
    }

}

function del(){
    //Sonido click
    const audio = new Audio();
    audio.src = "../sounds/click.mp3"
    audio.play();

    if(columna == 0){
        principal[fila][columna] = '';
        valor = document.getElementById(`${fila}${columna}`);
        valor.innerHTML = ''
    }else if(columna > 0){
        columna--;
        principal[fila][columna] = '';
        valor = document.getElementById(`${fila}${columna}`);
        valor.innerHTML = ''

        //Pintar colores teclas
        if (columna != 5){
            let enter = document.getElementById('ENTER');
            enter.style.backgroundColor = '#70db70';
        }
        if (columna == 0){
            let del = document.getElementById('<<');
            del.style.backgroundColor = '#ff6666';
        }
    }
}

function enter(){

    if(columna == 5 && fila != 5){
        if(chequeo()==true){
            fila++;
            columna = 0;
        }else{
            mostrarMensajeError();
        }
    }else if (columna == 5 && fila == 5){
        if(chequeo()!=true){
            mostrarMensajeError();
        }
    }
    //Pintar colores teclas
    if (columna != 5){
        let enter = document.getElementById('ENTER');
        enter.style.backgroundColor = '#70db70';

        let del = document.getElementById('<<');
        del.style.backgroundColor = '#ff6666';
    }
}

/*----------------------------funciones juego--------------------------------------*/
function chequeo(){

    if(validarSiExiste()){

        validarCoincidencia();

        pintarTablero();
    
        validarVictoria();
        return true
    }else{
        return false
    }
}

function validarSiExiste() {

    let palabraUsuario = principal[fila].join("").toLowerCase();

    if(listaPalabras.includes(palabraUsuario)){
        return true
    }else{
        return false
    }
}

function validarCoincidencia() {

    // Array auxiliar para contar la cantidad de letras
    let arrayAux = [
        ['', '', '', '', ''],
        [0, 0, 0, 0, 0]
    ];

    for (let index = 0; index < 5; index++) {

        if (!((arrayAux[0]).includes(palabra[index]))) {

            arrayAux[0][index] = palabra[index]
        }
    }

    for (let index = 0; index < 5; index++) {

        for (let index2 = 0; index2 < 5; index2++) {

            if(arrayAux[0][index] == palabra[index2]){

                arrayAux[1][index] ++

            }
                
        }

    }
    // console.log(arrayAux)

    //VERDE
    for (let index = 0; index < 5; index++) {

        if (principal[fila][index] == palabra[index]) {

            colores[fila][index] = 1;

            for (let index2 = 0; index2 < 5; index2++) {

                if (principal[fila][index] == arrayAux[0][index2]) {

                    let valor = arrayAux[1][index2]

                    if (valor > 0) {
                        arrayAux[1][index2]--
                    }
                }

            }
        //NEGRO
        } else {
            colores[fila][index] = 3;
        }

    }

    //AMARILLO
    for (let index = 0; index < 5; index++) {

        for (let index2 = 0; index2 < 5; index2++) {

            if (principal[fila][index] == arrayAux[0][index2] && (principal[fila][index] != palabra[index])) {

                let valor = arrayAux[1][index2]

                if (valor > 0) {
                    colores[fila][index] = 2;

                    arrayAux[1][index2]--
                }
            }
        }

    }
   
    pintarTeclado();
}

function validarVictoria(){
    if(
        colores[fila][0] == 1 &&
        colores[fila][1] == 1 &&
        colores[fila][2] == 1 &&
        colores[fila][3] == 1 &&
        colores[fila][4] == 1)
        {
            //Sonido victoria
            const audio = new Audio();
            audio.src = "../sounds/victory.wav"
            audio.play();

            let teclado = document.getElementById('teclado');
            teclado.style.display = 'none';

            let enter = document.getElementById('ENTER');
            enter.style.display = 'none';

            let mensaje = document.getElementById('mensaje');
            mensaje.innerHTML = 'Victoria';

            let boton1 = document.getElementById('boton1');
            boton1.style.display = 'flex';

            stopTimer();

            guardarVictoria();
    //valido derrota
    }else if(fila == 5){
        //Sonido derrota
        const audio = new Audio();
        audio.src = "../sounds/defeat.wav"
        audio.play();

        let mensaje = document.getElementById('mensaje');
        mensaje.innerHTML = 'Derrota, la palabra era: '+ palabra.join('');
        mensaje.style.color = 'red';
        mensaje.style.fontSize = '30px';


        let teclado = document.getElementById('teclado');
        teclado.style.display = 'none';

        let boton1 = document.getElementById('boton1');
        boton1.style.display = 'flex';

        let enter = document.getElementById('ENTER');
        enter.style.display = 'none';

        stopTimer();
    }else{
        //Sonido flip celdas
        const audio = new Audio();
        audio.src = "../sounds/flip.mp3"
        audio.play();
    }
}

function mostrarMensajeError() {
    //Sonido error
    const audio = new Audio();
    audio.src = "../sounds/error.wav"
    audio.play();

    let mensaje = document.getElementById('mensaje');
    //muestro mensaje
    mensaje.innerHTML = 'Esa palabra no esta en nuestro diccionario'
    mensaje.style.color = 'red';
    mensaje.style.fontSize = '18px';    
    //lo borro luego de 2 segundos
    setTimeout(function () {
        mensaje.innerHTML = '';
        mensaje.style.color = 'green';
        mensaje.style.fontSize = '60px';
    }, 2000);
}

//boton para volver a jugar
function reset(){
    window.location.href = "./wordle.html";
}

//boton para formulario contacto
function redirigirContacto(){
    window.location.href = "../html/contacto.html";
}

function guardarVictoria(){

    let puntaje = {};

    puntaje.fecha = new Date().toLocaleString('en-GB', { timeZone:'America/Argentina/Buenos_Aires'});
    puntaje.nombre = nombre;

    //calcular puntaje
    switch (fila) {

        case 0:
            puntaje.puntaje = 6
            puntaje.puntajeMensaje = 'Perfecto' + '<br>'+ '6'
            break;

        case 1:
            puntaje.puntaje = 5
            puntaje.puntajeMensaje = 'Sobresaliente' + '<br>'+ '5'
            break;

        case 2:
            puntaje.puntaje = 4
            puntaje.puntajeMensaje = 'Excelente' + '<br>'+ '4'
            break;

        case 3:
            puntaje.puntaje = 3
            puntaje.puntajeMensaje = 'Muy bien' + '<br>'+ '3'
            break;

        case 4:
            puntaje.puntaje = 2
            puntaje.puntajeMensaje = 'Bien' + '<br>'+ '2'
            break;

        case 5:
            puntaje.puntaje = 1
            puntaje.puntajeMensaje = 'Regular' + '<br>'+ '1'
            break;

        default:
            break;
    }

    //Traigo del localStorage el array "puntajes", si no esta le asigno "[]"
    let puntajesArray = JSON.parse(localStorage.getItem('puntajes')) || [];
    puntajesArray.push(puntaje);
    //Convierto mi array de puntajes a json
    let puntajeArrayJSON = JSON.stringify(puntajesArray);
    //Guardo mi array de puntajes en formato JSON en el local storage
    localStorage.setItem("puntajes", puntajeArrayJSON)

}

/*------------------------ timer ------------------------------------------*/
function start() {
    clearInterval(window.Interval);
    window.Interval = setInterval(startTimer, 1000);
}

function startTimer() {
    seconds++;

    if (seconds <= 9 && seconds !== "00") { appendSeconds.innerHTML = "0" + seconds; }
    if (minutes <= 9 && minutes !== "00") { appendMinutes.innerHTML = "0" + minutes; }
    if (hours <= 9 && hours !== "00") { appendHours.innerHTML = "0" + hours; }
    if (seconds > 9) { appendSeconds.innerHTML = seconds; }
    if (minutes > 9) { appendMinutes.innerHTML = minutes; }
    if (hours > 9) { appendHours.innerHTML = hours; }

    if (seconds >= 59) {
        
        appendMinutes.innerHTML = '0' + minutes;
        seconds = -1;
        minutes++;
    }

    if (minutes >= 60) {
        appendHours.innerHTML = '0' + hours;
        minutes = 0;
        seconds = -1;
        hours++;
    }
}

function stopTimer() {
    clearInterval(Interval);
}

/*------------------------ guardarPartida ------------------------------------------*/
function saveProgress(){
    const audio = new Audio();
    audio.src = "../sounds/click.mp3"
    audio.play();
    
    //Declaro un array "save" y le guardo los datos necesarios para poder continuar jugando en otro momento
    let save = {};

    save.fecha = new Date().toLocaleString('en-GB', { timeZone:'America/Argentina/Buenos_Aires'});
    save.nombre = nombre;
    save.palabra = palabra;
    save.principal = principal;
    save.colores = colores;
    save.fila = fila;
    save.columna = columna;
    save.hours = hours;
    save.minutes = minutes;
    save.seconds = seconds;

    //Traigo del localStorage el array "saves", si no esta le asigno "[]"
    let savesArray = JSON.parse(localStorage.getItem('saves')) || [];
    savesArray.push(save);
    //Convierto mi array de saves a json
    let savesArrayJSON = JSON.stringify(savesArray);
    //Guardo mi array de saves en formato JSON en el local storage
    localStorage.setItem("saves", savesArrayJSON)

    window.location.href = "../index.html";
}

/*------------------------ mostrar modal puntajes ------------------------------------------*/
function obtenerPuntajes() {

    //Traigo del localStorage el array "puntajes", si no esta le asigno "[]"
    let puntajesArray = JSON.parse(localStorage.getItem('puntajes')) || [];

    //Muestro la lista de puntajes ordenado por fecha de mas nueva a mas antigua
    let body = '';
    for (var i = 0; i < puntajesArray.length; i++) {
            body += `<tr role="row">
                        <td data-label="NOMBRE">${(puntajesArray[puntajesArray.length-1-i].nombre)}</td>
                        <td data-label="FECHA">${(puntajesArray[puntajesArray.length-1-i].fecha)}</td>
                        <td data-label="PUNTAJE">${(puntajesArray[puntajesArray.length-1-i].puntajeMensaje)}</td>
                    </tr>`
        }
    document.getElementById('puntajes').innerHTML = body;
}

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
    obtenerPuntajes()
}

function ordenalTablaPuntaje() {
    
    //Traigo del localStorage el array "puntajes", si no esta le asigno "[]"
    let puntajesArray = JSON.parse(localStorage.getItem('puntajes')) || [];

    //ordeno el array de puntajes por puntaje de mayor a menor
    puntajesArray.sort(function (a, b){
        if (a.puntaje > b.puntaje) {
            return 1;
          }
          if (a.puntaje < b.puntaje) {
            return -1;
          }
          // a must be equal to b
          return 0;
    });

    //Muestro la lista de puntajes ordenado por fecha de mas nueva a mas antigua
    let body = '';
    for (var i = 0; i < puntajesArray.length; i++) {
            body += `<tr role="row">
                        <td data-label="NOMBRE">${(puntajesArray[puntajesArray.length-1-i].nombre)}</td>
                        <td data-label="FECHA">${(puntajesArray[puntajesArray.length-1-i].fecha)}</td>
                        <td data-label="PUNTAJE">${(puntajesArray[puntajesArray.length-1-i].puntajeMensaje)}</td>
                    </tr>`
        }
    document.getElementById('puntajes').innerHTML = body;
}


