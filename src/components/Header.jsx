import React from 'react'; // Importa la biblioteca React
import { useAuth } from '../context/AuthProvider'; // Importa el hook useAuth desde el proveedor de contexto de autenticación

// Define el componente funcional Header
const Header = () => {
  // Obtiene el estado de autenticación y la función logout del contexto de autenticación
  const { auth, logout } = useAuth();

  return (
    // Elemento header
    <header>
      {/* Título de la aplicación */}
      <h1>My Music App</h1>
      {/* Si el usuario está autenticado, muestra el botón de logout; de lo contrario, muestra el enlace de login */}
      {auth.token ? (
        // Mostrar botón de logout si está autenticado
        <button onClick={logout} aria-label="Log out"
        style={{
          borderRadius: '50px', // Hace que el botón sea ovalado
          padding: '10px 20px',  // Espaciado interno
          border: 'none',        // Sin borde
          backgroundColor: 'white', // Color de fondo
          color: '#191414',         // Color del texto
          cursor: 'pointer',     // Cambia el cursor al pasar sobre el botón
          fontSize: '16px' ,     // Tamaño del texto
          fontWeight: 'bold'
        }}
        >Log out</button>
      ) : (
        // Mostrar enlace de login si no está autenticado
        <a href="/login" aria-label="Sign in"
        style={{
          display: 'inline-block',
          borderRadius: '50px',
          padding: '10px 20px',
          textDecoration: 'none',
          backgroundColor: 'white',
          color: '#191414',
          cursor: 'pointer',
          fontSize: '16px',
          textAlign: 'center',
          lineHeight: '1.5',
          transition: 'background-color 0.3s',
          fontWeight: 'bold'
        }}
        >Sign in</a>
      )}
    </header>
  );
};

export default Header; // Exporta el componente Header como el valor predeterminado del módulo