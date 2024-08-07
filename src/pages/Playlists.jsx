import React, { useEffect, useState } from 'react'; // Importa React y los hooks useEffect y useState
import { getPlaylists, createPlaylist } from '../services/api'; // Importa las funciones getPlaylists y createPlaylist desde el servicio de API

// Define el componente funcional Playlists
function Playlists() {
  // Define el estado local para las playlists, errores, nombre de nueva playlist y mensaje de éxito
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState('');
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Efecto que se ejecuta al montar el componente
  useEffect(() => {
    // Función asincrónica para obtener las playlists
    const fetchPlaylists = async () => {
      try {
        const data = await getPlaylists(); // Llama a la función getPlaylists
        setPlaylists(data); // Establece las playlists en el estado
      } catch (error) {
        setError('Error fetching playlists.'); // Establece el mensaje de error en caso de fallo
      }
    };
    fetchPlaylists(); // Llama a la función fetchPlaylists
  }, []); // Dependencia del efecto: []

  // Maneja la creación de una nueva playlist
  const handleCreatePlaylist = async () => {
    if (newPlaylistName.trim() === '') { // Verifica si el nombre de la nueva playlist está vacío
      setError('Playlist name cannot be empty.'); // Establece el mensaje de error
      return;
    }

    try {
      await createPlaylist({ name: newPlaylistName }); // Llama a la función createPlaylist con el nombre de la nueva playlist
      setPlaylists(prev => [...prev, { name: newPlaylistName }]); // Agrega la nueva playlist al estado
      setSuccessMessage('Playlist created successfully!'); // Establece el mensaje de éxito
      setNewPlaylistName(''); // Limpia el campo de nombre de nueva playlist
    } catch (error) {
      setError('Error creating playlist.'); // Establece el mensaje de error en caso de fallo
    }
  };

  // Muestra el mensaje de error si existe
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    // Contenedor principal del componente Playlists con estilos en línea
    <div style={{ backgroundColor: '#191414', color: '#1DB954', minHeight: '100vh', padding: '20px' }}>
      <h1>Listas de Reproducción</h1> {/* Título principal */}
      {/* Muestra el mensaje de éxito si existe */}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <div>
        {/* Campo de entrada para el nombre de la nueva playlist */}
        <input 
          type="text" 
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
          placeholder="Nombre de la nueva lista de reproducción" 
        />
        {/* Botón para crear la nueva playlist */}
        <button onClick={handleCreatePlaylist}>Crear</button>
      </div>
      <ul>
        {/* Mapea las playlists y renderiza cada una en un elemento de lista */}
        {playlists.map((playlist, index) => (
          <li key={index} style={{ marginBottom: '10px' }}>
            <span>{playlist.name}</span> {/* Muestra el nombre de la playlist */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Playlists; // Exporta el componente Playlists como el valor predeterminado del módulo