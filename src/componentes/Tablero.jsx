import React from "react";
import { FILAS, COLUMNAS } from "../../js/matriz";

export default function Tablero({ tablero, ocultarNavios, alHacerClic }) {
  return (
    <table className="tablero">
      <thead>
        <tr>
          <th></th>
          {COLUMNAS.map((col) => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tablero.map((filaDatos, fIdx) => (
          <tr key={FILAS[fIdx]}>
            <th>{FILAS[fIdx]}</th>
            {filaDatos.map((celda, cIdx) => {
             let contenido = "";
              let clase = "celda";

              if (celda.fallido) {
                contenido = "❌";
                clase += " fallo";
              } else if (celda.impactado) {
                contenido = "💥";
                clase += " impacto";
              } else if (!ocultarNavios && celda.tieneBarco) {
                contenido = "🚢";
                clase += " navio";
              }

              return (
                <td
                  key={cIdx}
                  className={clase}
                  onClick={() => alHacerClic && alHacerClic(fIdx, cIdx)}
                >
                  {contenido}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}