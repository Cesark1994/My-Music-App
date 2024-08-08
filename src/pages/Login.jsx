import React, { useRef, useState } from "react"; // Importa React y los hooks useRef y useState
import { useAuth } from "../context/AuthProvider"; // Importa el hook useAuth desde el proveedor de contexto AuthProvider

// Define el componente funcional Login
function Login() {
    // Crea referencias para los campos de nombre de usuario y contraseña
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    // Define el estado local para manejar errores y el estado de carga
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Obtiene la función login del contexto de autenticación
    const { login } = useAuth();

    // Maneja el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault(); // Previene el comportamiento predeterminado del formulario
        if (!isLoading) { // Verifica si no está en estado de carga
            setIsLoading(true); // Establece el estado de carga a verdadero

            // Obtiene los valores de los campos de nombre de usuario y contraseña
            const username = usernameRef.current.value;
            const password = passwordRef.current.value;

            try {
                // Intenta iniciar sesión con los valores proporcionados
                await login(username, password);
                setIsError(false); // Establece el estado de error a falso si el inicio de sesión es exitoso
            } catch (error) {
                console.error("Error al iniciar sesión", error); // Muestra el error en la consola
                setIsError(true); // Establece el estado de error a verdadero si ocurre un error
            } finally {
                setIsLoading(false); // Establece el estado de carga a falso al finalizar
            }
        }
    };

    return (
        // Sección principal del componente Login con estilos en línea
        <section className="section" style={{ backgroundColor: '#191414', color: '#1DB954', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="columns is-centered">
                <div className="column is-4">
                    {/* Formulario de inicio de sesión */}
                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <div className="field">
                            <label htmlFor="username" style={{ fontWeight: 'bold' }}>Nombre de usuario</label>
                            <div className="control has-icons-left">
                                <input
                                    className="input"
                                    type="text"
                                    id="username"
                                    name="username"
                                    ref={usernameRef}
                                    required
                                    style={{ width: '100%', padding: '0.5em', marginBottom: '1em' }}
                                    placeholder="nombre de usuario"
                                />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-user"></i>
                                </span>
                            </div>
                        </div>
                        <div className="field">
                            <label htmlFor="password"style={{ fontWeight: 'bold' }}>Contraseña</label>
                            <div className="control has-icons-left">
                                <input
                                    className="input"
                                    type="password"
                                    id="password"
                                    name="password"
                                    ref={passwordRef}
                                    required
                                    style={{ width: '100%', padding: '0.5em', marginBottom: '1em' }}
                                    placeholder="contraseña"
                                />
                                <span
                                className="icon is-small is-left">
                                    <i className="fas fa-lock"></i>
                                </span>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <button
                                    type="submit"
                                    className="button is-primary is-fullwidth"
                                    style={{ width: '100%', backgroundColor: '#1DB954',
                                        fontWeight: 'bold',color: '#000000', padding: '0.75em', marginBottom: '1em',borderRadius: '50px',}}>
                                    Iniciar sesión
                                    <span
                                className="icon is-small is-left">
                                    <i className="fas fa-lock"></i>
                                </span>
                                </button>
                                {/* Muestra un mensaje de carga si isLoading es verdadero */}
                                {isLoading && <p>Cargando...</p>}
                                {/* Muestra un mensaje de error si isError es verdadero */}
                                {isError && <p style={{ color: 'red' }}>Error: Credenciales inválidas.</p>}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Login; // Exporta el componente Login como el valor predeterminado del módulo