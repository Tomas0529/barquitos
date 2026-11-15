import { LETRAS } from './matriz';

export const manejarClicColocarBarco = (filaInicio, colInicio, barcoActual, matrizJugador) => {
    const tamaño = barcoActual.tamaño;
    const direccion = barcoActual.direccion;
  
    const nuevasCasillasCoordenadas = [];
  
    for (let i = 0; i < tamaño; i++) {
      let fila = filaInicio;
      let columna = colInicio;

      if (direccion === "Horizontal") {
        columna = colInicio + i;
      } else {
        fila = filaInicio + i;
      }

      if (fila > 5 || columna > 5) {
        return { error: "El barco se sale de los límites del tablero" };
      }

      if (matrizJugador[fila][columna].tieneBarco) {
        return { error: "¡Ya hay un barco colocado en esta casilla!" };
      }

      const idCelda = `${LETRAS[fila]}${columna + 1}`;

      nuevasCasillasCoordenadas.push({ 
        id: idCelda, 
        fila, 
        columna 
      });
    }

    return nuevasCasillasCoordenadas;
};