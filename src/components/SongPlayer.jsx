import React, { useState, useEffect, useRef } from 'react';
import { useMusicPlayer } from '../context/MusicPlayerProvider';
import '../styles/SongPlayer.css';

const SongPlayer = ({ song }) => {
  const { currentSong, playSong, pauseSong, isPlaying } = useMusicPlayer();
  const audioRef = useRef(null);
  const [isCurrentSong, setIsCurrentSong] = useState(false);

  useEffect(() => {
    if (song && currentSong) {
      setIsCurrentSong(currentSong.id === song.id);
    } else {
      setIsCurrentSong(false);
    }
  }, [currentSong, song]);

  useEffect(() => {
    if (audioRef.current) {
      if (isCurrentSong && isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error('Error playing the audio:', error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isCurrentSong, isPlaying]);

  const handlePlayPause = () => {
    if (isCurrentSong) {
      if (isPlaying) {
        pauseSong();
      } else {
        playSong(song);
      }
    } else {
      playSong(song);
    }
  };

  if (!song || !song.id) {
    console.error('No valid song provided');
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
