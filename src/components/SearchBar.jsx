import React, { useState } from 'react'; // Importa React y el hook useState
import '../styles/SearchBar.css'; // Importa el archivo de estilos CSS para la barra de búsqueda

// Define el componente funcional SearchBar que recibe una prop: onSearch
function SearchBar({ onSearch }) {
  // Define el estado local para la consulta de búsqueda
  const [query, setQuery] = useState('');

  // Maneja el evento de búsqueda
  const handleSearch = () => {
    // Llama a la función onSearch pasada como prop con la consulta actual
    onSearch(query);
  };

  return (
    // Contenedor principal de la barra de búsqueda con la clase CSS "search-bar"
    <div className="search-bar">
      {/* Campo de entrada para la consulta de búsqueda */}
      <input
        type="text"
        placeholder="Buscar canciones, artistas, álbumes..." // Texto de marcador de posición
        value={query} // Valor del campo de entrada vinculado al estado query
        onChange={(e) => setQuery(e.target.value)} // Actualiza el estado query cuando cambia el valor del campo de entrada
      />
      {/* Botón para iniciar la búsqueda */}
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
}

export default SearchBar; // Exporta el componente SearchBar como el valor predeterminado del módulo