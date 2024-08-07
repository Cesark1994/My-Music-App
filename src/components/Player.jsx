import React from 'react'; // Importa la biblioteca React
import '../styles/Player.css'; // Importa el archivo de estilos CSS para el reproductor

// Define el componente funcional Player
function Player() {
  return (
    // Contenedor principal del reproductor con la clase CSS "player"
    <div className="player">
      {/* Contenedor de los controles del reproductor */}
      <div className="player-controls">
        {/* Botón para ir a la canción anterior */}
        <button>Anterior</button>
        {/* Botón para reproducir o pausar la canción */}
        <button>Play/Pause</button>
        {/* Botón para ir a la siguiente canción */}
        <button>Siguiente</button>
        {/* Botón para activar o desactivar el modo aleatorio */}
        <button>Shuffle</button>
        {/* Botón para repetir la canción */}
        <button>Repetir</button>
      </div>
      {/* Contenedor de la barra de progreso del reproductor */}
      <div className="player-progress">
        {/* Tiempo de inicio de la canción */}
        <span>0:00</span>
        {/* Barra de progreso */}
        <div className="progress-bar">
          {/* Indicador de progreso */}
          <div className="progress"></div>
        </div>
        {/* Tiempo de finalización de la canción */}
        <span>3:30</span>
      </div>
    </div>
  );
}

export default Player; // Exporta el componente Player como el valor predeterminado del módulo