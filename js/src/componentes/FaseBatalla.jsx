import React from "react";
import Tablero from "./Tablero";

export default function FaseBatalla({turno,tiempoRestante,tableroEnemigo,alDisparar,
}) { const oponente = turno === 1 ? 2 : 1;

  return (
    <div>
      <p className="temporizador">
        Turno: Jugador {turno} | Tiempo: {tiempoRestante}s
      </p>
      <p>Tablero del Jugador {oponente}:</p>
      <Tablero
        tablero={tableroEnemigo}
        ocultarNavios={true}
        alHacerClic={alDisparar}
      />
    </div>
  );
}