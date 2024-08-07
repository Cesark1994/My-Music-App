import React, { useState } from 'react'; // Importa React y el hook useState
import '../styles/ThemeToggle.css'; // Importa el archivo de estilos CSS para el toggle de tema

// Define el componente funcional ThemeToggle
function ThemeToggle() {
  // Define el estado local para el modo oscuro
  const [darkMode, setDarkMode] = useState(true);

  // Función para alternar el tema
  const toggleTheme = () => {
    // Cambia el estado del modo oscuro
    setDarkMode(!darkMode);
    // Alterna la clase 'light-mode' en el cuerpo del documento
    document.body.classList.toggle('light-mode');
  };

  return (
    // Contenedor principal del toggle de tema con la clase CSS "theme-toggle"
    <div className="theme-toggle">
      {/* Botón para alternar el tema */}
      <button onClick={toggleTheme}>
        {/* Muestra el texto del botón según el estado del modo oscuro */}
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  );
}

export default ThemeToggle; // Exporta el componente ThemeToggle como el valor predeterminado del módulo