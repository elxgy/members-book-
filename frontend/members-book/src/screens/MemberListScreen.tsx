import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Image } from 'react-native'
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import { Colors } from "../constants/Colors"
import { members } from "../data/members"
import type { Member } from "../types"
import { useUser } from "../context/UserContext"

export default function MemberListScreen({ route, navigation }: any) {
  const { sector } = route.params
  const { isGuest } = useUser()
  const isGuestUser = isGuest()

  const sectorMembers = members.filter((member) => member.sector === sector)

  const getHierarchyColors = (hierarchy: string) => {
    switch (hierarchy) {
      case "socios":
        return Colors.socios
      case "infinity":
        return Colors.infinity
      case "disruption":
        return Colors.disruption
      default:
        return Colors.socios
    }
  }

  const getHierarchyLabel = (hierarchy: string) => {
    switch (hierarchy) {
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

  const renderMemberItem = ({ item }: { item: Member }) => {
    const hierarchyColors = getHierarchyColors(item.hierarchy)

    return (
      <TouchableOpacity
        style={[styles.memberCard, { borderColor: hierarchyColors.text }]}
        onPress={() => navigation.navigate("MemberProfile", { member: item })}
        disabled={isGuestUser}
      >
        <LinearGradient
          colors={[hierarchyColors.background, hierarchyColors.background + "dd"]}
          style={styles.memberGradient}
        >
          <View style={styles.memberHeader}>
            <View style={styles.avatarContainer}>
              {item.photo ? (
                <Image source={{ uri: item.photo }} style={styles.avatar} />
              ) : (
                <View style={[styles.avatarPlaceholder, { backgroundColor: hierarchyColors.text }]}>
                  <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
                </View>
              )}
            </View>
            <View style={styles.memberInfo}>
              <Text style={[styles.memberName, { color: hierarchyColors.text }]}>{item.name}</Text>
              <Text style={[styles.memberCompany, { color: hierarchyColors.text }]}>{item.company}</Text>
              <View style={[styles.hierarchyBadge, { backgroundColor: hierarchyColors.text }]}>
                <Text style={[styles.hierarchyText, { color: hierarchyColors.background }]}>
                  {getHierarchyLabel(item.hierarchy)}
                </Text>
              </View>
            </View>
          </View>
          {!isGuestUser && <Ionicons name="chevron-forward" size={20} color={hierarchyColors.text} />}
        </LinearGradient>
      </TouchableOpacity>
    )
  }

  return (
    <LinearGradient colors={[Colors.primary, "#2c3e50"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={Colors.white} />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>{sector}</Text>
            <Text style={styles.headerSubtitle}>{sectorMembers.length} membros</Text>
          </View>
        </View>

        {/* Member List */}
        {sectorMembers.length > 0 ? (
          <FlatList
            data={sectorMembers}
            renderItem={renderMemberItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="people-outline" size={64} color={Colors.white} opacity={0.5} />
            <Text style={styles.emptyText}>Nenhum membro encontrado neste setor</Text>
          </View>
        )}

        {isGuestUser && (
          <View style={styles.guestNotice}>
            <Text style={styles.guestText}>Como convidado, você pode visualizar os perfis mas não interagir</Text>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    marginRight: 15,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.white,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.white,
    opacity: 0.8,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  memberCard: {
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 2,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  memberGradient: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  memberHeader: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatarContainer: {
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  memberCompany: {
    fontSize: 14,
    marginBottom: 8,
  },
  hierarchyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  hierarchyText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.white,
    textAlign: "center",
    marginTop: 20,
    opacity: 0.8,
  },
  guestNotice: {
    backgroundColor: Colors.gold,
    padding: 12,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 8,
  },
  guestText: {
    fontSize: 12,
    color: Colors.primary,
    textAlign: "center",
    fontWeight: "500",
  },
})
