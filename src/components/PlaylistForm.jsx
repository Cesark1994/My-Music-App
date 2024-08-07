import React, { useState, useEffect } from 'react'; // Importa React y los hooks useState y useEffect
import { createPlaylist } from '../services/api'; // Importa la función createPlaylist desde el archivo api

// Define el componente funcional PlaylistForm que recibe las props: playlist y onSubmit
const PlaylistForm = ({ playlist, onSubmit }) => {
  // Define el estado local para el nombre y la descripción de la lista de reproducción
  const [name, setName] = useState(playlist?.name || '');
  const [description, setDescription] = useState(playlist?.description || '');

  // Efecto que se ejecuta cuando la prop playlist cambia
  useEffect(() => {
    setName(playlist?.name || '');
    setDescription(playlist?.description || '');
  }, [playlist]);

  // Maneja el evento de envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault(); // Previene el comportamiento predeterminado del formulario
    try {
      // Llama a la función createPlaylist con el nombre y la descripción
      await createPlaylist({ name, description });
      // Llama a la función onSubmit pasada como prop
      onSubmit();
    } catch (error) {
      // Maneja cualquier error que ocurra durante la creación de la lista de reproducción
      console.error('Error al guardar la lista de reproducción:', error);
    }
  };

  return (
    // Renderiza el formulario
    <form onSubmit={handleSubmit}>
      {/* Campo de entrada para el nombre de la lista de reproducción */}
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      {/* Campo de entrada para la descripción de la lista de reproducción */}
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      {/* Botón para enviar el formulario */}
      <button type="submit">Save Playlist</button>
    </form>
  );
};

export default PlaylistForm; // Exporta el componente PlaylistForm como el valor predeterminado del módulo