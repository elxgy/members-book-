import axios from 'axios';
import { API_URL } from '../constants/Config';

const API_BASE_URL = API_URL || 'http://localhost:5000/api';

// Tipo para dados de perfil
export interface ProfileData {
  [key: string]: any;
  name?: string;
  company?: string;
  bio?: string;
  instagram?: string;
  linkedin?: string;
  email?: string;
  phone?: string;
  location?: string;
  industry?: string;
  negociosFechados?: number;
  valorTotalAcumulado?: number;
  total_deal_value?: number;
  number_of_deals?: number;
}

// Tipo para resposta de solicitação
export interface RequestResponse {
  message: string;
  request_id?: string;
  error?: string;
}

// Serviço de perfil
const profileService = {
  // Obter perfil do usuário atual
  getCurrentProfile: async (): Promise<any> => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/members/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao obter perfil:', error);
      throw error;
    }
  },

  // Atualizar perfil diretamente (sem aprovação)
  updateProfile: async (profileData: ProfileData): Promise<any> => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_BASE_URL}/members/profile`, profileData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      throw error;
    }
  },

  // Enviar solicitação de atualização de perfil (requer aprovação)
  submitUpdateRequest: async (profileData: ProfileData): Promise<RequestResponse> => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_BASE_URL}/members/profile/update-request`, profileData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao enviar solicitação de atualização:', error);
      throw error;
    }
  },

  // Obter solicitações pendentes (apenas para administradores)
  getPendingRequests: async (): Promise<any[]> => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/members/profile/update-requests`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao obter solicitações pendentes:', error);
      throw error;
    }
  },

  // Aprovar solicitação de atualização (apenas para administradores)
  approveRequest: async (requestId: string): Promise<any> => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_BASE_URL}/members/profile/update-request/${requestId}/approve`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao aprovar solicitação:', error);
      throw error;
    }
  },

  // Rejeitar solicitação de atualização (apenas para administradores)
  rejectRequest: async (requestId: string, reason: string = ''): Promise<any> => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_BASE_URL}/members/profile/update-request/${requestId}/reject`, 
        { reason }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao rejeitar solicitação:', error);
      throw error;
    }
  }
};

export default profileService;