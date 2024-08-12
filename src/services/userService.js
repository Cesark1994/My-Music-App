// src/services/userService.js
const userService = {
    getProfile: async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.token) {
        throw new Error('No se encontró token de autenticación');
      }
  
      try {
        const url = `${import.meta.env.VITE_API_BASE_URL}/users/profiles/profile_data/`;
        console.log('URL:', url);
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Token ${user.token}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('No autorizado. Por favor, inicie sesión nuevamente.');
          }
          throw new Error('Error al obtener el perfil');
        }
  
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error al obtener el perfil:', error);
        throw error;
      }
    },
  };
  
  export default userService;