import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { Colors } from '../constants/Colors';
import MemberCard from '../components/MemberCard';

const { width, height } = Dimensions.get('window');

// Tipos de relevância
type RelevanceLevel = 'Socios' | 'Infinity' | 'Disruption';

interface Member {
  id: number;
  name: string;
  company: string;
  description: string;
  photo: string;
  email?: string;
  linkedin?: string;
  instagram?: string;
  relevanceLevel: RelevanceLevel;
  sectorId: number;
  sector: string;
}

// Dados de exemplo dos membros organizados por setores
const membersData: Member[] = [
  // ADVOCACIA (sectorId: 1)
  {
    id: 1,
    name: 'Dr. Carlos Silva',
    company: 'Silva & Associados',
    description: 'Advogado especialista em direito empresarial e tributário, com mais de 20 anos de experiência.',
    photo: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20lawyer%20businessman%20headshot%20portrait%20in%20suit%20confident%20legal%20executive&image_size=square',
    email: 'carlos@silvaassociados.com',
    linkedin: 'carlos-silva-advogado',
    relevanceLevel: 'Socios',
    sectorId: 1,
    sector: 'ADVOCACIA'
  },
  {
    id: 2,
    name: 'Dra. Ana Costa',
    company: 'Costa Advocacia',
    description: 'Advogada criminalista e especialista em direitos humanos, reconhecida nacionalmente.',
    photo: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20female%20lawyer%20headshot%20portrait%20in%20blazer%20confident%20legal%20professional&image_size=square',
    email: 'ana@costaadvocacia.com',
    linkedin: 'ana-costa-advogada',
    relevanceLevel: 'Infinity',
    sectorId: 1,
    sector: 'ADVOCACIA'
  },
  // FOOD (sectorId: 2)
  {
    id: 3,
    name: 'Chef Pedro Santos',
    company: 'Restaurante Sabores',
    description: 'Chef executivo e proprietário, especialista em culinária contemporânea brasileira.',
    photo: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20chef%20headshot%20portrait%20white%20uniform%20smiling%20culinary%20expert&image_size=square',
    email: 'pedro@restaurantesabores.com',
    instagram: '@chef_pedro_santos',
    relevanceLevel: 'Socios',
    sectorId: 2,
    sector: 'FOOD'
  },
  {
    id: 4,
    name: 'Maria Oliveira',
    company: 'Doces & Cia',
    description: 'Confeiteira e empresária, especializada em doces artesanais e bolos personalizados.',
    photo: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20baker%20woman%20headshot%20portrait%20apron%20smiling%20pastry%20chef&image_size=square',
    email: 'maria@docesecia.com',
    instagram: '@doces_e_cia',
    relevanceLevel: 'Disruption',
    sectorId: 2,
    sector: 'FOOD'
  },
  // TECNOLOGIA (sectorId: 20)
  {
    id: 5,
    name: 'João Ferreira',
    company: 'TechInova',
    description: 'CTO e co-fundador, especialista em desenvolvimento de software e inteligência artificial.',
    photo: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20tech%20executive%20headshot%20portrait%20casual%20shirt%20confident%20developer&image_size=square',
    email: 'joao@techinova.com',
    linkedin: 'joao-ferreira-tech',
    relevanceLevel: 'Infinity',
    sectorId: 20,
    sector: 'TECNOLOGIA'
  },
  // ARQUITETURA (sectorId: 3)
  {
    id: 6,
    name: 'Arq. Lucia Mendes',
    company: 'Mendes Arquitetura',
    description: 'Arquiteta especializada em projetos residenciais de alto padrão e sustentabilidade.',
    photo: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20female%20architect%20headshot%20portrait%20blazer%20confident%20design%20professional&image_size=square',
    email: 'lucia@mendesarquitetura.com',
    linkedin: 'lucia-mendes-arquiteta',
    relevanceLevel: 'Socios',
    sectorId: 3,
    sector: 'ARQUITETURA'
  }
];



export default function MemberListScreen({ route, navigation }: any) {
  const { sectorId, sectorName } = route.params;
  
  // Filtrar membros por setor
  const sectorMembers = membersData.filter(member => member.sectorId === sectorId);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.gradientStart, Colors.gradientMiddle, Colors.gradientEnd]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {/* Header Section */}
          <View style={styles.headerSection}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color={Colors.white} />
            </TouchableOpacity>
            
            <View style={styles.titleContainer}>
              <Text style={styles.mainTitle}>MEMBROS</Text>
              <Text style={styles.subtitle}>{sectorName.toUpperCase()}</Text>
            </View>
          </View>

          {/* Decorative Elements */}
          <View style={styles.decorativeSection}>
            <View style={styles.decorativeLine} />
            <View style={styles.decorativeCircle} />
            <View style={styles.decorativeLine} />
          </View>

          {/* Members List */}

          <FlatList
            data={sectorMembers}
            renderItem={({ item }) => <MemberCard member={item} />}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />

          {/* Footer Section */}
          <View style={styles.footerSection}>
            <Text style={styles.footerText}>Conecte-se com os membros</Text>
            <View style={styles.footerDecorative}>
              <View style={styles.footerDot} />
              <View style={styles.footerDot} />
              <View style={styles.footerDot} />
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 10,
    zIndex: 1,
  },
  titleContainer: {
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.textOnPrimary,
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.metallicGold,
    textAlign: 'center',
    letterSpacing: 1,
  },
  decorativeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  decorativeLine: {
    width: 50,
    height: 2,
    backgroundColor: Colors.metallicGold,
    opacity: 0.8,
  },
  decorativeCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.accent,
    marginHorizontal: 12,
  },
  membersList: {
    flex: 1,
  },
  membersContainer: {
    paddingBottom: 20,
  },
  memberCard: {
    backgroundColor: Colors.background,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    position: 'relative',
  },
  relevanceBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    zIndex: 1,
  },
  relevanceText: {
    color: Colors.textOnPrimary,
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 5,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  memberPhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.metallicGold,
  },
  memberInfo: {
    alignItems: 'center',
  },
  memberName: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 5,
    textAlign: 'center',
  },
  memberCompany: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.accent,
    marginBottom: 10,
    textAlign: 'center',
  },
  memberDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 15,
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  contactButton: {
    backgroundColor: Colors.backgroundSecondary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  footerSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: Colors.white,
    textAlign: 'center',
    opacity: 0.8,
    fontWeight: '500',
    marginBottom: 15,
  },
  footerDecorative: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.accent,
    marginHorizontal: 4,
    opacity: 0.7,
  },
});