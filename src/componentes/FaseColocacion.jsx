import React from "react";
import Tablero from "./Tablero";

export default function FaseColocacion({jugador,tablero,tamanoNavio,orientacion,alCambiarOrientacion,alColocarNavio,
}) {
  return (
    <div>
      <h2>Preparación - Jugador {jugador}</h2>
      <p>
        Navío actual: tamaño <strong>{tamanoNavio}</strong>
      </p>
      <button onClick={alCambiarOrientacion}>
        Orientación: {orientacion}
      </button>
      <Tablero
        tablero={tablero}
        ocultarNavios={false}
        alHacerClic={alColocarNavio}
      />
    </div>
  );
}