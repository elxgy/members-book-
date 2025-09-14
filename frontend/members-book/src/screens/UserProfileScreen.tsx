import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Text from '../components/Text';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Icon from 'react-native-vector-icons/FontAwesome';

type UserProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UserProfile'>;

interface Props {
  navigation: UserProfileScreenNavigationProp;
}

export default function UserProfileScreen({ navigation }: Props): React.JSX.Element {
  // Dados do usuário logado (simulados)
  const currentUser = {
    name: 'Usuário Atual',
    company: 'Empresa Atual',
    hierarchy: 'SOCIOS',
    imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    bio: 'Este é o perfil do usuário atual. Aqui você pode visualizar e editar suas informações pessoais, configurações de conta e preferências de notificação.',
    socialMedia: {
      instagram: 'usuario_atual',
      linkedin: 'usuario_atual',
      email: 'usuario@exemplo.com'
    }
  };

  // Definir estilos baseados na hierarquia do usuário
  const getHierarchyStyles = () => {
    switch (currentUser.hierarchy) {
      case 'SOCIOS':
        return {
          backgroundColor: '#16213e', // Azul escuro como na página inicial
          textColor: '#FFFFFF',
          headerColor: '#D4AF37',
          borderColor: '#D4AF37',
        };
      case 'INFINITY':
        return {
          backgroundColor: '#012E40', // Azul conforme a imagem de referência
          textColor: '#FFFFFF',
          headerColor: '#D4AF37',
          borderColor: '#D4AF37',
        };
      case 'DISRUPTION':
        return {
          backgroundColor: '#F5F5F5',
          textColor: '#000000',
          headerColor: '#D4AF37',
          borderColor: '#D4AF37',
        };
      default:
        return {
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
          headerColor: '#D4AF37',
          borderColor: '#D4AF37',
        };
    }
  };

  const hierarchyStyles = getHierarchyStyles();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: hierarchyStyles.backgroundColor }]}>
      <StatusBar 
        barStyle={currentUser.hierarchy === 'SOCIOS' ? 'light-content' : 'dark-content'} 
        backgroundColor={hierarchyStyles.backgroundColor} 
      />
      
      {/* Botão Voltar */}
      <TouchableOpacity 
        style={[styles.backLink, { color: hierarchyStyles.textColor }]} 
        onPress={() => navigation.goBack()}
      >
        <Text style={[styles.backLinkText, { color: hierarchyStyles.textColor }]} variant="body">
          VOLTAR AO MENU PRINCIPAL
        </Text>
      </TouchableOpacity>

      <ScrollView style={styles.scrollView}>
        <View style={styles.profileContainer}>
          {/* Foto do Perfil */}
          <View style={styles.profileImageSection}>
            <View style={[styles.imageContainer, { borderColor: hierarchyStyles.borderColor }]}>
              <Image 
                source={{ uri: currentUser.imageUrl }} 
                style={styles.profileImage} 
                resizeMode="cover"
              />
            </View>
            
            {/* Botões de Ação próximos à foto */}
            <View style={styles.profileActionsContainer}>
              <TouchableOpacity 
                style={[styles.profileActionButton, { backgroundColor: hierarchyStyles.headerColor }]}
                onPress={() => navigation.navigate('EditProfile' as never)}
              >
                <Icon name="paint-brush" size={16} color="#FFFFFF" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.profileActionButton, { backgroundColor: hierarchyStyles.headerColor }]}
                onPress={() => alert('Configurações')}
              >
                <Icon name="cog" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Badge de Hierarquia */}
          <View style={styles.hierarchyBadgeContainer}>
            {currentUser.hierarchy === 'SOCIOS' && (
              <Text style={[styles.hierarchyBadge, { color: hierarchyStyles.headerColor }]} variant="caption">MEMBRO SOCIOS</Text>
            )}
            {currentUser.hierarchy === 'INFINITY' && (
              <Text style={[styles.hierarchyBadge, { color: hierarchyStyles.headerColor }]} variant="caption">INFINITY</Text>
            )}
            {currentUser.hierarchy === 'DISRUPTION' && (
              <Text style={[styles.hierarchyBadge, { color: hierarchyStyles.headerColor }]} variant="caption">MEMBROS DISRUPTION</Text>
            )}
          </View>

          {/* Nome e Cargo */}
          <Text style={[styles.memberName, { color: hierarchyStyles.textColor }]} variant="h1">{currentUser.name}</Text>
          <Text style={[styles.memberCompany, { color: hierarchyStyles.headerColor }]} variant="h3">{currentUser.company}</Text>
          
          {/* Ícones de Redes Sociais */}
          <View style={styles.socialIconsContainer}>
            {currentUser.socialMedia?.instagram && (
              <TouchableOpacity style={styles.socialIcon}>
                <Icon name="instagram" size={24} color={hierarchyStyles.headerColor} />
              </TouchableOpacity>
            )}
            {currentUser.socialMedia?.linkedin && (
              <TouchableOpacity style={styles.socialIcon}>
                <Icon name="linkedin-square" size={24} color={hierarchyStyles.headerColor} />
              </TouchableOpacity>
            )}
            {currentUser.socialMedia?.email && (
              <TouchableOpacity style={styles.socialIcon}>
                <Icon name="envelope" size={24} color={hierarchyStyles.headerColor} />
              </TouchableOpacity>
            )}
          </View>

          {/* Biografia */}
          <Text style={[styles.memberBio, { color: hierarchyStyles.textColor }]} variant="body">{currentUser.bio}</Text>
          
          {/* Status do Perfil */}
          <View style={styles.profileStatusContainer}>
            <Text style={[styles.statusTitle, { color: hierarchyStyles.headerColor }]} variant="h3">STATUS DO PERFIL</Text>
            
            <View style={styles.statusItem}>
              <Icon name="check-circle" size={16} color={hierarchyStyles.headerColor} />
              <Text style={[styles.statusText, { color: hierarchyStyles.textColor }]}>Perfil Verificado</Text>
            </View>
            
            <View style={styles.statusItem}>
              <Icon name="users" size={16} color={hierarchyStyles.headerColor} />
              <Text style={[styles.statusText, { color: hierarchyStyles.textColor }]}>Membro Ativo</Text>
            </View>
            
            <View style={styles.statusItem}>
              <Icon name="calendar" size={16} color={hierarchyStyles.headerColor} />
              <Text style={[styles.statusText, { color: hierarchyStyles.textColor }]}>Membro desde 2023</Text>
            </View>
            
            <View style={styles.statusItem}>
               <Icon name="star" size={16} color={hierarchyStyles.headerColor} />
               <Text style={[styles.statusText, { color: hierarchyStyles.textColor }]}>Recomendação Diamante</Text>
             </View>
             
             <View style={styles.statusItem}>
               <Icon name="handshake-o" size={16} color={hierarchyStyles.headerColor} />
               <Text style={[styles.statusText, { color: hierarchyStyles.textColor }]}>Negócios Fechados: 30</Text>
             </View>
             
             <View style={styles.statusItem}>
               <Icon name="money" size={16} color={hierarchyStyles.headerColor} />
               <Text style={[styles.statusText, { color: hierarchyStyles.textColor }]}>Valor Total Acumulado: R$ 700.000,00</Text>
             </View>
          </View>
          


          {/* Logo da Hierarquia */}
          <View style={styles.hierarchyLogoContainer}>
            {currentUser.hierarchy === 'SOCIOS' && (
              <Image 
                source={require('../../assets/socios-logo.svg')} 
                style={styles.hierarchyLogo} 
                resizeMode="contain"
              />
            )}
            {currentUser.hierarchy === 'INFINITY' && (
              <Image 
                source={require('../../assets/infinity-logo.svg')} 
                style={styles.hierarchyLogo} 
                resizeMode="contain"
              />
            )}
            {currentUser.hierarchy === 'DISRUPTION' && (
              <Image 
                source={require('../../assets/disruption-logo.svg')} 
                style={styles.hierarchyLogo} 
                resizeMode="contain"
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  backLink: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  backLinkText: {
    fontSize: 12,
    fontWeight: '500',
  },

  profileContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  imageContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 3,
    overflow: 'hidden',
    marginTop: 20,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  hierarchyBadgeContainer: {
    marginTop: 15,
  },
  hierarchyBadge: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  memberName: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  memberCompany: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 5,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  socialIcon: {
    marginHorizontal: 15,
  },
  memberBio: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    marginTop: 30,
    marginBottom: 30,
  },
  profileImageSection: {
    alignItems: 'center',
    position: 'relative',
  },
  profileActionsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    right: 10,
    gap: 8,
  },
  profileActionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  profileStatusContainer: {
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 15,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    paddingLeft: 10,
  },
  statusText: {
    fontSize: 14,
    marginLeft: 12,
    fontWeight: '500',
  },
  hierarchyLogoContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  hierarchyLogo: {
    width: 100,
    height: 50,
  },
});