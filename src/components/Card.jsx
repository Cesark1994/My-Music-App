import React from 'react'; // Importa la biblioteca React
import '../styles/Card.css'; // Importa el archivo de estilos CSS para la tarjeta

// Define el componente funcional Card que recibe props: image, title y description
function Card({ image, title, description }) {
  return (
    // Contenedor principal de la tarjeta con la clase CSS "card"
    <div className="card">
      {/* Imagen de la tarjeta con la fuente y el texto alternativo */}
      <img src={image} alt={title} />
      {/* Título de la tarjeta */}
      <h2>{title}</h2>
      {/* Descripción de la tarjeta */}
      <p>{description}</p>
    </div>
  );
}

export default Card; // Exporta el componente Card como el valor predeterminado del módulo