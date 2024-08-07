import { createContext, useReducer, useContext } from "react"; // Importa createContext, useReducer y useContext desde React
import { useLocation, useNavigate } from "react-router-dom"; // Importa useLocation y useNavigate desde react-router-dom

// Crea el contexto de autenticación con un estado inicial vacío y acciones vacías
const AuthContext = createContext({
    state: {}, // Estado inicial vacío
    actions: {}, // Acciones iniciales vacías
});

// Define las acciones disponibles para el reducer de autenticación
const ACTIONS = {
    LOGIN: "LOGIN", // Acción para iniciar sesión
    LOGOUT: "LOGOUT", // Acción para cerrar sesión
};

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.LOGIN:
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
            };
        case ACTIONS.LOGOUT:
            return {
                isAuthenticated: false,
                token: null,
            };
        default:
            return state;
    }
}

function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, {
        token: localStorage.getItem("authToken"),
        isAuthenticated: !!localStorage.getItem("authToken"),
    });
    const navigate = useNavigate();
    const location = useLocation();

    const actions = {
        login: ({ token }) => {
            dispatch({ type: ACTIONS.LOGIN, payload: { token } });
            localStorage.setItem("authToken", token);
            const origin = location.state?.from?.pathname || "/";
            navigate(origin);
        },
        logout: () => {
            dispatch({ type: ACTIONS.LOGOUT });
            localStorage.removeItem("authToken");
            navigate("/");
        },
    };

    return (
        <AuthContext.Provider value={{ state, actions }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth(type) {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context[type];
}

export { AuthContext, AuthProvider, useAuth };
