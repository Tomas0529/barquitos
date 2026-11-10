//importamos de la libreria react un hook "useState"
import { useState } from 'react';
//importamos la matriz realizada
import { crearMatrizInicial } from './matriz';
//creamos un estado para los jugadores.
const [jugadores, setJugadores] = useState([

  //creamos un objeto llamado "Jugador 1" con sus respectiva matriz y propiedades
  {
    id: 1,
    nombre: "Jugador 1",
    matriz: crearMatrizInicial(),
    barcos: [
      { id: "barco-1", tamaño: 5, casillas: [] },
      { id: "barco-2", tamaño: 4, casillas: [] },
      { id: "barco-3", tamaño: 3, casillas: [] }
    ]
  },  
  {

 //creamos un objeto llamado "Jugador 2" con sus respectiva matriz y propiedades

    id: 2,
    nombre: "Jugador 2",
    matriz: crearMatrizInicial(), 
    barcos: [
      { id: "barco-1", tamaño: 5, casillas: [] },
      { id: "barco-2", tamaño: 4, casillas: [] },
      { id: "barco-3", tamaño: 3, casillas: [] }
    ]
  }
]);

//Un estado para ir cambiando el turno del jugador
const [turnoJugador, setTurnoJugador] = useState(1);