export const LETRAS = ['A', 'B', 'C', 'D', 'E', 'F'];
export const TAMANO_GRILLA = 6;

export const crearMatrizInicial = () => {
  const matriz = [];

  for (let fila = 0; fila < TAMANO_GRILLA; fila++) {

    const filaActual = [];

    for (let columna = 0; columna < TAMANO_GRILLA; columna++) {

      filaActual.push({
        id: `${LETRAS[fila]}${columna + 1}`,
        fila: fila,                         
        columna: columna,                    
        tieneBarco: false,                   
        idBarco: null,                     
        impactado: false,                   
        fallido: false                       
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

//un máximo de tres navíos por jugador, con un tamaño de 4,5,3

//R: Vamos a tener en total 6 barcos, 3 barcos por jugador, entonces cada segun mi logica, cada barquito va tener sus propiedades como su tamaño, si esta hundido,
//No podemos poner vidas ya que solo al atacar las vceldas del barquito se va hundir, entonces cada celdita va tener lo que es el id del barco.








