import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../constants/Colors';

const { width, height } = Dimensions.get('window');

// Dados dos segmentos de negócio baseados na página 4 do PDF
const businessSegments = [
  {
    id: 1,
    name: 'Tecnologia',
    icon: 'laptop',
    description: 'Empresas de tecnologia e inovação',
    memberCount: 25,
    color: '#4A90E2'
  },
  {
    id: 2,
    name: 'Saúde',
    icon: 'medical',
    description: 'Profissionais e empresas da área da saúde',
    memberCount: 18,
    color: '#50C878'
  },
  {
    id: 3,
    name: 'Educação',
    icon: 'school',
    description: 'Instituições e profissionais da educação',
    memberCount: 15,
    color: '#FF6B6B'
  },
  {
    id: 4,
    name: 'Finanças',
    icon: 'card',
    description: 'Bancos, fintechs e consultoria financeira',
    memberCount: 22,
    color: '#FFD93D'
  },
  {
    id: 5,
    name: 'Varejo',
    icon: 'storefront',
    description: 'Comércio e varejo em geral',
    memberCount: 20,
    color: '#9B59B6'
  },
  {
    id: 6,
    name: 'Serviços',
    icon: 'briefcase',
    description: 'Prestação de serviços diversos',
    memberCount: 16,
    color: '#E67E22'
  },
  {
    id: 7,
    name: 'Indústria',
    icon: 'construct',
    description: 'Setor industrial e manufatura',
    memberCount: 12,
    color: '#34495E'
  },
  {
    id: 8,
    name: 'Agronegócio',
    icon: 'leaf',
    description: 'Agricultura e pecuária',
    memberCount: 14,
    color: '#27AE60'
  }
];

export default function SegmentListScreen({ navigation }: any) {
  const handleSegmentPress = (segment: any) => {
    navigation.navigate('MemberList', { 
      segmentId: segment.id,
      segmentName: segment.name 
    });
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
              <Text style={styles.mainTitle}>SEGMENTOS</Text>
              <Text style={styles.subtitle}>DE NEGÓCIO</Text>
            </View>
          </View>

          {/* Decorative Elements */}
          <View style={styles.decorativeSection}>
            <View style={styles.decorativeLine} />
            <View style={styles.decorativeCircle} />
            <View style={styles.decorativeLine} />
          </View>

          {/* Segments List */}
          <ScrollView 
            style={styles.segmentsList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.segmentsContainer}
          >
            {businessSegments.map((segment) => (
              <TouchableOpacity
                key={segment.id}
                style={styles.segmentCard}
                onPress={() => handleSegmentPress(segment)}
                activeOpacity={0.8}
              >
                <View style={[styles.segmentIcon, { backgroundColor: segment.color }]}>
                  <Ionicons name={segment.icon as any} size={28} color={Colors.white} />
                </View>
                
                <View style={styles.segmentInfo}>
                  <Text style={styles.segmentName}>{segment.name}</Text>
                  <Text style={styles.segmentDescription}>{segment.description}</Text>
                  <View style={styles.memberCountContainer}>
                    <Ionicons name="people" size={16} color={Colors.accent} />
                    <Text style={styles.memberCount}>{segment.memberCount} membros</Text>
                  </View>
                </View>
                
                <View style={styles.arrowContainer}>
                  <Ionicons name="chevron-forward" size={24} color={Colors.accent} />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Footer Section */}
          <View style={styles.footerSection}>
            <Text style={styles.footerText}>Escolha um segmento para ver os membros</Text>
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
    fontSize: 32,
    fontWeight: '900',
    color: Colors.white,
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 20,
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
  segmentsList: {
    flex: 1,
  },
  segmentsContainer: {
    paddingBottom: 20,
  },
  segmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  segmentIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  segmentInfo: {
    flex: 1,
  },
  segmentName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 5,
  },
  segmentDescription: {
    fontSize: 14,
    color: Colors.darkGray,
    marginBottom: 8,
    lineHeight: 18,
  },
  memberCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberCount: {
    fontSize: 12,
    color: Colors.accent,
    fontWeight: '600',
    marginLeft: 5,
  },
  arrowContainer: {
    padding: 5,
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