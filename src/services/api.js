import axios from 'axios'; // Importa axios para realizar solicitudes HTTP

// Obtiene la URL base de la API desde las variables de entorno
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Crea una instancia de axios con la URL base de la API
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Función para establecer el token de autenticación
export const setAuthToken = (token) => {
  if (token) {
    // Si hay un token, lo establece en los encabezados comunes de axios
    api.defaults.headers.common['Authorization'] = `Token ${token}`;
    console.log('Token set in headers:', token);
  } else {
    // Si no hay token, elimina el encabezado de autorización
    delete api.defaults.headers.common['Authorization'];
    console.log('Token removed from headers');
  }
};

// Interceptor para añadir el token en solicitudes protegidas
api.interceptors.request.use((config) => {
  const protectedEndpoints = ['playlists/', 'songs/']; // Endpoints que requieren autenticación
  console.log('Intercepting request:', config.url);

  // Si la URL de la solicitud coincide con un endpoint protegido
  if (protectedEndpoints.some((endpoint) => config.url.includes(endpoint))) {
    const token = localStorage.getItem('authToken'); // Obtiene el token del almacenamiento local
    if (token) {
      config.headers.Authorization = `Token ${token}`; // Añade el token a los encabezados de la solicitud
    } else {
      console.error('No token found in localStorage');
    }
  }

  return config; // Devuelve la configuración de la solicitud
});

// Función para autenticar y obtener el token
export const login = async (username, password) => {
  try {
    const response = await api.post('api-auth/', { username, password }); // Realiza la solicitud de autenticación
    const { token } = response.data; // Obtiene el token de la respuesta
    setAuthToken(token); // Establece el token en los encabezados
    localStorage.setItem('authToken', token); // Guarda el token en el almacenamiento local
    return { token }; // Devuelve el token
  } catch (error) {
    console.error('Error during login:', error.response ? error.response.data : error.message);
    throw error; // Lanza el error para que pueda ser manejado por el llamador
  }
};

// Función para cerrar sesión
export const logout = () => {
  setAuthToken(null); // Elimina el token de los encabezados
  localStorage.removeItem('authToken'); // Elimina el token del almacenamiento local
};

// Función para obtener todas las canciones (sin necesidad de token)
export const getSongs = async () => {
  try {
    const response = await api.get('harmonyhub/songs/'); // Realiza la solicitud para obtener las canciones
    return response.data.results; // Devuelve los resultados de la respuesta
  } catch (error) {
    console.error('Error fetching songs:', error.response ? error.response.data : error.message);
    throw error; // Lanza el error para que pueda ser manejado por el llamador
  }
};

// Función para obtener los detalles de una canción
export const getSongDetails = async (id) => {
  try {
    const response = await api.get(`harmonyhub/songs/${id}/`); // Realiza la solicitud para obtener los detalles de la canción
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    console.error(`Error fetching song details for ID ${id}:`, error.response ? error.response.data : error.message);
    throw error; // Lanza el error para que pueda ser manejado por el llamador
  }
};

// Función para obtener todas las listas de reproducción
export const getPlaylists = async () => {
  try {
    const response = await api.get('harmonyhub/playlists/'); // Realiza la solicitud para obtener las listas de reproducción
    return response.data.results; // Devuelve los resultados de la respuesta
  } catch (error) {
    console.error('Error fetching playlists:', error.response ? error.response.data : error.message);
    throw error; // Lanza el error para que pueda ser manejado por el llamador
  }
};

// Función para obtener los detalles de una lista de reproducción
export const getPlaylistDetails = async (id) => {
  try {
    const response = await api.get(`harmonyhub/playlists/${id}/`); // Realiza la solicitud para obtener los detalles de la lista de reproducción
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    console.error(`Error fetching playlist details for ID ${id}:`, error.response ? error.response.data : error.message);
    throw error; // Lanza el error para que pueda ser manejado por el llamador
  }
};

// Función para crear una nueva lista de reproducción (requiere token)
export const createPlaylist = async (playlistData) => {
  try {
    const response = await api.post('harmonyhub/playlists/', playlistData, {
      headers: {
        'Content-Type': 'application/json',
      },
    }); // Realiza la solicitud para crear una nueva lista de reproducción
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    console.error('Error creating playlist:', error.response ? error.response.data : error.message);
    throw error; // Lanza el error para que pueda ser manejado por el llamador
  }
};

// Función para actualizar una lista de reproducción existente (requiere token)
export const updatePlaylist = async (id, playlistData) => {
  try {
    const response = await api.put(`harmonyhub/playlists/${id}/`, playlistData); // Realiza la solicitud para actualizar la lista de reproducción
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    console.error(`Error updating playlist with ID ${id}:`, error.response ? error.response.data : error.message);
    throw error; // Lanza el error para que pueda ser manejado por el llamador
  }
};

// Función para eliminar una canción (requiere token)
export const deleteSong = async (id) => {
  try {
    const response = await api.delete(`harmonyhub/songs/${id}/`); // Realiza la solicitud para eliminar la canción
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    console.error(`Error deleting song with ID ${id}:`, error.response ? error.response.data : error.message);
    throw error; // Lanza el error para que pueda ser manejado por el llamador
  }
};

// Función para subir una nueva canción
export const uploadSong = async (songData) => {
  try {
    const formData = new FormData(); // Crea un nuevo FormData para enviar archivos
    formData.append('title', songData.title); // Añade el título de la canción al FormData
    formData.append('song_file', songData.file); // Añade el archivo de la canción al FormData

    const response = await api.post('harmonyhub/songs/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }); // Realiza la solicitud para subir la nueva canción
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    console.error('Error uploading song:', error.response ? error.response.data : error.message);
    throw error; // Lanza el error para que pueda ser manejado por el llamador
  }
};

// Función para obtener canciones del usuario autenticado
export const getMySongs = async (userId) => {
  try {
    const response = await api.get('harmonyhub/songs/'); // Realiza la solicitud para obtener las canciones
    return response.data.results.filter(song => song.owner === userId); // Filtra las canciones por el ID del propietario
  } catch (error) {
    console.error('Error fetching user songs:', error.response ? error.response.data : error.message);
    throw error; // Lanza el error para que pueda ser manejado por el llamador
  }
};

export default api; // Exporta la instancia de axios configurada