import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../constants/Colors';
import { sectors } from '../data/sectors';

const { width, height } = Dimensions.get('window');

// Mapeamento de ícones para cada setor
const sectorIcons: { [key: string]: string } = {
  'ADVOCACIA': 'library',
  'FOOD': 'restaurant',
  'ARQUITETURA': 'business',
  'FRANQUIAS': 'storefront',
  'COMÉRCIO': 'bag',
  'IMOBILIÁRIO': 'home',
  'COMEX': 'globe',
  'LICITAÇÃO': 'document-text',
  'CONSTRUTORA & INCORPORADORA': 'construct',
  'LOGÍSTICA & TRANSPORTE': 'car',
  'CONSULTORIA': 'briefcase',
  'MARKETING': 'megaphone',
  'CONTÁBIL': 'calculator',
  'RECURSOS HUMANOS': 'people',
  'EDUCAÇÃO': 'school',
  'SAÚDE': 'medical',
  'ENGENHARIA': 'settings',
  'SEGUROS': 'shield-checkmark',
  'EVENTOS & PRODUÇÕES': 'musical-notes',
  'TECNOLOGIA': 'laptop',
  'FINANÇAS & INVESTIMENTOS': 'trending-up',
  'VEÍCULOS': 'car-sport',
};

// Cores para cada setor
const sectorColors: { [key: string]: string } = {
  'ADVOCACIA': '#8B4513',
  'FOOD': '#FF6B35',
  'ARQUITETURA': '#2E86AB',
  'FRANQUIAS': '#F18F01',
  'COMÉRCIO': '#C73E1D',
  'IMOBILIÁRIO': '#4CAF50',
  'COMEX': '#3F51B5',
  'LICITAÇÃO': '#795548',
  'CONSTRUTORA & INCORPORADORA': '#FF9800',
  'LOGÍSTICA & TRANSPORTE': '#607D8B',
  'CONSULTORIA': '#9C27B0',
  'MARKETING': '#E91E63',
  'CONTÁBIL': '#009688',
  'RECURSOS HUMANOS': '#FF5722',
  'EDUCAÇÃO': '#2196F3',
  'SAÚDE': '#4CAF50',
  'ENGENHARIA': '#FFC107',
  'SEGUROS': '#673AB7',
  'EVENTOS & PRODUÇÕES': '#E91E63',
  'TECNOLOGIA': '#00BCD4',
  'FINANÇAS & INVESTIMENTOS': '#4CAF50',
  'VEÍCULOS': '#FF9800',
};

interface ActionAreasScreenProps {
  navigation: any;
}

export default function ActionAreasScreen({ navigation }: ActionAreasScreenProps) {
  const handleSectorPress = (sector: string) => {
    navigation.navigate('MemberList', {
      sector: sector,
      sectorName: sector
    });
  };

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
            <View style={styles.titleContainer}>
              <Text style={styles.mainTitle}>ÁREAS DE AÇÃO</Text>
              <Text style={styles.subtitle}>MEMBERS BOOK 2025</Text>
            </View>
          </View>

          {/* Decorative Elements */}
          <View style={styles.decorativeSection}>
            <View style={styles.decorativeLine} />
            <View style={styles.decorativeCircle} />
            <View style={styles.decorativeLine} />
          </View>

          {/* Sectors Grid */}
          <ScrollView 
            style={styles.sectorsList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.sectorsContainer}
          >
            <View style={styles.sectorsGrid}>
              {sectors.map((sector, index) => (
                <TouchableOpacity
                  key={sector}
                  style={styles.sectorCard}
                  onPress={() => handleSectorPress(sector)}
                  activeOpacity={0.8}
                >
                  <View style={styles.cardContent}>
                    <Text style={styles.sectorName}>{sector}</Text>
                    
                    <View style={styles.arrowContainer}>
                      <Ionicons name="chevron-forward" size={20} color={Colors.accent} />
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Footer Section */}
          <View style={styles.footerSection}>
            <Text style={styles.footerText}>Escolha uma área para ver os membros</Text>
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
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 20,
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
  sectorsList: {
    flex: 1,
  },
  sectorsContainer: {
    paddingBottom: 20,
  },
  sectorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sectorCard: {
    width: (width - 80) / 2,
    height: 75,
    borderRadius: 0,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: 'rgba(100, 100, 100, 0.7)',
  },
  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  sectorName: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.accent,
    textAlign: 'center',
    letterSpacing: 0.5,
    lineHeight: 14,
  },
  arrowContainer: {
    alignSelf: 'flex-end',
    opacity: 0.8,
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