import React, { createContext, useContext, useState } from 'react'; // Importa React y los hooks createContext, useContext y useState

// Crea el contexto de MusicPlayer
const MusicPlayerContext = createContext();

// Define el proveedor de MusicPlayer
export const MusicPlayerProvider = ({ children }) => {
  // Define el estado local para la canción actual y el estado de reproducción
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Función para reproducir una canción
  const playSong = (song) => {
    setCurrentSong(song); // Establece la canción actual
    setIsPlaying(true); // Establece el estado de reproducción a verdadero
  };

  // Función para pausar la canción
  const pauseSong = () => {
    setIsPlaying(false); // Establece el estado de reproducción a falso
  };

  return (
    // Proveedor del contexto de MusicPlayer
    <MusicPlayerContext.Provider value={{ currentSong, playSong, pauseSong, isPlaying }}>
      {children} {/* Renderiza los hijos del proveedor */}
    </MusicPlayerContext.Provider>
  );
};

// Hook personalizado para usar el contexto de MusicPlayer
export const useMusicPlayer = () => useContext(MusicPlayerContext); // Obtiene el contexto de MusicPlayer