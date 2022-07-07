
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
}

function validarCoincidencia(){

    for(let index = 0; index < 5; index++){
        console.log(principal[fila][index])

        if(principal[fila][index] == palabra[index]){
            colores[fila][index] = 1
        }else if(
            principal[fila][index] == palabra[0] ||
            principal[fila][index] == palabra[1] ||
            principal[fila][index] == palabra[2] ||
            principal[fila][index] == palabra[3] ||
            principal[fila][index] == palabra[4] 
            ){
                colores[fila][index] = 2
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
                valor.style.backgroundColor ='#ffff4d'
                valor.style.color ='#000'
                    break;

                default:
                    break;
            }

        }
    }
}
/*------------------------------------------------------------------------------*/









