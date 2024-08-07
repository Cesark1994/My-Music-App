import React, { useState, useEffect } from 'react'; // Importa React y los hooks useState y useEffect
import { useParams } from 'react-router-dom'; // Importa useParams desde react-router-dom para obtener parámetros de la URL
import { getPlaylistDetails } from '../services/api'; // Importa la función getPlaylistDetails desde el servicio de API
import SongCard from '../components/SongCard'; // Importa el componente SongCard
import '../styles/PlaylistDetails.css'; // Importa el archivo de estilos CSS para el componente PlaylistDetails

// Define el componente funcional PlaylistDetails
function PlaylistDetails() {
  // Obtiene el parámetro id de la URL
  const { id } = useParams();
  // Define el estado local para la playlist
  const [playlist, setPlaylist] = useState(null);

  // Efecto que se ejecuta al montar el componente y cuando cambia el id
  useEffect(() => {
    // Función asincrónica para obtener los detalles de la playlist
    const fetchPlaylist = async () => {
      try {
        const data = await getPlaylistDetails(id); // Llama a la función getPlaylistDetails con el id
        setPlaylist(data); // Establece los datos de la playlist en el estado
      } catch (error) {
        console.error('Error fetching playlist details:', error); // Muestra el error en la consola si ocurre
      }
    };

    fetchPlaylist(); // Llama a la función fetchPlaylist
  }, [id]); // Dependencia del efecto: id

  // Muestra un mensaje de carga si la playlist aún no se ha cargado
  if (!playlist) return <p>Loading...</p>;

  return (
    // Contenedor principal del componente PlaylistDetails con la clase CSS "playlist-details"
    <div className="playlist-details">
      {/* Título de la playlist */}
      <h1>{playlist.name}</h1>
      {/* Contenedor de las canciones de la playlist */}
      <div className="playlist-songs">
        {/* Mapea las canciones de la playlist y renderiza un SongCard para cada una */}
        {playlist.songs.map((song) => (
          <SongCard key={song.id} song={song} /> // Componente SongCard para cada canción
        ))}
      </div>
    </div>
  );
}

export default PlaylistDetails; // Exporta el componente PlaylistDetails como el valor predeterminado del módulo