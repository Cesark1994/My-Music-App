import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPlaylistDetails, getSongs, addSongToPlaylist, removeSongFromPlaylist, searchSongs } from '../services/api';
import SongCard from '../components/SongCard';
import Player from '../components/Player';
import '../styles/PlaylistDetails.css';

function PlaylistDetails({ authtoken, userId }) {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSong, setCurrentSong] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const data = await getPlaylistDetails(id, authtoken);
        if (!data) {
          throw new Error(`Playlist con ID ${id} no encontrada.`);
        }
        setPlaylist(data);
      } catch (error) {
        console.error('Error fetching playlist details:', error);
        setError(error.message || 'Error fetching playlist details. Por favor, verifica tu conexión a internet o intenta nuevamente más tarde.');
      }
    };

    const fetchSongs = async () => {
      try {
        const data = await getSongs(authtoken);
        setSongs(data);
      } catch (error) {
        console.error('Error fetching songs:', error);
        setError('Error fetching songs. Por favor, verifica tu conexión a internet o intenta nuevamente más tarde.');
      }
    };

    if (id) {
      fetchPlaylist();
      fetchSongs();
    } else {
      setError('ID de la playlist no proporcionado.');
    }
  }, [id, authtoken]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const results = await searchSongs(searchTerm);
      if (results.length === 0) {
        setError('Canción no encontrada');
      } else {
        setSearchResults(results);
      }
    } catch (error) {
      setError('Error searching songs. Please check the console for more details.');
      console.error('Error searching songs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSong = async (songId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No se encontró el token de autenticación.');
      }
  
      await axios.post('https://sandbox.academiadevelopers.com/harmonyhub/playlist-entries/', {
        playlist: id,
        song: songId,
        owner: userId
      }, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
  
      const updatedPlaylist = await getPlaylistDetails(id, authtoken);
      setPlaylist(updatedPlaylist);
    } catch (error) {
      console.error('Error adding song to playlist:', error);
      setError('Error adding song to playlist. Por favor, intenta nuevamente más tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveSong = async (songId) => {
    try {
      await removeSongFromPlaylist(id, songId, authtoken);
      const updatedPlaylist = await getPlaylistDetails(id, authtoken);
      setPlaylist(updatedPlaylist);
    } catch (error) {
      console.error('Error removing song from playlist:', error);
      setError('Error removing song from playlist. Por favor, intenta nuevamente más tarde.');
    }
  };

  const handlePlay = (song) => {
    setCurrentSong(song);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!playlist) return <p>Loading...</p>;

  return (
    <div className="playlist-details" style={{ backgroundColor: '#191414', color: '#1DB954', minHeight: '100vh', padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>{playlist.name}</h1>
        <button 
          onClick={handleGoBack}
          style={{
            backgroundColor: '#1DB954',
            color: '#fff',
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '20px',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
        >
          Página Anterior
        </button>
      </header>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="playlist-songs">
        {playlist.songs && playlist.songs.length > 0 ? (
          playlist.songs.map((song) => (
            <div key={song.id} style={{ marginBottom: '10px', backgroundColor: '#333', padding: '10px', borderRadius: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <SongCard song={song} onPlay={() => handlePlay(song)} />
              <button 
                onClick={() => handleRemoveSong(song.id)}
                style={{
                  backgroundColor: '#ff4d4d',
                  border: 'none',
                  padding: '5px 10px',
                  color: '#fff',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                }}
              >
                Eliminar
              </button>
            </div>
          ))
        ) : (
          <p>No hay canciones en esta playlist.</p>
        )}
      </div>
      {currentSong && (
        <Player song={currentSong} />
      )}
      <h2 style={{ marginTop: '20px' }}>Agregar Canciones</h2>
      <form onSubmit={handleSearch} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <input 
          type="text" 
          placeholder="Buscar por nombre..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          style={{
            borderRadius: '20px',
            padding: '10px 15px',
            border: '1px solid #1DB954',
            outline: 'none',
            backgroundColor: '#fff',
            color: '#000',
            width: '70%',
            fontWeight: 'bold',
            boxSizing: 'border-box',
            marginRight: '10px',
          }}
        />
        <button 
          type="submit"
          style={{
            backgroundColor: '#1DB954',
            color: '#fff',
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '20px',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
        >
          Buscar
        </button>
      </form>
      <div className="search-results">
        {searchResults.map((song) => (
          <div key={song.id} className="search-result-item" style={{ marginBottom: '10px', backgroundColor: '#333', padding: '10px', borderRadius: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p>{song.title} - {song.artist_name}</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={() => handleAddSong(song.id)}
                style={{
                  backgroundColor: '#1DB954',
                  border: 'none',
                  padding: '5px 10px',
                  color: '#fff',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                }}
              >
                Agregar a la Playlist
              </button>
              <button 
                onClick={() => handlePlay(song)}
                style={{
                  backgroundColor: '#007BFF',
                  border: 'none',
                  padding: '5px 10px',
                  color: '#fff',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                }}
              >
                Reproducir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlaylistDetails;
