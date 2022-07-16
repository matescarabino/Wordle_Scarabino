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

        redirigir()

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