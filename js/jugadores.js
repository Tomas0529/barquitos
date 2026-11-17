// Importamos la matriz realizada
import { crearMatrizInicial } from './matriz';

// Se crea la función donde crearemos los 2 jugadores.
// Esta función nos devuelve una lista donde están los dos jugadores.

export const crearJugadores = () => [
  {
    id: 1, // Número del jugador
    nombre: "Jugador 1", // Nombre que se verá en pantalla
    matriz: crearMatrizInicial(), // Se le crea un tablero propio al jugador
    faseActual: "colocando", // Etapa en la que se encuentra, puede ser "colocando" o "listo"

    // Barcos del jugador: cada uno tiene su id que identifica el
    // barco, el tamaño es cuántas casillas ocupará,
    // en casillas se empieza como lista vacía pero se llenará cuando
    // se coloque el barco en el tablero, la dirección es si se colocará el
    // barco horizontal o vertical

    barcos: [
      { id: "barco-1", tamaño: 5, casillas: [],colocado:false, direccion: "Horizontal" },
      { id: "barco-2", tamaño: 4, casillas: [],colocado:false,  direccion: "Horizontal" },
      { id: "barco-3", tamaño: 3, casillas: [],colocado:false, direccion: "Horizontal" }
    ]
  },
  {
    id: 2,
    nombre: "Jugador 2",
    matriz: crearMatrizInicial(),
    faseActual: "colocando",
    barcos: [
      { id: "barco-1", tamaño: 5, casillas: [], colocado:false ,direccion: "Horizontal" },
      { id: "barco-2", tamaño: 4, casillas: [], colocado:false, direccion: "Horizontal" },
      { id: "barco-3", tamaño: 3, casillas: [], colocado:false, direccion: "Horizontal" }
    ]
  }
];