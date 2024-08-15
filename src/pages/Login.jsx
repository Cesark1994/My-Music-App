import { useRef, useState } from "react";
import { useAuth } from '../context/AuthProvider'; 
import React from 'react';

function Login() {
    const usernameRef = useRef("");
    const passwordRef = useRef("");
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth("actions");

    async function handleSubmit(event) {
        event.preventDefault();
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        if (!username || typeof username !== 'string') {
            console.error('Username is required and must be a valid string.');
            setIsError(true);
            return;
        }

        if (!password || typeof password !== 'string') {
            console.error('Password is required and must be a valid string.');
            setIsError(true);
            return;
        }

        setIsLoading(true);
        setIsError(false);

        try {
            await login(username, password);
        } catch (error) {
            console.error('Error during login:', error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section className="login-section" style={styles.section}>
            <div className="login-container" style={styles.container}>
                <div className="login-card" style={styles.card}>
                    <h1 style={styles.title}>Iniciar Sesión</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="field" style={styles.field}>
                            <label htmlFor="username" style={styles.label}>Nombre de usuario:</label>
                            <div className="control has-icons-left">
                                <input
                                    className="input"
                                    type="text"
                                    id="username"
                                    name="username"
                                    ref={usernameRef}
                                    style={styles.input}
                                />
                                <span className="icon is-small is-left" style={styles.icon}>
                                    <i className="fas fa-user"></i>
                                </span>
                            </div>
                        </div>
                        <div className="field" style={styles.field}>
                            <label htmlFor="password" style={styles.label}>Contraseña:</label>
                            <div className="control has-icons-left">
                                <input
                                    className="input"
                                    type="password"
                                    id="password"
                                    name="password"
                                    ref={passwordRef}
                                    style={styles.input}
                                />
                                <span className="icon is-small is-left" style={styles.icon}>
                                    <i className="fas fa-lock"></i>
                                </span>
                            </div>
                        </div>
                        <div className="field" style={styles.field}>
                            <div className="control">
                                <button
                                    type="submit"
                                    className="button is-primary is-fullwidth"
                                    style={styles.button}
                                >
                                    {isLoading ? "Cargando..." : "Enviar"}
                                </button>
                                {isError && <p style={styles.errorText}>Error al cargar los datos.</p>}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Login;

const styles = {
    section: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#121212', // Fondo oscuro
        fontFamily: "'Poppins', sans-serif",
    },
    container: {
        maxWidth: '400px',
        width: '100%',
        padding: '20px',
        boxSizing: 'border-box',
    },
    card: {
        backgroundColor: '#1e1e1e', // Fondo de la tarjeta oscuro
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Sombra más intensa
        padding: '40px 30px',
    },
    title: {
        fontSize: '24px',
        fontWeight: '600',
        marginBottom: '20px',
        color: '#ffffff', // Texto claro
        textAlign: 'center',
    },
    field: {
        marginBottom: '20px',
    },
    label: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#a0a0a0', // Color gris claro para las etiquetas
    },
    input: {
        width: '100%',
        padding: '10px 15px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #444', // Borde oscuro
        backgroundColor: '#2e2e2e', // Fondo oscuro para los inputs
        color: '#ffffff', // Texto claro
        marginTop: '5px',
        boxSizing: 'border-box',
    },
    icon: {
        position: 'absolute',
        left: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#a0a0a0', // Color gris claro para los iconos
    },
    button: {
        backgroundColor: '#1DB954',
        color: '#ffffff',
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: '500',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    buttonHover: {
        backgroundColor: '#17a848',
    },
    errorText: {
        color: '#ff4d4d',
        marginTop: '10px',
        textAlign: 'center',
    },
};