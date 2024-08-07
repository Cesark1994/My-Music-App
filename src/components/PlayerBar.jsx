import React from 'react'; // Importa la biblioteca React
import { useMusicPlayer } from '../context/MusicPlayerProvider'; // Importa el hook useMusicPlayer desde el proveedor de contexto MusicPlayerProvider
import '../styles/PlayerBar.css'; // Importa el archivo de estilos CSS para la barra del reproductor

// Define el componente funcional PlayerBar
const PlayerBar = () => {
  // Obtiene el estado actual de la pista, el estado de reproducción, y las funciones playTrack y pauseTrack del contexto de MusicPlayer
  const { currentTrack, isPlaying, playTrack, pauseTrack } = useMusicPlayer();

  return (
    // Contenedor principal de la barra del reproductor con la clase CSS "player-bar"
    <div className="player-bar">
      {/* Si hay una pista actual, muestra la información y los controles */}
      {currentTrack && (
        <>
          {/* Contenedor de la información de la pista */}
          <div className="player-bar__info">
            {/* Muestra el título de la pista actual */}
            <p>{currentTrack.title}</p>
          </div>
          {/* Contenedor de los controles del reproductor */}
          <div className="player-bar__controls">
            {/* Botón para reproducir o pausar la pista actual */}
            <button onClick={() => (isPlaying ? pauseTrack() : playTrack(currentTrack))}>
              {isPlaying ? 'Pause' : 'Play'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PlayerBar; // Exporta el componente PlayerBar como el valor predeterminado del módulo