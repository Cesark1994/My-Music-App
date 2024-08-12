import React from 'react'; // Importa React
import Card from '../components/Card'; // Importa el componente Card
import '../styles/Home.css'; // Importa el archivo de estilos CSS para el componente Home

// Define el componente funcional Home
function Home() {
  return (
    // Contenedor principal del componente Home con la clase CSS "home"
    <div className="home">
      {/* Título principal de la página */}
      <h1>Bienvenido a My Music App</h1>
      {/* Sección de playlists destacadas */}
      <div className="featured-playlists">
        <h2>Listas  Destacadas</h2>
        {/* Listado de playlists destacadas */}
        <Card title="Top Hits" description="Los mejores éxitos del momento" /> {/* Componente Card para la playlist "Top Hits" */}
        <Card title="Chill Vibes" description="Relájate con estas canciones" /> {/* Componente Card para la playlist "Chill Vibes" */}
      </div>
      {/* Sección de canciones recomendadas */}
      <div className="recommended">
        <h2>Recomendados para ti</h2>
        {/* Listado de canciones recomendadas */}
      </div>
    </div>
  );
}

export default Home; // Exporta el componente Home como el valor predeterminado del módulo