import React from 'react'; // Importa la biblioteca React
import PropTypes from 'prop-types'; // Importa PropTypes para la validación de tipos de las props
import '../styles/SongCard.css'; // Importa el archivo de estilos CSS para la tarjeta de canción

// Define el componente funcional SongCard que recibe una prop: song
function SongCard({ song }) {
  return (
    // Contenedor principal de la tarjeta de canción con la clase CSS "song-card"
    <div className="song-card">
      {/* Si la canción tiene una imagen, muestra el contenedor de la imagen */}
      {song.image && (
        <div className="song-card-image">
          {/* Muestra la imagen de la canción con la fuente y el texto alternativo */}
          <img src={song.image} alt={`${song.title} cover`} />
        </div>
      )}
      {/* Contenedor del contenido de la tarjeta de canción */}
      <div className="song-card-content">
        {/* Muestra el título de la canción */}
        <h2 className="song-card-title">{song.title}</h2>
        {/* Muestra el nombre del artista o "Unknown Artist" si no está disponible */}
        <p className="song-card-artist">{song.artist ? song.artist.name : 'Unknown Artist'}</p>
        {/* Muestra el año de la canción o "Unknown Year" si no está disponible */}
        <p className="song-card-year">{song.year ? song.year : 'Unknown Year'}</p>
        {/* Si la canción tiene un álbum, muestra el nombre del álbum */}
        {song.album && <p className="song-card-album">Album: {song.album}</p>}
        {/* Contenedor del reproductor de audio */}
        <audio controls className="song-card-audio">
          {/* Fuente del archivo de audio */}
          <source src={song.audio_url} type="audio/mpeg" />
          {/* Mensaje si el navegador no soporta el elemento de audio */}
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
}

// Define los tipos de las props del componente SongCard
SongCard.propTypes = {
  song: PropTypes.shape({
    title: PropTypes.string.isRequired, // El título de la canción es obligatorio
    artist: PropTypes.shape({
      name: PropTypes.string, // El nombre del artista es opcional
    }),
    year: PropTypes.number, // El año de la canción es opcional
    image: PropTypes.string, // La imagen de la canción es opcional
    album: PropTypes.string, // El nombre del álbum es opcional
    audio_url: PropTypes.string.isRequired, // La URL del archivo de audio es obligatoria
  }).isRequired,
};

export default SongCard; // Exporta el componente SongCard como el valor predeterminado del módulo