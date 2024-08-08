import React, { useState, useEffect } from 'react'; // Importa React y los hooks useState y useEffect
import { getSongs, deleteSong, uploadSong } from '../services/api'; // Importa las funciones getSongs, deleteSong y uploadSong desde el servicio de API
import '../styles/Songs.css'; // Importa el archivo de estilos CSS para el componente Songs

// Define el componente funcional Songs
function Songs() {
  // Define el estado local para las canciones, la canción actual y la nueva canción
  const [songs, setSongs] = useState([]); // Estado para almacenar la lista de canciones
  const [currentSong, setCurrentSong] = useState(null); // Estado para almacenar la canción que se está reproduciendo actualmente
  const [newSong, setNewSong] = useState({ title: '', file: null }); // Estado para almacenar los datos de una nueva canción que se va a subir
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const data = await getSongs();
        if (data && Array.isArray(data)) {
          setSongs(data);
        } else if (data && data.results) {
          setSongs(data.results);
        } else {
          console.error('Error: Formato de datos incorrecto', data);
        }
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchSongs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteSong(id);
      setSongs(songs.filter(song => song.id !== id));
    } catch (error) {
      console.error('Error deleting song:', error);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      await uploadSong(newSong);
      // Volver a cargar las canciones después de subir una nueva
      const data = await getSongs();
      setSongs(data.results);
      setNewSong({ title: '', file: null });
    } catch (error) {
      console.error('Error uploading song:', error);
    }
  };

  const handlePlay = (song) => {
    setCurrentSong(song);
  };

  return (
    <div className="songs">
      <h1>Songs</h1>
      <div className="songs-list">
        {songs.length > 0 ? (
          songs.map((song) => (
            <div key={song.id} className="song-card">
              <h3>{song.title}</h3>
              <button onClick={() => handlePlay(song)}>Play</button>
              <button onClick={() => handleDelete(song.id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No songs available.</p>
        )}
      </div>

      {currentSong && (
        <audio controls autoPlay>
          <source src={currentSong.url} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}

      <div className="upload-form">
        <h2>Upload New Song</h2>
        <form onSubmit={handleUpload}>
          <input
            type="text"
            placeholder="Song title"
            value={newSong.title}
            onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
            required
          />
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setNewSong({ ...newSong, file: e.target.files[0] })}
            required
          />
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
}

export default Songs;