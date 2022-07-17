window.onload = function () {
    //Llamo a la función  que realiza las validaciones onFocus/onBlur
    validacionesOnFocus();


    //Validación on Submit --------------------------------------------------------------------
    document.formulario.onsubmit = function (event) {


        //Validación Email --------------------------------------------------------------------
        let mail = document.getElementById('emailInput');
        let mail_format = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

        if (!(((mail.value).toLowerCase()).match(mail_format)) || (mail.value == "")) {
            mail.classList.add('invalid');
            errorMail.innerHTML = 'Ingrese un email válido.';
            return false;
        }

        localStorage.setItem('mail', mail.value);

        obtenerSaves(mail.value);

        // redirigir();

        event.preventDefault();
    }
}


function validacionesOnFocus() {
    // Validación Mail ------------------------------------------------------------------------
    let mail = document.getElementById('emailInput');
    let mail_format = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

    mail.onblur = function () {
        if (!((mail.value).toLowerCase()).match(mail_format)) {
            mail.classList.add('invalid');
            errorMail.innerHTML = 'Ingrese un email válido.'
        }
    };
    mail.onfocus = function () {
        if (mail.classList.contains('invalid')) {
            mail.classList.remove('invalid');
            errorMail.innerHTML = "&nbsp;";
        }
    };
}


function redirigir(){
    window.location.href = "./html/wordle.html";
}


/*------------------------ Mostrar partidas ------------------------------------------*/

function obtenerSaves(mail) {



    //Traigo del localStorage el array "saves", si no esta le asigno "[]"
    let savesArray = JSON.parse(localStorage.getItem('saves')) || [];
    console.log(savesArray)

    //Muestro la lista de saves para el mail ingresado
    let body = "";
    for (var i = 0; i < savesArray.length; i++) {
        if(savesArray[i].mail == mail){
            body += `<button onclick="clickSave('${i}');">${savesArray[i].fecha}</button>`;
            var encontro = true;
        }
    }

    if(encontro){
        document.getElementById('data').innerHTML = body;
    }else{
        redirigir()
    }

    //Muesto titulo
    let titulo_save = document.getElementById('titulo_save');
    titulo_save.style.display = 'flex';

    //Escondo card
    let card = document.getElementById('formulario');
    card.style.display = 'none';


}


function clickSave(i) {

    // //Traigo del localStorage el array "saves"
    // let savesArray = JSON.parse(localStorage.getItem('saves'));
    // console.log(savesArray[i]);

    // //Declaro un array "saveActual" y le guardo los datos necesarios para poder continuar jugando en otro momento
    // let saveActual = {};

    // saveActual.fecha = savesArray[i].Date
    // saveActual.mail = savesArray[i].mail;
    // saveActual.palabra = savesArray[i].palabra;
    // saveActual.principal = savesArray[i].principal;
    // saveActual.colores = savesArray[i].colores;
    // saveActual.fila = savesArray[i].fila;
    // saveActual.columna = savesArray[i].columna;
    // saveActual.hours = savesArray[i].hours;
    // saveActual.minutes = savesArray[i].minutes;
    // saveActual.seconds = savesArray[i].seconds;



    let saveActual = new URLSearchParams();

    saveActual.append("save", i);
    // saveActualString.append("mail", savesArray[i].mail);
    // saveActualString.append("palabra", JSON.stringify(savesArray[i].palabra));
    // saveActualString.append("principal", JSON.stringify(savesArray[i].principal));
    // saveActualString.append("colores", JSON.stringify(savesArray[i].colores));
    // saveActualString.append("fila", savesArray[i].fila);
    // saveActualString.append("columna", savesArray[i].columna);
    // saveActualString.append("hours", savesArray[i].hours);
    // saveActualString.append("minutes", savesArray[i].minutes);
    // saveActualString.append("seconds", savesArray[i].seconds);


    location.href = "/html/wordle.html?" + saveActual.toString();





    // //Convierto mi array de saves a json
    // let savesArrayJSON = JSON.stringify(saveActual);
    // //Guardo mi array de saves en formato JSON en el local storage
    // localStorage.setItem("saveActual", savesArrayJSON);

    // redirigir();

}