import React, { createContext, useContext, useState } from 'react';

// Crear el contexto
const MusicPlayerContext = createContext();

// Hook personalizado para usar el contexto
export const useMusicPlayer = () => {
  return useContext(MusicPlayerContext);
};

// Proveedor del contexto
export const MusicPlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const pauseSong = () => {
    setIsPlaying(false);
  };

  const stopSong = () => {
    setCurrentSong(null);
    setIsPlaying(false);
  };

  return (
    <MusicPlayerContext.Provider value={{ currentSong, playSong, pauseSong, stopSong, isPlaying }}>
      {children}
    </MusicPlayerContext.Provider>
  );
};