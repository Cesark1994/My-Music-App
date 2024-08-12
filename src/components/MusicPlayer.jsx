import React from 'react';
import { useMusicPlayer } from '../context/MusicPlayerContext'; // Asegúrate de que la ruta es correcta

const MusicPlayer = () => {
  const { currentSong, isPlaying, pauseSong } = useMusicPlayer();

  if (!currentSong) {
    return null;
  }

  return (
    <div>
      <h3>Now Playing: {currentSong.title}</h3>
      <button onClick={pauseSong}>{isPlaying ? 'Pause' : 'Play'}</button>
      {/* Aquí puedes agregar más controles y visualizaciones */}
    </div>
  );
};

export default MusicPlayer;