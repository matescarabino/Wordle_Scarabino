
/*------------------------------Declaro variables y constantes-----------------------------------*/
/*------------------------ obetener partida ------------------------------------------*/

// function getSave(){

    let saveActual = new URLSearchParams(window.location.search);

    let i = saveActual.get("save");

    if(i){
        //Traigo del localStorage el array "saves"
        let savesArray = JSON.parse(localStorage.getItem('saves'));  
        
        window.palabra = savesArray[i].palabra
        window.principal = savesArray[i].principal
        window.colores = savesArray[i].colores
        window.fila = savesArray[i].fila
        window.columna = savesArray[i].columna
        window.hours = savesArray[i].hours
        window.minutes = savesArray[i].minutes
        window.seconds = savesArray[i].seconds
        
        window.appendHours = document.getElementById("hours");
        window.appendMinutes = document.getElementById("minutes");
        window.appendSeconds = document.getElementById("seconds");
        window.Interval;

        cargarJuego();
    }else{
        window.palabra = ['S','U','E','L','O'];

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
    
        window.appendHours = document.getElementById("hours");
        window.appendMinutes = document.getElementById("minutes");
        window.appendSeconds = document.getElementById("seconds");
        window.Interval;

        window.mail = localStorage.getItem('mail');
        
        cargarJuego();

    }

  

    // start();

// }


/*------------------------ cargar matriz ------------------------------------------*/

function cargarJuego(){


    for (var index = 0; index < window.principal.length; index++) {
        
        for (var celda = 0; celda < window.principal[index].length; celda++) {
            
            let valor = document.getElementById(`${index}${celda}`)

            valor.innerHTML = window.principal[index][celda];
        }
    }


    pintarTablero();

    pintarTeclado();




    start();
}

/*------------------------ funciones del teclado ------------------------------------------*/

function clickTecla(tecla){

    if(columna < 5){
        principal[fila][columna] = tecla;
        valor = document.getElementById(`${fila}${columna}`);
        valor.innerHTML = tecla;

        columna++;
    }

    console.log(fila, columna)
}

function del(){
    if(columna == 0){
        principal[fila][columna] = '';
        valor = document.getElementById(`${fila}${columna}`);
        valor.innerHTML = ''
    }else if(columna > 0){
        columna--;
        principal[fila][columna] = '';
        valor = document.getElementById(`${fila}${columna}`);
        valor.innerHTML = ''
    }
    console.log(fila, columna)

}
function enter(){

    if(columna == 5 && fila != 5){
        chequeo();
        fila++;
        columna = 0;
    }else if (columna == 5 && fila == 5){
        chequeo();
    }

}

/*----------------------------funciones generales--------------------------------------*/

function chequeo(){
    // console.log(principal);
    // console.log('validar si palabra existe');

    validarCoincidencia();

    pintarTablero();

    validarVictoria();

}

function validarCoincidencia() {

    for (let index = 0; index < 5; index++) {
        console.log(window.principal[fila][index])

        if (window.principal[fila][index] == window.palabra[index]) {
            window.colores[fila][index] = 1;
;
        } 
        else if (
            (window.principal[fila][index] == window.palabra[0] ) ||
            (window.principal[fila][index] == window.palabra[1] ) ||
            (window.principal[fila][index] == window.palabra[2] ) ||
            (window.principal[fila][index] == window.palabra[3] ) ||
            (window.principal[fila][index] == window.palabra[4] )
        ) {
            window.colores[fila][index] = 2;

        } 
        else {
            window.colores[fila][index] = 3;

        }
    }
    pintarTeclado();
}



function pintarTablero(){
    for (var index = 0; index < window.colores.length; index++) {
        
        for (var celda = 0; celda < window.colores[index].length; celda++) {
            
            let valor = document.getElementById(`${index}${celda}`)

            switch (window.colores[index][celda]) {

                case 1:
                valor.style.backgroundColor ='#33cc33'
                valor.style.color ='#000'
                    break;

                case 2:
                valor.style.backgroundColor ='#ffff00'
                valor.style.color ='#000'
                    break;

                case 3:
                    valor.style.backgroundColor = '#121213'
                    valor.style.border = '1px solid #3a3a3c'
                    break;

                default:
                    break;
            }

        }
    }
}

function pintarTeclado(){
    for (var index = 0; index < window.colores.length; index++) {
        
        for (var celda = 0; celda < window.colores[index].length; celda++) {
            
            let tecla = document.getElementById(principal[index][celda]);

            switch (window.colores[index][celda]) {

                case 1:
                    tecla.style.backgroundColor ='#33cc33'
                    tecla.style.color ='#000'
                    break;

                case 2:
                    tecla.style.backgroundColor ='#ffff00'
                    tecla.style.color ='#000'
                    break;

                case 3:
                    tecla.style.backgroundColor = '#121213'
                    tecla.style.border = '1px solid #3a3a3c'
                    break;

                default:
                    break;
            }

        }
    }
}



function validarVictoria(){
    if(   
        colores[fila][0] == 1 &&
        colores[fila][1] == 1 &&
        colores[fila][2] == 1 &&
        colores[fila][3] == 1 &&
        colores[fila][4] == 1)
        {
            let mensaje = document.getElementById('mensaje');
            mensaje.innerHTML = 'Victoria';

            let teclado = document.getElementById('teclado');
            teclado.style.display = 'none';

            let boton1 = document.getElementById('boton1');
            boton1.style.display = 'flex';
    
            let boton2 = document.getElementById('boton2');
            boton2.style.display = 'none';

            stopTimer();
    //valido derrota
    }else if(fila == 5){
        let mensaje = document.getElementById('mensaje');
        //mensaje temporal... despues hay q hacer un modal
        mensaje.innerHTML = 'Derrota, la palabra era: '+ palabra[0]+palabra[1]+palabra[2]+palabra[3]+palabra[4];
        mensaje.style.color = 'red';
        mensaje.style.fontSize = '30px';

        
        let teclado = document.getElementById('teclado');
        teclado.style.display = 'none';

        let boton1 = document.getElementById('boton1');
        boton1.style.display = 'flex';

        let boton2 = document.getElementById('boton2');
        boton2.style.display = 'none';

        stopTimer();
    }
}

//boton para volver a jugar
function reset(){
    window.location.href = "./wordle.html";
}


/*------------------------ timer ------------------------------------------*/

    // let hours = 00;
    // let minutes = 00;
    // let seconds = 00;
    // let appendHours = document.getElementById("hours");
    // let appendMinutes = document.getElementById("minutes");
    // let appendSeconds = document.getElementById("seconds");
    // let buttonStart = document.getElementById('button-start');
    // let buttonStop = document.getElementById('button-stop');
    // let buttonReset = document.getElementById('button-reset');
    // let Interval;

function start() {
    clearInterval(window.Interval);
    window.Interval = setInterval(startTimer, 1000);
}

// start()

function startTimer() {
    seconds++;

    if (seconds <= 9 && seconds !== "00") { appendSeconds.innerHTML = "0" + seconds; }
    if (minutes <= 9 && minutes !== "00") { appendMinutes.innerHTML = "0" + minutes; }
    if (hours <= 9 && hours !== "00") { appendHours.innerHTML = "0" + hours; }
    if (seconds > 9) { appendSeconds.innerHTML = seconds; }
    if (minutes > 9) { appendMinutes.innerHTML = minutes; }
    if (hours > 9) { appendHours.innerHTML = hours; }

    if (seconds >= 59) {
        appendMinutes.innerHTML = minutes;
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
// Agregar funcionalidad de guardar y cargar partida en el juego usando LocalStorage. El jugador
// puede guardar el progreso de una a más partidas, haciendo click en un botón que diga “guardar
// partida”, guardando la palabra ganadora elegida y el progreso realizado por el usuario hasta el
// momento de guardar la partida en LocalStorage. Las partidas guardadas se deben mostrar en una
// lista y se deben poder cargar para continuar jugando

function saveProgress(){
    
    //Declaro un array "save" y le guardo los datos necesarios para poder continuar jugando en otro momento
    let save = {};

    save.fecha = new Date().toLocaleString('en-GB', { timeZone:'America/Argentina/Buenos_Aires'});
    save.mail = window.mail;           
    save.palabra = window.palabra;           
    save.principal = window.principal;
    save.colores = window.colores;
    save.fila = window.fila;
    save.columna = window.columna;
    save.hours = window.hours;
    save.minutes = window.minutes;
    save.seconds = window.seconds;

    //Traigo del localStorage el array "saves", si no esta le asigno "[]"
    let savesArray = JSON.parse(localStorage.getItem('saves')) || [];
    savesArray.push(save);
    //Convierto mi array de saves a json
    let savesArrayJSON = JSON.stringify(savesArray);
    //Guardo mi array de saves en formato JSON en el local storage
    localStorage.setItem("saves", savesArrayJSON)

    // console.log(savesArray)
    window.location.href = "../index.html";
}

/*------------------------ get/post apis ------------------------------------------*/




// //Metodo GET 
// function obtenerPalabra() {

//     let url = 'https://wordle.danielfrg.com/words/5.json';
//     fetch(url)
//         .then(response => response.json())
//         .then(data => mostrarData(data))
//         .catch(error => mostrarError(error))

//     const mostrarData = (data) => {
//         console.log(data)
//     }

//     const mostrarError = (error)  => {
//         console.log(error)
//     }
// }
// obtenerPalabra();



// let url = 'https://wordle.danielfrg.com/words/5.json';
// fetch(URL, 
//     {
//         method: "GET", 
//         body: JSON.stringify(data),
//         mode: 'cors',
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     }
// ).then(response => response.json())
// .then(data => {
//     ....
// })
// .catch((err) => {
//     ....
//     })
// });


/*------------------------------------------------------------------------------*/









