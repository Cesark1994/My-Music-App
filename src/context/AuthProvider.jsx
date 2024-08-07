// src/context/AuthProvider.jsx
import React, { createContext, useState, useContext, useEffect } from 'react'; // Importa React y los hooks necesarios
import { useNavigate } from 'react-router-dom'; // Importa useNavigate desde react-router-dom para la navegación
import api, { setAuthToken, login as apiLogin } from '../services/api'; // Importa las funciones de la API

// Crea el contexto de autenticación
const AuthContext = createContext();

// Define el proveedor de autenticación
export const AuthProvider = ({ children }) => {
  // Define el estado local para la autenticación
  const [auth, setAuth] = useState({ token: null });
  const navigate = useNavigate(); // Hook para la navegación

  // Efecto que se ejecuta al montar el componente
  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Obtiene el token del almacenamiento local
    if (token) {
      setAuth({ token }); // Establece el estado de autenticación con el token
      setAuthToken(token); // Establece el token de autenticación en la API
    }
  }, []);

  // Función para manejar el inicio de sesión
  const login = async (username, password) => {
    try {
      const { token } = await apiLogin(username, password); // Llama a la función de inicio de sesión de la API
      setAuth({ token }); // Establece el estado de autenticación con el token
      localStorage.setItem('authToken', token); // Almacena el token en el almacenamiento local
      navigate('/profile'); // Navega a la página de perfil
    } catch (error) {
      console.error('Login failed:', error); // Maneja cualquier error que ocurra durante el inicio de sesión
    }
  };

  // Función para manejar el cierre de sesión
  const logout = () => {
    setAuth({ token: null }); // Establece el estado de autenticación a null
    localStorage.removeItem('authToken'); // Elimina el token del almacenamiento local
    setAuthToken(null); // Elimina el token de autenticación en la API
    navigate('/'); // Navega a la página de inicio
  };

  return (
    // Proveedor del contexto de autenticación
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children} {/* Renderiza los hijos del proveedor */}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext); // Obtiene el contexto de autenticación
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider'); // Lanza un error si el hook es usado fuera del proveedor
  }
  return context; // Retorna el contexto de autenticación
};