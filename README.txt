# My Music App

My Music App es una aplicación de música que permite a los usuarios buscar, reproducir y gestionar canciones y listas de reproducción. A continuación se describen las funcionalidades principales y la estructura del proyecto.

## Funcionalidades

### Autenticación
- **Login**: Permite a los usuarios iniciar sesión en la aplicación.
- **Logout**: Permite a los usuarios cerrar sesión.

### Gestión de Canciones
- **MySongs**: Muestra las canciones del usuario.
- **SongDetails**: Muestra los detalles de una canción específica.
- **SongPlayer**: Reproduce una canción seleccionada.

### Gestión de Listas de Reproducción
- **Playlists**: Muestra las listas de reproducción del usuario.
- **PlaylistDetails**: Muestra los detalles de una lista de reproducción específica.
- **PlaylistForm**: Permite crear y editar listas de reproducción.

### Búsqueda
- **SearchBar**: Permite buscar canciones y listas de reproducción.

### Interfaz de Usuario
- **Navbar**: Barra de navegación principal.
- **Header**: Encabezado de la aplicación.
- **Footer**: Pie de página de la aplicación.
- **ThemeToggle**: Permite alternar entre modo claro y oscuro.

### Manejo de Errores
- **ErrorBoundary**: Captura y muestra errores en la aplicación.

### Otros Componentes
- **Card**: Componente genérico para mostrar información en forma de tarjeta.
- **SongCard**: Muestra información de una canción en forma de tarjeta.
- **PlaylistCard**: Muestra información de una lista de reproducción en forma de tarjeta.

## Estructura del Proyecto

```plaintext
src/
├── components/
│   ├── Card.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── Navbar.jsx
│   ├── Player.jsx
│   ├── PlayerBar.jsx
│   ├── PlaylistCard.jsx
│   ├── PlaylistForm.jsx
│   ├── SearchBar.jsx
│   ├── SongCard.jsx
│   ├── SongList.jsx
│   ├── SongPlayer.jsx
│   └── ThemeToggle.jsx
├── context/
│   ├── AuthProvider.jsx
│   ├── MusicPlayerProvider.jsx
│   └── AuthContext.jsx
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── MySongs.jsx
│   ├── NotFound.jsx
│   ├── PlaylistDetails.jsx
│   ├── Playlists.jsx
│   ├── Profile.jsx
│   └── SongDetails.jsx
├── services/
│   └── api.js
├── styles/
│   ├── Card.css
│   ├── Footer.css
│   ├── Navbar.css
│   ├── Player.css
│   ├── PlaylistCard.css
│   ├── SongCard.css
│   ├── SongPlayer.css
│   └── ThemeToggle.css
└── App.js

#### Cómo Ejecutar el Proyecto

1. **Instalar Dependencias**
   ```bash
   npm install
   ```

2. **Ejecutar la Aplicación**
   ```bash
   npm run dev
   ```

3. **Construir para Producción**
   ```bash
   npm run build
   ```

4. **Previsualizar la Construcción**
   ```bash
   npm run preview
   ```
5.  Enlance pagina vercel:     https://my-music-app-348g-jvdc3jlfk-cesars-projects-681aedca.vercel.app/
                               https://vercel.com/cesars-projects-681aedca/my-music-app-348g
