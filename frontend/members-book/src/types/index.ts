// Tipos principais da aplicação

export interface Member {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  joinDate: string;
  isActive: boolean;
  hierarchy: 'socios' | 'infinity' | 'disruption';
  title: string;
  company: string;
  expertise?: string[];
  connections: number;
  isOnline: boolean;
}

export type FilterType = 'all' | 'socios' | 'infinity' | 'disruption';

export interface SearchFilterType {
  search: string;
  role?: string;
  status?: 'active' | 'inactive' | 'all';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

// Tipos de navegação
export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};