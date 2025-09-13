import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import { useUser } from "../context/UserContext"
import { Colors } from "../constants/Colors"

export default function HomeScreen({ navigation }: any) {
  const { user, isAdmin, isMember, isGuest } = useUser()
  const isAdminUser = isAdmin()
  const isMemberUser = isMember()
  const isGuestUser = isGuest()

  const getUserTypeLabel = () => {
    if (isAdminUser) return "Administrador"
    if (isMemberUser) return "Membro"
    if (isGuestUser) return "Convidado"
    return "Usuário"
  }

  const getHierarchyLabel = () => {
    if (!user?.memberHierarchy) return ""
    switch (user.memberHierarchy) {
      case "socios":
        return "Sócios"
      case "infinity":
        return "Infinity"
      case "disruption":
        return "Disruption"
      default:
        return ""
    }
  }

  return (
    <LinearGradient colors={[Colors.primary, "#2c3e50"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Bem-vindo ao</Text>
          <Text style={styles.titleText}>Member Book</Text>
          <Text style={styles.subtitleText}>Conectando empresários de sucesso</Text>
        </View>

        {/* User Info Card */}
        <View style={styles.userCard}>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name || "Usuário"}</Text>
            <Text style={styles.userType}>{getUserTypeLabel()}</Text>
            {user?.memberHierarchy && <Text style={styles.userHierarchy}>{getHierarchyLabel()}</Text>}
            {/* User company info would go here if available */}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <Text style={styles.sectionTitle}>Acesso Rápido</Text>

          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("Setores")}>
            <Ionicons name="grid" size={24} color={Colors.gold} />
            <Text style={styles.actionText}>Ver Setores</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.darkGray} />
          </TouchableOpacity>

          {isMemberUser && (
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="chatbubbles" size={24} color={Colors.gold} />
              <Text style={styles.actionText}>Mensagens</Text>
              <Ionicons name="chevron-forward" size={20} color={Colors.darkGray} />
            </TouchableOpacity>
          )}

          {isAdminUser && (
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="settings" size={24} color={Colors.gold} />
              <Text style={styles.actionText}>Gerenciar Membros</Text>
              <Ionicons name="chevron-forward" size={20} color={Colors.darkGray} />
            </TouchableOpacity>
          )}
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Estatísticas</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>22</Text>
              <Text style={styles.statLabel}>Setores</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>150+</Text>
              <Text style={styles.statLabel}>Membros</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 16,
    color: Colors.white,
    opacity: 0.8,
  },
  titleText: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.gold,
    marginVertical: 5,
  },
  subtitleText: {
    fontSize: 14,
    color: Colors.white,
    opacity: 0.7,
    textAlign: "center",
  },
  userCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userInfo: {
    alignItems: "center",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 5,
  },
  userType: {
    fontSize: 14,
    color: Colors.gold,
    fontWeight: "600",
  },
  userHierarchy: {
    fontSize: 12,
    color: Colors.darkGray,
    marginTop: 2,
  },
  userCompany: {
    fontSize: 14,
    color: Colors.primary,
    marginTop: 5,
  },
  actionsContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.white,
    marginBottom: 15,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionText: {
    flex: 1,
    fontSize: 16,
    color: Colors.primary,
    marginLeft: 12,
    fontWeight: "500",
  },
  statsContainer: {
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    flex: 0.48,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.gold,
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.primary,
  },
})
