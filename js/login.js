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

    let saveActual = new URLSearchParams();

    saveActual.append("save", i);

    location.href = "/html/wordle.html?" + saveActual.toString();

}