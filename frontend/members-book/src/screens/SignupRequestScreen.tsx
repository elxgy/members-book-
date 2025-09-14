import React, { useState } from 'react';
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

type SignupRequestScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignupRequest'>;

interface Props {
  navigation: SignupRequestScreenNavigationProp;
}

interface SignupData {
  nome: string;
  foto: string;
  empresa: string;
  anoNascimento: string;
  local: string;
  marcasDiferentes: string;
  faturamento: string;
  tempoAtuacao: string;
  principaisResultados: string;
  possuiFilhos: string;
  hobby: string;
  instagram: string;
  email: string;
  site: string;
  linkedin: string;
}

export default function SignupRequestScreen({ navigation }: Props): React.JSX.Element {
  const [loading, setLoading] = useState(false);
  const [signupData, setSignupData] = useState<SignupData>({
    nome: '',
    foto: '',
    empresa: '',
    anoNascimento: '',
    local: '',
    marcasDiferentes: '',
    faturamento: '',
    tempoAtuacao: '',
    principaisResultados: '',
    possuiFilhos: '',
    hobby: '',
    instagram: '',
    email: '',
    site: '',
    linkedin: '',
  });

  const handleInputChange = (field: keyof SignupData, value: string) => {
    setSignupData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    // Validar campos obrigatórios
    if (!signupData.nome || !signupData.email || !signupData.empresa) {
      Alert.alert('Erro', 'Por favor, preencha pelo menos os campos obrigatórios: Nome, Email e Empresa.');
      return;
    }

    setLoading(true);
    
    try {
      // Simular envio da requisição
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Solicitação Enviada',
        'Sua solicitação de inscrição foi enviada com sucesso! Você receberá um retorno em breve.',
        [
          { 
            text: 'OK', 
            onPress: () => navigation.goBack() 
          }
        ]
      );
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao enviar sua solicitação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={20} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Solicitar Inscrição</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.formContainer}>
          {/* Informações Pessoais */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informações Pessoais</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nome *</Text>
              <TextInput
                style={styles.input}
                value={signupData.nome}
                onChangeText={(text) => handleInputChange('nome', text)}
                placeholder="Digite seu nome completo"
                placeholderTextColor="#999"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Foto</Text>
              <TextInput
                style={styles.input}
                value={signupData.foto}
                onChangeText={(text) => handleInputChange('foto', text)}
                placeholder="URL da sua foto de perfil"
                placeholderTextColor="#999"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Empresa *</Text>
              <TextInput
                style={styles.input}
                value={signupData.empresa}
                onChangeText={(text) => handleInputChange('empresa', text)}
                placeholder="Nome da sua empresa"
                placeholderTextColor="#999"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Ano de Nascimento</Text>
              <TextInput
                style={styles.input}
                value={signupData.anoNascimento}
                onChangeText={(text) => handleInputChange('anoNascimento', text)}
                placeholder="Ex: 1990"
                placeholderTextColor="#999"
                keyboardType="numeric"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Local</Text>
              <TextInput
                style={styles.input}
                value={signupData.local}
                onChangeText={(text) => handleInputChange('local', text)}
                placeholder="Cidade, Estado"
                placeholderTextColor="#999"
              />
            </View>
          </View>
          
          {/* Informações Profissionais */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informações Profissionais</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Marcas Diferentes que Representa</Text>
              <TextInput
                style={styles.bioInput}
                value={signupData.marcasDiferentes}
                onChangeText={(text) => handleInputChange('marcasDiferentes', text)}
                placeholder="Descreva as marcas que você representa"
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Faturamento</Text>
              <TextInput
                style={styles.input}
                value={signupData.faturamento}
                onChangeText={(text) => handleInputChange('faturamento', text)}
                placeholder="Faturamento anual aproximado"
                placeholderTextColor="#999"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Tempo de Atuação</Text>
              <TextInput
                style={styles.input}
                value={signupData.tempoAtuacao}
                onChangeText={(text) => handleInputChange('tempoAtuacao', text)}
                placeholder="Ex: 5 anos"
                placeholderTextColor="#999"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Principais Resultados</Text>
              <TextInput
                style={styles.bioInput}
                value={signupData.principaisResultados}
                onChangeText={(text) => handleInputChange('principaisResultados', text)}
                placeholder="Descreva seus principais resultados e conquistas"
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
              />
            </View>
          </View>
          
          {/* Informações Pessoais Adicionais */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informações Adicionais</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Possui Filhos</Text>
              <TextInput
                style={styles.input}
                value={signupData.possuiFilhos}
                onChangeText={(text) => handleInputChange('possuiFilhos', text)}
                placeholder="Sim/Não - Quantos?"
                placeholderTextColor="#999"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Hobby</Text>
              <TextInput
                style={styles.input}
                value={signupData.hobby}
                onChangeText={(text) => handleInputChange('hobby', text)}
                placeholder="Seus hobbies e interesses"
                placeholderTextColor="#999"
              />
            </View>
          </View>
          
          {/* Redes Sociais */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Redes Sociais e Contato</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Instagram</Text>
              <TextInput
                style={styles.input}
                value={signupData.instagram}
                onChangeText={(text) => handleInputChange('instagram', text)}
                placeholder="@seu_usuario"
                placeholderTextColor="#999"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>E-mail *</Text>
              <TextInput
                style={styles.input}
                value={signupData.email}
                onChangeText={(text) => handleInputChange('email', text)}
                placeholder="seu@email.com"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Site</Text>
              <TextInput
                style={styles.input}
                value={signupData.site}
                onChangeText={(text) => handleInputChange('site', text)}
                placeholder="www.seusite.com"
                placeholderTextColor="#999"
                autoCapitalize="none"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>LinkedIn</Text>
              <TextInput
                style={styles.input}
                value={signupData.linkedin}
                onChangeText={(text) => handleInputChange('linkedin', text)}
                placeholder="linkedin.com/in/seu-perfil"
                placeholderTextColor="#999"
                autoCapitalize="none"
              />
            </View>
          </View>
          
          {/* Botão de Enviar */}
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <>
                <Icon name="paper-plane" size={16} color="#FFFFFF" style={styles.buttonIcon} />
                <Text style={styles.submitButtonText}>Enviar Solicitação</Text>
              </>
            )}
          </TouchableOpacity>
          
          <Text style={styles.footerNote}>
            * Campos obrigatórios{"\n"}
            Sua solicitação será analisada e você receberá um retorno em breve.
          </Text>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
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
    color: '#D4AF37',
    marginBottom: 15,
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D4AF37',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333333',
    backgroundColor: '#FFFFFF',
  },
  bioInput: {
    borderWidth: 1,
    borderColor: '#D4AF37',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333333',
    backgroundColor: '#FFFFFF',
    textAlignVertical: 'top',
    minHeight: 100,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D4AF37',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 20,
    elevation: 2,
    shadowColor: '#D4AF37',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonIcon: {
    marginRight: 8,
  },
  footerNote: {
    color: '#666666',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 30,
    lineHeight: 18,
  },
});