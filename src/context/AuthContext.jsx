import { createContext, useReducer, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext({
    state: {},
    actions: {},
});

const ACTIONS = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
};

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.LOGIN:
            return {
                ...state,
                token: action.payload.token,
                user_id: action.payload.user_id, // Añadir user_id al estado
                isAuthenticated: true,
            };
        case ACTIONS.LOGOUT:
            return {
                isAuthenticated: false,
                token: null,
                user_id: null, // Resetear user_id
            };
        default:
            return state;
    }
}

function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, {
        token: localStorage.getItem("authToken"),
        user_id: localStorage.getItem("user_id"), // Obtener user_id del localStorage
        isAuthenticated: !!localStorage.getItem("authToken"),
    });
    const navigate = useNavigate();
    const location = useLocation();

    const actions = {
        login: ({ token, user_id }) => {
            dispatch({ type: ACTIONS.LOGIN, payload: { token, user_id } });
            localStorage.setItem("authToken", token);
            localStorage.setItem("user_id", user_id); // Guardar user_id en localStorage
            const origin = location.state?.from?.pathname || "/";
            navigate(origin);
        },
        logout: () => {
            dispatch({ type: ACTIONS.LOGOUT });
            localStorage.removeItem("authToken");
            localStorage.removeItem("user_id"); // Eliminar user_id de localStorage
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
