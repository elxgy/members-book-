import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import type { ProfileCardProps } from '../types';

export const ProfileCard: React.FC<ProfileCardProps> = ({ user, profileImageUri, onEditPress }) => {
  return (
    <View style={styles.profileCard}>
      <View style={styles.profileImageContainer}>
        <View style={styles.profileImage}>
          <Text style={styles.profileImageText}>
            {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </Text>
        </View>
        <TouchableOpacity onPress={onEditPress} style={styles.editImageButton}>
          <Ionicons name="camera" size={16} color={Colors.textOnPrimary} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.profileInfo}>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        <View style={styles.hierarchyBadge}>
          <Text style={styles.hierarchyText}>
            {user.memberHierarchy?.toUpperCase() || 'MEMBRO'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: Colors.backgroundSecondary,
    marginHorizontal: 20,
    marginTop: -40,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.text,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.textOnPrimary,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.metallicGold,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.textOnPrimary,
  },
  profileInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 10,
  },
  hierarchyBadge: {
    backgroundColor: Colors.hierarchy.member.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  hierarchyText: {
    color: Colors.textOnPrimary,
    fontSize: 12,
    fontWeight: 'bold',
  },
});