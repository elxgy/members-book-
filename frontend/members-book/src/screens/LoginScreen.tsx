import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import { Colors } from '../constants/Colors';
import { useUser } from '../context/UserContext';

const { width, height } = Dimensions.get('window');

interface LoginScreenProps {}

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'biometric'>('email');
  
  const { login, isAuthenticating } = useUser();

  // Mock login function
  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    
    try {
      // Use the login method from UserContext
      const success = await login(email, password);
      
      if (!success) {
        Alert.alert('Erro', 'Credenciais inválidas.');
        return;
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha no login. Tente novamente.');
    }
  };

  // Mock biometric login
  const handleBiometricLogin = async () => {
    try {
      // Use mock credentials for biometric login
      const success = await login('biometric@membersbook.com', 'biometric');
      
      if (!success) {
        Alert.alert('Erro', 'Falha na autenticação biométrica.');
        return;
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha na autenticação biométrica.');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {/* Logo/Title Section */}
          <View style={styles.headerSection}>
            <View style={styles.logoContainer}>
              <Ionicons name="people-circle" size={80} color={Colors.accent} />
            </View>
            <Text style={styles.title}>Members Book</Text>
            <Text style={styles.subtitle}>Conectando Profissionais</Text>
          </View>

          {/* Login Form */}
          <View style={styles.formContainer}>
            {loginMethod === 'email' ? (
              <>
                <View style={styles.inputContainer}>
                  <Ionicons name="mail-outline" size={20} color={Colors.accent} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={Colors.text.secondary}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Ionicons name="lock-closed-outline" size={20} color={Colors.accent} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    placeholderTextColor={Colors.text.secondary}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword(!showPassword)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Ionicons 
                      name={showPassword ? "eye-off-outline" : "eye-outline"} 
                      size={20} 
                      color={Colors.accent} 
                    />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={[styles.loginButton, isAuthenticating && styles.loginButtonDisabled]}
                  onPress={handleLogin}
                  disabled={isAuthenticating}
                  activeOpacity={0.8}
                >
                  {isAuthenticating ? (
                    <ActivityIndicator color={Colors.primary} size="small" />
                  ) : (
                    <Text style={styles.loginButtonText}>Entrar</Text>
                  )}
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={[styles.biometricButton, isAuthenticating && styles.loginButtonDisabled]}
                onPress={handleBiometricLogin}
                disabled={isAuthenticating}
                activeOpacity={0.8}
              >
                {isAuthenticating ? (
                  <ActivityIndicator color={Colors.white} size="small" />
                ) : (
                  <>
                    <Ionicons name="finger-print" size={40} color={Colors.white} />
                    <Text style={styles.biometricButtonText}>Autenticação Biométrica</Text>
                  </>
                )}
              </TouchableOpacity>
            )}

            {/* Switch Login Method */}
            <TouchableOpacity
              style={styles.switchMethodButton}
              onPress={() => setLoginMethod(loginMethod === 'email' ? 'biometric' : 'email')}
              hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            >
              <Text style={styles.switchMethodText}>
                {loginMethod === 'email' ? 'Usar Biometria' : 'Usar Email/Senha'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Demo Instructions */}
          <View style={styles.demoSection}>
            <Text style={styles.demoTitle}>Demo - Tipos de Usuário:</Text>
            <Text style={styles.demoText}>• admin@test.com - Acesso Administrativo</Text>
            <Text style={styles.demoText}>• member@test.com - Acesso de Membro</Text>
            <Text style={styles.demoText}>• guest@test.com - Acesso de Visitante</Text>
            <Text style={styles.demoNote}>Qualquer senha funciona nesta demonstração</Text>
          </View>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logoContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.accent,
    textAlign: 'center',
    opacity: 0.9,
  },
  formContainer: {
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.text.primary,
    height: '100%',
  },
  eyeIcon: {
    padding: 4,
  },
  loginButton: {
    backgroundColor: Colors.accent,
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  biometricButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 2,
    borderColor: Colors.accent,
  },
  biometricButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  switchMethodButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  switchMethodText: {
    color: Colors.accent,
    fontSize: 16,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  demoSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
  },
  demoTitle: {
    color: Colors.accent,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  demoText: {
    color: Colors.white,
    fontSize: 14,
    marginBottom: 4,
  },
  demoNote: {
    color: Colors.accent,
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 8,
  },
});

export default LoginScreen;