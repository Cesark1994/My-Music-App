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
        <button onClick={logout}>Logout</button>
      ) : (
        // Mostrar enlace de login si no está autenticado
        <a href="/login">Login</a>
      )}
    </header>
  );
};

export default Header; // Exporta el componente Header como el valor predeterminado del módulo