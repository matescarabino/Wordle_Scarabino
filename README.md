# FINAL LPPA - Scarabino

<p>Alumno: Scarabino Mateo<br>
Carrera: T1-09 INGENIERÍA EN SISTEMAS INFORMÁTICOS<br>
Comisión: 4-A<br>
Turno: Noche<br>
Inicio: 04/04/2022<br>
Fin: 23/07/2022<br>
<br>
Profesor: Frare Esteban
</p>

## Comenzando 🚀

Ver pagina funcionando: [click aqui](https://matescarabino.github.io/Wordle_Scarabino/index.html)

### Pre-requisitos 📋

- Estar conectado a internet.
- Contar con una pantalla de por lo menos 360px de ancho.

## Funcionamiento ⚙️

- El sitio comienza con un login (en index.html), el cual solicita al usuario ingresar el valor "nombre". Este cuenta con una validación onFocus/onBlur la cual inserta un mensaje de error si el usuario coloca mal el campo. 

- Luego de que el usuario coloque su nombre y cliquee el jugar, se ejecutara una función que validara los campos onSubmit. De estar todo correcto se ejecutará la función obtenerSaves(), la cual, junto con el nombre ingresado, verificara si hay alguna partida guardada en el localStorage para ese usuario. De haberlas se mostrará por pantalla en forma de lista para que el usuario pueda elegir una partida guardada o bien comenzar un juego nuevo. Finalmente nos redirigira a wordle.html.

- Una vez en el wordle.html (app.js) se ejecutará la función declararVariables(), la cual, si se llegó desde la redirección de una partida guardada con el "id" de la misma, cargará las variables como estaban anteriormente. Si es una partida nueva (sin un "id" en la redirección) cargará todas las variables como un nuevo juego (variables en cero, palabra nueva, etc.).

- De ser una partida nueva se realiza una comprobación para garantizar que la nueva palabra nunca pueda ser igual a la anterior (hasta 1 vez).

- Luego de que el juego se haya cargado correctamente el mismo quedara a la espera de que el usuario interactúe con el mismo, lo único que estará ocurriendo de fondo es el contador avanzando.

- El usuario solo puede usar las teclas del teclado en pantalla (mobile first, además me aseguro que solo pueda hacer lo que yo le permita). El teclado cuenta con las 27 letras del teclado español y un botón de borrar para interactuar con la matriz del juego.
Además hay un botón de "enter" para confirmar la palabra escrita previamente (solo se podrá utilizar cuando haya 5 letras) y un botón de guardar, "save" (la palabra guardar quedaba muy larga para estar dentro de una tecla) que nos servirá para guardar en el localStorage cualquier avance que hayamos hecho en esta partida y poder continuarla en otro momento.

- Cuando el usuario presione "enter" se ejecutaran una serie de comprobaciones:
    - Que la palabra exista (de no existir se le avisara por pantalla y sonido).
    - Se pintará la matriz con las letras correctas, posibles e incorrectas.
    - Se pintará el teclado con las letras correctas, posibles e incorrectas.
    - Se validará la victoria en caso de que sean todas las letras correctas y la derrota en el caso de no ser correcta y ser el último intento (se le mostrara la palabra correcta).

- Una vez finalizado el juego, ya sea por victoria o derrota, se habilitara un botón de volver a jugar para cargar un juego nuevo, se detendrá el reloj y se esconderá el teclado.
De haber ganado se guardará la victoria en localStorage.

- El usuario puede consultar un modal de "Puntajes" en cualquier momento, el cual mostrara una lista ordenada por fecha de los respectivos puntajes de cada jugador, además este modal cuenta con un botón para ordenar la lista por puntaje y otro para volver a ordenarlo por fecha.

- En cualquier momento el usuario puede clicar el botón de "Contacto" (ya sea el del header o el footer), el cual lo redirigirá a contacto.html. Este archivo cuenta con un "formulario" para enviar un mensaje a mi mail (matescarabino@gmail.com), el cual se abrirá con la herramienta predefinida de mails del dispositivo.

### Extras 🔩
- Los colores de las teclas especiales cambian cuando pueden ser utilizadas y vuelven a cambiar cuando no.

- Se agregaron animaciones en la matriz.

- Se agregaron sonidos a los imputs del teclado, errores, victoria, etc.

- Si lo descargaste para usar en local hay que cambiar una línea de código en "login.js", en la línea 94 de la función clickSave(). Hay que activar la dirección de redirección para local y desactivar la de mi GitHub personal (de la línea 97).

## Construido con 🛠️

- HTML 
- CSS 
- JavaScript
- Iconos descargados de libreria gratuita - [flaticon](https://www.flaticon.com/)
- Sonidos descargados de libreria gratuita - [freesound](https://freesound.org/) 
- Lista de palabras validas - [worlde.danielfrg](https://wordle.danielfrg.com/words/5.json)

## Autores ✒️

* **Mateo Scarabino** - *todo* - [matescarabino](https://github.com/matescarabino)

