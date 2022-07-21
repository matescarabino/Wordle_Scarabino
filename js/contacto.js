window.onload = function () {
    //Llamo a la función  que realiza las validaciones onFocus/onBlur
    validacionesOnFocus();


    //Validación on Submit --------------------------------------------------------------------
    document.formulario.onsubmit = function (event) {

        //Validación Nombre --------------------------------------------------------------------
        let nombre = document.getElementById('nombreInput');
        let name_format = /^[a-zA-Z0-9_]*$/;

        if ((nombre.value.length < 3) || (!nombre.value.match(name_format) || (nombre.value == ""))) {
            nombre.classList.add('invalid');
            errorNombre.innerHTML = 'Ingrese un nombre no menor a 3 letras.'
            return false; 
        }

        //Validación Email --------------------------------------------------------------------
        let mail = document.getElementById('emailInput');
        let mail_format = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

        if (!(((mail.value).toLowerCase()).match(mail_format)) || (mail.value == "")) {
            mail.classList.add('invalid');
            errorMail.innerHTML = 'Ingrese un email válido.';
            return false;
        }

        let mensaje = document.getElementById('mensajeInput');

        if ((mensaje.value.length < 5) || (mensaje.value == "")) {
            mensaje.classList.add('invalid');
            errorMensaje.innerHTML = 'Ingrese un mensaje no menor a 5 caracteres.'
            return false; 
        }

        let parametroMail = (mail.value).toLowerCase();
        let parametroNombre = nombre.value;

        //redirige a la herramienta predeterminada de mail con los siguientes parametros
        location.href = "mailto:"+'matescarabino@gmail.com'+'?cc='+parametroMail+'&subject='+'Contacto'+'&body='+'Saludos, mi nombre es '+parametroNombre+'. '+mensaje.value;

        redirigir();

        event.preventDefault();
    }
}


function validacionesOnFocus() {
    //Validación Nombre --------------------------------------------------------------------
    let nombre = document.getElementById('nombreInput');
    let name_format = /^[a-zA-Z0-9_]*$/;

    nombre.onblur = function () {
        if ((nombre.value.length < 3) || (!nombre.value.match(name_format))
        ) {
            nombre.classList.add('invalid');
            errorNombre.innerHTML = 'Ingrese un nombre no menor a 3 letras.'

        }
    };

    nombre.onfocus = function () {
        if (nombre.classList.contains('invalid')) {
            nombre.classList.remove('invalid');
            errorNombre.innerHTML = "&nbsp;";
        }
    };
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

        //Validación mensaje --------------------------------------------------------------------
        let mensaje = document.getElementById('mensajeInput');
    
        mensaje.onblur = function () {
            if ((mensaje.value.length < 5) || (mensaje.value == ""))
             {
                mensaje.classList.add('invalid');
                errorMensaje.innerHTML = 'Ingrese un mensaje no menor a 5 caracteres.'
    
            }
        };
        mensaje.onfocus = function () {
            if (mensaje.classList.contains('invalid')) {
                mensaje.classList.remove('invalid');
                errorMensaje.innerHTML = "&nbsp;";
            }
        };
}



function redirigir(){
    window.location.href = "../index.html";
}








