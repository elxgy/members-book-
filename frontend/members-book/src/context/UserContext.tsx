import React, { createContext, useContext, useState, type ReactNode } from 'react'
import type { User, UserType, MemberHierarchy } from "../types"

// Re-export types for convenience
export type { UserType, MemberHierarchy } from "../types"

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticating: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: () => boolean;
  isMember: () => boolean;
  isGuest: () => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsAuthenticating(true);
      console.log('Login attempt:', email);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock login logic - replace with actual authentication
      if (email && password) {
        const mockUser: User = {
          id: '1',
          name: 'João Silva',
          email: email,
          userType: 'admin',
          memberHierarchy: 'socios',
          profileImage: 'https://via.placeholder.com/150',
          joinDate: new Date('2023-01-15'),
          lastActive: new Date(),
        };
        setUser(mockUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsAuthenticating(false);
    }
  };

  const logout = (): void => {
    setIsAuthenticating(true);
    // Simulate logout delay
    setTimeout(() => {
      setUser(null);
      setIsAuthenticating(false);
    }, 500);
  };

  // Simulate initial auth check
  React.useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Simulate checking stored auth token
        await new Promise(resolve => setTimeout(resolve, 1500))
        // For now, no stored auth, so user remains null
      } catch (error) {
        console.error('Auth check error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuthStatus()
  }, [])

  const isAdmin = () => user?.userType === 'admin';
  const isMember = () => user?.userType === 'member';
  const isGuest = () => user?.userType === 'guest';

  return (
    <UserContext.Provider value={{ user, isLoading, isAuthenticating, login, logout, isAdmin, isMember, isGuest }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
