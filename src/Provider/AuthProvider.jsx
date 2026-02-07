import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { publicApi, apiClient } from '../config/api';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [token, setToken] = useState(() => localStorage.getItem('token') || '');

    // Register user via backend API using publicApi
    const createUser = async (name, email, password) => {
        try {
            const data = await publicApi('api/auth/register', 'POST', { name, email, password });
            // setUser(data.user);
            // localStorage.setItem('user', JSON.stringify(data.user));
            return data;
        } catch (error) {
            throw error;
        }
    };

    // Login user via backend API using publicApi
    const login = async (email, password) => {
        try {
            const data = await publicApi('api/auth/login', 'POST', { email, password });
            setUser(data.user);
            setToken(data.token);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            return data;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        setToken('');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    // ...existing code...
    const resetPassword = (email) => {
        // Implement reset password API call here
    };
    const updateUser = (updateData) => {
        // Implement update user API call here
        setUser(updateData);
        localStorage.setItem('user', JSON.stringify(updateData));
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (storedToken && !user) {
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            } else {
                apiClient('api/auth/user-profile')
                    .then(data => {
                        setUser(data.user);
                        localStorage.setItem('user', JSON.stringify(data.user));
                    })
                    .catch(() => logout());
            }
        }
    }, []);

    const authData = {
        user,
        setUser,
        token,
        createUser,
        login,
        logout,
        resetPassword,
        updateUser,
    };

    return <AuthContext.Provider value={authData}>
        {children}
    </AuthContext.Provider>
};

export default AuthProvider;