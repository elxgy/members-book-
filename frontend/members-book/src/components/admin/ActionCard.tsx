import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import type { AdminAction } from '../../types';

interface ActionCardProps {
  action: AdminAction;
}

export const ActionCard: React.FC<ActionCardProps> = ({ action }) => {
  return (
    <TouchableOpacity
      style={styles.actionCard}
      onPress={action.onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
        <Ionicons name={action.icon as any} size={24} color={Colors.white} />
      </View>
      <Text style={styles.actionTitle}>{action.title}</Text>
      <Text style={styles.actionDescription}>{action.description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 12,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
});