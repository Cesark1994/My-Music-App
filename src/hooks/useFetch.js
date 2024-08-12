import { useState, useEffect } from 'react';
import axios from 'axios';

// Custom hook para realizar peticiones HTTP
const useFetch = (url, options) => {
  // Estado para almacenar los datos de la respuesta
  const [data, setData] = useState(null);
  // Estado para indicar si la petición está en curso
  const [isLoading, setIsLoading] = useState(false);
  // Estado para indicar si hubo un error en la petición
  const [isError, setIsError] = useState(false);
  // Estado para almacenar el error
  const [error, setError] = useState(null);

  // Función para realizar la petición HTTP
  const doFetch = async () => {
    setIsLoading(true); // Indicar que la petición está en curso
    setIsError(false);  // Resetear el estado de error
    setError(null);     // Limpiar cualquier error previo
    try {
      // Realizar la petición HTTP usando axios
      const response = await axios(url, options);
      // Almacenar los datos de la respuesta en el estado
      setData(response.data);
    } catch (error) {
      // Si ocurre un error, actualizar el estado de error
      setIsError(true);
      setError(error);
    }
    // Indicar que la petición ha terminado
    setIsLoading(false);
  };

  // Retornar los estados y la función para realizar la petición
  return { data, isLoading, isError, error, doFetch };
};

export default useFetch;