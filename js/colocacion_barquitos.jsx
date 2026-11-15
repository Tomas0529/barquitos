import React, { useState, useEffect } from 'react';
import { crearJugadores } from './jugadores';
import { manejarClicColocarBarco } from './posicion_barcos';
import FaseColocacion from '../src/componentes/FaseColocacion';
import FaseBatalla from '../src/componentes/FaseBatalla';
import FaseFin from '../src/componentes/FaseFin';

const TableroJuego = () => {
  const [jugadores, setJugadores] = useState(crearJugadores());
  const [turnoJugador, setTurnoJugador] = useState(1);
  const [indiceBarcoActual, setIndiceBarcoActual] = useState(0);
  const [direccionActual, setDireccionActual] = useState("Horizontal");
  const [estado, setEstadoJugador] = useState("colocando");
  const [tiempoRestante, setTiempoRestante] = useState(30);
  const [mensajeTurno, setMensajeTurno] = useState("");
  const [ganador, setGanador] = useState(null);

  useEffect(() => {
    if (estado !== "batalla") {
      return;
    }

    setTiempoRestante(30);

    const intervalo = setInterval(() => {
      setTiempoRestante((Tiempo) => {
        if (Tiempo <= 1) {
          if (turnoJugador === 1) {
            setTurnoJugador(2);
          } else {
            setTurnoJugador(1);
          }
          return 30;
        }
        return Tiempo - 1;
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

    const nuevosJugadores = [...jugadores];
    const clonOponente = { ...nuevosJugadores[indiceOponente] };
    
    const nuevaMatrizOponente = clonOponente.matriz.map(f => 
      f.map(c => ({ ...c }))
    );

    const celdaClonada = nuevaMatrizOponente[fila][columna];

    let fueImpacto = false;

    if (celdaClonada.tieneBarco) {
      celdaClonada.impactado = true;
      celdaClonada.icono = "💥";
      fueImpacto = true;
      setMensajeTurno(`¡Has impactado! 🎯 (Jugador ${indiceOponente + 1}: ¡Fuiste impactado!)`);
    } else {
      celdaClonada.fallido = true;
      celdaClonada.icono = "❌";
      setMensajeTurno(`¡Agua! 🌊 No hay barco en esta casilla.`);
    }

    clonOponente.matriz = nuevaMatrizOponente;
    nuevosJugadores[indiceOponente] = clonOponente;

    let juegoTerminado = false;

    const barcoHundido = oponenteActual.barcos.some(barco =>
      barco.casillas.every(c => nuevaMatrizOponente[c.fila][c.columna].impactado)
    );

    if (barcoHundido) {
      setMensajeTurno(`🏆 ¡Jugador ${turnoJugador} GANA! Hundiste un navío. (Jugador ${indiceOponente + 1}: Has perdido 💀)`);
      setGanador(turnoJugador);
      setEstadoJugador("finDeJuego");
      juegoTerminado = true;
    }

    if (!juegoTerminado) {
      setTimeout(() => {
        setMensajeTurno("");
      }, 5000);

      if (!fueImpacto) {
        setTurnoJugador(turnoJugador === 1 ? 2 : 1);
      }
    }

    setJugadores(nuevosJugadores);
  };

  return (
    <div>
      {estado === "colocando" && (
        <FaseColocacion
          jugador={turnoJugador}
          tablero={jugadores[turnoJugador - 1].matriz}
          tamanoNavio={jugadores[turnoJugador - 1].barcos[indiceBarcoActual].tamaño}
          orientacion={direccionActual}
          alCambiarOrientacion={() =>
            setDireccionActual(direccionActual === "Horizontal" ? "Vertical" : "Horizontal")
          }
          alColocarNavio={handleCeldaClick}
        />
      )}

      {estado === "batalla" && (
        <>
          <FaseBatalla
            turno={turnoJugador}
            tiempoRestante={tiempoRestante}
            tableroEnemigo={jugadores[turnoJugador === 1 ? 1 : 0].matriz}
            alDisparar={handleAtaque}
          />
          <p>{mensajeTurno}</p>
        </>
      )}

      {estado === "finDeJuego" && <FaseFin ganador={ganador} />}
    </div>
  );
};

export default TableroJuego;