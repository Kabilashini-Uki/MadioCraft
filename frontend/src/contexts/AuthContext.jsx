import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../utils/apiClient';
import { getCurrentUser, isAuthenticated } from '../utils/helpers';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = () => {
      try {
        const currentUser = getCurrentUser();
        if (currentUser && isAuthenticated()) {
          setUser(currentUser);
        }
      } catch (err) {
        console.error('Error initializing auth:', err);
        apiClient.clearAuth();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.post('/auth/login', {
        email,
        password,
      });

      if (response.token && response.user) {
        apiClient.setAuthToken(response.token);
        apiClient.setUser(response.user);
        setUser(response.user);
        return { success: true, user: response.user };
      }

      throw new Error('Invalid response from server');
    } catch (err) {
      const errorMessage = err.data?.message || err.message || 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (name, email, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.post('/auth/register', {
        name,
        email,
        password,
      });

      if (response.token && response.user) {
        apiClient.setAuthToken(response.token);
        apiClient.setUser(response.user);
        setUser(response.user);
        return { success: true, user: response.user };
      }

      throw new Error('Invalid response from server');
    } catch (err) {
      const errorMessage = err.data?.message || err.message || 'Registration failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    apiClient.clearAuth();
    setUser(null);
    setError(null);
  };

  // Check if user is authenticated
  const authenticated = isAuthenticated() && !!user;

  const value = {
    user,
    loading,
    error,
    authenticated,
    login,
    register,
    logout,
    setError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
