const [jugadores, setJugadores] = useState([
    {
      id: 1,
      nombre: "Jugador 1",
      matriz: [
        [
          { tieneBarco: false, idBarco: null, derribado :False },
          { tieneBarco: false, idBarco: null, derribado :False},
        ],
      ],
      barcos: [
        { id: "barco-1", tamaño: 5, casillas: [] },
        { id: "barco-2", tamaño: 4, casillas: [] },
        { id: "barco-3", tamaño:3, casillas: [] }
      ]
    },  
    {
      id: 2,
      nombre: "Jugador 2",
      matriz: [
      ],
      barcos: [
        { id: "barco-1", tamaño: 5, casillas: [] },
        { id: "barco-2", tamaño: 4, casillas: [] },
        {id:  "barco-3", tamaño: 3, casillas: []}
      ]
    }
  ]);

  const [turnoJugador, setTurnoJugador] = useState(1);
