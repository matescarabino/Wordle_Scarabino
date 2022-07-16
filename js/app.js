
/*------------------------------Declaro variables y constantes-----------------------------------*/
const palabra = ['S','U','E','L','O'];

const principal = [ 
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']];

const colores = [ 
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]];

let fila = 0;
let columna = 0;

const mail = localStorage.getItem('mail');

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
    console.log(principal);
    console.log('validar si palabra existe');

    validarCoincidencia();

    pintarTablero();

    validarVictoria();

}

function validarCoincidencia() {

    for (let index = 0; index < 5; index++) {
        console.log(principal[fila][index])

        if (principal[fila][index] == palabra[index]) {
            colores[fila][index] = 1;
            let tecla = document.getElementById(principal[fila][index]);
            tecla.style.backgroundColor = '#33cc33';
            tecla.style.color = '#000';
        } else if (
            (principal[fila][index] == palabra[0] ) ||
            (principal[fila][index] == palabra[1] ) ||
            (principal[fila][index] == palabra[2] ) ||
            (principal[fila][index] == palabra[3] ) ||
            (principal[fila][index] == palabra[4] )
        ) {
            colores[fila][index] = 2;
            let tecla = document.getElementById(principal[fila][index]);
            tecla.style.backgroundColor = '#ffff00';
            tecla.style.color = '#000';
        } else {
            colores[fila][index] = 3;
            let tecla = document.getElementById(principal[fila][index]);
            tecla.style.backgroundColor = '#121213';
            tecla.style.border = '2px solid #3a3a3c'
        }
    }
}



function pintarTablero(){
    for (var index = 0; index < colores.length; index++) {
        
        for (var celda = 0; celda < colores[index].length; celda++) {
            
            let valor = document.getElementById(`${index}${celda}`)

            switch (colores[index][celda]) {

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

            let boton = document.getElementById('boton');
            boton.style.display = 'flex';

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

    let hours = 00;
    let minutes = 00;
    let seconds = 00;
    let appendHours = document.getElementById("hours");
    let appendMinutes = document.getElementById("minutes");
    let appendSeconds = document.getElementById("seconds");
    let buttonStart = document.getElementById('button-start');
    let buttonStop = document.getElementById('button-stop');
    let buttonReset = document.getElementById('button-reset');
    let Interval;

    function start() {
        clearInterval(Interval);
        Interval = setInterval(startTimer, 1000);
    }

    start()

    function startTimer() {
        seconds++;

        if (seconds <= 9 && seconds!=="00") {appendSeconds.innerHTML = "0" + seconds;}
        if (minutes <= 9 && minutes!=="00") {appendMinutes.innerHTML = "0" + minutes;}
        if (hours <= 9 && hours!=="00") {appendHours.innerHTML = "0" + hours;}
        if (seconds > 9 ) {appendSeconds.innerHTML = seconds;}
        if (minutes > 9) {appendMinutes.innerHTML = minutes;}
        if (hours > 9) {appendHours.innerHTML = hours;}

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

    save.mail = mail;           
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


    console.log(savesArray);


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









