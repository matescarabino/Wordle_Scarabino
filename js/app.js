
/*------------------------------Declaro variables y constantes-----------------------------------*/
const palabra = ['A','M','I','G','O'];

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
        return
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
            principal[fila][index] == palabra[0] ||
            principal[fila][index] == palabra[1] ||
            principal[fila][index] == palabra[2] ||
            principal[fila][index] == palabra[3] ||
            principal[fila][index] == palabra[4]
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
    //valido derrota
    }else if(fila == 5){
        let mensaje = document.getElementById('mensaje');
        mensaje.innerHTML = 'Derrota';
        mensaje.style.color = 'red';

        let teclado = document.getElementById('teclado');
        teclado.style.display = 'none';

        let boton = document.getElementById('boton');
        boton.style.display = 'flex';
    }
}

//boton para volver a jugar
function reset(){
    window.location.href = "../index.html";
}










//Metodo GET 
function obtenerPalabra() {

    let url = 'https://wordle.danielfrg.com/words/5.json';
    fetch(url)
        .then(response => response.json())
        .then(data => mostrarData(data))
        .catch(error => mostrarError(error))

    const mostrarData = (data) => {
        console.log(data)
    }

    const mostrarError = (error)  => {
        console.log(error)
    }
}
obtenerPalabra();



/*------------------------------------------------------------------------------*/









