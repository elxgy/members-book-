import { API_URL, MOCK_MODE } from '../constants/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = API_URL;

export interface ApprovalRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  requestType: 'profile_update';
  requestedChanges: {
    negociosFechados?: number;
    valorTotalAcumulado?: number;
    recomendacao?: string;
    [key: string]: any;
  };
  currentValues: {
    negociosFechados?: number;
    valorTotalAcumulado?: number;
    recomendacao?: string;
    [key: string]: any;
  };
  justification: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  reviewComments?: string;
}

export interface ApprovalResponse {
  success: boolean;
  message?: string;
  data?: ApprovalRequest[];
}

export interface ApprovalActionResponse {
  success: boolean;
  message?: string;
  data?: ApprovalRequest;
}

class ApprovalsService {
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

  async getPendingApprovals(): Promise<ApprovalResponse> {
    if (MOCK_MODE) {
      console.log('--- MOCK MODE: Returning mock approval requests ---');
      
      const mockRequests: ApprovalRequest[] = [
        {
          id: 'req_001',
          userId: 'user_001',
          userName: 'João Silva',
          userEmail: 'joao@test.com',
          requestType: 'profile_update',
          requestedChanges: {
            negociosFechados: 45,
            valorTotalAcumulado: 850000,
            recomendacao: 'Diamante'
          },
          currentValues: {
            negociosFechados: 30,
            valorTotalAcumulado: 700000,
            recomendacao: 'Ouro'
          },
          justification: 'Fechei 15 novos negócios no último trimestre, totalizando R$ 150.000 em valor adicional.',
          status: 'pending',
          createdAt: '2024-01-15T10:30:00Z'
        },
        {
          id: 'req_002',
          userId: 'user_002',
          userName: 'Maria Santos',
          userEmail: 'maria@test.com',
          requestType: 'profile_update',
          requestedChanges: {
            negociosFechados: 25,
            valorTotalAcumulado: 500000
          },
          currentValues: {
            negociosFechados: 20,
            valorTotalAcumulado: 400000
          },
          justification: 'Atualizando meus números após fechamento de contratos importantes.',
          status: 'pending',
          createdAt: '2024-01-14T14:20:00Z'
        },
        {
          id: 'req_003',
          userId: 'user_003',
          userName: 'Pedro Costa',
          userEmail: 'pedro@test.com',
          requestType: 'profile_update',
          requestedChanges: {
            recomendacao: 'Platina'
          },
          currentValues: {
            recomendacao: 'Prata'
          },
          justification: 'Solicitando upgrade para Platina baseado no meu desempenho excepcional.',
          status: 'pending',
          createdAt: '2024-01-13T09:15:00Z'
        }
      ];

      return {
        success: true,
        data: mockRequests
      };
    }

    try {
      const response = await this.makeRequest('/admin/approvals/pending');
      return {
        success: true,
        data: response.requests || []
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erro ao carregar solicitações'
      };
    }
  }

  async approveRequest(requestId: string, comments?: string): Promise<ApprovalActionResponse> {
    if (MOCK_MODE) {
      console.log(`--- MOCK MODE: Approving request ${requestId} ---`);
      
      return {
        success: true,
        message: 'Solicitação aprovada com sucesso!'
      };
    }

    try {
      const response = await this.makeRequest(`/admin/approvals/${requestId}/approve`, {
        method: 'POST',
        body: JSON.stringify({ comments })
      });
      
      return {
        success: true,
        message: 'Solicitação aprovada com sucesso!',
        data: response.request
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erro ao aprovar solicitação'
      };
    }
  }

  async rejectRequest(requestId: string, comments: string): Promise<ApprovalActionResponse> {
    if (MOCK_MODE) {
      console.log(`--- MOCK MODE: Rejecting request ${requestId} ---`);
      
      return {
        success: true,
        message: 'Solicitação rejeitada.'
      };
    }

    try {
      const response = await this.makeRequest(`/admin/approvals/${requestId}/reject`, {
        method: 'POST',
        body: JSON.stringify({ comments })
      });
      
      return {
        success: true,
        message: 'Solicitação rejeitada.',
        data: response.request
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erro ao rejeitar solicitação'
      };
    }
  }

  async getAllApprovals(): Promise<ApprovalResponse> {
    if (MOCK_MODE) {
      console.log('--- MOCK MODE: Returning all approval requests ---');
      
      // Retorna as mesmas requisições mock mas com diferentes status
      const mockRequests: ApprovalRequest[] = [
        {
          id: 'req_004',
          userId: 'user_004',
          userName: 'Ana Oliveira',
          userEmail: 'ana@test.com',
          requestType: 'profile_update',
          requestedChanges: {
            negociosFechados: 35,
            valorTotalAcumulado: 600000
          },
          currentValues: {
            negociosFechados: 30,
            valorTotalAcumulado: 500000
          },
          justification: 'Atualização dos números após trimestre.',
          status: 'approved',
          createdAt: '2024-01-10T11:00:00Z',
          reviewedAt: '2024-01-12T15:30:00Z',
          reviewedBy: 'admin@test.com',
          reviewComments: 'Aprovado - documentação adequada.'
        }
      ];

      return {
        success: true,
        data: mockRequests
      };
    }

    try {
      const response = await this.makeRequest('/admin/approvals');
      return {
        success: true,
        data: response.requests || []
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erro ao carregar histórico de solicitações'
      };
    }
  }
}

export const approvalsService = new ApprovalsService();
export default approvalsService;