import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Text from '../components/Text';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import authService from '../services/authService';
import { useUser } from '../context/UserContext';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

export default function LoginScreen({ navigation }: Props): React.JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useUser();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    
    try {
      const response = await authService.login({ email, password });
      
      if (response.success && response.user) {
        const loginSuccess = await login(response.user);
        
        if (loginSuccess) {
          // Navigate based on role
          if (response.user.role === 'ADMIN') {
            navigation.navigate('AdminScreen');
          } else {
            navigation.navigate('SegmentList');
          }
        } else {
          Alert.alert('Erro', 'Falha ao salvar a sessão do usuário.');
        }
      } else {
        Alert.alert('Erro de Login', response.message || 'Email ou senha incorretos.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro inesperado. Verifique sua conexão e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      <LinearGradient
        colors={['#0a0a0a', '#1a1a2e', '#16213e']}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.title}>LOGIN</Text>
              <View style={styles.placeholder} />
            </View>

            {/* Brand Section */}
            <View style={styles.brandSection}>
              <Text style={styles.comunidadeText} variant="bodySmall">COMUNIDADE</Text>
            <Text style={styles.disruptionText} variant="h4">DISRUPTION</Text>
            </View>

            {/* Form Section */}
            <View style={styles.formSection}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel} variant="bodySmall">E-mail</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Digite seu e-mail"
                  placeholderTextColor="#666"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel} variant="bodySmall">Senha</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Digite sua senha"
                    placeholderTextColor="#666"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? 'eye-off' : 'eye'}
                      size={20}
                      color="#666"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={styles.signupLink}
                onPress={() => navigation.navigate('SignupRequest')}
              >
                <Text style={styles.signupLinkText} variant="bodySmall">Solicitar Inscrição</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.loginButton, loading && styles.loginButtonDisabled]}
                onPress={handleLogin}
                disabled={loading}
              >
                <Text style={styles.loginButtonText} variant="button">
                  {loading ? 'ENTRANDO...' : 'ENTRAR'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText} variant="caption">Members Book 2025</Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  gradient: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  placeholder: {
    width: 44,
  },
  brandSection: {
    alignItems: 'center',
    marginVertical: 30,
  },
  comunidadeText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FFFFFF',
    letterSpacing: 2,
    marginBottom: 5,
  },
  disruptionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D4AF37',
    letterSpacing: 1,
  },
  formSection: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  inputContainer: {
    marginBottom: 25,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16,
    color: '#FFFFFF',
  },
  eyeButton: {
    padding: 15,
  },
  signupLink: {
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 5,
  },
  signupLinkText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    letterSpacing: 1,
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#D4AF37',
    paddingVertical: 18,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    elevation: 3,
    shadowColor: '#D4AF37',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  loginButtonDisabled: {
    backgroundColor: '#666',
    elevation: 0,
    shadowOpacity: 0,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0a0a0a',
    letterSpacing: 1,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    letterSpacing: 1,
  },
});