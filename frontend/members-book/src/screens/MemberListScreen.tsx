import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { Colors } from '../constants/Colors';
import MemberCard from '../components/MemberCard';
import Icon from 'react-native-vector-icons/FontAwesome';

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
  const { sector, sectorName } = route.params;
  
  // Filtrar membros por setor
  const sectorMembers = membersData.filter(member => member.sector === sector);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={20} color="#D4AF37" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>MEMBROS</Text>
          <Text style={styles.headerSubtitle}>{sectorName.toUpperCase()}</Text>
        </View>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Conecte-se com os membros</Text>
          <Text style={styles.sectionDescription}>Explore os perfis e encontre oportunidades de networking</Text>
          
          <FlatList
            data={sectorMembers}
            renderItem={({ item }) => <MemberCard member={item} />}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D4AF37',
    textAlign: 'center',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  placeholder: {
    width: 36,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    lineHeight: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
});