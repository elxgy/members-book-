import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Linking, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../constants/Colors';

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
  segmentId: number;
}

// Dados de exemplo dos membros (baseado nas páginas 8-12 do PDF)
const membersData: Member[] = [
  {
    id: 1,
    name: 'Carlos Silva',
    company: 'TechCorp Solutions',
    description: 'CEO e fundador da TechCorp, especialista em transformação digital e inovação tecnológica.',
    photo: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20businessman%20headshot%20portrait%20in%20suit%20smiling%20confident%20corporate%20executive&image_size=square',
    email: 'carlos@techcorp.com',
    linkedin: 'carlos-silva-tech',
    relevanceLevel: 'Socios',
    segmentId: 1
  },
  {
    id: 2,
    name: 'Ana Costa',
    company: 'InnovaTech',
    description: 'CTO com mais de 15 anos de experiência em desenvolvimento de software e liderança de equipes.',
    photo: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20businesswoman%20headshot%20portrait%20in%20blazer%20smiling%20confident%20female%20executive&image_size=square',
    email: 'ana@innovatech.com',
    instagram: '@ana_costa_tech',
    relevanceLevel: 'Infinity',
    segmentId: 1
  },
  {
    id: 3,
    name: 'Pedro Santos',
    company: 'StartupLab',
    description: 'Jovem empreendedor focado em soluções de IA e machine learning para pequenas empresas.',
    photo: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=young%20professional%20businessman%20headshot%20portrait%20casual%20shirt%20smiling%20startup%20entrepreneur&image_size=square',
    linkedin: 'pedro-santos-ai',
    instagram: '@pedro_startuplab',
    relevanceLevel: 'Disruption',
    segmentId: 1
  },
  {
    id: 4,
    name: 'Dr. Maria Oliveira',
    company: 'Clínica Vida',
    description: 'Médica cardiologista e diretora da Clínica Vida, referência em cardiologia preventiva.',
    photo: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20female%20doctor%20headshot%20portrait%20white%20coat%20stethoscope%20medical%20professional&image_size=square',
    email: 'dra.maria@clinicavida.com',
    linkedin: 'maria-oliveira-cardio',
    relevanceLevel: 'Socios',
    segmentId: 2
  },
  {
    id: 5,
    name: 'João Ferreira',
    company: 'EduTech Brasil',
    description: 'Diretor de inovação educacional, especialista em tecnologias aplicadas ao ensino.',
    photo: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20educator%20businessman%20headshot%20portrait%20glasses%20friendly%20smile%20academic%20professional&image_size=square',
    email: 'joao@edutech.com.br',
    linkedin: 'joao-ferreira-edu',
    relevanceLevel: 'Infinity',
    segmentId: 3
  }
];

const getRelevanceBadgeColor = (level: RelevanceLevel) => {
  switch (level) {
    case 'Socios':
      return '#FFD700'; // Dourado
    case 'Infinity':
      return '#C0C0C0'; // Prata
    case 'Disruption':
      return '#CD7F32'; // Bronze
    default:
      return Colors.accent;
  }
};

const getRelevanceIcon = (level: RelevanceLevel) => {
  switch (level) {
    case 'Socios':
      return 'star';
    case 'Infinity':
      return 'infinite';
    case 'Disruption':
      return 'flash';
    default:
      return 'person';
  }
};

export default function MemberListScreen({ route, navigation }: any) {
  const { segmentId, segmentName } = route.params;
  
  // Filtrar membros por segmento
  const segmentMembers = membersData.filter(member => member.segmentId === segmentId);

  const handleContactPress = (type: 'email' | 'linkedin' | 'instagram', value: string) => {
    let url = '';
    
    switch (type) {
      case 'email':
        url = `mailto:${value}`;
        break;
      case 'linkedin':
        url = `https://linkedin.com/in/${value}`;
        break;
      case 'instagram':
        url = `https://instagram.com/${value}`;
        break;
    }
    
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
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
              <Text style={styles.subtitle}>{segmentName.toUpperCase()}</Text>
            </View>
          </View>

          {/* Decorative Elements */}
          <View style={styles.decorativeSection}>
            <View style={styles.decorativeLine} />
            <View style={styles.decorativeCircle} />
            <View style={styles.decorativeLine} />
          </View>

          {/* Members List */}
          <ScrollView 
            style={styles.membersList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.membersContainer}
          >
            {segmentMembers.map((member) => (
              <View key={member.id} style={styles.memberCard}>
                {/* Relevance Badge */}
                <View style={[styles.relevanceBadge, { backgroundColor: getRelevanceBadgeColor(member.relevanceLevel) }]}>
                  <Ionicons 
                    name={getRelevanceIcon(member.relevanceLevel) as any} 
                    size={16} 
                    color={Colors.white} 
                  />
                  <Text style={styles.relevanceText}>{member.relevanceLevel}</Text>
                </View>

                {/* Member Photo */}
                <View style={styles.photoContainer}>
                  <Image source={{ uri: member.photo }} style={styles.memberPhoto} />
                </View>

                {/* Member Info */}
                <View style={styles.memberInfo}>
                  <Text style={styles.memberName}>{member.name}</Text>
                  <Text style={styles.memberCompany}>{member.company}</Text>
                  <Text style={styles.memberDescription}>{member.description}</Text>
                  
                  {/* Contact Buttons */}
                  <View style={styles.contactContainer}>
                    {member.email && (
                      <TouchableOpacity
                        style={styles.contactButton}
                        onPress={() => handleContactPress('email', member.email!)}
                      >
                        <Ionicons name="mail" size={18} color={Colors.primary} />
                      </TouchableOpacity>
                    )}
                    
                    {member.linkedin && (
                      <TouchableOpacity
                        style={styles.contactButton}
                        onPress={() => handleContactPress('linkedin', member.linkedin!)}
                      >
                        <Ionicons name="logo-linkedin" size={18} color={Colors.primary} />
                      </TouchableOpacity>
                    )}
                    
                    {member.instagram && (
                      <TouchableOpacity
                        style={styles.contactButton}
                        onPress={() => handleContactPress('instagram', member.instagram!)}
                      >
                        <Ionicons name="logo-instagram" size={18} color={Colors.primary} />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

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
    color: Colors.white,
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.accent,
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
    backgroundColor: Colors.accent,
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
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: Colors.black,
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
    color: Colors.white,
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
    borderColor: Colors.accent,
  },
  memberInfo: {
    alignItems: 'center',
  },
  memberName: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.primary,
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
    color: Colors.darkGray,
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
    backgroundColor: Colors.lightGray,
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