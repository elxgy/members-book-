import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authService from '../services/authService';

interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  login: (userData: User) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: () => Promise<boolean>;
  hasRole: (role: string) => boolean;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    checkUserSession();
  }, []);

  const checkUserSession = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      const isAuth = await authService.isAuthenticated();
      
      if (userData && isAuth) {
        setUser(JSON.parse(userData));
      } else {
        // Clear invalid session
        await AsyncStorage.removeItem('user');
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking user session:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData: User): Promise<boolean> => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return true;
    } catch (error) {
      console.error('Error saving user data:', error);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authService.logout();
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
      // Force local logout even if backend call fails
      await AsyncStorage.removeItem('user');
      setUser(null);
    }
  };

  const isAuthenticated = async (): Promise<boolean> => {
    return await authService.isAuthenticated();
  };

  const hasRole = (role: string): boolean => {
    return user?.role?.toUpperCase() === role.toUpperCase();
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
    hasRole,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};