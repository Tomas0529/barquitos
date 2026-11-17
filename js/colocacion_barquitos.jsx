//Importamos los hooks, funciones y fases del juego.
import React, { useState, useEffect } from 'react';
import { crearJugadores } from './jugadores';
import { manejarClicColocarBarco } from './posicion_barcos';
import FaseColocacion from '../src/componentes/FaseColocacion';
import FaseBatalla from '../src/componentes/FaseBatalla';
import FaseFin from '../src/componentes/FaseFin';

//Creamos un componente TableroJuego.

const TableroJuego = () => {
 // Almacena la información y tableros de ambos jugadores
  const [jugadores, setJugadores] = useState(crearJugadores());

  // Controla de quién es el turno actual 
  const [turnoJugador, setTurnoJugador] = useState(1);

  // Índice del barco que se está posicionando
  const [indiceBarcoActual, setIndiceBarcoActual] = useState(0);

  // Orientación del barco 
  const [direccionActual, setDireccionActual] = useState("Horizontal");

  // Fase actual del juego 
  const [estado, setEstadoJugador] = useState("colocando");

  // Temporizador de cuenta regresiva para el turno 
  const [tiempoRestante, setTiempoRestante] = useState(30);

  // Textos informativos para mostrar en la interfaz
  const [mensajeTurno, setMensajeTurno] = useState("");

  // Almacena el número del jugador ganador 
  const [ganador, setGanador] = useState(null);

  //Utilizamos el Hook UseEffect 

 // Utilizamos el hook useEffect para manejar el temporizador de la partida.
  useEffect(() => {
    // Si el juego aún no está en la fase de batalla, detenemos la ejecución aquí mismo.
    if (estado !== "batalla") {
      return;
    }

    // Inicializamos el contador de cada turno en 30 segundos.
    setTiempoRestante(30);

    // Creamos un intervalo que se ejecuta cada 1000 milisegundos 
    const intervalo = setInterval(() => {
      setTiempoRestante((Tiempo) => {
        // Validamos si el tiempo se ha agotado 
        if (Tiempo <= 1) {
          // Si el tiempo se acaba, cambiamos el turno automáticamente al jugador contrario.
          if (turnoJugador === 1) {
            setTurnoJugador(2);
          } else {
            setTurnoJugador(1);
          }
          // Reiniciamos el cronómetro de nuevo a 30 segundos para el siguiente turno.
          return 30;
        }
        // Si el tiempo aún no se agota, restamos 1 segundo al contador actual.
        return Tiempo - 1;
      });
    }, 1000);

    //  limpiamos y destruimos el intervalo anterior 
    // cada vez que cambia el turno o el estado, evitando que se acumulen relojes por debajo.
    return () => clearInterval(intervalo);
  }, [turnoJugador, estado]);

  //Manejar click en la celda solo en colocacion.
  const handleCeldaClick = (fila, columna) => {
    //  Validamos que el juego se encuentre estrictamente en la fase de colocación de barcos.
    if (estado !== "colocando") {
      return;
    }

    //  Obtenemos al jugador actual basándonos en su turno 
    const jugadorActual = jugadores[turnoJugador - 1];
    
    //  Creamos el objeto del barco actual donde
    // conservamos sus propiedades y asignándole la orientación elegida (Horizontal o Vertical).
    const barcoActual = {
      ...jugadorActual.barcos[indiceBarcoActual],
      direccion: direccionActual
    };

    //  traemos la función de validación y colocación pasándole las coordenadas, 
    // el barco a ubicar y la matriz actual del jugador.
    const resultado = manejarClicColocarBarco(
      fila, 
      columna, 
      barcoActual, 
      jugadorActual.matriz
    );

    // Si la función devuelve un error como si se sale del tablero, etc, 
    // mostramos una alerta y detenemos el proceso.
    if (resultado.error) {
      alert(resultado.error);
      return;
    }

    //  Copiamos el arreglo general de jugadores
    const nuevosJugadores = [...jugadores];

    //  Clonamos al jugador actual según su turno 
    const clonJugadorActual = { ...nuevosJugadores[turnoJugador - 1] };
    
    //  Copia  de la matriz del jugador actual.
    const nuevaMatriz = clonJugadorActual.matriz.map(f => f.map(c => ({ ...c })));

    //  Marcamos las casillas del tablero donde se ubicó el barco
    resultado.forEach(casilla => {
      nuevaMatriz[casilla.fila][casilla.columna].tieneBarco = true;
      nuevaMatriz[casilla.fila][casilla.columna].idBarco = barcoActual.id;
    });

    //. Actualizamos el estado del barco actual a 'colocado: true' con sus casillas
    const nuevosBarcos = [...clonJugadorActual.barcos];
    nuevosBarcos[indiceBarcoActual] = {
      ...barcoActual,
      colocado: true,
      casillas: resultado
    };

    // Asignamos la matriz y barcos nuevos al clon del jugador
    clonJugadorActual.matriz = nuevaMatriz;
    clonJugadorActual.barcos = nuevosBarcos;

    // Reemplazamos al jugador en el arreglo general
    nuevosJugadores[turnoJugador - 1] = clonJugadorActual;

    // Actualizamos el estado global para renderizar los cambios
    setJugadores(nuevosJugadores);

    // Si aún quedan barcos por colocar, avanzamos al siguiente barco del jugador actual.
    if (indiceBarcoActual + 1 < jugadorActual.barcos.length) {
      setIndiceBarcoActual(indiceBarcoActual + 1);
    } else {
      // Si ya colocó todos sus barcos, pasamos al siguiente paso:
      if (turnoJugador === 1) {
        // Si era el Jugador 1, le pasamos el turno al Jugador 2 y reiniciamos el índice de barcos a 0.
        setTurnoJugador(2);
        setIndiceBarcoActual(0);
      } else {
        // Si era el Jugador 2, ambos terminaron: cambiamos el estado del juego a "batalla"
        // y dejamos el turno inicial para el Jugador 1.
        setEstadoJugador("batalla");
        setIndiceBarcoActual(0);
        setTurnoJugador(1);
      }
    }
  };

  const handleAtaque = (fila, columna) => {
    //  Validamos que el juego esté estrictamente en la fase de batalla.
    if (estado !== "batalla") {
      return;
    }

    // Determinamos el índice oponente según el turno actual 
    let indiceOponente;
    if (turnoJugador === 1) {
      indiceOponente = 1;
    } else {
      indiceOponente = 0;
    }

    // Obtenemos el objeto del oponente actual y la celda específica a la que se disparó.
    const oponenteActual = jugadores[indiceOponente];
    const celdaObjetivo = oponenteActual.matriz[fila][columna];

    //  Verificamos si la celda ya había sido atacada antes para evitar repetir tiro.
    if (celdaObjetivo.impactado || celdaObjetivo.fallido) {
      alert("¡Ya disparaste a esta casilla!");
      return;
    }

    // Creamos una copia del arreglo general de jugadores.
    const nuevosJugadores = [...jugadores];

    //  Clonamos únicamente al oponente actual según su índice.
    const clonOponente = { ...nuevosJugadores[indiceOponente] };
    
    //  Realizamos una copia profunda de la matriz del oponente (recorriendo filas y celdas).
    const nuevaMatrizOponente = clonOponente.matriz.map(f => 
      f.map(c => ({ ...c }))
    );

    //  Ubicamos la celda exacta dentro de nuestra matriz clonada usando la fila y columna.
    const celdaClonada = nuevaMatrizOponente[fila][columna];

    //  Inicializamos una variable auxiliar para saber si el disparo fue exitoso.
    let fueImpacto = false;

    //  Evaluamos si la celda contiene un barco o no, actualizando su estado e ícono visual.
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

    //  Asignamos la matriz modificada al clon del oponente y actualizamos el arreglo general.
    clonOponente.matriz = nuevaMatrizOponente;
    nuevosJugadores[indiceOponente] = clonOponente;

    //  Variable de control para saber si la partida ha finalizado.
    let juegoTerminado = false;

    //  Verificamos si alguno de los barcos del oponente tiene TODAS sus casillas impactadas (¡Barco hundido!).
    const barcoHundido = oponenteActual.barcos.some(barco =>
      barco.casillas.every(c => nuevaMatrizOponente[c.fila][c.columna].impactado)
    );

    //  Si se hundió un barco, declaramos al ganador y finalizamos el juego.
    if (barcoHundido) {
      setMensajeTurno(`🏆 ¡Jugador ${turnoJugador} GANA! Hundiste un navío. (Jugador ${indiceOponente + 1}: Has perdido 💀)`);
      setGanador(turnoJugador);
      setEstadoJugador("finDeJuego");
      juegoTerminado = true;
    }

    //  Si el juego continúa:
    if (!juegoTerminado) {
      // Limpiamos el mensaje en pantalla después de 5 segundos.
      setTimeout(() => {
        setMensajeTurno("");
      }, 5000);

      // Si el jugador no dio a ningún barco  se le cede el turno al rival.
      if (!fueImpacto) {
        setTurnoJugador(turnoJugador === 1 ? 2 : 1);
      }
    }

    // Actualizamos de manera definitiva el estado global con todos los cambios aplicados.
    setJugadores(nuevosJugadores);
  };

 
  // RENDERIZADO FASES DEL JUEGO.

  return (
    <div>
      {/*  Colocación de barcos por turnos */}
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

      {/* Combate / Disparos por turnos con temporizador */}
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

      {/*  Pantalla de victoria / Fin de la partida */}
      {estado === "finDeJuego" && <FaseFin ganador={ganador} />}
  </div>
  );
};

export default TableroJuego;