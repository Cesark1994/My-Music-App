import React from 'react'; // Importa React
import { Routes, Route } from 'react-router-dom'; // Importa Routes y Route desde react-router-dom para manejar las rutas
import Home from './pages/Home'; // Importa el componente Home
import Login from './pages/Login'; // Importa el componente Login
import Profile from './pages/Profile'; // Importa el componente Profile
import Songs from './pages/Songs'; // Importa el componente Songs
import Playlists from './pages/Playlists'; // Importa el componente Playlists
import PlaylistDetails from './pages/PlaylistDetails'; // Importa el componente PlaylistDetails
import SongDetails from './pages/SongDetails'; // Importa el componente SongDetails
import NotFound from './pages/NotFound'; // Importa el componente NotFound
import Header from './components/Header'; // Importa el componente Header
import Player from './components/Player'; // Importa el componente Player
import { MusicPlayerProvider } from './context/MusicPlayerProvider'; // Importa el proveedor de contexto MusicPlayerProvider
import PlayerBar from './components/PlayerBar'; // Importa el componente PlayerBar
import SongList from './components/SongList'; // Importa el componente SongList
import ProtectedRoute from './components/ProtectedRoute'; // Importa el componente ProtectedRoute

// Define el componente funcional App
function App() {
  return (
    // Envuelve la aplicación en el proveedor de contexto MusicPlayerProvider
    <MusicPlayerProvider>
      <Header /> {/* Renderiza el componente Header */}
      <Player /> {/* Renderiza el componente Player */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Ruta para el componente Home */}
        <Route path="/login" element={<Login />} /> {/* Ruta para el componente Login */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        /> {/* Ruta protegida para el componente Profile */}
        <Route
          path="/songs"
          element={
            <ProtectedRoute>
              <Songs />
            </ProtectedRoute>
          }
        /> {/* Ruta protegida para el componente Songs */}
        <Route path="/songlist" element={<SongList />} /> {/* Nueva ruta para el componente SongList */}
        <Route
          path="/songs/:id"
          element={
            <ProtectedRoute>
              <SongDetails />
            </ProtectedRoute>
          }
        /> {/* Ruta protegida para el componente SongDetails con parámetro id */}
        <Route
          path="/playlists"
          element={
            <ProtectedRoute>
              <Playlists />
            </ProtectedRoute>
          }
        /> {/* Ruta protegida para el componente Playlists */}
        <Route
          path="/playlists/:id"
          element={
            <ProtectedRoute>
              <PlaylistDetails />
            </ProtectedRoute>
          }
        /> {/* Ruta protegida para el componente PlaylistDetails con parámetro id */}
        <Route path="*" element={<NotFound />} /> {/* Ruta para el componente NotFound para manejar rutas no encontradas */}
      </Routes>
      <PlayerBar /> {/* Renderiza el componente PlayerBar, asegúrate de que esté ubicado donde debe ser visible */}
    </MusicPlayerProvider>
  );
}

export default App; // Exporta el componente App como el valor predeterminado del módulo