import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import HierarchyBadge from '../HierarchyBadge';
import type { AdminUser } from '../../types';

interface UserModalProps {
  visible: boolean;
  user: AdminUser | null;
  onClose: () => void;
  onAction?: (action: 'delete' | 'suspend' | 'edit', user: AdminUser) => void;
}

export const UserModal: React.FC<UserModalProps> = ({ visible, user, onClose, onAction }) => {
  if (!user) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#28A745';
      case 'pending':
        return Colors.accent;
      case 'suspended':
        return '#DC3545';
      default:
        return Colors.text.secondary;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'pending':
        return 'Pendente';
      case 'suspended':
        return 'Suspenso';
      default:
        return status;
    }
  };

  const handleUserAction = (action: 'approve' | 'suspend' | 'activate' | 'delete') => {
    let title = '';
    let message = '';
    
    switch (action) {
      case 'approve':
        title = 'Aprovar Usuário';
        message = `Aprovar o usuário ${user.name}?`;
        break;
      case 'suspend':
        title = 'Suspender Usuário';
        message = `Suspender o usuário ${user.name}?`;
        break;
      case 'activate':
        title = 'Ativar Usuário';
        message = `Ativar o usuário ${user.name}?`;
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
          onClose();
        }
      },
    ]);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Gerenciar Usuário</Text>
            <TouchableOpacity
              onPress={onClose}
              style={styles.modalCloseButton}
            >
              <Ionicons name="close" size={24} color={Colors.text.secondary} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.modalUserInfo}>
            <Text style={styles.modalUserName}>{user.name}</Text>
            <Text style={styles.modalUserEmail}>{user.email}</Text>
            <View style={styles.modalUserBadges}>
              <HierarchyBadge hierarchy={user.tier} size="medium" />
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(user.status) }]}>
                <Text style={styles.statusText}>{getStatusText(user.status)}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.modalActions}>
            {user.status === 'pending' && (
              <TouchableOpacity
                style={[styles.modalActionButton, { backgroundColor: '#28A745' }]}
                onPress={() => handleUserAction('approve')}
              >
                <Ionicons name="checkmark" size={20} color={Colors.white} />
                <Text style={styles.modalActionText}>Aprovar</Text>
              </TouchableOpacity>
            )}
            
            {user.status === 'active' && (
              <TouchableOpacity
                style={[styles.modalActionButton, { backgroundColor: Colors.accent }]}
                onPress={() => handleUserAction('suspend')}
              >
                <Ionicons name="pause" size={20} color={Colors.white} />
                <Text style={styles.modalActionText}>Suspender</Text>
              </TouchableOpacity>
            )}
            
            {user.status === 'suspended' && (
              <TouchableOpacity
                style={[styles.modalActionButton, { backgroundColor: '#28A745' }]}
                onPress={() => handleUserAction('activate')}
              >
                <Ionicons name="play" size={20} color={Colors.white} />
                <Text style={styles.modalActionText}>Ativar</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity
              style={[styles.modalActionButton, { backgroundColor: '#DC3545' }]}
              onPress={() => handleUserAction('delete')}
            >
              <Ionicons name="trash" size={20} color={Colors.white} />
              <Text style={styles.modalActionText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  modalCloseButton: {
    padding: 4,
  },
  modalUserInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  modalUserName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  modalUserEmail: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 12,
  },
  modalUserBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.white,
  },
  modalActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  modalActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  modalActionText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
});