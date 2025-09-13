import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Crypto from 'expo-crypto';
import { useUser } from '../context/UserContext';
import { Colors } from '../constants/Colors';
import { ProfileHeader } from '../components/ProfileHeader';
import { ProfileCard } from '../components/ProfileCard';
import { StatsCard } from '../components/StatsCard';
import { SettingsSection } from '../components/SettingsSection';
import { SettingItem } from '../types';

export default function ProfileScreen() {
  const { user, logout } = useUser();
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    biometric: true,
    autoSync: true,
    locationSharing: false,
  });

  const [profileImageUri, setProfileImageUri] = useState<string>('');

  const handleLogout = () => {
    Alert.alert(
      'Confirmar Logout',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', style: 'destructive', onPress: logout },
      ]
    );
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Confira o perfil de ${user?.name} no Members Book!`,
      });
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
    }
  };

  const handleEditProfile = () => {
    Alert.alert('Editar Perfil', 'Funcionalidade em desenvolvimento');
  };

  const generateProfileImage = async () => {
    if (!user) return;
    
    try {
      const hash = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        user.name + user.email
      );
      
      const imageUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${hash}&backgroundColor=4F46E5&textColor=ffffff`;
      setProfileImageUri(imageUrl);
    } catch (error) {
      console.error('Erro ao gerar imagem:', error);
    }
  };

  const updateSetting = (key: keyof typeof settings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    generateProfileImage();
  }, [user]);

  const settingsData: SettingItem[] = [
    {
      id: 'notifications',
      title: 'Notificações',
      subtitle: 'Receber alertas e atualizações',
      icon: 'notifications-outline',
      type: 'toggle',
      value: settings.notifications,
      onToggle: (value: boolean) => updateSetting('notifications', value),
    },
    {
      id: 'biometric',
      title: 'Autenticação Biométrica',
      subtitle: 'Login com impressão digital',
      icon: 'finger-print-outline',
      type: 'toggle',
      value: settings.biometric,
      onToggle: (value: boolean) => updateSetting('biometric', value),
    },
    {
      id: 'darkMode',
      title: 'Modo Escuro',
      subtitle: 'Tema escuro da aplicação',
      icon: 'moon-outline',
      type: 'toggle',
      value: settings.darkMode,
      onToggle: (value: boolean) => updateSetting('darkMode', value),
    },
    {
      id: 'privacy',
      title: 'Privacidade',
      subtitle: 'Configurações de privacidade',
      icon: 'shield-outline',
      type: 'navigation',
      onPress: () => Alert.alert('Privacidade', 'Funcionalidade em desenvolvimento'),
    },
    {
      id: 'help',
      title: 'Ajuda e Suporte',
      subtitle: 'Central de ajuda',
      icon: 'help-circle-outline',
      type: 'navigation',
      onPress: () => Alert.alert('Ajuda', 'Funcionalidade em desenvolvimento'),
    },
    {
      id: 'share',
      title: 'Compartilhar Perfil',
      icon: 'share-outline',
      type: 'action',
      onPress: handleShare,
    },
  ];





  return (
    <View style={styles.container}>
      <ProfileHeader 
        userName={user?.name || 'Usuário'}
        onEditPress={handleEditProfile}
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ProfileCard
          user={user || {
            id: '',
            name: 'Usuário',
            email: 'email@exemplo.com',
            userType: 'member',
            memberHierarchy: 'socios'
          }}
          profileImageUri={profileImageUri}
          onEditPress={handleEditProfile}
        />
        
        <StatsCard />
        
        <SettingsSection
          title="Configurações"
          settings={settingsData}
        />
        
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={24} color="white" />
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>
        
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  logoutButton: {
    backgroundColor: Colors.error,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  bottomSpacing: {
    height: 40,
  },
});