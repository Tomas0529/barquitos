
// constante de lista con letras para identificar las filas

export const LETRAS = ['A', 'B', 'C', 'D', 'E', 'F'];


// constante donde asignamos el tamaño del tablero,
// en este caso 6x6

export const TAMANO_GRILLA = 6;
export const FILAS = LETRAS;
export const COLUMNAS = ['1', '2', '3', '4', '5', '6'];


// se crea la funcion crearMatrizInicial para que cada jugador
// tenga su tablero

export const crearMatrizInicial = () => {

// dentro de esta funcion creamos una lista vacia llamada matriz
// donde se guardan las filas

  const matriz = [];


  // ciclo donde se recorre la variable fila y se sumara mientras
  // fila sea menor que TAMANO_GRILLA

  for (let fila = 0; fila < TAMANO_GRILLA; fila++) {

    // se crea lista vacia donde se arma la fila actual

    const filaActual = [];
    

    // ciclo con el que se crean las casillas de la filaActual

    for (let columna = 0; columna < TAMANO_GRILLA; columna++) {

    // se crean las casillas que despues se ingresaran
    // a fila actual

      filaActual.push({
        id: `${LETRAS[fila]}${columna + 1}`, // el nombre de la casilla
        fila: fila, // fila en la que estara la casilla                        
        columna: columna, // columna en la que estara la casilla             
        tieneBarco: false, // indica si hay un barco en la casilla                  
        idBarco: null, // indica cual barco hay en la casilla                   
        impactado: false, // indica si se disparo y habia barco                 
        fallido: false // indica si se disparo y no habia barco                      
      });
    }


    // cuando filaActual ya tiene 6 casillas se envia a matriz

    matriz.push(filaActual);
  }

  // devuelve el tablero listo

  return matriz;
};