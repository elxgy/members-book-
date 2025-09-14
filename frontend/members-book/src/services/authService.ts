import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../constants/Config';

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

    const token = await AsyncStorage.getItem('access_token');
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
    try {
      const response: LoginResponse = await this.makeRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      // Store the JWT token
      await AsyncStorage.setItem('access_token', response.access_token);
      
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
    try {
      const response: LoginResponse = await this.makeRequest('/auth/guest-login', {
        method: 'POST',
      });

      // Store the JWT token
      await AsyncStorage.setItem('access_token', response.access_token);
      
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
      await AsyncStorage.removeItem('access_token');
    }
  }

  async getStoredToken(): Promise<string | null> {
    return await AsyncStorage.getItem('access_token');
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await this.getStoredToken();
    return !!token;
  }
}

export const authService = new AuthService();
export default authService;