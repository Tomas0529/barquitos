export const dispararCasilla = (matriz, fila, columna) => {
  const celda = matriz[fila]?.[columna];

  if (!celda) {
    return { exito: false, mensaje: "Casilla fuera del tablero." };
  }

  // Valida si ya se había disparado antes en esta celda
  if (celda.impactado || celda.fallido) {
    return { 
      exito: false, 
      repetido: true,
      mensaje: "Ya habías disparado a esta casilla. Elige otra." 
    };
  }

  // Evalúa si hay un barco o es agua basándose en la matriz ya posicionada
  if (celda.tieneBarco) {
    celda.impactado = true;
    
    const estaHundido = verificarBarcoHundido(matriz, celda.idBarco);

    return {
      exito: true,
      impacto: true,
      mensaje: "¡Has impactado!",
      idBarco: celda.idBarco,
      barcoHundido: estaHundido,
      sigueTurno: true
    };
  } else {
    celda.fallido = true;

    return {
      exito: true,
      impacto: false,
      mensaje: "Agua. Fallaste el disparo.", 
      sigueTurno: false
    };
  }
};

export const verificarBarcoHundido = (matriz, idBarco) => {
  for (let fila of matriz) {
    for (let celda of fila) {
      if (celda.idBarco === idBarco && !celda.impactado) {
        return false; // El barco sigue a flote porque le falta una parte
      }
    }
  }
  return true; // El barco está completamente hundido
};