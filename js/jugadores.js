//importamos la matriz realizada
import { crearMatrizInicial } from './matriz';

//función que crea los dos jugadores, cada uno con su respectiva matriz y propiedades.
//Es una función para que "Jugar de nuevo" pueda crear matrices limpias.
export const crearJugadores = () => [

  //objeto llamado "Jugador 1" con su respectiva matriz y propiedades
  {
    id: 1,
    nombre: "Jugador 1",
    matriz: crearMatrizInicial(),
    barcos: [
      { id: "barco-1", tamaño: 5, casillas: [], direccion:"Horizontal"},
      { id: "barco-2", tamaño: 4, casillas: [], direccion:"Horizontal"},
      { id: "barco-3", tamaño: 3, casillas: [] ,direccion: "Horizontal"}
    ]
  },

  //objeto llamado "Jugador 2" con su respectiva matriz y propiedades
  {
    id: 2,
    nombre: "Jugador 2",
    matriz: crearMatrizInicial(),
    barcos: [
      { id: "barco-1", tamaño: 5, casillas: [] , direccion:"Horizontal"},
      { id: "barco-2", tamaño: 4, casillas: [] , direccion:"Horizontal"},
      { id: "barco-3", tamaño: 3, casillas: [] , direccion:"Horizontal"}
    ]
  }
];