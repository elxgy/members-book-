import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Text from '../components/Text';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useUser } from '../context/UserContext';
import { Colors } from '../constants/Colors';
import profileService, { ProfileData } from '../services/profileService';

type EditProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditProfile'>;

interface Props {
  navigation: EditProfileScreenNavigationProp;
}

export default function EditProfileScreen({ navigation }: Props): React.JSX.Element {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [requiresApproval, setRequiresApproval] = useState(false);
  const [changedFields, setChangedFields] = useState<string[]>([]);

  // Dados do usuário
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    company: '',
    bio: '',
    instagram: '',
    linkedin: '',
    email: '',
    phone: '',
    location: '',
    industry: '',
    negociosFechados: 0,
    valorTotalAcumulado: 0,
  });
  
  // Dados originais do perfil para comparação
  const [originalData, setOriginalData] = useState<ProfileData>({});
  
  // Carregar dados do perfil
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setInitialLoading(true);
        // Em um ambiente real, descomentar a linha abaixo
        // const data = await profileService.getCurrentProfile();
        
        // Simulação de dados para desenvolvimento
        const data = {
          name: 'Usuário Atual',
          company: 'Empresa Atual',
          bio: 'Este é o perfil do usuário atual. Aqui você pode visualizar e editar suas informações pessoais, configurações de conta e preferências de notificação.',
          instagram: 'usuario_atual',
          linkedin: 'usuario_atual',
          email: 'usuario@exemplo.com',
          phone: '+55 11 99999-9999',
          location: 'São Paulo, SP',
          industry: 'Tecnologia',
          negociosFechados: 30,
          valorTotalAcumulado: 700000,
        };
        
        setProfileData(data);
        setOriginalData(data);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os dados do perfil.');
      } finally {
        setInitialLoading(false);
      }
    };
    
    fetchProfileData();
  }, []);

  // Definir estilos baseados na hierarquia do usuário
  const getHierarchyStyles = () => {
    const hierarchy = 'SOCIOS'; // Simulado, deve vir do usuário real
    switch (hierarchy) {
      case 'SOCIOS':
        return {
          backgroundColor: '#16213e',
          textColor: '#FFFFFF',
          headerColor: '#D4AF37',
          borderColor: '#D4AF37',
        };
      case 'INFINITY':
        return {
          backgroundColor: '#012E40',
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

  const handleInputChange = (field: string, value: string) => {
    // Converter valores numéricos
    let processedValue: string | number = value;
    if (field === 'negociosFechados' || field === 'valorTotalAcumulado') {
      processedValue = value === '' ? 0 : Number(value);
    }
    
    setProfileData(prev => ({
      ...prev,
      [field]: processedValue
    }));
    
    // Adicionar campo à lista de campos alterados
    if (!changedFields.includes(field)) {
      setChangedFields([...changedFields, field]);
    }
    
    // Verificar se a alteração requer aprovação
    const fieldsRequiringApproval = ['company', 'industry', 'location', 'bio', 'negociosFechados', 'valorTotalAcumulado'];
    
    // Verificar se algum campo que requer aprovação foi alterado
    const needsApproval = fieldsRequiringApproval.some(field => {
      return changedFields.includes(field) && 
             profileData[field as keyof ProfileData] !== originalData[field as keyof ProfileData];
    });
    
    setRequiresApproval(needsApproval);
  };

  const handleSave = async () => {
    setLoading(true);
    
    try {
      // Filtrar apenas os campos que foram alterados
      const changedData: ProfileData = {};
      changedFields.forEach(field => {
        changedData[field as keyof ProfileData] = profileData[field as keyof ProfileData];
      });
      
      if (requiresApproval) {
        // Enviar solicitação de aprovação
        try {
          // Em um ambiente real, descomentar a linha abaixo
          // const response = await profileService.submitUpdateRequest(changedData);
          
          // Simulação para desenvolvimento
          await new Promise(resolve => setTimeout(resolve, 1500));
          const response = { message: 'Solicitação enviada com sucesso', request_id: '123456' };
          
          setLoading(false);
          Alert.alert(
            'Solicitação Enviada',
            'Suas alterações foram enviadas para aprovação. Você será notificado quando forem revisadas.',
            [{ text: 'OK', onPress: () => navigation.goBack() }]
          );
        } catch (error) {
          setLoading(false);
          Alert.alert('Erro', 'Ocorreu um erro ao enviar a solicitação de aprovação. Tente novamente.');
        }
      } else {
        // Salvar diretamente sem aprovação
        try {
          // Em um ambiente real, descomentar a linha abaixo
          // const response = await profileService.updateProfile(changedData);
          
          // Simulação para desenvolvimento
          await new Promise(resolve => setTimeout(resolve, 1500));
          const response = { message: 'Perfil atualizado com sucesso' };
          
          setLoading(false);
          Alert.alert(
            'Perfil Atualizado',
            'Seu perfil foi atualizado com sucesso!',
            [{ text: 'OK', onPress: () => navigation.goBack() }]
          );
        } catch (error) {
          setLoading(false);
          Alert.alert('Erro', 'Ocorreu um erro ao atualizar seu perfil. Tente novamente.');
        }
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Erro', 'Ocorreu um erro ao processar sua solicitação. Tente novamente.');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: hierarchyStyles.backgroundColor }]}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={hierarchyStyles.backgroundColor} 
      />
      
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={20} color={hierarchyStyles.textColor} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: hierarchyStyles.textColor }]}>Editar Perfil</Text>
        <View style={styles.headerRight} />
      </View>

      {initialLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={hierarchyStyles.headerColor} />
          <Text style={[styles.loadingText, { color: hierarchyStyles.textColor }]}>Carregando perfil...</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollView}>
        <View style={styles.formContainer}>
          {/* Informações Pessoais */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: hierarchyStyles.headerColor }]}>Informações Pessoais</Text>
            
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: hierarchyStyles.textColor }]}>Nome</Text>
              <TextInput
                style={[styles.input, { color: hierarchyStyles.textColor, borderColor: hierarchyStyles.borderColor }]}
                value={profileData.name}
                onChangeText={(text) => handleInputChange('name', text)}
                placeholderTextColor="rgba(255,255,255,0.6)"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: hierarchyStyles.textColor }]}>Empresa</Text>
              <TextInput
                style={[styles.input, { color: hierarchyStyles.textColor, borderColor: hierarchyStyles.borderColor }]}
                value={profileData.company}
                onChangeText={(text) => handleInputChange('company', text)}
                placeholderTextColor="rgba(255,255,255,0.6)"
              />
              {requiresApproval && (
                <Text style={styles.approvalNote}>* Requer aprovação</Text>
              )}
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: hierarchyStyles.textColor }]}>Setor</Text>
              <TextInput
                style={[styles.input, { color: hierarchyStyles.textColor, borderColor: hierarchyStyles.borderColor }]}
                value={profileData.industry}
                onChangeText={(text) => handleInputChange('industry', text)}
                placeholderTextColor="rgba(255,255,255,0.6)"
              />
              {requiresApproval && (
                <Text style={styles.approvalNote}>* Requer aprovação</Text>
              )}
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: hierarchyStyles.textColor }]}>Localização</Text>
              <TextInput
                style={[styles.input, { color: hierarchyStyles.textColor, borderColor: hierarchyStyles.borderColor }]}
                value={profileData.location}
                onChangeText={(text) => handleInputChange('location', text)}
                placeholderTextColor="rgba(255,255,255,0.6)"
              />
              {requiresApproval && (
                <Text style={styles.approvalNote}>* Requer aprovação</Text>
              )}
            </View>
          </View>
          
          {/* Biografia */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: hierarchyStyles.headerColor }]}>Biografia</Text>
            <TextInput
              style={[styles.bioInput, { color: hierarchyStyles.textColor, borderColor: hierarchyStyles.borderColor }]}
              value={profileData.bio}
              onChangeText={(text) => handleInputChange('bio', text)}
              multiline
              numberOfLines={6}
              placeholderTextColor="rgba(255,255,255,0.6)"
            />
          </View>
          
          {/* Redes Sociais */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: hierarchyStyles.headerColor }]}>Redes Sociais</Text>
            
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: hierarchyStyles.textColor }]}>Instagram</Text>
              <TextInput
                style={[styles.input, { color: hierarchyStyles.textColor, borderColor: hierarchyStyles.borderColor }]}
                value={profileData.instagram}
                onChangeText={(text) => handleInputChange('instagram', text)}
                placeholderTextColor="rgba(255,255,255,0.6)"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: hierarchyStyles.textColor }]}>LinkedIn</Text>
              <TextInput
                style={[styles.input, { color: hierarchyStyles.textColor, borderColor: hierarchyStyles.borderColor }]}
                value={profileData.linkedin}
                onChangeText={(text) => handleInputChange('linkedin', text)}
                placeholderTextColor="rgba(255,255,255,0.6)"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: hierarchyStyles.textColor }]}>Email</Text>
              <TextInput
                style={[styles.input, { color: hierarchyStyles.textColor, borderColor: hierarchyStyles.borderColor }]}
                value={profileData.email}
                onChangeText={(text) => handleInputChange('email', text)}
                keyboardType="email-address"
                placeholderTextColor="rgba(255,255,255,0.6)"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: hierarchyStyles.textColor }]}>Telefone</Text>
              <TextInput
                style={[styles.input, { color: hierarchyStyles.textColor, borderColor: hierarchyStyles.borderColor }]}
                value={profileData.phone}
                onChangeText={(text) => handleInputChange('phone', text)}
                keyboardType="phone-pad"
                placeholderTextColor="rgba(255,255,255,0.6)"
              />
            </View>
          </View>
          
          {/* Estatísticas de Negócios */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: hierarchyStyles.headerColor }]}>Estatísticas de Negócios</Text>
            
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: hierarchyStyles.textColor }]}>Negócios Fechados</Text>
              <TextInput
                style={[styles.input, { color: hierarchyStyles.textColor, borderColor: hierarchyStyles.borderColor }]}
                value={profileData.negociosFechados?.toString() || '0'}
                onChangeText={(text) => handleInputChange('negociosFechados', text)}
                keyboardType="numeric"
                placeholderTextColor="rgba(255,255,255,0.6)"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: hierarchyStyles.textColor }]}>Valor Total Acumulado (R$)</Text>
              <TextInput
                style={[styles.input, { color: hierarchyStyles.textColor, borderColor: hierarchyStyles.borderColor }]}
                value={profileData.valorTotalAcumulado?.toString() || '0'}
                onChangeText={(text) => handleInputChange('valorTotalAcumulado', text)}
                keyboardType="numeric"
                placeholderTextColor="rgba(255,255,255,0.6)"
              />
            </View>
          </View>
          
          {/* Botão de Salvar */}
          {requiresApproval ? (
            <TouchableOpacity 
              style={[styles.saveButton, { backgroundColor: Colors.warning }]}
              onPress={handleSave}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <>
                  <Icon name="exclamation-circle" size={16} color="#FFFFFF" style={styles.buttonIcon} />
                  <Text style={styles.saveButtonText}>Pedir Autorização das Mudanças</Text>
                </>
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={[styles.saveButton, { backgroundColor: hierarchyStyles.headerColor }]}
              onPress={handleSave}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <>
                  <Icon name="check" size={16} color="#FFFFFF" style={styles.buttonIcon} />
                  <Text style={styles.saveButtonText}>Pedir Autorização das Mudanças</Text>
                </>
              )}
            </TouchableOpacity>
          )}
          
          {requiresApproval && (
            <Text style={styles.approvalMessage}>
              Algumas alterações requerem autorização de um administrador. 
              Seu perfil será atualizado após a revisão.
            </Text>
          )}
        </View>
      </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  formContainer: {
    padding: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  bioInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    textAlignVertical: 'top',
    minHeight: 120,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonIcon: {
    marginRight: 8,
  },
  approvalNote: {
    color: Colors.warning,
    fontSize: 12,
    marginTop: 4,
  },
  approvalMessage: {
    color: Colors.warning,
    fontSize: 13,
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 30,
  },
});