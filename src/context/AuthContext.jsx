import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage, STORAGE_KEYS } from '../utils/localStorage';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = getFromLocalStorage(STORAGE_KEYS.USER);
    if (savedUser) {
      setUser(savedUser);
    }
    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    // Simple mock authentication
    if (email && password) {
      const userData = {
        id: 1,
        email: email,
        name: email.split('@')[0],
        loginTime: new Date().toISOString()
      };
      setUser(userData);
      saveToLocalStorage(STORAGE_KEYS.USER, userData);
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const register = (name, email, password) => {
    // Simple mock registration
    if (name && email && password) {
      const userData = {
        id: 1,
        email: email,
        name: name,
        loginTime: new Date().toISOString()
      };
      setUser(userData);
      saveToLocalStorage(STORAGE_KEYS.USER, userData);
      return { success: true };
    }
    return { success: false, error: 'All fields are required' };
  };

  const logout = () => {
    setUser(null);
    removeFromLocalStorage(STORAGE_KEYS.USER);
  };

  const value = {
    user,
    login,
    register,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};