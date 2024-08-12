import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSongs, deleteSong, uploadSong, searchSongs } from '../services/api';
import SongPlayer from '../components/SongPlayer';
import { useAuth } from '../context/AuthProvider'; 
import '../styles/Profile.css';

function Profile() {
  // Estado para almacenar las canciones
  const [songs, setSongs] = useState([]);
  // Estado para almacenar errores
  const [error, setError] = useState('');
  // Estado para almacenar el archivo seleccionado
  const [file, setFile] = useState(null);
  // Estado para almacenar el título de la canción
  const [title, setTitle] = useState('');
  // Estado para controlar la visibilidad del modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Estado para almacenar la consulta de búsqueda
  const [searchQuery, setSearchQuery] = useState('');
  // Estado para controlar el estado de carga
  const [loading, setLoading] = useState(false);
  // Obtener la autenticación del contexto
  const { auth } = useAuth();
  // Hook para la navegación
  const navigate = useNavigate();

  // Efecto para obtener las canciones al montar el componente
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const data = await getSongs();
        setSongs(data);
      } catch (error) {
        setError('Error al obtener las canciones.');
        console.error('Error fetching songs:', error);
      }
    };
    fetchSongs();
  }, []);

  // Manejar la eliminación de una canción
  const handleDelete = async (id) => {
    try {
      await deleteSong(id);
      setSongs(songs.filter((song) => song.id !== id));
      window.location.reload();
    } catch (error) {
      setError('Error al eliminar la canción.');
      console.error('Error deleting song:', error);
    }
  };

  // Manejar la selección de un archivo
  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setIsModalOpen(true);
    }
  };

  // Manejar la subida de una canción
  const handleUpload = async () => {
    if (!file) {
      setError('No se ha seleccionado ningún archivo.');
      return;
    }

    if (!title) {
      setError('No se ha proporcionado un título.');
      return;
    }

    try {
      await uploadSong({ title, file });
      const data = await getSongs();
      setSongs(data);
      setError('¡Canción subida con éxito!');
      setIsModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Error al subir la canción:', error);
      setError('Error al subir la canción.');
    }
  };

  // Manejar la cancelación de la subida
  const handleCancel = () => {
    setFile(null);
    setTitle('');
    setIsModalOpen(false);
  };

  // Manejar la búsqueda de canciones
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const results = await searchSongs(searchQuery);
      if (results.length === 0) {
        setError('Canción no encontrada');
      } else {
        setSongs(results);
      }
    } catch (error) {
      setError('Error al buscar canciones. Por favor, verifica la consola para más detalles.');
      console.error('Error searching songs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#191414', color: '#1DB954', minHeight: '100vh', padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Canciones</h1>
        <button
          onClick={() => document.getElementById('audioUpload').click()}
          style={{ backgroundColor: '#1DB954', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px' }}
        >
          Nueva Canción
        </button>
        <input
          id="audioUpload"
          type="file"
          accept="audio/mp3"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
      </header>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => navigate('/playlists')} style={{ backgroundColor: '#1DB954', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px', marginRight: '10px' }}>
          Ir a Playlists
        </button>
        <button onClick={() => navigate(-1)} style={{ backgroundColor: '#1DB954', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px' }}>
          Página Anterior
        </button>
      </div>
      <form onSubmit={handleSearch} style={{ marginBottom: '20px', display: 'flex' }}>
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ flex: '1', padding: '10px', borderRadius: '5px', border: '1px solid #1DB954', marginRight: '10px' }}
        />
        <button type="submit" style={{ backgroundColor: '#1DB954', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px' }}>
          Buscar Canciones
        </button>
      </form>
      <ul>
        {songs.map((song) => (
          <li key={song.id} style={{ marginBottom: '10px', backgroundColor: '#333', padding: '10px', borderRadius: '5px', display: 'flex', alignItems: 'center' }}>
            <span style={{ flex: '1', marginRight: '20px' }}>{song.title}</span>
            <SongPlayer song={song} />
            <button onClick={() => handleDelete(song.id)} style={{ marginLeft: '20px', backgroundColor: '#ff4d4d', color: '#fff', padding: '5px 10px', border: 'none', borderRadius: '5px' }}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <div className="modal" style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="modal-content" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', width: '300px', textAlign: 'center' }}>
            <h2>Subir Canción</h2>
            <p>Archivo: {file?.name}</p>
            <input
              type="text"
              placeholder="Ingrese el título de la canción"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ padding: '10px', width: '100%', borderRadius: '5px', marginBottom: '10px' }}
            />
            <div className="modal-actions">
              <button onClick={handleUpload} style={{ backgroundColor: '#1DB954', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px', marginRight: '10px' }}>
                Subir
              </button>
              <button onClick={handleCancel} style={{ backgroundColor: 'grey', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px' }}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
    </div>
  );
}

export default Profile;