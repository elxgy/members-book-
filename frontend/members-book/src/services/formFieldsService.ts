interface FormField {
  id: string;
  name: string;
  label: string;
  type: string;
  required: boolean;
  active: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

class FormFieldsService {
  private baseUrl = 'http://localhost:5000/api'; // Ajuste conforme sua configuração

  async getFormFields(): Promise<ApiResponse<FormField[]>> {
    try {
      // Simular chamada à API - em produção seria uma chamada real
      return new Promise((resolve) => {
        setTimeout(() => {
          const defaultFields: FormField[] = [
            { id: '1', name: 'name', label: 'Nome Completo', type: 'text', required: true, active: true },
            { id: '2', name: 'email', label: 'Email', type: 'email', required: true, active: true },
            { id: '3', name: 'company', label: 'Empresa', type: 'text', required: false, active: true },
            { id: '4', name: 'sector', label: 'Setor', type: 'select', required: false, active: true },
            { id: '5', name: 'hierarchy', label: 'Hierarquia', type: 'select', required: false, active: true },
            { id: '6', name: 'phone', label: 'Telefone', type: 'tel', required: false, active: true },
            { id: '7', name: 'linkedin', label: 'LinkedIn', type: 'url', required: false, active: true },
            { id: '8', name: 'instagram', label: 'Instagram', type: 'url', required: false, active: false },
            { id: '9', name: 'website', label: 'Website', type: 'url', required: false, active: true },
            { id: '10', name: 'title', label: 'Cargo', type: 'text', required: false, active: true },
            { id: '11', name: 'expertise', label: 'Especialidades', type: 'multiselect', required: false, active: true },
          ];
          
          resolve({
            success: true,
            data: defaultFields
          });
        }, 500);
      });
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao buscar campos do formulário'
      };
    }
  }

  async updateFormFields(fields: FormField[]): Promise<ApiResponse<FormField[]>> {
    try {
      // Simular chamada à API - em produção seria uma chamada real
      return new Promise((resolve) => {
        setTimeout(() => {
          // Simular sucesso na atualização
          resolve({
            success: true,
            data: fields,
            message: 'Campos atualizados com sucesso'
          });
        }, 1000);
      });
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao atualizar campos do formulário'
      };
    }
  }

  async toggleFieldStatus(fieldId: string, active: boolean): Promise<ApiResponse<boolean>> {
    try {
      // Simular chamada à API - em produção seria uma chamada real
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: active,
            message: `Campo ${active ? 'ativado' : 'desativado'} com sucesso`
          });
        }, 300);
      });
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao alterar status do campo'
      };
    }
  }

  // Método para implementação futura com chamadas reais à API
  private async makeApiCall(endpoint: string, options: RequestInit = {}): Promise<any> {
    const token = await this.getAuthToken();
    
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  private async getAuthToken(): Promise<string | null> {
    const { TOKEN_STORAGE_KEY } = await import('../constants/Config');
    const AsyncStorage = await import('@react-native-async-storage/async-storage');
    return await AsyncStorage.default.getItem(TOKEN_STORAGE_KEY);
  }
}

export default new FormFieldsService();
export type { FormField, ApiResponse };