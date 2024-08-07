import React from 'react'; // Importa la biblioteca React
import '../styles/Footer.css'; // Importa el archivo de estilos CSS para el pie de página

// Define el componente funcional Footer
function Footer() {
  return (
    // Elemento footer con la clase CSS "footer"
    <footer className="footer">
      {/* Texto del pie de página con el símbolo de copyright y el año */}
      <p>&copy; 2024 My Music App. Todos los derechos reservados.</p>
    </footer>
  );
}

export default Footer; // Exporta el componente Footer como el valor predeterminado del módulo