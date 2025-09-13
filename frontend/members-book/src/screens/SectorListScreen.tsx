import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import { Colors } from "../constants/Colors"
import { sectors } from "../data/sectors"
import { members } from "../data/members"

export default function SectorListScreen({ navigation }: any) {
  const getSectorMemberCount = (sector: string) => {
    return members.filter((member) => member.sector === sector).length
  }

  const renderSectorItem = ({ item }: { item: string }) => (
    <TouchableOpacity style={styles.sectorCard} onPress={() => navigation.navigate("MemberList", { sector: item })}>
      <View style={styles.sectorContent}>
        <Text style={styles.sectorName}>{item}</Text>
        <Text style={styles.memberCount}>{getSectorMemberCount(item)} membros</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={Colors.metallicGold} />
    </TouchableOpacity>
  )

  return (
    <LinearGradient colors={[Colors.gradientStart, Colors.gradientMiddle, Colors.gradientEnd]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Lista de Setores</Text>
          <Text style={styles.headerSubtitle}>Escolha um setor para ver os membros</Text>
        </View>

        {/* Sector List */}
        <FlatList
          data={sectors}
          renderItem={renderSectorItem}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={styles.row}
        />
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
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.textOnPrimary,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.textOnPrimary,
    opacity: 0.8,
    textAlign: "center",
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
  },
  sectorCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    marginHorizontal: 5,
    flex: 0.48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: Colors.metallicGold,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectorContent: {
    flex: 1,
  },
  sectorName: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 4,
    textAlign: "center",
  },
  memberCount: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: "center",
  },
})
