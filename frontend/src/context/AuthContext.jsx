import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            const parsed = JSON.parse(savedUser);
            axios.defaults.headers.common['Authorization'] = `Bearer ${parsed.token}`;
            return parsed;
        }
        return null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
        } else {
            localStorage.removeItem('user');
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [user]);

    const login = async (email, password) => {
        const { data } = await axios.post('/api/auth/login', { email, password });
        setUser(data);
        return data;
    };

    const signup = async (email, password) => {
        const { data } = await axios.post('/api/auth/signup', { email, password });
        setUser(data);
        return data;
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
