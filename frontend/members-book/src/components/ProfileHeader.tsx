import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import type { ProfileHeaderProps } from '../types';

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ userName, onEditPress }) => {
  return (
    <LinearGradient
      colors={[Colors.primary, Colors.secondary]}
      style={styles.header}
    >
      <View style={styles.headerContent}>
        <Text style={styles.headerTitle}>Meu Perfil</Text>
        <TouchableOpacity onPress={onEditPress} style={styles.editButton}>
          <Ionicons name="create-outline" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.white,
  },
  editButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});