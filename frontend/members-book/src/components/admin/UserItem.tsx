import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import HierarchyBadge from '../HierarchyBadge';
import type { AdminUser } from '../../types';

interface UserItemProps {
  user: AdminUser;
  onPress: (user: AdminUser) => void;
}

export const UserItem: React.FC<UserItemProps> = ({ user, onPress }) => {
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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatLastActive = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Agora';
    } else if (diffInHours < 24) {
      return `${diffInHours}h atrás`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d atrás`;
    }
  };

  return (
    <TouchableOpacity
      style={styles.userItem}
      onPress={() => onPress(user)}
      activeOpacity={0.7}
    >
      <View style={styles.userInfo}>
        <View style={styles.userHeader}>
          <Text style={styles.userName}>{user.name}</Text>
          <View style={styles.userBadges}>
            <HierarchyBadge hierarchy={user.tier} size="small" />
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(user.status) }]}>
              <Text style={styles.statusText}>{getStatusText(user.status)}</Text>
            </View>
          </View>
        </View>
        
        <Text style={styles.userEmail}>{user.email}</Text>
        
        <View style={styles.userStats}>
          <Text style={styles.userStat}>Entrou: {formatDate(user.joinDate)}</Text>
          <Text style={styles.userStat}>Último acesso: {formatLastActive(user.lastActive)}</Text>
        </View>
        
        <View style={styles.userMetrics}>
          <View style={styles.userMetric}>
            <Ionicons name="calendar-outline" size={14} color={Colors.text.secondary} />
            <Text style={styles.userMetricText}>{user.eventsAttended} eventos</Text>
          </View>
          <View style={styles.userMetric}>
            <Ionicons name="people-outline" size={14} color={Colors.text.secondary} />
            <Text style={styles.userMetricText}>{user.connections} conexões</Text>
          </View>
        </View>
      </View>
      
      <Ionicons name="chevron-forward" size={20} color={Colors.text.secondary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  userItem: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userInfo: {
    flex: 1,
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    flex: 1,
  },
  userBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  userEmail: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 8,
  },
  userStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  userStat: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
  userMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  userMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  userMetricText: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
});