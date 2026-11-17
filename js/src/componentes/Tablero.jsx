import React from "react";
import { FILAS, COLUMNAS } from "../../js/matriz";

// Exportamos y creamos la funcion Tablero donde como propiedades recibimos los siguientes:
export default function Tablero({ tablero, ocultarNavios, alHacerClic }) {
  return (
    <table className="tablero">
      <thead>
        <tr>
          <th></th>
          {/* Recorremos todas las columnas con .map para mostrarlas, para pintarlas creando asi los encabezados. */}
          {COLUMNAS.map((col) => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* Recorremos todo el tablero con .map, donde vamos a recorrer cada fila donde las vamos a pintar con las letras/filas. */}
        {tablero.map((filaDatos, fIdx) => (
          <tr key={FILAS[fIdx]}>
            <th>{FILAS[fIdx]}</th>
            {/* Recorremos cada fila donde recorremos cada celda donde vamos a colocar la informacion siguiente donde hacemos las validaciones. */}
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
                  // El primer alHacerClic verifica que la funcion exista (cortocircuito), y el segundo se encarga de ejecutar ya el codigo pasandole las coordenadas.
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