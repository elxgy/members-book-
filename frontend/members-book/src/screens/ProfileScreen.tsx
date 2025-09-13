import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../context/UserContext';
import { Colors } from '../constants/Colors';

export default function ProfileScreen() {
  const { user } = useUser();

  // Mock data baseado na página 14 do PDF
  const profileData = {
    name: 'José Roberto Favato',
    company: 'Silvato Indústria',
    description: 'Empresário à frente da Silvato Indústria, ele atua na confecção de fardamentos militares e artigos táticos. É apaixonado por inovação, gestão eficiente e desenvolvimento de projetos que unem tradição e modernidade. Também se dedica à expansão para novos mercados e à construção de uma marca ambientalmente sustentável.',
    stats: {
      negociosFechados: 30,
      valorTotal: 120000.00,
      indicacoesRecebidas: 10,
      valorTotalPorIndicacao: 80000.00,
      indicacoesFornecidas: 30,
      valorTotalAcumulado: 700000.00
    },
    recomendacao: 'Diamante',
    nivel: 'MEMBRO DISRUPTION'
  };





  return (
    <View style={styles.container}>
      {/* Header STATUS */}
      <LinearGradient
        colors={[Colors.gradientStart, Colors.gradientMiddle, Colors.gradientEnd]}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>STATUS</Text>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Seção de Informações Pessoais */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image 
              source={{ uri: 'https://api.dicebear.com/7.x/avataaars/png?seed=Jose' }}
              style={styles.profileImage}
            />
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{profileData.name}</Text>
            <Text style={styles.profileCompany}>{profileData.company}</Text>
            
            {/* Ícones de Contato */}
            <View style={styles.contactIcons}>
              <TouchableOpacity style={styles.contactIcon}>
                <Ionicons name="logo-instagram" size={24} color={Colors.text} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactIcon}>
                <Ionicons name="mail" size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Descrição */}
        <View style={styles.descriptionSection}>
          <Text style={styles.description}>{profileData.description}</Text>
        </View>

        {/* Estatísticas de Negócios */}
        <View style={styles.statsSection}>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Negócios fechados</Text>
            <Text style={styles.statValue}>{profileData.stats.negociosFechados}</Text>
          </View>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Valor total</Text>
            <Text style={styles.statValue}>{profileData.stats.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Text>
          </View>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Indicações Recebidas</Text>
            <Text style={styles.statValue}>{profileData.stats.indicacoesRecebidas}</Text>
          </View>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Valor total por indicação</Text>
            <Text style={styles.statValue}>{profileData.stats.valorTotalPorIndicacao.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Text>
          </View>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Indicações Fornecidas</Text>
            <Text style={styles.statValue}>{profileData.stats.indicacoesFornecidas}</Text>
          </View>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Valor total Acumulado</Text>
            <Text style={styles.statValue}>{profileData.stats.valorTotalAcumulado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Text>
          </View>
        </View>

        {/* Seção de Recomendação */}
        <View style={styles.recommendationSection}>
          <Text style={styles.recommendationLabel}>Recomendação</Text>
          <View style={styles.recommendationContainer}>
            <Text style={styles.recommendationText}>{profileData.recomendacao}</Text>
            <Text style={styles.diamondIcon}>💎</Text>
          </View>
        </View>

        {/* Badge do Nível */}
        <View style={styles.badgeSection}>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>D</Text>
          </View>
          <Text style={styles.levelText}>{profileData.nivel}</Text>
        </View>
        
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.textOnPrimary,
    letterSpacing: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  profileSection: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  profileImageContainer: {
    marginRight: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  profileCompany: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  contactIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  contactIcon: {
    padding: 8,
  },
  descriptionSection: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.text,
    textAlign: 'justify',
  },
  statsSection: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  statLabel: {
    fontSize: 14,
    color: Colors.text,
    flex: 1,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'right',
  },
  recommendationSection: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  recommendationLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  recommendationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recommendationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  diamondIcon: {
    fontSize: 24,
  },
  badgeSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  badgeContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.metallicGold,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: Colors.metallicGoldDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    borderWidth: 2,
    borderColor: Colors.metallicGoldLight,
  },
  badgeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text,
  },
  levelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 40,
  },
});