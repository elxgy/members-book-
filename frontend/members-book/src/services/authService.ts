import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, MOCK_MODE, TOKEN_STORAGE_KEY } from '../constants/Config';

const API_BASE_URL = API_URL;

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  user_type: string;
}

interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
}

class AuthService {
  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
    if (token) {
      defaultHeaders['x-access-token'] = token;
    }

    const config = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async login(credentials: LoginRequest): Promise<{ success: boolean; user?: User; message?: string }> {
    if (MOCK_MODE) {
      console.log('--- MOCK MODE: Faking login ---');
      
      let mockUser: User;

      switch (credentials.email.toLowerCase()) {
        case 'admin@test.com':
          mockUser = {
            id: 'mock_admin_id',
            email: credentials.email,
            name: 'Mock Admin',
            role: 'ADMIN',
          };
          break;
        case 'member@test.com':
        case 'membro@test.com':
          mockUser = {
            id: 'mock_member_id',
            email: credentials.email,
            name: 'Mock Member',
            role: 'MEMBER',
          };
          break;
        case 'guest@test.com':
        default:
          mockUser = {
            id: 'mock_guest_id',
            email: credentials.email,
            name: 'Mock Guest',
            role: 'GUEST',
          };
          break;
      }

      await AsyncStorage.setItem(TOKEN_STORAGE_KEY, 'mock_token');
      return {
        success: true,
        user: mockUser,
      };
    }
    try {
      const response: LoginResponse = await this.makeRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      // Store the JWT token
      await AsyncStorage.setItem(TOKEN_STORAGE_KEY, response.access_token);
      
      // Create user object from response
      const user: User = {
        id: 'backend_user', // Will be extracted from JWT in real implementation
        email: credentials.email,
        name: credentials.email.split('@')[0], // Extract name from email for now
        role: response.user_type.toUpperCase(),
      };

      return {
        success: true,
        user,
      };
    } catch (error) {
      console.error('Login failed:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Login failed',
      };
    }
  }

  async guestLogin(): Promise<{ success: boolean; user?: User; message?: string }> {
    if (MOCK_MODE) {
      console.log('--- MOCK MODE: Faking guest login ---');
      
      const mockUser: User = {
        id: 'mock_guest_id',
        email: 'guest@test.com',
        name: 'Mock Guest',
        role: 'GUEST',
      };

      await AsyncStorage.setItem(TOKEN_STORAGE_KEY, 'mock_guest_token');
      return {
        success: true,
        user: mockUser,
      };
    }

    try {
      const response: LoginResponse = await this.makeRequest('/auth/guest-login', {
        method: 'POST',
      });

      // Store the JWT token
      await AsyncStorage.setItem(TOKEN_STORAGE_KEY, response.access_token);
      
      // Create guest user object
      const user: User = {
        id: 'guest_user',
        email: 'guest@test.com',
        name: 'Guest User',
        role: 'GUEST',
      };

      return {
        success: true,
        user,
      };
    } catch (error) {
      console.error('Guest login failed:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Guest login failed',
      };
    }
  }

  async logout(): Promise<void> {
    try {
      // Call backend logout endpoint
      await this.makeRequest('/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout API call failed:', error);
      // Continue with local logout even if API call fails
    } finally {
      // Always clear local storage
      await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  }

  async getStoredToken(): Promise<string | null> {
    return await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
  }

  async isAuthenticated(): Promise<boolean> {
    if (MOCK_MODE) {
      console.log('--- MOCK MODE: Faking authentication ---');
      const token = await this.getStoredToken();
      return !!token;
    }
    const token = await this.getStoredToken();
    if (!token) {
      return false;
    }
    try {
      await this.makeRequest('/auth/validate', {
        method: 'POST',
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}

export const authService = new AuthService();
export default authService;