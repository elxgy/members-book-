import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Alert,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import { Colors } from '../constants/Colors';
import { useUser } from '../context/UserContext';

interface SettingItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: keyof typeof Ionicons.glyphMap;
  type: 'toggle' | 'navigation' | 'action';
  value?: boolean;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
  section: 'account' | 'preferences' | 'privacy' | 'support' | 'about';
}

const SettingsScreen: React.FC = () => {
  const { user, logout } = useUser();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [eventReminders, setEventReminders] = useState(true);
  const [chatNotifications, setChatNotifications] = useState(true);
  const [biometricAuth, setBiometricAuth] = useState(true);
  const [autoLock, setAutoLock] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [dataSync, setDataSync] = useState(true);
  const [analytics, setAnalytics] = useState(true);
  const [locationServices, setLocationServices] = useState(false);

  const handleAccountSettings = () => {
    Alert.alert('Em breve', 'Configurações de conta em desenvolvimento.');
  };

  const handlePrivacyPolicy = () => {
    Alert.alert(
      'Política de Privacidade',
      'Deseja abrir a política de privacidade no navegador?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Abrir', 
          onPress: () => Linking.openURL('https://membersbook.com/privacy')
        }
      ]
    );
  };

  const handleTermsOfService = () => {
    Alert.alert(
      'Termos de Serviço',
      'Deseja abrir os termos de serviço no navegador?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Abrir', 
          onPress: () => Linking.openURL('https://membersbook.com/terms')
        }
      ]
    );
  };

  const handleDataExport = () => {
    Alert.alert(
      'Exportar Dados',
      'Seus dados serão preparados e enviados por email em até 24 horas.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Solicitar', 
          onPress: () => Alert.alert('Sucesso', 'Solicitação de exportação enviada!')
        }
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Excluir Conta',
      'Esta ação é irreversível. Todos os seus dados serão permanentemente removidos.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Confirmação Final',
              'Tem absoluta certeza? Esta ação não pode ser desfeita.',
              [
                { text: 'Cancelar', style: 'cancel' },
                { 
                  text: 'Sim, excluir', 
                  style: 'destructive',
                  onPress: () => Alert.alert('Conta excluída', 'Sua conta foi removida com sucesso.')
                }
              ]
            );
          }
        }
      ]
    );
  };

  const handleContactSupport = () => {
    Alert.alert(
      'Contatar Suporte',
      'Como você gostaria de entrar em contato?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Email', 
          onPress: () => Linking.openURL('mailto:suporte@membersbook.com')
        },
        { 
          text: 'WhatsApp', 
          onPress: () => Linking.openURL('https://wa.me/5511999999999')
        }
      ]
    );
  };

  const handleFeedback = () => {
    Alert.alert('Em breve', 'Sistema de feedback em desenvolvimento.');
  };

  const handleRateApp = () => {
    Alert.alert(
      'Avaliar App',
      'Obrigado por usar o Members Book! Sua avaliação é muito importante.',
      [
        { text: 'Mais tarde', style: 'cancel' },
        { 
          text: 'Avaliar', 
          onPress: () => Alert.alert('Obrigado!', 'Redirecionando para a loja de apps...')
        }
      ]
    );
  };

  const handleAbout = () => {
    Alert.alert(
      'Sobre o Members Book',
      'Versão: 1.0.0\nDesenvolvido para conectar profissionais de excelência\n\n© 2025 Members Book\nTodos os direitos reservados'
    );
  };

  const handleLicenses = () => {
    Alert.alert('Em breve', 'Informações de licenças em desenvolvimento.');
  };

  const settingsData: SettingItem[] = [
    // Account Section
    {
      id: 'account-settings',
      title: 'Configurações da Conta',
      subtitle: 'Gerenciar informações pessoais',
      icon: 'person-circle-outline',
      type: 'navigation',
      onPress: handleAccountSettings,
      section: 'account',
    },
    
    // Preferences Section
    {
      id: 'push-notifications',
      title: 'Notificações Push',
      subtitle: 'Receber notificações no dispositivo',
      icon: 'notifications-outline',
      type: 'toggle',
      value: pushNotifications,
      onToggle: setPushNotifications,
      section: 'preferences',
    },
    {
      id: 'email-notifications',
      title: 'Notificações por Email',
      subtitle: 'Receber emails informativos',
      icon: 'mail-outline',
      type: 'toggle',
      value: emailNotifications,
      onToggle: setEmailNotifications,
      section: 'preferences',
    },
    {
      id: 'event-reminders',
      title: 'Lembretes de Eventos',
      subtitle: 'Alertas antes dos eventos',
      icon: 'calendar-outline',
      type: 'toggle',
      value: eventReminders,
      onToggle: setEventReminders,
      section: 'preferences',
    },
    {
      id: 'chat-notifications',
      title: 'Notificações de Chat',
      subtitle: 'Alertas de novas mensagens',
      icon: 'chatbubble-outline',
      type: 'toggle',
      value: chatNotifications,
      onToggle: setChatNotifications,
      section: 'preferences',
    },
    {
      id: 'biometric-auth',
      title: 'Autenticação Biométrica',
      subtitle: 'Login com impressão digital',
      icon: 'finger-print-outline',
      type: 'toggle',
      value: biometricAuth,
      onToggle: setBiometricAuth,
      section: 'preferences',
    },
    {
      id: 'auto-lock',
      title: 'Bloqueio Automático',
      subtitle: 'Bloquear app após inatividade',
      icon: 'lock-closed-outline',
      type: 'toggle',
      value: autoLock,
      onToggle: setAutoLock,
      section: 'preferences',
    },
    {
      id: 'dark-mode',
      title: 'Modo Escuro',
      subtitle: 'Tema escuro da interface',
      icon: 'moon-outline',
      type: 'toggle',
      value: darkMode,
      onToggle: setDarkMode,
      section: 'preferences',
    },
    {
      id: 'data-sync',
      title: 'Sincronização de Dados',
      subtitle: 'Sincronizar dados na nuvem',
      icon: 'cloud-outline',
      type: 'toggle',
      value: dataSync,
      onToggle: setDataSync,
      section: 'preferences',
    },
    
    // Privacy Section
    {
      id: 'analytics',
      title: 'Análise de Uso',
      subtitle: 'Compartilhar dados de uso anônimos',
      icon: 'analytics-outline',
      type: 'toggle',
      value: analytics,
      onToggle: setAnalytics,
      section: 'privacy',
    },
    {
      id: 'location-services',
      title: 'Serviços de Localização',
      subtitle: 'Permitir acesso à localização',
      icon: 'location-outline',
      type: 'toggle',
      value: locationServices,
      onToggle: setLocationServices,
      section: 'privacy',
    },
    {
      id: 'privacy-policy',
      title: 'Política de Privacidade',
      subtitle: 'Ler nossa política de privacidade',
      icon: 'shield-checkmark-outline',
      type: 'navigation',
      onPress: handlePrivacyPolicy,
      section: 'privacy',
    },
    {
      id: 'terms-service',
      title: 'Termos de Serviço',
      subtitle: 'Ler termos de uso',
      icon: 'document-text-outline',
      type: 'navigation',
      onPress: handleTermsOfService,
      section: 'privacy',
    },
    {
      id: 'data-export',
      title: 'Exportar Dados',
      subtitle: 'Baixar uma cópia dos seus dados',
      icon: 'download-outline',
      type: 'action',
      onPress: handleDataExport,
      section: 'privacy',
    },
    {
      id: 'delete-account',
      title: 'Excluir Conta',
      subtitle: 'Remover permanentemente sua conta',
      icon: 'trash-outline',
      type: 'action',
      onPress: handleDeleteAccount,
      section: 'privacy',
    },
    
    // Support Section
    {
      id: 'contact-support',
      title: 'Contatar Suporte',
      subtitle: 'Obter ajuda e suporte técnico',
      icon: 'help-circle-outline',
      type: 'navigation',
      onPress: handleContactSupport,
      section: 'support',
    },
    {
      id: 'feedback',
      title: 'Enviar Feedback',
      subtitle: 'Compartilhar sugestões e ideias',
      icon: 'chatbubble-ellipses-outline',
      type: 'navigation',
      onPress: handleFeedback,
      section: 'support',
    },
    {
      id: 'rate-app',
      title: 'Avaliar App',
      subtitle: 'Deixar uma avaliação na loja',
      icon: 'star-outline',
      type: 'navigation',
      onPress: handleRateApp,
      section: 'support',
    },
    
    // About Section
    {
      id: 'about',
      title: 'Sobre o App',
      subtitle: 'Informações da versão e créditos',
      icon: 'information-circle-outline',
      type: 'navigation',
      onPress: handleAbout,
      section: 'about',
    },
    {
      id: 'licenses',
      title: 'Licenças',
      subtitle: 'Licenças de software de terceiros',
      icon: 'library-outline',
      type: 'navigation',
      onPress: handleLicenses,
      section: 'about',
    },
  ];

  const sections = [
    { key: 'account', title: 'Conta' },
    { key: 'preferences', title: 'Preferências' },
    { key: 'privacy', title: 'Privacidade e Dados' },
    { key: 'support', title: 'Suporte' },
    { key: 'about', title: 'Sobre' },
  ];

  const renderSettingItem = (item: SettingItem) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.settingItem,
          item.id === 'delete-account' && styles.dangerItem
        ]}
        onPress={item.onPress}
        activeOpacity={item.type === 'toggle' ? 1 : 0.7}
        disabled={item.type === 'toggle'}
      >
        <View style={[
          styles.settingIcon,
          item.id === 'delete-account' && styles.dangerIcon
        ]}>
          <Ionicons 
            name={item.icon} 
            size={24} 
            color={item.id === 'delete-account' ? '#DC3545' : Colors.primary} 
          />
        </View>
        
        <View style={styles.settingContent}>
          <Text style={[
            styles.settingTitle,
            item.id === 'delete-account' && styles.dangerText
          ]}>
            {item.title}
          </Text>
          {item.subtitle && (
            <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
          )}
        </View>
        
        <View style={styles.settingAction}>
          {item.type === 'toggle' ? (
            <Switch
              value={item.value}
              onValueChange={item.onToggle}
              trackColor={{ false: Colors.backgroundSecondary, true: Colors.primary }}
              thumbColor={item.value ? Colors.metallicGold : Colors.textSecondary}
            />
          ) : (
            <Ionicons 
              name="chevron-forward" 
              size={20} 
              color={item.id === 'delete-account' ? '#DC3545' : Colors.textSecondary} 
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderSection = (sectionKey: string, sectionTitle: string) => {
    const sectionItems = settingsData.filter(item => item.section === sectionKey);
    
    if (sectionItems.length === 0) return null;
    
    return (
      <View key={sectionKey} style={styles.section}>
        <Text style={styles.sectionTitle}>{sectionTitle}</Text>
        <View style={styles.sectionContent}>
          {sectionItems.map(renderSettingItem)}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <LinearGradient
        colors={[Colors.gradientStart, Colors.gradientMiddle, Colors.gradientEnd]}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Configurações</Text>
        <Text style={styles.headerSubtitle}>Personalize sua experiência</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Info Card */}
        <View style={styles.userCard}>
          <View style={styles.userAvatar}>
            <LinearGradient
              colors={[Colors.gradientStart, Colors.gradientEnd]}
              style={styles.avatarGradient}
            >
              <Text style={styles.avatarText}>
                {user?.name?.split(' ').map(n => n.charAt(0)).join('').toUpperCase().slice(0, 2) || 'MB'}
              </Text>
            </LinearGradient>
          </View>
          
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name || 'Usuário'}</Text>
            <Text style={styles.userEmail}>{user?.email || 'usuario@email.com'}</Text>
            <Text style={styles.userType}>
              {user?.userType === 'admin' ? 'Administrador' : 
               user?.userType === 'member' ? 'Membro' : 'Usuário'}
            </Text>
          </View>
        </View>

        {/* Settings Sections */}
        {sections.map(section => renderSection(section.key, section.title))}

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            Alert.alert(
              'Sair',
              'Tem certeza que deseja sair da sua conta?',
              [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Sair', style: 'destructive', onPress: logout }
              ]
            );
          }}
          activeOpacity={0.7}
        >
          <Ionicons name="log-out-outline" size={24} color={Colors.white} />
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Members Book v1.0.0</Text>
          <Text style={styles.footerText}>© 2025 Todos os direitos reservados</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.textOnPrimary,
    marginBottom: 4,
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.metallicGold,
  },
  content: {
    flex: 1,
  },
  userCard: {
    backgroundColor: Colors.white,
    margin: 20,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  userAvatar: {
    marginRight: 16,
  },
  avatarGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textOnPrimary,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  userType: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginHorizontal: 20,
    marginBottom: 12,
  },
  sectionContent: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    borderRadius: 12,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.backgroundSecondary,
  },
  dangerItem: {
    backgroundColor: '#FFF5F5',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  dangerIcon: {
    backgroundColor: '#FFEBEE',
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  dangerText: {
    color: '#DC3545',
  },
  settingSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  settingAction: {
    marginLeft: 12,
  },
  logoutButton: {
    backgroundColor: '#DC3545',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textOnPrimary,
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
});

export default SettingsScreen;