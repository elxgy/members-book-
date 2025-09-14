import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import { Colors } from '../constants/Colors';
import { useUser } from '../context/UserContext';
import { MetricCard } from '../components/admin/MetricCard';
import { ActionCard } from '../components/admin/ActionCard';
import { UserItem } from '../components/admin/UserItem';
import { UserModal } from '../components/admin/UserModal';
import type { AdminUser, AdminAction, SystemMetric, StatusFilterType } from '../types';
import { useNavigation } from '@react-navigation/native';



// Mock data
const mockUsers: AdminUser[] = [
  {
    id: '1',
    name: 'Ana Silva',
    email: 'ana.silva@email.com',
    tier: 'infinity',
    status: 'active',
    joinDate: new Date('2024-01-15'),
    lastActive: new Date(),
    eventsAttended: 12,
    connections: 45,
  },
  {
    id: '2',
    name: 'Carlos Santos',
    email: 'carlos.santos@email.com',
    tier: 'disruption',
    status: 'active',
    joinDate: new Date('2023-11-20'),
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
    eventsAttended: 28,
    connections: 89,
  },
  {
    id: '3',
    name: 'Maria Oliveira',
    email: 'maria.oliveira@email.com',
    tier: 'socios',
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

const AdminScreen: React.FC = () => {
  const { user } = useUser();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<StatusFilterType>('all');
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const systemMetrics: SystemMetric[] = [
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

  const adminActions: AdminAction[] = [
    {
      id: '1',
      title: 'Gerenciar Eventos',
      description: 'Criar e administrar eventos',
      icon: 'calendar-outline',
      color: Colors.primary,
      onPress: () => Alert.alert('Em breve', 'Funcionalidade de gerenciamento de eventos em desenvolvimento.'),
    },
    {
      id: '2',
      title: 'Relatórios',
      description: 'Visualizar métricas e relatórios',
      icon: 'bar-chart-outline',
      color: Colors.metallicGold,
      onPress: () => Alert.alert('Em breve', 'Funcionalidade de relatórios em desenvolvimento.'),
    },
    {
      id: '3',
      title: 'Gerenciar Usuários',
      description: 'Adicionar e remover usuários',
      icon: 'people-outline',
      color: '#FF6B35',
      onPress: () => navigation.navigate('UserManagement' as never),
    },
    {
      id: '4',
      title: 'Configurações',
      description: 'Configurações do sistema',
      icon: 'settings-outline',
      color: Colors.secondary,
      onPress: () => Alert.alert('Em breve', 'Configurações do sistema em desenvolvimento.'),
    },
    {
      id: '5',
      title: 'Backup',
      description: 'Backup e restauração',
      icon: 'cloud-download-outline',
      color: '#28A745',
      onPress: () => Alert.alert('Em breve', 'Funcionalidade de backup em desenvolvimento.'),
    },
  ];

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || user.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });



  const handleUserAction = (action: 'edit' | 'suspend' | 'delete', user: AdminUser) => {
    let title = '';
    let message = '';
    
    switch (action) {
      case 'edit':
        title = 'Editar Usuário';
        message = `Editar informações do usuário ${user.name}?`;
        break;
      case 'suspend':
        title = 'Suspender Usuário';
        message = `Suspender o usuário ${user.name}?`;
        break;
      case 'delete':
        title = 'Excluir Usuário';
        message = `Excluir permanentemente o usuário ${user.name}? Esta ação não pode ser desfeita.`;
        break;
    }
    
    Alert.alert(title, message, [
      { text: 'Cancelar', style: 'cancel' },
      { 
        text: action === 'delete' ? 'Excluir' : 'Confirmar', 
        style: action === 'delete' ? 'destructive' : 'default',
        onPress: () => {
          Alert.alert('Sucesso', `Ação "${title}" executada com sucesso.`);
          setModalVisible(false);
        }
      },
    ]);
  };

  const renderMetricCard = ({ item }: { item: SystemMetric }) => (
    <MetricCard metric={item} />
  );

  const renderActionCard = ({ item }: { item: AdminAction }) => (
    <ActionCard action={item} />
  );

  const renderUserItem = ({ item }: { item: AdminUser }) => (
    <UserItem 
      user={item} 
      onPress={(user) => {
        setSelectedUser(user);
        setModalVisible(true);
      }} 
    />
  );

  const renderUserModal = () => (
    <UserModal
      visible={modalVisible}
      user={selectedUser}
      onClose={() => setModalVisible(false)}
      onAction={handleUserAction}
    />
  );

  // Check if user is admin
  if (user?.role !== 'admin') {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <LinearGradient
          colors={[Colors.primary, Colors.secondary]}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Acesso Negado</Text>
          <Text style={styles.headerSubtitle}>Área restrita para administradores</Text>
        </LinearGradient>
        
        <View style={styles.accessDenied}>
          <Ionicons name="shield-outline" size={80} color={Colors.text.secondary} />
          <Text style={styles.accessDeniedTitle}>Acesso Restrito</Text>
          <Text style={styles.accessDeniedText}>
            Esta área é exclusiva para administradores do sistema.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Administração</Text>
        <Text style={styles.headerSubtitle}>Painel de controle do sistema</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* System Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Métricas do Sistema</Text>
          <FlatList
            horizontal
            data={systemMetrics}
            renderItem={renderMetricCard}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.metricsContainer}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ações Rápidas</Text>
          <FlatList
            horizontal
            data={adminActions}
            renderItem={renderActionCard}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.actionsContainer}
          />
        </View>

        {/* User Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gerenciar Usuários</Text>
          
          {/* Search and Filter */}
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Ionicons name="search" size={20} color={Colors.textSecondary} />
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar usuários..."
                placeholderTextColor={Colors.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>
          
          {/* Filter Buttons */}
          <View style={styles.filterContainer}>
            {(['all', 'active', 'pending', 'suspended'] as const).map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  selectedFilter === filter && styles.filterButtonActive
                ]}
                onPress={() => setSelectedFilter(filter)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.filterButtonText,
                  selectedFilter === filter && styles.filterButtonTextActive
                ]}>
                  {filter === 'all' ? 'Todos' : 
                   filter === 'active' ? 'Ativos' :
                   filter === 'pending' ? 'Pendentes' : 'Suspensos'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Users List */}
          <View style={styles.usersList}>
            <FlatList
              data={filteredUsers}
              renderItem={renderUserItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={styles.userSeparator} />}
            />
          </View>
        </View>
      </ScrollView>
      
      {renderUserModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textOnPrimary,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.accent,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  metricsContainer: {
    paddingHorizontal: 20,
  },

  actionsContainer: {
    paddingHorizontal: 20,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    marginLeft: 8,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: Colors.backgroundSecondary,
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterButtonText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  filterButtonTextActive: {
    color: Colors.white,
  },
  usersList: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    borderRadius: 12,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  userSeparator: {
    height: 1,
    backgroundColor: Colors.backgroundSecondary,
    marginHorizontal: 16,
  },

  accessDenied: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  accessDeniedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 20,
    marginBottom: 12,
  },
  accessDeniedText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default AdminScreen;