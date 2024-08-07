import React from 'react'; // Importa la biblioteca React
import { Link } from 'react-router-dom'; // Importa el componente Link desde react-router-dom para la navegación
import '../styles/Navbar.css'; // Importa el archivo de estilos CSS para la barra de navegación

// Define el componente funcional Navbar
const Navbar = () => {
  return (
    // Elemento nav con la clase CSS "navbar"
    <nav className="navbar">
      {/* Contenedor del logo de la barra de navegación */}
      <div className="navbar-logo">
        {/* Enlace al inicio con la clase CSS "navbar-logo-link" */}
        <Link to="/" className="navbar-logo-link">My Music App</Link>
      </div>
      {/* Lista de enlaces de la barra de navegación */}
      <ul className="navbar-links">
        {/* Elemento de lista con enlace a la página de canciones */}
        <li><Link to="/songs" className="navbar-link">Songs</Link></li>
        {/* Elemento de lista con enlace a la página de listas de reproducción */}
        <li><Link to="/playlists" className="navbar-link">Playlists</Link></li>
        {/* Elemento de lista con enlace a la página de perfil */}
        <li><Link to="/profile" className="navbar-link">Profile</Link></li>
        {/* Elemento de lista con enlace para cerrar sesión */}
        <li><Link to="/logout" className="navbar-link">Logout</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar; // Exporta el componente Navbar como el valor predeterminado del módulo