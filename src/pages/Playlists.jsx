import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPlaylists, createPlaylist, deletePlaylist, searchPlaylists } from '../services/api';
import { useAuth } from '../context/AuthProvider'; // Asegúrate de importar el contexto de autenticación

function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState('');
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [filteredPlaylists, setFilteredPlaylists] = useState([]);
  const [user, setUser] = useState(null); // Estado para almacenar los datos del usuario
  const { auth } = useAuth(); // Obtén la autenticación del contexto
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        setLoading(true);
        const data = await getPlaylists();
        setPlaylists(data);
        setFilteredPlaylists(data);
      } catch (error) {
        setError('Error al obtener las listas de reproducción.');
        console.error('Error fetching playlists:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylists();
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem('userProfile');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    }
  }, []);

  const handleCreatePlaylist = async () => {
    if (newPlaylistName.trim() === '') {
      setError('El nombre de la lista de reproducción no puede estar vacío.');
      return;
    }

    try {
      setLoading(true);
      const newPlaylist = await createPlaylist({ name: newPlaylistName });
      setPlaylists((prev) => [...prev, newPlaylist]);
      setFilteredPlaylists((prev) => [...prev, newPlaylist]);
      setSuccessMessage('¡Lista de reproducción creada con éxito!');
      setNewPlaylistName('');
    } catch (error) {
      setError('Error al crear la lista de reproducción.');
      console.error('Error creating playlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setNewPlaylistName('');
    setError('');
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const results = await searchPlaylists(searchQuery);
      if (results.length > 0) {
        setFilteredPlaylists(results);
      } else {
        setFilteredPlaylists([]);
        setError('Lista no encontrada');
      }
    } catch (error) {
      setError('Error al buscar listas de reproducción.');
      console.error('Error searching playlists:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deletePlaylist(id);
      setPlaylists(playlists.filter((playlist) => playlist.id !== id));
      setFilteredPlaylists(filteredPlaylists.filter((playlist) => playlist.id !== id));
    } catch (error) {
      setError('Error al eliminar la lista de reproducción.');
      console.error('Error deleting playlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlaylistClick = (id) => {
    navigate(`/playlists/${id}`);
  };

  const handleResetSearch = () => {
    setSearchQuery('');
    setFilteredPlaylists(playlists);
    setError('');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <p style={{ color: '#fff' }}>Cargando...</p>;
  }

  return (
    <div style={{ backgroundColor: '#191414', color: '#1DB954', minHeight: '100vh', padding: '20px' }}>
      <header style={{ marginBottom: '20px', position: 'relative' }}>
        <h1 style={{ margin: 0 }}>Listas de Reproducción</h1>
        {user && (
          <div style={{
            color: '#fff',
            textAlign: 'right',
            backgroundColor: '#282828',
            padding: '15px',
            borderRadius: '10px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            position: 'absolute',
            top: '-120px',
            right: '20px',
            zIndex: '1000',
            width: '250px'
          }}>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>Perfil de Usuario</h2>
            <p style={{ margin: '5px 0' }}><strong>Nombre:</strong> {user.first_name} {user.last_name}</p>
            <p style={{ margin: '5px 0' }}><strong>Email:</strong> {user.email}</p>
            <p style={{ margin: '5px 0' }}><strong>Username:</strong> {user.username}</p>
          </div>
        )}
      </header>
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
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
            marginBottom: '20px', // Margin to push the button further down
          }}
        >
          Página Anterior
        </button>
      </div>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <input 
          type="text" 
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
          placeholder="Nombre de nueva lista reproducción"
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
          onClick={handleCreatePlaylist} 
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
          Crear
        </button>
      </div>
      <form onSubmit={handleSearch} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar listas de reproducción" 
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {searchQuery && filteredPlaylists.length === 0 && (
        <button 
          onClick={handleResetSearch} 
          style={{
            backgroundColor: '#ff4d4d',
            color: '#fff',
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '20px',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
        >
          Mostrar Todas las Listas
        </button>
      )}
      <ul style={{ padding: '0', listStyleType: 'none' }}>
        {filteredPlaylists.map((playlist) => (
          <li 
            key={playlist.id} 
            style={{ 
              marginBottom: '10px', 
              backgroundColor: '#333', 
              padding: '10px', 
              borderRadius: '5px',
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#444'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#333'}
          >
            <span 
              onClick={() => handlePlaylistClick(playlist.id)} 
              style={{ 
                color: '#1DB954', 
                fontWeight: 'bold', 
                fontSize: '16px',
              }}
            >
              {playlist.name}
            </span>
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                handleDelete(playlist.id);
              }} 
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
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Playlists;
