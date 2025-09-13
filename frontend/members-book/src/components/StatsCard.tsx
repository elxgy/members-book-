import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import type { StatsCardProps } from '../types';

interface StatItemProps {
  icon: string;
  value: string;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon, value, label }) => (
  <View style={styles.statItem}>
    <Ionicons name={icon as any} size={24} color={Colors.text} />
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

export const StatsCard: React.FC<StatsCardProps> = ({ title = "Estatísticas", stats }) => {
  const defaultStats = [
    { icon: 'people-outline', value: '150', label: 'Conexões' },
    { icon: 'chatbubbles-outline', value: '45', label: 'Conversas' },
    { icon: 'trophy-outline', value: '12', label: 'Conquistas' },
  ];
  
  const displayStats = stats || defaultStats;
  return (
    <View style={styles.statsContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.statsCard}>
        {displayStats.map((stat, index) => (
          <StatItem 
            key={index}
            icon={stat.icon} 
            value={stat.value} 
            label={stat.label} 
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 15,
  },
  statsCard: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
      fontWeight: 'bold',
      color: Colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
});