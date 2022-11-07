import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { User } from '../types';

export const AuthContext: React.Context<{ token?: string, loggedUser?: User, onLogin?: Function, onLogout?: Function }> = React.createContext({});

export const AuthProvider: React.FC<any> = ({ children }) => {
    const [loggedUser, setLoggedUser] = useState<User>();
    const [token, setToken] = useState<string>();

    const handleLogin = async (token: string, loggedUser: User) => {
        await new Promise((resolve) => setTimeout(() => { resolve(true) }, 500));

        setToken(token); // Faking auth token...
        setLoggedUser(loggedUser);
    }

    const handleLogout = () => {
        setToken(undefined);
        setLoggedUser(undefined);
    }

    const value = {
        token,
        loggedUser,
        onLogin: handleLogin,
        onLogout: handleLogout
    }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}