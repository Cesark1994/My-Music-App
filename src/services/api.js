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
  const protectedEndpoints = ['playlists/', 'songs/', 'playlist-entries/']; // Endpoints que requieren autenticación
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

// Función para obtener los datos del perfil del usuario autenticado
export const getProfileData = async (token) => {
  try {
    const response = await api.get('users/profiles/profile_data/', {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching profile data:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// api.js
export const login = async (username, password) => {
  try {
    if (!username || typeof username !== 'string') {
      throw new Error('Username is required and must be a valid string.');
    }
    if (!password || typeof password !== 'string') {
      throw new Error('Password is required and must be a valid string.');
    }

    const response = await axios.post('https://sandbox.academiadevelopers.com/api-auth/', {
      username,
      password,
    });

    const { token } = response.data;
    localStorage.setItem('authToken', token);

    const profileData = await getProfileData(token);
    localStorage.setItem('user__id', profileData.user__id);
    localStorage.setItem('userProfile', JSON.stringify(profileData));

    return { token, user__id: profileData.user__id, profileData };
  } catch (error) {
    if (error.response) {
      console.error('Error during login:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};

// Función para cerrar sesión
export const logout = () => {
  setAuthToken(null); // Elimina el token de los encabezados
  localStorage.removeItem('authToken'); // Elimina el token del almacenamiento local
  localStorage.removeItem('user__Id'); // Elimina el user__id del almacenamiento local
  localStorage.removeItem('userProfile'); // Elimina los datos del perfil del almacenamiento local
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

// Función para eliminar una lista de reproducción (requiere token)
export const deletePlaylist = async (id) => {
  try {
    const response = await api.delete(`harmonyhub/playlists/${id}/`); // Realiza la solicitud para eliminar la lista de reproducción
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    console.error(`Error deleting playlist with ID ${id}:`, error.response ? error.response.data : error.message);
    throw error; // Lanza el error para que pueda ser manejado por el llamador
  }
};

// Función para buscar listas de reproducción por título
export const searchPlaylists = async (title) => {
  try {
    const response = await api.get('harmonyhub/playlists/', {
      params: { title }
    }); // Realiza la solicitud para buscar listas de reproducción
    return response.data.results; // Devuelve solo los resultados
  } catch (error) {
    console.error('Error searching playlists:', error.response ? error.response.data : error.message);
    throw error; // Lanza el error para que pueda ser manejado por el llamador
  }
};

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

export const getPlaylistDetails = async (id, authtoken) => {
  try {
    const response = await fetch(`https://sandbox.academiadevelopers.com/harmonyhub/playlists/${id}`, {
      headers: {
        'Authorization': `Bearer ${authtoken}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch playlist details: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in getPlaylistDetails:', error);
    throw error;
  }
};

// Función para buscar canciones por título
export const searchSongs = async (title) => {
  try {
    const response = await api.get('/harmonyhub/songs/', {
      params: { title }
    });
    return response.data.results; // Asegúrate de devolver solo los resultados
  } catch (error) {
    console.error('Error searching songs:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Función para agregar una canción a una lista de reproducción
export const addSongToPlaylist = async (playlistId, songId, authtoken) => {
  try {
    const response = await api.post(`/harmonyhub/playlist-entries/`, {
      playlist: playlistId,
      song: songId
    }, {
      headers: {
        'Authorization': `Bearer ${authtoken}`
      }
    });
    console.log(`Song ${songId} added to playlist ${playlistId}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error adding song to playlist ${playlistId}:`, error.response ? error.response.data : error.message);
    throw error;
  }
};

// Función para eliminar una canción de una lista de reproducción
export const removeSongFromPlaylist = async (playlistId, songId) => {
  try {
    const response = await api.post(`/harmonyhub/playlist-entries/${playlistId}/remove_song/`, { song_id: songId });
    console.log(`Song ${songId} removed from playlist ${playlistId}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error removing song from playlist ${playlistId}:`, error.response ? error.response.data : error.message);
    throw error;
  }
};

export default api; // Exporta la instancia de axios configurada