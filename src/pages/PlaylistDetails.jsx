import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPlaylistDetails, getSongs, addSongToPlaylist, removeSongFromPlaylist, searchSongs } from '../services/api';
import SongCard from '../components/SongCard';
import Player from '../components/Player';
import '../styles/PlaylistDetails.css';

function PlaylistDetails({ authtoken, userId }) { // Asegúrate de que userId se pasa como prop
  const { id } = useParams(); // Obtiene el parámetro de la URL
  const [playlist, setPlaylist] = useState(null); // Estado para almacenar los detalles de la playlist
  const [songs, setSongs] = useState([]); // Estado para almacenar las canciones
  const [searchResults, setSearchResults] = useState([]); // Estado para almacenar los resultados de búsqueda
  const [searchTerm, setSearchTerm] = useState(''); // Estado para almacenar el término de búsqueda
  const [currentSong, setCurrentSong] = useState(null); // Estado para almacenar la canción actual
  const [error, setError] = useState(''); // Estado para almacenar errores
  const [loading, setLoading] = useState(false); // Estado para manejar el estado de carga

  useEffect(() => {
    // Función para obtener los detalles de la playlist
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

    // Función para obtener las canciones
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
      fetchPlaylist(); // Llama a la función para obtener los detalles de la playlist
      fetchSongs(); // Llama a la función para obtener las canciones
    } else {
      setError('ID de la playlist no proporcionado.');
    }
  }, [id, authtoken]); // Ejecuta el efecto cuando cambian id o authtoken

  // Función para manejar la búsqueda de canciones
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

  // Función para manejar la adición de una canción a la playlist
  const handleAddSong = async (songId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken'); // Obtén el token del almacenamiento local
      if (!token) {
        throw new Error('No se encontró el token de autenticación.');
      }
  
      await axios.post('https://sandbox.academiadevelopers.com/harmonyhub/playlist-entries/', {
        playlist: id,
        song: songId,
        owner: userId
      }, {
        headers: {
          'Authorization': `Token ${token}` // Asegúrate de que el token se envía en los encabezados
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

  // Función para manejar la eliminación de una canción de la playlist
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

  // Función para manejar la reproducción de una canción
  const handlePlay = (song) => {
    setCurrentSong(song);
  };

  if (loading) {
    return <p>Loading...</p>; // Muestra un mensaje de carga si está cargando
  }

  if (!playlist) return <p>Loading...</p>; // Muestra un mensaje de carga si no hay playlist

  return (
    <div className="playlist-details">
      <h1>{playlist.name}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Muestra un mensaje de error si hay un error */}
      <div className="playlist-songs">
        {playlist.songs && playlist.songs.length > 0 ? (
          playlist.songs.map((song) => (
            <div key={song.id}>
              <SongCard song={song} onPlay={() => handlePlay(song)} />
              <button onClick={() => handleRemoveSong(song.id)}>Eliminar</button>
            </div>
          ))
        ) : (
          <p>No hay canciones en esta playlist.</p>
        )}
      </div>
      {currentSong && (
        <Player song={currentSong} /> // Muestra el reproductor si hay una canción actual
      )}
      <h2>Agregar Canciones</h2>
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Buscar por nombre..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      <div className="search-results">
        {searchResults.map((song) => (
          <div key={song.id} className="search-result-item">
            <p>{song.title} - {song.artist_name}</p>
            <button onClick={() => handleAddSong(song.id)}>Agregar a la Playlist</button>
            <button onClick={() => handlePlay(song)}>Reproducir</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlaylistDetails;