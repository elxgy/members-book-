import type { Member, ChatRoom, ChatMessage, AdminUser, SystemMetric } from '../types';
import { API_URL, API_TIMEOUT, TOKEN_STORAGE_KEY } from '../constants/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Base API configuration
const API_BASE_URL = API_URL;

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

class ApiService {
  private async getAuthHeaders(): Promise<Record<string, string>> {
    const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['x-access-token'] = token;
    }
    
    return headers;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    try {
      const authHeaders = await this.getAuthHeaders();
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        signal: controller.signal,
        headers: {
          ...authHeaders,
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 401) {
          // Token expirado ou inválido
          await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
          throw new ApiError(response.status, 'Sessão expirada. Faça login novamente.');
        }
        
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          // Ignore JSON parse errors
        }
        
        throw new ApiError(response.status, errorMessage);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof ApiError) {
        throw error;
      }
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Timeout: A requisição demorou muito para responder');
      }
      throw new Error(`Erro de rede: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }

  // Members API
  async getMembers(filters?: { search?: string; hierarchy?: string }): Promise<Member[]> {
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.hierarchy) params.append('hierarchy', filters.hierarchy);
    
    const query = params.toString();
    return this.request<Member[]>(`/members${query ? `?${query}` : ''}`);
  }

  async getMemberById(id: string): Promise<Member> {
    return this.request<Member>(`/members/${id}`);
  }

  async connectToMember(memberId: string): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(`/members/${memberId}/connect`, {
      method: 'POST',
    });
  }

  // Chat API
  async getChatRooms(): Promise<ChatRoom[]> {
    return this.request<ChatRoom[]>('/chat/rooms');
  }

  async getChatMessages(roomId: string, limit = 50, offset = 0): Promise<ChatMessage[]> {
    return this.request<ChatMessage[]>(`/chat/rooms/${roomId}/messages?limit=${limit}&offset=${offset}`);
  }

  async sendMessage(roomId: string, message: string): Promise<ChatMessage> {
    return this.request<ChatMessage>(`/chat/rooms/${roomId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }

  // Admin API
  async getSystemMetrics(): Promise<SystemMetric[]> {
    return this.request<SystemMetric[]>('/admin/metrics');
  }

  async getUsers(filters?: { search?: string; status?: string }): Promise<AdminUser[]> {
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.status) params.append('status', filters.status);
    
    const query = params.toString();
    return this.request<AdminUser[]>(`/admin/users${query ? `?${query}` : ''}`);
  }

  async updateUserStatus(userId: string, status: 'active' | 'suspended'): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(`/admin/users/${userId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  async deleteUser(userId: string): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(`/admin/users/${userId}`, {
      method: 'DELETE',
    });
  }

  // Authentication API
  async login(email: string, password: string): Promise<{ user: any; token: string }> {
    return this.request<{ user: any; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async logout(): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>('/auth/logout', {
      method: 'POST',
    });
  }

  async refreshToken(): Promise<{ token: string }> {
    return this.request<{ token: string }>('/auth/refresh', {
      method: 'POST',
    });
  }
}

export const apiService = new ApiService();
export { ApiError };