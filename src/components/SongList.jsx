// src/components/SongList.jsx
import React, { useEffect, useState, useRef } from "react";
import SongCard from "./SongCard"; // Asegúrate de que esta ruta sea correcta

// Define el componente funcional SongList
function SongList() {
    // Define los estados locales
    const [page, setPage] = useState(1); // Estado para la página actual
    const [songs, setSongs] = useState([]); // Estado para la lista de canciones
    const [nextUrl, setNextUrl] = useState(null); // Estado para la URL de la siguiente página
    const [isError, setIsError] = useState(false); // Estado para manejar errores
    const [isLoading, setIsLoading] = useState(false); // Estado para manejar la carga
    const [filters, setFilters] = useState({}); // Estado para los filtros de búsqueda

    // Referencias para el observador de intersección
    const observerRef = useRef();
    const lastSongElementRef = useRef();

    // Función para realizar la solicitud de datos
    const doFetch = async () => {
        setIsLoading(true); // Establece el estado de carga a verdadero
        let query = new URLSearchParams({
            page: page,
            page_size: 5,
            ordering: `-created_at`,
            ...filters,
        }).toString();

        fetch(
            `${import.meta.env.VITE_API_BASE_URL}harmonyhub/songs/?${query}`,
            {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('authToken')}`,
                    'User-ID': localStorage.getItem('user_id'),
                    'Content-Type': 'application/json',
                },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.results) {
                    setSongs((prevSongs) => [...prevSongs, ...data.results]); // Actualiza la lista de canciones
                    setNextUrl(data.next); // Establece la URL de la siguiente página
                }
            })
            .catch(() => {
                setIsError(true); // Establece el estado de error a verdadero
            })
            .finally(() => {
                setIsLoading(false); // Establece el estado de carga a falso
            });
    };

    // Efecto para realizar la solicitud de datos cuando cambian la página o los filtros
    useEffect(() => {
        doFetch();
    }, [page, filters]);

    // Efecto para configurar el observador de intersección
    useEffect(() => {
        if (isLoading) return;

        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && nextUrl) {
                setPage((prevPage) => prevPage + 1); // Incrementa la página cuando el último elemento es visible
            }
        });

        if (lastSongElementRef.current) {
            observerRef.current.observe(lastSongElementRef.current); // Observa el último elemento
        }
    }, [isLoading, nextUrl]);

    // Maneja el evento de búsqueda
    function handleSearch(event) {
        event.preventDefault();

        const searchForm = new FormData(event.target);
        const newFilters = {};

        searchForm.forEach((value, key) => {
            if (value) {
                newFilters[key] = value; // Agrega los filtros de búsqueda
            }
        });

        setFilters(newFilters); // Establece los nuevos filtros
        setSongs([]); // Reinicia la lista de canciones
        setPage(1); // Reinicia la página a 1
    }

    // Renderiza mensajes de error o cuando no hay canciones disponibles
    if (isError) return <p>Error al cargar las canciones.</p>;
    if (!songs.length && !isLoading) return <p>No hay canciones disponibles</p>;

    return (
        <div>
            <div className="my-5">
                <h2 className="title">Lista de Canciones</h2>
                <form className="box" onSubmit={handleSearch}>
                    <div className="field">
                        <label className="label">Título:</label>
                        <div className="control">
                            <input className="input" type="text" name="title" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Artista:</label>
                        <div className="control">
                            <input className="input" type="number" name="artists" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Fecha de inicio:</label>
                        <div className="control">
                            <input className="input" type="datetime-local" name="created_at_min" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Fecha de fin:</label>
                        <div className="control">
                            <input className="input" type="datetime-local" name="created_at_max" />
                        </div>
                    </div>
                    <div className="field">
                        <button className="button is-primary" type="submit">
                            Buscar
                        </button>
                    </div>
                </form>
                <ul>
                    {songs.map((song, index) => {
                        if (songs.length === index + 1) {
                            return (
                                <div
                                    key={song.id}
                                    ref={lastSongElementRef}
                                    className="column is-two-thirds"
                                >
                                    <SongCard song={song} />
                                </div>
                            );
                        } else {
                            return (
                                <div
                                    key={song.id}
                                    className="column is-two-thirds"
                                >
                                    <SongCard song={song} />
                                </div>
                            );
                        }
                    })}
                </ul>
                {isLoading && <p>Cargando más canciones...</p>}
            </div>
        </div>
    );
}

export default SongList; // Exporta el componente SongList como el valor predeterminado del módulo