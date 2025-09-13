import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image, Linking, Alert } from 'react-native'
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import { Colors } from "../constants/Colors"
import type { Member } from "../types"
import { useUser } from "../context/UserContext"

export default function MemberProfileScreen({ route, navigation }: any) {
  const { member }: { member: Member } = route.params
  const { isGuest, isMember } = useUser()
  const isGuestUser = isGuest()
  const isMemberUser = isMember()

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

  const hierarchyColors = getHierarchyColors(member.hierarchy)

  const handleContact = (type: string, value?: string) => {
    if (isGuestUser) {
      Alert.alert("Acesso Restrito", "Faça login como membro para entrar em contato.")
      return
    }

    if (!value) return

    switch (type) {
      case "email":
        Linking.openURL(`mailto:${value}`)
        break
      case "phone":
        Linking.openURL(`tel:${value}`)
        break
      case "linkedin":
        Linking.openURL(`https://linkedin.com/in/${value}`)
        break
      case "instagram":
        Linking.openURL(`https://instagram.com/${value}`)
        break
      case "website":
        Linking.openURL(value.startsWith("http") ? value : `https://${value}`)
        break
    }
  }

  const handleMessage = () => {
    if (isGuestUser) {
      Alert.alert("Acesso Restrito", "Faça login como membro para enviar mensagens.")
      return
    }
    Alert.alert("Mensagem", "Funcionalidade de mensagens será implementada em breve.")
  }

  return (
    <LinearGradient colors={[hierarchyColors.background, hierarchyColors.background + "dd"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={hierarchyColors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: hierarchyColors.text }]}>Perfil do Membro</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              {member.photo ? (
                <Image source={{ uri: member.photo }} style={styles.avatar} />
              ) : (
                <View style={[styles.avatarPlaceholder, { backgroundColor: hierarchyColors.text }]}>
                  <Text style={[styles.avatarText, { color: hierarchyColors.background }]}>
                    {member.name.charAt(0)}
                  </Text>
                </View>
              )}
            </View>

            <Text style={[styles.memberName, { color: hierarchyColors.text }]}>{member.name}</Text>
            <Text style={[styles.memberCompany, { color: hierarchyColors.text }]}>{member.company}</Text>

            <View style={[styles.hierarchyBadge, { backgroundColor: hierarchyColors.text }]}>
              <Ionicons name="star" size={16} color={hierarchyColors.background} />
              <Text style={[styles.hierarchyText, { color: hierarchyColors.background }]}>
                {getHierarchyLabel(member.hierarchy)}
              </Text>
            </View>

            <View style={[styles.sectorBadge, { borderColor: hierarchyColors.text }]}>
              <Text style={[styles.sectorText, { color: hierarchyColors.text }]}>{member.sector}</Text>
            </View>
          </View>

          {/* Bio Section */}
          {member.bio && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: hierarchyColors.text }]}>Sobre</Text>
              <View style={[styles.sectionContent, { backgroundColor: hierarchyColors.text + "10" }]}>
                <Text style={[styles.bioText, { color: hierarchyColors.text }]}>{member.bio}</Text>
              </View>
            </View>
          )}

          {/* Contact Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: hierarchyColors.text }]}>Contato</Text>
            <View style={[styles.sectionContent, { backgroundColor: hierarchyColors.text + "10" }]}>
              {member.email && (
                <TouchableOpacity
                  style={styles.contactItem}
                  onPress={() => handleContact("email", member.email)}
                  disabled={isGuestUser}
                >
                  <Ionicons name="mail" size={20} color={hierarchyColors.text} />
                  <Text style={[styles.contactText, { color: hierarchyColors.text }]}>{member.email}</Text>
                  {!isGuestUser && <Ionicons name="chevron-forward" size={16} color={hierarchyColors.text} />}
                </TouchableOpacity>
              )}

              {member.phone && (
                <TouchableOpacity
                  style={styles.contactItem}
                  onPress={() => handleContact("phone", member.phone)}
                  disabled={isGuestUser}
                >
                  <Ionicons name="call" size={20} color={hierarchyColors.text} />
                  <Text style={[styles.contactText, { color: hierarchyColors.text }]}>{member.phone}</Text>
                  {!isGuestUser && <Ionicons name="chevron-forward" size={16} color={hierarchyColors.text} />}
                </TouchableOpacity>
              )}

              {member.linkedin && (
                <TouchableOpacity
                  style={styles.contactItem}
                  onPress={() => handleContact("linkedin", member.linkedin)}
                  disabled={isGuestUser}
                >
                  <Ionicons name="logo-linkedin" size={20} color={hierarchyColors.text} />
                  <Text style={[styles.contactText, { color: hierarchyColors.text }]}>LinkedIn</Text>
                  {!isGuestUser && <Ionicons name="chevron-forward" size={16} color={hierarchyColors.text} />}
                </TouchableOpacity>
              )}

              {member.instagram && (
                <TouchableOpacity
                  style={styles.contactItem}
                  onPress={() => handleContact("instagram", member.instagram)}
                  disabled={isGuestUser}
                >
                  <Ionicons name="logo-instagram" size={20} color={hierarchyColors.text} />
                  <Text style={[styles.contactText, { color: hierarchyColors.text }]}>Instagram</Text>
                  {!isGuestUser && <Ionicons name="chevron-forward" size={16} color={hierarchyColors.text} />}
                </TouchableOpacity>
              )}

              {member.website && (
                <TouchableOpacity
                  style={styles.contactItem}
                  onPress={() => handleContact("website", member.website)}
                  disabled={isGuestUser}
                >
                  <Ionicons name="globe" size={20} color={hierarchyColors.text} />
                  <Text style={[styles.contactText, { color: hierarchyColors.text }]}>Website</Text>
                  {!isGuestUser && <Ionicons name="chevron-forward" size={16} color={hierarchyColors.text} />}
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Action Buttons */}
          {isMemberUser && (
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: hierarchyColors.text }]}
                onPress={handleMessage}
              >
                <Ionicons name="chatbubble" size={20} color={hierarchyColors.background} />
                <Text style={[styles.actionButtonText, { color: hierarchyColors.background }]}>Enviar Mensagem</Text>
              </TouchableOpacity>
            </View>
          )}

          {isGuestUser && (
            <View style={styles.guestNotice}>
              <Ionicons name="lock-closed" size={20} color={Colors.gold} />
              <Text style={styles.guestText}>Faça login como membro para interagir</Text>
            </View>
          )}
        </ScrollView>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 36,
    fontWeight: "bold",
  },
  memberName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  memberCompany: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
  },
  hierarchyBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 10,
  },
  hierarchyText: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
  sectorBadge: {
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  sectorText: {
    fontSize: 14,
    fontWeight: "500",
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionContent: {
    borderRadius: 12,
    padding: 16,
  },
  bioText: {
    fontSize: 16,
    lineHeight: 24,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  contactText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
  actionButtons: {
    marginTop: 20,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  guestNotice: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  guestText: {
    fontSize: 14,
    color: Colors.gold,
    marginLeft: 8,
    fontWeight: "500",
  },
})
