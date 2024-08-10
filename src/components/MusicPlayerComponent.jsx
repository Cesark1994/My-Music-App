import React from 'react';
import { useMusicPlayer } from '../context/MusicPlayerProvider'; // Asegúrate de que la ruta es correcta

const MusicPlayerComponent = () => {
  const { playSong, pauseSong, stopSong, currentSong, isPlaying } = useMusicPlayer();

  const handlePlay = () => {
    const song = { title: 'Song Title', artist: 'Artist Name' }; // Ejemplo de canción
    playSong(song);
  };

  return (
    <div>
      <button onClick={handlePlay}>Play</button>
      <button onClick={pauseSong}>Pause</button>
      <button onClick={stopSong}>Stop</button>
      {isPlaying && currentSong && (
        <div>
          <p>Now Playing: {currentSong.title} by {currentSong.artist}</p>
        </div>
      )}
    </div>
  );
};

export default MusicPlayerComponent;