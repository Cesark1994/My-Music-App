// main.jsk es el punto de entrada de la aplicación, donde se monta la aplicación en el DOM y se envuelve en los proveedores de contexto necesarios para la aplicación.
import React from 'react'; // Importa React
import { createRoot } from 'react-dom/client'; // Importa createRoot desde react-dom/client para crear el root de la aplicación
import { BrowserRouter } from 'react-router-dom'; // Importa BrowserRouter desde react-router-dom para manejar las rutas
import { AuthProvider } from './context/AuthProvider'; // Importa AuthProvider desde el contexto de autenticación
import App from './App'; // Importa el componente principal App

// Selecciona el contenedor principal donde se montará la aplicación
const container = document.getElementById('root');

// Crea el root y monta la aplicación
const root = createRoot(container);

root.render(
  // Renderiza la aplicación en modo estricto para ayudar a identificar problemas potenciales
  <React.StrictMode>
    {/* Envuelve la aplicación en BrowserRouter para habilitar el enrutamiento */}
    <BrowserRouter>
      {/* Envuelve la aplicación en AuthProvider para proporcionar el contexto de autenticación */}
      <AuthProvider>
        {/* Renderiza el componente principal App */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);