import type { Member, ChatRoom, ChatMessage, AdminUser, SystemMetric } from '../types';
import { API_URL } from '../constants/Config';

// Base API configuration
const API_BASE_URL = API_URL;
const API_TIMEOUT = 10000;

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new ApiError(response.status, `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof ApiError) {
        throw error;
      }
      throw new Error(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
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