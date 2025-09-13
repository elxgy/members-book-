import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import HierarchyBadge from '../HierarchyBadge';
import type { Member } from '../../types';

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2;

interface MemberCardProps {
  member: Member;
  onPress?: (member: Member) => void;
  onConnect?: (memberId: string) => void;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, onPress, onConnect }) => {
  const handlePress = () => {
    onPress?.(member);
  };

  const handleConnect = () => {
    onConnect?.(member.id);
  };

  return (
    <TouchableOpacity 
      style={styles.memberCard} 
      activeOpacity={0.8}
      onPress={handlePress}
    >
      <View style={styles.cardHeader}>
        <View style={styles.avatarContainer}>
          {member.avatar ? (
            <Image source={{ uri: member.avatar }} style={styles.avatar} />
          ) : (
            <View style={[
              styles.avatarPlaceholder, 
              { backgroundColor: member.hierarchy === 'socios' ? Colors.socios.background : 
                                 member.hierarchy === 'infinity' ? Colors.infinity.background : 
                                 Colors.disruption.background }
            ]}>
              <Text style={styles.avatarText}>{member.name.charAt(0)}</Text>
            </View>
          )}
          {member.isOnline && <View style={styles.onlineIndicator} />}
        </View>
        <HierarchyBadge hierarchy={member.hierarchy} size="small" />
      </View>
      
      <View style={styles.cardContent}>
        <Text style={styles.memberName} numberOfLines={1}>{member.name}</Text>
        <Text style={styles.memberTitle} numberOfLines={1}>{member.title}</Text>
        <Text style={styles.memberCompany} numberOfLines={1}>{member.company}</Text>
        
        <View style={styles.expertiseContainer}>
          {member.expertise?.slice(0, 2).map((skill, index) => (
            <View key={index} style={styles.expertiseTag}>
              <Text style={styles.expertiseText}>{skill}</Text>
            </View>
          )) || null}
        </View>
        
        <View style={styles.cardFooter}>
          <View style={styles.connectionsContainer}>
            <Ionicons name="people-outline" size={14} color={Colors.textSecondary} />
            <Text style={styles.connectionsText}>{member.connections}</Text>
          </View>
          <TouchableOpacity 
            style={styles.connectButton}
            onPress={handleConnect}
            activeOpacity={0.7}
          >
            <Ionicons name="add-outline" size={16} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  memberCard: {
    width: cardWidth,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textOnPrimary,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.metallicGold,
    borderWidth: 2,
    borderColor: Colors.backgroundSecondary,
  },
  cardContent: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  memberTitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  memberCompany: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  expertiseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  expertiseTag: {
    backgroundColor: Colors.backgroundSecondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 6,
    marginBottom: 4,
  },
  expertiseText: {
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  connectionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  connectionsText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 4,
    fontWeight: '500',
  },
  connectButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MemberCard;