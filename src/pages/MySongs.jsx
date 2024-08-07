// MySongs.jsx
import React, { useState, useEffect } from 'react'; // Importa React y los hooks useState y useEffect
import { getMySongs, deleteSong } from '../services/api'; // Importa las funciones getMySongs y deleteSong desde el servicio de API
import SongPlayer from '../components/SongPlayer'; // Importa el componente SongPlayer
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate desde react-router-dom

// Define el componente funcional MySongs
const MySongs = () => {
  // Define el estado local para las canciones y los errores
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState('');
  const userId = localStorage.getItem('userId'); // Obtiene el userId del almacenamiento local
  const navigate = useNavigate(); // Hook para la navegación

  // Efecto que se ejecuta al montar el componente
  useEffect(() => {
    const fetchMySongs = async () => {
      try {
        const data = await getMySongs(userId); // Llama a la función getMySongs con el userId
        setSongs(data); // Establece las canciones en el estado
      } catch (error) {
        setError('Error fetching your songs.'); // Establece el mensaje de error en caso de fallo
      }
    };
    fetchMySongs(); // Llama a la función fetchMySongs
  }, [userId]); // Dependencia del efecto: userId

  // Maneja la eliminación de una canción
  const handleDelete = async (id) => {
    try {
      await deleteSong(id); // Llama a la función deleteSong con el id de la canción
      setSongs(songs.filter(song => song.id !== id)); // Filtra las canciones eliminando la que tiene el id proporcionado
    } catch (error) {
      setError('Error deleting song.'); // Establece el mensaje de error en caso de fallo
    }
  };

  return (
    // Contenedor principal del componente MySongs con estilos en línea
    <div style={{ backgroundColor: '#191414', color: '#1DB954', minHeight: '100vh', padding: '20px' }}>
      <div className="header">
        <h1>My Songs</h1> {/* Título principal */}
      </div>
      <div style={{ marginBottom: '20px' }}>
        {/* Botón para volver al perfil */}
        <button onClick={() => navigate('/profile')} style={{ backgroundColor: '#1DB954', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px' }}>
          Back to Profile
        </button>
      </div>
      {/* Muestra el mensaje de error si existe */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {/* Mapea las canciones y renderiza cada una con SongPlayer y un botón de eliminar */}
        {songs.map((song) => (
          <li key={song.id} style={{ marginBottom: '10px' }}>
            <span>{song.title}</span> {/* Muestra el título de la canción */}
            <SongPlayer song={song} /> {/* Renderiza el componente SongPlayer */}
            <button onClick={() => handleDelete(song.id)} style={{ marginLeft: '10px' }}>Delete</button> {/* Botón para eliminar la canción */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MySongs; // Exporta el componente MySongs como el valor predeterminado del módulo