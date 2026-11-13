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

      // Aquí unimos los números con tus letras para que coincida con tu matriz
      const idCelda = `${LETRAS[fila]}${columna + 1}`;

      nuevasCasillasCoordenadas.push({ 
        id: idCelda, 
        fila, 
        columna 
      });
    }
    return nuevasCasillasCoordenadas;
};