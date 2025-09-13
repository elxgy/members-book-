import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import type { SystemMetric } from '../../types';

interface MetricCardProps {
  metric: SystemMetric;
}

export const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  return (
    <View style={styles.metricCard}>
      <View style={styles.metricHeader}>
        <Ionicons name={metric.icon as any} size={24} color={Colors.primary} />
        <View style={[
          styles.trendIndicator,
          { backgroundColor: metric.trend === 'up' ? '#28A745' : metric.trend === 'down' ? '#DC3545' : Colors.text.secondary }
        ]}>
          <Ionicons 
            name={metric.trend === 'up' ? 'trending-up' : metric.trend === 'down' ? 'trending-down' : 'remove'} 
            size={12} 
            color={Colors.white} 
          />
        </View>
      </View>
      <Text style={styles.metricValue}>{metric.value}</Text>
      <Text style={styles.metricTitle}>{metric.title}</Text>
      <Text style={[
        styles.metricChange,
        { color: metric.trend === 'up' ? '#28A745' : metric.trend === 'down' ? '#DC3545' : Colors.text.secondary }
      ]}>
        {metric.change}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  metricCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    minWidth: 140,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  trendIndicator: {
    borderRadius: 8,
    padding: 4,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  metricTitle: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  metricChange: {
    fontSize: 12,
    fontWeight: '600',
  },
});