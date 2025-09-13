import type { Member, ChatRoom, ChatMessage, AdminUser, SystemMetric, AdminAction } from '../types';

// Mock Members Data
export const mockMembers: Member[] = [
  {
    id: '1',
    name: 'Ana Silva',
    title: 'CEO',
    company: 'TechCorp',
    sector: 'TECNOLOGIA',
    hierarchy: 'socios',
    expertise: ['Tecnologia', 'Liderança'],
    connections: 150,
    isOnline: true,
    email: 'ana@techcorp.com',
  },
  {
    id: '2',
    name: 'Carlos Santos',
    title: 'CTO',
    company: 'InnovateHub',
    sector: 'TECNOLOGIA',
    hierarchy: 'infinity',
    expertise: ['Desenvolvimento', 'AI'],
    connections: 89,
    isOnline: false,
    email: 'carlos@innovatehub.com',
  },
  {
    id: '3',
    name: 'Maria Costa',
    title: 'Designer',
    company: 'CreativeStudio',
    sector: 'DESIGN',
    hierarchy: 'disruption',
    expertise: ['UX/UI', 'Branding'],
    connections: 67,
    isOnline: true,
    email: 'maria@creativestudio.com',
  },
  {
    id: '4',
    name: 'João Oliveira',
    title: 'Investidor',
    company: 'VentureCapital',
    sector: 'INVESTIMENTOS',
    hierarchy: 'socios',
    expertise: ['Investimentos', 'Startups'],
    connections: 200,
    isOnline: true,
    email: 'joao@venturecapital.com',
  },
];

// Mock Chat Rooms Data
export const mockChatRooms: ChatRoom[] = [
  {
    id: '1',
    name: 'Geral',
    lastMessage: 'Ótima apresentação hoje!',
    lastMessageTime: new Date(Date.now() - 5 * 60 * 1000),
    unreadCount: 3,
    participants: 45,
    isActive: true,
  },
  {
    id: '2',
    name: 'Tecnologia',
    lastMessage: 'Alguém já testou a nova API?',
    lastMessageTime: new Date(Date.now() - 30 * 60 * 1000),
    unreadCount: 1,
    participants: 12,
    isActive: false,
  },
  {
    id: '3',
    name: 'Networking',
    lastMessage: 'Evento na próxima semana',
    lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
    unreadCount: 0,
    participants: 28,
    isActive: false,
  },
];

// Mock Chat Messages Data
export const mockMessages: ChatMessage[] = [
  {
    id: '1',
    text: 'Bem-vindos ao chat geral!',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    senderId: 'system',
    senderName: 'Sistema',
    isOwn: false,
    type: 'system',
  },
  {
    id: '2',
    text: 'Olá pessoal! Como estão?',
    timestamp: new Date(Date.now() - 90 * 60 * 1000),
    senderId: '2',
    senderName: 'Ana Silva',
    isOwn: false,
    type: 'text',
  },
  {
    id: '3',
    text: 'Tudo bem! Animado para o evento de amanhã.',
    timestamp: new Date(Date.now() - 85 * 60 * 1000),
    senderId: '1',
    senderName: 'Você',
    isOwn: true,
    type: 'text',
  },
  {
    id: '4',
    text: 'Vai ser incrível! Já confirmaram a presença?',
    timestamp: new Date(Date.now() - 80 * 60 * 1000),
    senderId: '3',
    senderName: 'Carlos Santos',
    isOwn: false,
    type: 'text',
  },
];

// Mock Admin Users Data
export const mockAdminUsers: AdminUser[] = [
  {
    id: '1',
    name: 'Ana Silva',
    email: 'ana.silva@email.com',
    tier: 'socios',
    status: 'active',
    joinDate: new Date('2024-01-15'),
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
    eventsAttended: 12,
    connections: 45,
  },
  {
    id: '2',
    name: 'Carlos Santos',
    email: 'carlos.santos@email.com',
    tier: 'infinity',
    status: 'active',
    joinDate: new Date('2024-02-20'),
    lastActive: new Date(Date.now() - 30 * 60 * 1000),
    eventsAttended: 8,
    connections: 23,
  },
  {
    id: '3',
    name: 'Maria Costa',
    email: 'maria.costa@email.com',
    tier: 'disruption',
    status: 'pending',
    joinDate: new Date('2024-12-01'),
    lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000),
    eventsAttended: 2,
    connections: 8,
  },
  {
    id: '4',
    name: 'João Costa',
    email: 'joao.costa@email.com',
    tier: 'infinity',
    status: 'suspended',
    joinDate: new Date('2024-03-10'),
    lastActive: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    eventsAttended: 15,
    connections: 32,
  },
];

// Mock System Metrics Data
export const mockSystemMetrics: SystemMetric[] = [
  {
    id: '1',
    title: 'Total de Usuários',
    value: '1,247',
    change: '+12%',
    trend: 'up',
    icon: 'people',
  },
  {
    id: '2',
    title: 'Usuários Ativos',
    value: '892',
    change: '+8%',
    trend: 'up',
    icon: 'pulse',
  },
  {
    id: '3',
    title: 'Eventos Este Mês',
    value: '24',
    change: '+15%',
    trend: 'up',
    icon: 'calendar',
  },
  {
    id: '4',
    title: 'Aprovações Pendentes',
    value: '18',
    change: '-5%',
    trend: 'down',
    icon: 'hourglass',
  },
];

// Mock Admin Actions Data
export const mockAdminActions: AdminAction[] = [
  {
    id: '1',
    title: 'Gerenciar Eventos',
    description: 'Criar e administrar eventos',
    icon: 'calendar-outline',
    color: '#007AFF',
    onPress: () => console.log('Navigate to events management'),
  },
  {
    id: '2',
    title: 'Relatórios',
    description: 'Visualizar métricas e relatórios',
    icon: 'bar-chart-outline',
    color: '#FF9500',
    onPress: () => console.log('Navigate to reports'),
  },
  {
    id: '3',
    title: 'Configurações',
    description: 'Configurações do sistema',
    icon: 'settings-outline',
    color: '#5856D6',
    onPress: () => console.log('Navigate to settings'),
  },
  {
    id: '4',
    title: 'Backup',
    description: 'Backup e restauração',
    icon: 'cloud-download-outline',
    color: '#28A745',
    onPress: () => console.log('Navigate to backup'),
  },
];

// Helper functions for filtering mock data
export const filterMembers = (members: Member[], filters: { search?: string; hierarchy?: string }) => {
  return members.filter(member => {
    const matchesSearch = !filters.search || 
      member.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      member.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
      member.company.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesHierarchy = !filters.hierarchy || filters.hierarchy === 'all' || member.hierarchy === filters.hierarchy;
    
    return matchesSearch && matchesHierarchy;
  });
};

export const filterAdminUsers = (users: AdminUser[], filters: { search?: string; status?: string }) => {
  return users.filter(user => {
    const matchesSearch = !filters.search ||
      user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.email.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesStatus = !filters.status || filters.status === 'all' || user.status === filters.status;
    
    return matchesSearch && matchesStatus;
  });
};