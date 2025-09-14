import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text';
import { Colors } from '../constants/Colors';

interface HierarchyBadgeProps {
  hierarchy: 'socios' | 'infinity' | 'disruption';
  size?: 'small' | 'medium' | 'large';
}

const HierarchyBadge: React.FC<HierarchyBadgeProps> = ({ hierarchy, size = 'medium' }) => {
  const getHierarchyConfig = () => {
    switch (hierarchy) {
      case 'socios':
        return {
          backgroundColor: Colors.socios.background,
          textColor: Colors.socios.text,
          label: 'SÓCIOS',
        };
      case 'infinity':
        return {
          backgroundColor: Colors.infinity.background,
          textColor: Colors.infinity.text,
          label: 'INFINITY',
        };
      case 'disruption':
        return {
          backgroundColor: Colors.disruption.background,
          textColor: Colors.disruption.text,
          label: 'DISRUPTION',
        };
      default:
        return {
          backgroundColor: Colors.primary,
          textColor: Colors.textOnPrimary,
          label: 'MEMBER',
        };
    }
  };

  const config = getHierarchyConfig();
  const sizeStyles = getSizeStyles(size);

  return (
    <View style={[
      styles.badge,
      sizeStyles.container,
      { backgroundColor: config.backgroundColor }
    ]}>
      <Text style={[
        styles.badgeText,
        sizeStyles.text,
        { color: config.textColor }
      ]} variant="caption">
        {config.label}
      </Text>
    </View>
  );
};

const getSizeStyles = (size: 'small' | 'medium' | 'large') => {
  switch (size) {
    case 'small':
      return {
        container: { paddingHorizontal: 6, paddingVertical: 2 },
        text: { fontSize: 8 },
      };
    case 'large':
      return {
        container: { paddingHorizontal: 12, paddingVertical: 6 },
        text: { fontSize: 12 },
      };
    default: // medium
      return {
        container: { paddingHorizontal: 8, paddingVertical: 4 },
        text: { fontSize: 10 },
      };
  }
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default HierarchyBadge;