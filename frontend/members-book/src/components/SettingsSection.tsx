import React from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import type { SettingItem, SettingsSectionProps } from '../types';

const SettingRow: React.FC<{ item: SettingItem }> = ({ item }) => {
  const renderRightElement = () => {
    switch (item.type) {
      case 'toggle':
        return (
          <Switch
            value={item.value || false}
            onValueChange={item.onToggle}
            trackColor={{ false: Colors.lightGray, true: Colors.primary }}
            thumbColor={item.value ? Colors.white : Colors.darkGray}
          />
        );
      case 'navigation':
        return <Ionicons name="chevron-forward" size={20} color={Colors.darkGray} />;
      case 'action':
        return null;
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={item.onPress}
      disabled={item.type === 'toggle'}
    >
      <View style={styles.settingLeft}>
        <View style={styles.settingIcon}>
          <Ionicons name={item.icon as any} size={20} color={Colors.primary} />
        </View>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{item.title}</Text>
          {item.subtitle && (
            <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
          )}
        </View>
      </View>
      {renderRightElement()}
    </TouchableOpacity>
  );
};

export const SettingsSection: React.FC<SettingsSectionProps> = ({ settings }) => {
  return (
    <View style={styles.settingsContainer}>
      <Text style={styles.sectionTitle}>Configurações</Text>
      <View style={styles.settingsCard}>
        {settings.map((item, index) => (
          <View key={item.id}>
            <SettingRow item={item} />
            {index < settings.length - 1 && <View style={styles.separator} />}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  settingsContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 15,
  },
  settingsCard: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  settingSubtitle: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.border,
    marginLeft: 68,
  },
});