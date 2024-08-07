import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSongs, deleteSong, uploadSong } from '../services/api';
import SongPlayer from '../components/SongPlayer';
import { useAuth } from '../context/AuthProvider'; 
import '../styles/Profile.css';

function Profile() {
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState('');
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const data = await getSongs();
        setSongs(data);
      } catch (error) {
        setError('Error fetching songs.');
        console.error('Error fetching songs:', error);
      }
    };
    fetchSongs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteSong(id);
      setSongs(songs.filter((song) => song.id !== id));
    } catch (error) {
      setError('Error deleting song.');
      console.error('Error deleting song:', error);
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
      setError('No file selected');
      return;
    }

    if (!title) {
      setError('No title provided');
      return;
    }

    try {
      await uploadSong({ title, file });
      const data = await getSongs();
      setSongs(data);
      setError('Song uploaded successfully!');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error uploading song:', error);
      setError('Error uploading song.');
    }
  };

  const handleCancel = () => {
    setFile(null);
    setTitle('');
    setIsModalOpen(false);
  };

  return (
    <div style={{ backgroundColor: '#191414', color: '#1DB954', minHeight: '100vh', padding: '20px' }}>
      <div className="header" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Canciones</h1>
        <div className="upload-container" style={{ alignSelf: 'flex-start' }}>
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
        </div>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => navigate('/playlists')} style={{ backgroundColor: '#1DB954', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px' }}>
          Ir a Playlists
        </button>
        <button onClick={() => navigate('/mysongs')} style={{ backgroundColor: '#1DB954', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px', marginLeft: '10px' }}>
          Mis Canciones
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {songs.map((song) => (
          <li key={song.id} style={{ marginBottom: '10px' }}>
            <span>{song.title}</span>
            <SongPlayer song={song} />
            <button onClick={() => handleDelete(song.id)} style={{ marginLeft: '10px' }}>Eliminar</button>
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content" style={{ position: 'absolute', top: '10px', right: '10px' }}>
            <h2>Subir Canción</h2>
            <p>File: {file?.name}</p>
            <input
              type="text"
              placeholder="Enter song title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={handleUpload} style={{ backgroundColor: '#1DB954', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px', marginRight: '10px' }}>
                Agregar
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
