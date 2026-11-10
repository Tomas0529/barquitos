export const LETRAS = ['A', 'B', 'C', 'D', 'E', 'F'];
export const TAMANO_GRILLA = 6;

export const crearMatrizInicial = () => {
  const matriz = [];

  for (let fila = 0; fila < TAMANO_GRILLA; fila++) {

    const filaActual = [];

    for (let columna = 0; columna < TAMANO_GRILLA; columna++) {

      filaActual.push({
        id: `${LETRAS[fila]}${columna + 1}`, // Coordenada visible (ej. A1, A2... F6)
        fila: fila,                          // Índice de la fila (0 a 5)
        columna: columna,                    // Índice de la columna (0 a 5)
        tieneBarco: false,                   // Booleano para saber si está ocupado por un navío
        idBarco: null,                       // Identificador del navío
        impactado: false,                    // Indica si se disparó y se acertó
        fallido: false                       // Indica si se disparó y falló (se marca con 'X')
      });
    }
    matriz.push(filaActual);
  }

  return matriz;
};


/*Lo que hace este bloque de codigo es que hacemos 2 constantes donde las vamos a exportar uno donde va tener el alfabeto, y el tamaño grilla
la cantidad de grilla que sera 6 x6, abajo creamos una constante llamada matriz, donde se van a ir almacenando las filas, abajo
hacemos un ciclo aninandp, unopara recorrer las columnas y otras las filas, luego hacemos las propiedades de la filaactual donde cn push
la metemos en la lista de filaactual.En conclusion tenemos como resultado todas lasfilas y columnas */