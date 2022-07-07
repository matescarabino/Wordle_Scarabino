
const principal = [ 
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']];


let fila = 0;
let columna = 0;


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

    if(columna == 5){
        chequeo();
        fila++;
        columna = 0;
    }

}

/*------------------------------------------------------------------------------*/

function chequeo(){
    console.log(principal);
    console.log('validar si palabra existe');


}



/*------------------------------------------------------------------------------*/

// const colores = [ [0, 0, 0, 0, 0]
//                 , [0, 0, 0, 0, 0]
//                 , [0, 0, 0, 0, 0]
//                 , [0, 0, 0, 0, 0]
//                 , [0, 0, 0, 0, 0]
//                 , [0, 0, 0, 0, 0]];

// function pintarTablero(){
//     for (var index = 0; index < principal.length; index++) {
        
//         for (var celda = 0; celda < principal[index].length; celda++) {

//             let valor = document.getElementById(`${index}${celda}`)

//             switch (colores[index][celda]) {
//                 case 0:

//                 valor.style.backgroundColor ='white'

//                     break;
//                 case 1:

//                 valor.style.backgroundColor ='green'

//                     break;
//                 case 2:

//                 valor.style.backgroundColor ='yellow'

//                     break;

//                 default:
//                     break;
//             }

//         }
//     }
// }
// pintarTablero()


// const letras = [  ['', '', '', '', '']
//                 , ['', '', '', '', '']
//                 , ['', '', '', '', '']
//                 , ['', '', '', '', '']
//                 , ['', '', '', '', '']
//                 , ['', '', '', '', '']];

// function inicio(){
//     for (var index = 0; index < letras.length; index++) {
        
//         for (var celda = 0; celda < letras[index].length; celda++) {
    
//             let valor = document.getElementById(`${index}${celda}`).value;

//             letras[index][celda] = valor;

//             console.log(letras[index][celda]);

//             if(letras[index][celda] == principal[index][celda]){
//                 colores[index][celda] = 1;
//             }else if((letras[index][celda] == principal[0][0]) || 
//                         (letras[index][celda] == principal[0][1]) ||
//                         (letras[index][celda] == principal[0][2]) ||
//                         (letras[index][celda] == principal[0][3]) ||
//                         (letras[index][celda] == principal[0][4])){
//                 colores[index][celda] = 2;
//                 }else{
//                     colores[index][celda] = 0;

//                 }
//             pintarTablero();
//         }
//     }
// }






