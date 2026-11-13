import React, { useState } from 'react';
import { crearJugadores } from './jugadores';
import { manejarClicColocarBarco } from './posicion_barco';

const TableroJuego = () => {
  // 1. Estado de los jugadores y sus matrices/barcos
const [jugadores, setJugadores] = useState(crearJugadores());

// 2. Estado para el turno actual (1 para Jugador 1, 2 para Jugador 2)
const [turnoJugador, setTurnoJugador] = useState(1);

// 3. Estado para saber cuál barco toca colocar (0 = tamaño 5, 1 = tamaño 4, 2 = tamaño 3)
const [indiceBarcoActual, setIndiceBarcoActual] = useState(0);

// 4. Estado para la orientación del barco actual (Horizontal o Vertical)
const [direccionActual, setDireccionActual] = useState("Horizontal");

};

export default TableroJuego;