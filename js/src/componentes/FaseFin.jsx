import React from "react";

export default function FaseFin({ ganador }) {
  const perdedor = ganador === 1 ? 2 : 1;

  return (
    <div className="resultado-final">
      <h2>Jugador {ganador}: ¡Has ganado!</h2>
      <p>Jugador {perdedor}: Has perdido.</p>
    </div>
  );
}