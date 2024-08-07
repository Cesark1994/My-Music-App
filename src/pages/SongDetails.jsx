import React, { useState, useEffect } from 'react'; // Importa React y los hooks useState y useEffect
import { useParams } from 'react-router-dom'; // Importa useParams desde react-router-dom para obtener parámetros de la URL
import { getSongDetails } from '../services/api'; // Importa la función getSongDetails desde el servicio de API
import '../styles/SongDetails.css'; // Importa el archivo de estilos CSS para el componente SongDetails

// Define el componente funcional SongDetails
function SongDetails() {
  // Obtiene el parámetro id de la URL
  const { id } = useParams();
  // Define el estado local para la canción
  const [song, setSong] = useState(null);

  // Efecto que se ejecuta al montar el componente y cuando cambia el id
  useEffect(() => {
    // Función asincrónica para obtener los detalles de la canción
    const fetchSong = async () => {
      try {
        const data = await getSongDetails(id); // Llama a la función getSongDetails con el id
        setSong(data); // Establece los datos de la canción en el estado
      } catch (error) {
        console.error('Error fetching song details', error); // Muestra el error en la consola si ocurre
      }
    };

    fetchSong(); // Llama a la función fetchSong
  }, [id]); // Dependencia del efecto: id

  // Muestra un mensaje de carga si la canción aún no se ha cargado
  if (!song) return <p>Loading...</p>;

  return (
    // Contenedor principal del componente SongDetails con la clase CSS "song-details"
    <div className="song-details">
      {/* Título de la canción */}
      <h1>{song.title}</h1>
      {/* Nombre del artista */}
      <p>Artist: {song.artist.name}</p>
      {/* Nombre del álbum */}
      <p>Album: {song.album.name}</p>
      {/* Duración de la canción */}
      <p>Duration: {song.duration}</p>
      {/* Descripción de la canción */}
      <p>{song.description}</p>
    </div>
  );
}

export default SongDetails; // Exporta el componente SongDetails como el valor predeterminado del módulo