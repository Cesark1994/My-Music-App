import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { setAuthToken, login as apiLogin } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, user__id: null });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const user__id = localStorage.getItem('user__id');
    if (token && user__id) {
      setAuth({ token, user__id });
      setAuthToken(token);
    }
  }, []);

// AuthProvider.jsx
const login = async (username, password) => {
  try {
    console.log('Logging in with:', { username, password });
    const { token, user__id } = await apiLogin(username, password);
    setAuth({ token, user__id });
    localStorage.setItem('authToken', token);
    localStorage.setItem('user__id', user__id);
    navigate('/profile');
  } catch (error) {
    if (error.response) {
      console.error('Login failed:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
  }
};
  const logout = () => {
    setAuth({ token: null, user__id: null });
    localStorage.removeItem('authToken');
    localStorage.removeItem('user__id');
    setAuthToken(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};