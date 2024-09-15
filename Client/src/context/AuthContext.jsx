import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const { data } = await axios.get('/api/auth/checkAuth', { withCredentials: true });
        setUser(data.user);
      } catch (error) {
        setUser(null);
      }
    };
    checkLoggedIn();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post('/api/auth/login', { email, password }, { withCredentials: true });
      setUser(data.user);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
