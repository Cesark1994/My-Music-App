import React from 'react'; // Importa React

// Define el componente funcional NotFound
function NotFound() {
  return (
    // Contenedor principal del componente NotFound
    <div>
      {/* Título principal que indica el error 404 */}
      <h1>404 - Not Found</h1>
      {/* Mensaje que indica que la página no existe */}
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

export default NotFound; // Exporta el componente NotFound como el valor predeterminado del módulo