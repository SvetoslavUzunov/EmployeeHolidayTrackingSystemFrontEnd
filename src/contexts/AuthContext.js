import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const LocalStorageKey = 'auth';

const InitialAuthState = {
    accessToken: null,
    refreshToken: null,
    email: null,
    role: null
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useLocalStorage(LocalStorageKey, InitialAuthState);

    const login = (authData) => {
        setAuth(authData);
    }

    const logout = () => {
        setAuth(InitialAuthState);
    }

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);