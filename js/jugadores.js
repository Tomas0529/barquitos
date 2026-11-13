//importamos la matriz realizada
import { crearMatrizInicial } from './matriz';

export const crearJugadores = () => [
  {
    id: 1,
    nombre: "Jugador 1",
    matriz: crearMatrizInicial(),
    faseActual: "colocando", // Puede ser "colocando" o "listo"
    barcos: [
      { id: "barco-1", tamaño: 5, casillas: [], direccion: "Horizontal" },
      { id: "barco-2", tamaño: 4, casillas: [], direccion: "Horizontal" },
      { id: "barco-3", tamaño: 3, casillas: [], direccion: "Horizontal" }
    ]
  },
  {
    id: 2,
    nombre: "Jugador 2",
    matriz: crearMatrizInicial(),
    faseActual: "colocando", 
    barcos: [
      { id: "barco-1", tamaño: 5, casillas: [], direccion: "Horizontal" },
      { id: "barco-2", tamaño: 4, casillas: [], direccion: "Horizontal" },
      { id: "barco-3", tamaño: 3, casillas: [], direccion: "Horizontal" }
    ]
  }
];