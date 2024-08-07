import React from 'react'; // Importa la biblioteca React
import { Link } from 'react-router-dom'; // Importa el componente Link desde react-router-dom para la navegación
import '../styles/PlaylistCard.css'; // Importa el archivo de estilos CSS para la tarjeta de lista de reproducción

// Define el componente funcional PlaylistCard que recibe una prop: playlist
function PlaylistCard({ playlist }) {
  return (
    // Enlace a la página de la lista de reproducción específica con la clase CSS "playlist-card"
    <Link to={`/playlists/${playlist.id}`} className="playlist-card">
      {/* Imagen de la lista de reproducción con la fuente y el texto alternativo */}
      <img src={playlist.image} alt={playlist.name} />
      {/* Nombre de la lista de reproducción */}
      <h3>{playlist.name}</h3>
    </Link>
  );
}

export default PlaylistCard; // Exporta el componente PlaylistCard como el valor predeterminado del módulo