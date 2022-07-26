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

Ver pagina funcionando: [click aqui](https://github.com/matescarabino/Wordle_Scarabino)

### Pre-requisitos 📋

- Estar conectado a internet

## Funcionamiento ⚙️

- El sitio comienza con un login (en index.html), el cual solicita ingresar el valor "nombre". Este cuenta con una validación onFocus/onBlur la cual inserta un mensaje de error si el usuario coloca mal el campo. 

- Luego de que el usuario coloque su nombre y cliquee el jugar, se ejecutara una función que validara los campos onSubmit. De estar todo correcto se ejecutara la funcion obtenerSaves(), la cual, junto con el nombre ingresado verificara si hay alguna partida guardada en el localStorage para ese usuario. De haberla se mostrara por pantalla la lista. Finalmente nos redigira a wordle.html.

- Una vez en el app.js se ejecutará la funcion declararVariables(), la cual, si se llego desde la redireccion de una partida guardada con el "id" de la misma, cargara las variables como estaban anteriormente. Si es una partida nueva (sin un "id" en la redireccion) cargara todas las variables como un nuevo juego (variables en cero, palabra nueva, etc).

-
### Extras 🔩
- El diseño es responsivo

- En dashboard.js primero se ejecuta una función que valida el estado de la variable en localStorage "login", si esta es falsa (false), nos redirigirá directamente al login. Así nos aseguramos de que nadie pueda saltarse el login por escribir en el navegador el link: [https://matescarabino.github.io/LPPA_Parcial_2_Scarabino/html/dashboard.html](https://matescarabino.github.io/LPPA_Parcial_2_Scarabino/html/dashboard.html)

## Construido con 🛠️

- HTML 
- CSS 
- JavaScript
- Iconos descargados de libreria gratuita - [flaticon](https://www.flaticon.com/)

## Autores ✒️

* **Mateo Scarabino** - *todo* - [matescarabino](https://github.com/matescarabino)

