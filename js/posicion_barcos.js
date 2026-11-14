import { crearMatrizInicial, LETRAS } from './matriz';

export const manejarClicColocarBarco = (filaInicio, colInicio, barcoActual) => {
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

      // ¡Aquí aplicamos tu validación de límites!
      // Si la fila o la columna superan el 5 (es decir, son mayores a 5 o suman más de lo permitido)
      if (fila > 5 || columna > 5) {
        return { error: "El barco se sale de los límites del tablero (6x6)" };
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