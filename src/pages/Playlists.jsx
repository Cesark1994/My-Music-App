import React, { useEffect, useState } from 'react'; // Importa React y hooks necesarios
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la navegación
import { getPlaylists, createPlaylist, deletePlaylist, searchPlaylists } from '../services/api'; // Importa funciones de la API

function Playlists() {
  const [playlists, setPlaylists] = useState([]); // Estado para almacenar las listas de reproducción
  const [error, setError] = useState(''); // Estado para manejar errores
  const [newPlaylistName, setNewPlaylistName] = useState(''); // Estado para el nombre de la nueva lista de reproducción
  const [successMessage, setSuccessMessage] = useState(''); // Estado para mensajes de éxito
  const [searchQuery, setSearchQuery] = useState(''); // Estado para la consulta de búsqueda
  const [loading, setLoading] = useState(false); // Estado para manejar el estado de carga
  const [filteredPlaylists, setFilteredPlaylists] = useState([]); // Estado para almacenar las listas de reproducción filtradas
  const navigate = useNavigate(); // Hook para la navegación
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const data = await getPlaylists();
        setPlaylists(data);
        setFilteredPlaylists(data); // Muestra todas las listas de reproducción inicialmente
      } catch (error) {
        setError('Error al obtener las listas de reproducción.');
      }
    };
    fetchPlaylists();
  }, []);

  const handleCreatePlaylist = async () => {
    if (newPlaylistName.trim() === '') {
      setError('El nombre de la lista de reproducción no puede estar vacío.');
      return;
    }

    try {
      const newPlaylist = await createPlaylist({ name: newPlaylistName });
      setPlaylists(prev => [...prev, newPlaylist]);
      setFilteredPlaylists(prev => [...prev, newPlaylist]); // Añade la nueva lista al estado filtrado
      setSuccessMessage('¡Lista de reproducción creada con éxito!');
      setNewPlaylistName('');
    } catch (error) {
      setError('Error al crear la lista de reproducción.');
    }
  };

  const handleCancel = () => {
    setNewPlaylistName('');  // Limpia el nombre de la nueva lista de reproducción
    setError('');  // Limpia cualquier mensaje de error
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const results = await searchPlaylists(searchQuery);
      if (results.length > 0) {
        setFilteredPlaylists(results); // Muestra solo los resultados filtrados
      } else {
        setFilteredPlaylists([]); // Limpia las listas filtradas si no hay resultados
        setError('Lista no encontrada');
      }
    } catch (error) {
      setError('Error al buscar listas de reproducción. Por favor, verifica la consola para más detalles.');
      console.error('Error searching playlists:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePlaylist(id);
      setPlaylists(playlists.filter((playlist) => playlist.id !== id));
      setFilteredPlaylists(filteredPlaylists.filter((playlist) => playlist.id !== id)); // Elimina la lista también del estado filtrado
    } catch (error) {
      setError('Error al eliminar la lista de reproducción.');
      console.error('Error deleting playlist:', error);
    }
  };

  const handlePlaylistClick = (id) => {
    navigate(`/playlists/${id}`);
  };

  const handleResetSearch = () => {
    setSearchQuery('');
    setFilteredPlaylists(playlists); // Restaura todas las listas
    setError('');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ backgroundColor: '#191414', color: '#1DB954', minHeight: '100vh', padding: '20px' }}>
      <h1>Listas de Reproducción</h1>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <div>
        <input 
          type="text" 
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
          placeholder="Nombre de la nueva lista de reproducción" 
        />
        <button onClick={handleCreatePlaylist}>Crear</button>
        <button onClick={handleCancel}>Cancelar</button>
      </div>
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar listas de reproducción" 
        />
        <button type="submit">Buscar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {searchQuery && filteredPlaylists.length === 0 && (
        <button onClick={handleResetSearch}>Mostrar Todas las Listas</button>
      )}
      <ul>
        {filteredPlaylists.map((playlist) => (
          <li key={playlist.id} style={{ marginBottom: '10px', backgroundColor: '#333', padding: '10px', borderRadius: '5px' }}>
            <span onClick={() => handlePlaylistClick(playlist.id)} style={{ cursor: 'pointer' }}>{playlist.name}</span>
            <button onClick={() => handleDelete(playlist.id)} style={{ marginLeft: '10px', backgroundColor: '#1DB954', border: 'none', padding: '5px 10px', color: '#fff', borderRadius: '5px' }}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Playlists;
