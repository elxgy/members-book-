import React from 'react'

import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Colors } from "../constants/Colors"
import { useUser } from "../context/UserContext"
import type { UserType } from "../types"

interface UserTypeGuardProps {
  allowedTypes: UserType[]
  children: React.ReactNode
  fallbackMessage?: string
  showUpgrade?: boolean
}

export default function UserTypeGuard({
  allowedTypes,
  children,
  fallbackMessage,
  showUpgrade = false,
}: UserTypeGuardProps) {
  const { user, isAdmin, isMember, isGuest } = useUser()
  const isGuestUser = isGuest()
  const isMemberUser = isMember()

  const hasAccess = user && allowedTypes.includes(user.userType)

  if (hasAccess) {
    return <>{children}</>
  }

  const getDefaultMessage = () => {
    if (isGuestUser) return "Faça login como membro para acessar esta funcionalidade"
    if (isMemberUser && allowedTypes.includes("admin")) return "Apenas administradores podem acessar esta funcionalidade"
    return "Você não tem permissão para acessar esta funcionalidade"
  }

  return (
    <View style={styles.container}>
      <Ionicons name="lock-closed" size={48} color={Colors.gold} />
      <Text style={styles.message}>{fallbackMessage || getDefaultMessage()}</Text>
      {showUpgrade && isGuestUser && (
        <TouchableOpacity style={styles.upgradeButton}>
          <Text style={styles.upgradeText}>Fazer Login</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  message: {
    fontSize: 16,
    color: Colors.white,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
    opacity: 0.9,
  },
  upgradeButton: {
    backgroundColor: Colors.gold,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  upgradeText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: "bold",
  },
})
