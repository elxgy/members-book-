import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  Alert,
  Modal,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Text from '../components/Text';
import Icon from 'react-native-vector-icons/FontAwesome';
import type { AdminUser } from '../types';

// Mock data para usuários
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
];

interface UserManagementScreenProps {
  navigation: any;
}

const UserManagementScreen: React.FC<UserManagementScreenProps> = ({ navigation }) => {
  const [users, setUsers] = useState<AdminUser[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    tier: 'disruption' as 'disruption' | 'infinity' | 'socios',
  });

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteUser = (userId: string, userName: string) => {
    Alert.alert(
      'Confirmar Exclusão',
      `Tem certeza que deseja excluir o usuário ${userName}? Esta ação não pode ser desfeita.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setUsers(users.filter(user => user.id !== userId));
            Alert.alert('Sucesso', `Usuário ${userName} foi excluído com sucesso.`);
          },
        },
      ]
    );
  };

  const handleAddUser = () => {
    if (!newUser.name.trim() || !newUser.email.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Verificar se email já existe
    if (users.some(user => user.email.toLowerCase() === newUser.email.toLowerCase())) {
      Alert.alert('Erro', 'Este email já está cadastrado.');
      return;
    }

    const newUserData: AdminUser = {
      id: Date.now().toString(),
      name: newUser.name,
      email: newUser.email,
      tier: newUser.tier,
      status: 'pending',
      joinDate: new Date(),
      lastActive: new Date(),
      eventsAttended: 0,
      connections: 0,
    };

    setUsers([...users, newUserData]);
    setNewUser({ name: '', email: '', tier: 'disruption' });
    setShowAddModal(false);
    Alert.alert('Sucesso', `Usuário ${newUser.name} foi adicionado com sucesso.`);
  };

  const renderUserItem = ({ item }: { item: AdminUser }) => (
    <View style={styles.userItem}>
      <View style={styles.userInfo}>
        <View style={styles.userAvatar}>
          <Text style={styles.userAvatarText} variant="body">
            {item.name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={styles.userDetails}>
          <Text style={styles.userName} variant="body">{item.name}</Text>
          <Text style={styles.userEmail} variant="caption">{item.email}</Text>
          <View style={styles.userMeta}>
            <View style={[styles.tierBadge, { backgroundColor: getTierColor(item.tier) }]}>
              <Text style={styles.tierText} variant="caption">{item.tier.toUpperCase()}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
              <Text style={styles.statusText} variant="caption">{getStatusText(item.status)}</Text>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteUser(item.id, item.name)}
        activeOpacity={0.7}
      >
        <Icon name="trash" size={18} color="#E74C3C" />
       </TouchableOpacity>
      </View>
    );

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'socios': return '#D4AF37';
      case 'infinity': return '#8A2BE2';
      case 'disruption': return '#2E8B57';
      default: return '#666666';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#4CAF50';
      case 'pending': return '#FF9800';
      case 'inactive': return '#f02416';
      default: return '#666666';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'pending': return 'Pendente';
      case 'suspended': return 'Suspenso';
      default: return status;
    }
  };

  const renderAddUserModal = () => (
    <Modal
      visible={showAddModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowAddModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle} variant="h3">Adicionar Usuário</Text>
            <TouchableOpacity
              onPress={() => setShowAddModal(false)}
              style={styles.closeButton}
            >
              <Icon name="times" size={20} color="#333" />
            </TouchableOpacity>
          </View>

          <View style={styles.modalBody}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel} variant="body">Nome</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite o nome do usuário"
                placeholderTextColor="#666"
                value={newUser.name}
                onChangeText={(text) => setNewUser({ ...newUser, name: text })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel} variant="body">Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite o email do usuário"
                placeholderTextColor="#666"
                value={newUser.email}
                onChangeText={(text) => setNewUser({ ...newUser, email: text })}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel} variant="body">Tier</Text>
              <View style={styles.tierSelector}>
                {(['disruption', 'infinity', 'socios'] as const).map((tier) => (
                  <TouchableOpacity
                    key={tier}
                    style={[
                      styles.tierOption,
                      newUser.tier === tier && styles.tierOptionSelected
                    ]}
                    onPress={() => setNewUser({ ...newUser, tier })}
                  >
                    <Text style={[
                      styles.tierOptionText,
                      newUser.tier === tier && styles.tierOptionTextSelected
                    ]}>
                      {tier.toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowAddModal(false)}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelButtonText} variant="body">Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleAddUser}
              activeOpacity={0.7}
            >
              <Text style={styles.confirmButtonText} variant="body">Adicionar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={20} color="#D4AF37" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} variant="h2">GERENCIAR USUÁRIOS</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.sectionTitle} variant="h3">
            Usuários da Plataforma
          </Text>
          <Text style={styles.sectionDescription} variant="body">
            Gerencie os usuários cadastrados na plataforma. Adicione novos usuários ou remova usuários existentes.
          </Text>

          {/* Search and Add Button */}
          <View style={styles.topSection}>
            <View style={styles.searchContainer}>
              <Icon name="search" size={16} color="#666" />
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar usuários..."
                placeholderTextColor="#666"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <TouchableOpacity
              style={styles.addUserButton}
              onPress={() => setShowAddModal(true)}
              activeOpacity={0.7}
            >
              <Icon name="plus" size={16} color="#FFFFFF" />
              <Text style={styles.addUserButtonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>

          {/* Users List */}
          <View style={styles.usersContainer}>
            <Text style={styles.usersCount}>
              {filteredUsers.length} usuário{filteredUsers.length !== 1 ? 's' : ''} encontrado{filteredUsers.length !== 1 ? 's' : ''}
            </Text>
            {filteredUsers.map((item, index) => (
              <View key={item.id}>
                {renderUserItem({ item })}
                {index < filteredUsers.length - 1 && <View style={styles.separator} />}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {renderAddUserModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D4AF37',
    textAlign: 'center',
    flex: 1,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 24,
    lineHeight: 20,
  },
  topSection: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333333',
    marginLeft: 8,
  },
  addUserButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D4AF37',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  addUserButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  usersContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
  },
  usersCount: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 16,
    fontWeight: '500',
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D4AF37',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userAvatarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 12,
    color: '#999999',
  },
  userMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  tierBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tierText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#FFE6E6',
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: 20,
    maxHeight: '80%',
    width: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333333',
    backgroundColor: '#FFFFFF',
  },
  tierSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  tierOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  tierOptionSelected: {
    backgroundColor: '#D4AF37',
    borderColor: '#D4AF37',
  },
  tierOptionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
  },
  tierOptionTextSelected: {
    color: '#FFFFFF',
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#666666',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#D4AF37',
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default UserManagementScreen;