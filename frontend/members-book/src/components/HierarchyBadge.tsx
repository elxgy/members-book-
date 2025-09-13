import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from "@expo/vector-icons"
import { Colors } from "../constants/Colors"
import type { MemberHierarchy } from "../types"

interface HierarchyBadgeProps {
  hierarchy: MemberHierarchy
  size?: "small" | "medium" | "large"
  showIcon?: boolean
}

export default function HierarchyBadge({ hierarchy, size = "medium", showIcon = true }: HierarchyBadgeProps) {
  const getHierarchyConfig = (hierarchy: MemberHierarchy) => {
    switch (hierarchy) {
      case "socios":
        return {
          label: "Sócios",
          colors: Colors.socios,
          icon: "star" as keyof typeof Ionicons.glyphMap,
        }
      case "infinity":
        return {
          label: "Infinity",
          colors: Colors.infinity,
          icon: "infinite" as keyof typeof Ionicons.glyphMap,
        }
      case "disruption":
        return {
          label: "Disruption",
          colors: Colors.disruption,
          icon: "flash" as keyof typeof Ionicons.glyphMap,
        }
      default:
        return {
          label: "Membro",
          colors: Colors.socios,
          icon: "person" as keyof typeof Ionicons.glyphMap,
        }
    }
  }

  const config = getHierarchyConfig(hierarchy)
  const sizeStyles = getSizeStyles(size)

  return (
    <View style={[styles.badge, { backgroundColor: config.colors.background }, sizeStyles.container]}>
      {showIcon && (
        <Ionicons name={config.icon} size={sizeStyles.iconSize} color={config.colors.text} style={styles.icon} />
      )}
      <Text style={[styles.text, { color: config.colors.text }, sizeStyles.text]}>{config.label}</Text>
    </View>
  )
}

const getSizeStyles = (size: "small" | "medium" | "large") => {
  switch (size) {
    case "small":
      return {
        container: { paddingHorizontal: 8, paddingVertical: 4 },
        text: { fontSize: 12 },
        iconSize: 12,
      }
    case "large":
      return {
        container: { paddingHorizontal: 16, paddingVertical: 8 },
        text: { fontSize: 16 },
        iconSize: 18,
      }
    default:
      return {
        container: { paddingHorizontal: 12, paddingVertical: 6 },
        text: { fontSize: 14 },
        iconSize: 16,
      }
  }
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
  },
  icon: {
    marginRight: 4,
  },
  text: {
    fontWeight: "bold",
  },
})
