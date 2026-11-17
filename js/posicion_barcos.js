// importamos la lista LETRAS de matriz.js

import { LETRAS } from './matriz';


// se crea una funcion con la cual se calculaean las casillas que 
// ocupa un barco al hacer click.
// le damos los parametros que necesita

export const manejarClicColocarBarco = (filaInicio, colInicio, barcoActual, matrizJugador) => {

    // se crea la constante tamaño para saber cuantas casillas
    // ocupa el barco que se esta colocando

    const tamaño = barcoActual.tamaño;


    // se crea la constante direccion para saber 
    // si el barco ocupa una fila horizontal o 
    // una columna vertical

    const direccion = barcoActual.direccion;
  

    // se crea una lista donde se ingresaran las casillas
    // ocupadas por un barco

    const nuevasCasillasCoordenadas = [];
  
    // ciclo donde se dara una vuelta por cada casilla que 
    // ocupara el barco

    for (let i = 0; i < tamaño; i++) {

      // se comienza a contar desde la casilla donde se 
      // hizo el click 

      let fila = filaInicio;
      let columna = colInicio;

      // si la direccion es horizontal la columna avanza hacia
      // la derecha, si no la fila avanza hacia abajo

      if (direccion === "Horizontal") {
        columna = colInicio + i;
      } else {
        fila = filaInicio + i;
      }
      
      
      // si la casilla donde esta poniendo el barco ya sea en
      // horizontal o vertical supera los limites del tablero
      // devuelve el siguiente error

      if (fila > 5 || columna > 5) {
        return { error: "El barco se sale de los límites del tablero" };
      }

      // si la casilla donde esta poniendo el barco tiene otro barco
      // devuelve el siguiente error

      if (matrizJugador[fila][columna].tieneBarco) {
        return { error: "¡Ya hay un barco colocado en esta casilla!" };
      }


      // se le da el nombre a la casilla, la letra de la fila y
      // el numero de la columna

      const idCelda = `${LETRAS[fila]}${columna + 1}`;

      
      // se agrega la casilla a la lista con su nombre y la 
      // posicion en la que se encuentra

      nuevasCasillasCoordenadas.push({ 
        id: idCelda, 
        fila, 
        columna 
      });
    }

    // si el barco cabe y las casillas no estan ocupadas por otro barco
    // devuelve la lista completa de las casillas

    return nuevasCasillasCoordenadas;
};