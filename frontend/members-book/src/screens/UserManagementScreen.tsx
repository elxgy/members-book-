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
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import { Colors } from '../constants/Colors';
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
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
        <View style={styles.userMeta}>
          <View style={[styles.tierBadge, { backgroundColor: getTierColor(item.tier) }]}>
            <Text style={styles.tierText}>{item.tier.toUpperCase()}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteUser(item.id, item.name)}
        activeOpacity={0.7}
      >
        <Ionicons name="trash-outline" size={20} color="#FF4444" />
      </TouchableOpacity>
    </View>
  );

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'socios': return Colors.metallicGold;
      case 'infinity': return Colors.primary;
      case 'disruption': return Colors.secondary;
      default: return Colors.textSecondary;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#28A745';
      case 'pending': return '#FFC107';
      case 'suspended': return '#DC3545';
      default: return Colors.textSecondary;
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
            <Text style={styles.modalTitle}>Adicionar Novo Usuário</Text>
            <TouchableOpacity
              onPress={() => setShowAddModal(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nome *</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite o nome completo"
                placeholderTextColor={Colors.textSecondary}
                value={newUser.name}
                onChangeText={(text) => setNewUser({ ...newUser, name: text })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email *</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite o email"
                placeholderTextColor={Colors.textSecondary}
                value={newUser.email}
                onChangeText={(text) => setNewUser({ ...newUser, email: text })}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Tier</Text>
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

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowAddModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddUser}
            >
              <Text style={styles.addButtonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.textOnPrimary} />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Gerenciar Usuários</Text>
            <Text style={styles.headerSubtitle}>Adicionar e remover usuários da plataforma</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Search and Add Button */}
        <View style={styles.topSection}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={Colors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar usuários..."
              placeholderTextColor={Colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity
            style={styles.addUserButton}
            onPress={() => setShowAddModal(true)}
            activeOpacity={0.7}
          >
            <Ionicons name="add" size={20} color={Colors.white} />
            <Text style={styles.addUserButtonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>

        {/* Users List */}
        <View style={styles.usersList}>
          <Text style={styles.usersCount}>
            {filteredUsers.length} usuário{filteredUsers.length !== 1 ? 's' : ''} encontrado{filteredUsers.length !== 1 ? 's' : ''}
          </Text>
          <FlatList
            data={filteredUsers}
            renderItem={renderUserItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      </View>

      {renderAddUserModal()}
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
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  headerTextContainer: {
    flex: 1,
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
    padding: 20,
  },
  topSection: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 12,
  },
  searchContainer: {
    flex: 1,
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
  addUserButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  addUserButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  usersList: {
    flex: 1,
  },
  usersCount: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  listContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
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
    color: Colors.white,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.white,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#FFE6E6',
  },
  separator: {
    height: 1,
    backgroundColor: Colors.backgroundSecondary,
    marginHorizontal: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 16,
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
    borderBottomColor: Colors.backgroundSecondary,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  closeButton: {
    padding: 4,
  },
  formContainer: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.backgroundSecondary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.text,
    backgroundColor: Colors.white,
  },
  tierSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  tierOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.backgroundSecondary,
    alignItems: 'center',
  },
  tierOptionSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  tierOptionText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  tierOptionTextSelected: {
    color: Colors.white,
  },
  modalActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.backgroundSecondary,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.textSecondary,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  addButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
});

export default UserManagementScreen;