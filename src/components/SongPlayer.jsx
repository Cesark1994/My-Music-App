import React, { useEffect, useRef } from 'react';
import { useMusicPlayer } from '../context/MusicPlayerProvider';
import '../styles/SongPlayer.css';

const SongPlayer = ({ song }) => {
  const { currentSong, playSong, pauseSong, isPlaying } = useMusicPlayer();
  const audioRef = useRef(null);
  
  const isCurrentSong = song && currentSong && currentSong.id === song.id;

  useEffect(() => {
    if (audioRef.current) {
      if (isCurrentSong && isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error('Error reproduciendo el audio:', error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isCurrentSong, isPlaying]);

  const handlePlayPause = () => {
    if (isCurrentSong) {
      isPlaying ? pauseSong() : playSong(song);
    } else {
      playSong(song);
    }
  };

  if (!song || !song.id) {
    console.error('No se proporcionó una canción válida');
    return null;
  }

  return (
    <div className="song-player">
      <div className="song-info">
        <span>{song.title}</span>
      </div>
      <audio ref={audioRef} src={song.song_file} controls />
      <button onClick={handlePlayPause}>
        {isCurrentSong && isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default SongPlayer;
