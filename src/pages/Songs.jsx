import React, { useState, useEffect } from 'react'; // Importa React y hooks necesarios
import { getSongs, deleteSong, uploadSong } from '../services/api'; // Importa funciones de la API
import '../styles/Songs.css'; // Importa estilos CSS
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la navegación

function Songs() {
  // Estado para almacenar las canciones
  const [songs, setSongs] = useState([]);
  // Estado para almacenar la canción actual que se está reproduciendo
  const [currentSong, setCurrentSong] = useState(null);
  // Estado para almacenar los datos de la nueva canción a subir
  const [newSong, setNewSong] = useState({ title: '', file: null });
  // Hook para la navegación
  const navigate = useNavigate();

  // Efecto para obtener las canciones al montar el componente
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const data = await getSongs(); // Llama a la API para obtener las canciones
        // Verificar si los datos son un array o tienen una propiedad 'results'
        if (data && Array.isArray(data)) {
          setSongs(data); // Actualiza el estado con las canciones obtenidas
        } else if (data && data.results) {
          setSongs(data.results); // Actualiza el estado con las canciones obtenidas
        }
      } catch (error) {
        console.error('Error fetching songs', error); // Maneja errores
      }
    };

    fetchSongs(); // Llama a la función para obtener las canciones
  }, []); // Ejecuta el efecto solo una vez al montar el componente

  // Manejar la eliminación de una canción
  const handleDelete = async (id) => {
    try {
      await deleteSong(id); // Llama a la API para eliminar la canción
      // Filtrar la canción eliminada del estado
      setSongs(songs.filter(song => song.id !== id));
    } catch (error) {
      console.error('Error deleting song', error); // Maneja errores
    }
  };

  // Manejar la subida de una nueva canción
  const handleUpload = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    try {
      await uploadSong(newSong); // Llama a la API para subir la nueva canción
      // Reiniciar el estado de la nueva canción
      setNewSong({ title: '', file: null });
      // Obtener las canciones actualizadas
      const data = await getSongs();
      setSongs(data); // Actualiza el estado con las canciones obtenidas
    } catch (error) {
      console.error('Error uploading song', error); // Maneja errores
    }
  };

  // Manejar la reproducción de una canción
  const handlePlay = (song) => {
    setCurrentSong(song); // Actualiza el estado con la canción actual
  };

  // Manejar la navegación hacia atrás
  const handleBack = () => {
    navigate(-1); // Navega hacia la página anterior
  };

  return (
    <div className="songs">
      <h1>Songs</h1>
      <div className="songs-list">
        {songs.length > 0 ? (
          // Mapear las canciones y renderizar cada una
          songs.map((song) => (
            <div key={song.id} className="song-card">
              <h3>{song.title}</h3>
              <button onClick={() => handlePlay(song)}>Play</button>
              <button onClick={() => handleDelete(song.id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No songs available.</p>
        )}
      </div>

      {currentSong && (
        <audio controls autoPlay>
          <source src={currentSong.url} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}

      <div className="upload-form">
        <h2>Upload New Song</h2>
        <form onSubmit={handleUpload}>
          <input
            type="text"
            placeholder="Song title"
            value={newSong.title}
            onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
            required
          />
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setNewSong({ ...newSong, file: e.target.files[0] })}
            required
          />
          <button type="submit">Upload</button>
        </form>
      </div>
      <button onClick={handleBack} style={{ marginTop: '20px' }}>Página Anterior</button>
    </div>
  );
}

export default Songs; // Exporta el componente Songs