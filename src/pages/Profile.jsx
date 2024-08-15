import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSongs, deleteSong, uploadSong, searchSongs } from '../services/api';
import SongPlayer from '../components/SongPlayer';
import { useAuth } from '../context/AuthProvider'; 
import '../styles/Profile.css';

function Profile() {
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState('');
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setLoading(true);
        const data = await getSongs();
        setSongs(data);
      } catch (error) {
        setError('Error al obtener las canciones.');
        console.error('Error fetching songs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSongs();
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem('userProfile');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    }
  }, []);

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteSong(id);
      setSongs(songs.filter((song) => song.id !== id));
    } catch (error) {
      setError('Error al eliminar la canción.');
      console.error('Error deleting song:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setIsModalOpen(true);
    }
  };

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
      setLoading(true);
      await uploadSong({ title, file });
      const data = await getSongs();
      setSongs(data);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error al subir la canción:', error);
      setError('Error al subir la canción.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFile(null);
    setTitle('');
    setIsModalOpen(false);
  };

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
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', position: 'relative' }}>
        <h1>Canciones</h1>
        {user && (
          <div style={{ 
            color: '#fff', 
            textAlign: 'right', 
            backgroundColor: '#282828', 
            padding: '15px', 
            borderRadius: '10px', 
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', 
            position: 'absolute', 
            top: '-100px', 
            right: '0', 
            zIndex: '1000',
            width: '250px' 
          }}>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>Perfil de Usuario</h2>
            <p style={{ margin: '5px 0' }}><strong>Nombre:</strong> {user.first_name} {user.last_name}</p>
            <p style={{ margin: '5px 0' }}><strong>Email:</strong> {user.email}</p>
            <p style={{ margin: '5px 0' }}><strong>Username:</strong> {user.username}</p>
          </div>
        )}
        <button
          onClick={() => document.getElementById('audioUpload').click()}
          style={{ backgroundColor: '#1DB954', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px', marginLeft: '15px', marginTop: '80px' }}
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
      {loading && <p style={{ color: '#fff' }}>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
    </div>
  );
}

export default Profile;
