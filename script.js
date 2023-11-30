let intentos = 6;

let diccionario = ['APPLE', 'HOUSE', 'YOUTH', 'MOUSE'];
const palabra = diccionario[Math.floor(Math.random() * diccionario.length)];
const BOTON = document.getElementById('guess-button');
const ERROR = document.getElementById('error');

BOTON.addEventListener('click', intentar);

function leerIntento(){
  let intento = document.getElementById('guess-input').value; 
  return intento.toUpperCase(); 
}

function initGrid() {
  const GRID = document.getElementById("grid");

  for (let i = 0; i < 6; i++) {
    const ROW = document.createElement('div');
    ROW.className = 'row';
    ROW.id = 'row-' + i;

    for (let j = 0; j < 5; j++){
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        SPAN.innerHTML = ' ';
        SPAN.style.backgroundColor = '#E5E5E5';
        ROW.appendChild(SPAN);
    }
    GRID.appendChild(ROW);
  }
}

initGrid();

function intentar(){
    ERROR.style.display = "none";
  const INTENTO = leerIntento();
  if(!tamanho(INTENTO)){
    ERROR.style.display= "flex";
    ERROR.innerHTML = "Introduce 5 letras"
    return false;
  }
  
  const GRID = document.getElementById("grid");

  // En lugar de crear una nueva fila, selecciona una de las filas existentes
  const ROW = GRID.querySelector('#row-' + (6 - intentos));

  let spans = ROW.getElementsByClassName('letter');
  for (let i in palabra){
      const SPAN = spans[i];

      if (INTENTO[i]===palabra[i]){ //VERDE
          SPAN.innerHTML = INTENTO[i];
          SPAN.style.backgroundColor = '#02BB40';
      } else if( palabra.includes(INTENTO[i]) ) { //AMARILLO
          SPAN.innerHTML = INTENTO[i];
          SPAN.style.backgroundColor = '#FFC300';
      } else {      //GRIS
          SPAN.innerHTML = INTENTO[i];
          SPAN.style.backgroundColor = '#E5E5E5';
      }
  }

  if(INTENTO === palabra){
    console.log(finalizar("<h1 class= 'ganada'>GANASTE!😀</h1>"));
    return;
  }

  intentos--;
  if (intentos===0){
    finalizar("<h1 class= 'perdida'>PERDISTE!😖</h1> <h3>La palabra es " + palabra + "</h3>");
  }
}

function tamanho(palabra){
  if(palabra.length == 5){
    return true;
  }
  return false;
}

function finalizar(mensaje){
  const INPUT = document.getElementById("guess-input");
  INPUT.disabled = true;
  BOTON.disabled = true;
  let contenedor = document.getElementById('guesses');
  contenedor.innerHTML = mensaje;
}