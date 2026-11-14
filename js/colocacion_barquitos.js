import React, { useState, useEffect } from 'react';
import { crearJugadores } from './jugadores';
import { manejarClicColocarBarco } from './posicion_barcos';

const TableroJuego = () => {
  const [jugadores, setJugadores] = useState(crearJugadores());
  const [turnoJugador, setTurnoJugador] = useState(1);
  const [indiceBarcoActual, setIndiceBarcoActual] = useState(0);
  const [direccionActual, setDireccionActual] = useState("Horizontal");
  const [estado, setEstadoJugador] = useState("colocando");
  const [tiempoRestante, setTiempoRestante] = useState(30);

  useEffect(() => {
    if (estado !== "batalla") {
      return;
    }

    setTiempoRestante(30);

    const intervalo = setInterval(() => {
      setTiempoRestante((prevTiempo) => {
        if (prevTiempo <= 1) {
          if (turnoJugador === 1) {
            setTurnoJugador(2);
          } else {
            setTurnoJugador(1);
          }
          return 30;
        }
        return prevTiempo - 1;
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, [turnoJugador, estado]);

  const handleCeldaClick = (fila, columna) => {
    if (estado !== "colocando") {
      return;
    }

    const jugadorActual = jugadores[turnoJugador - 1];
    
    const barcoActual = {
      ...jugadorActual.barcos[indiceBarcoActual],
      direccion: direccionActual
    };

    const resultado = manejarClicColocarBarco(
      fila, 
      columna, 
      barcoActual, 
      jugadorActual.matriz
    );

    if (resultado.error) {
      alert(resultado.error);
      return;
    }

    const nuevosJugadores = [...jugadores];
    const clonJugadorActual = { ...nuevosJugadores[turnoJugador - 1] };
    
    const nuevaMatriz = clonJugadorActual.matriz.map(f => f.map(c => ({ ...c })));

    resultado.forEach(casilla => {
      nuevaMatriz[casilla.fila][casilla.columna].tieneBarco = true;
      nuevaMatriz[casilla.fila][casilla.columna].idBarco = barcoActual.id;
    });

    const nuevosBarcos = [...clonJugadorActual.barcos];
    nuevosBarcos[indiceBarcoActual] = {
      ...barcoActual,
      colocado: true,
      casillas: resultado
    };

    clonJugadorActual.matriz = nuevaMatriz;
    clonJugadorActual.barcos = nuevosBarcos;
    nuevosJugadores[turnoJugador - 1] = clonJugadorActual;

    setJugadores(nuevosJugadores);

    if (indiceBarcoActual + 1 < jugadorActual.barcos.length) {
      setIndiceBarcoActual(indiceBarcoActual + 1);
    } else {
      if (turnoJugador === 1) {
        setTurnoJugador(2);
        setIndiceBarcoActual(0);
      } else {
        setEstadoJugador("batalla");
        setIndiceBarcoActual(0);
        setTurnoJugador(1);
      }
    }
  };

  const handleAtaque = (fila, columna) => {
    if (estado !== "batalla") {
      return;
    }

    let indiceOponente;
    if (turnoJugador === 1) {
      indiceOponente = 1;
    } else {
      indiceOponente = 0;
    }

    const oponenteActual = jugadores[indiceOponente];
    const celdaObjetivo = oponenteActual.matriz[fila][columna];

    if (celdaObjetivo.impactado || celdaObjetivo.fallido) {
      alert("¡Ya disparaste a esta casilla!");
      return;
    }
  };

  return (
    <div>
      {/* Renderizado del tablero y temporizador */}
    </div>
  );
};

export default TableroJuego;