import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Text from '../components/Text';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: Props): React.JSX.Element {
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      <LinearGradient
        colors={['#0a0a0a', '#1a1a2e', '#16213e']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {/* Header Section */}
          <View style={styles.headerSection}>
            <Text style={styles.comunidadeText} variant="caption">COMUNIDADE</Text>
            <Text style={styles.disruptionText} variant="subtitle">DISRUPTION</Text>
          </View>

          {/* Main Title Section */}
          <View style={styles.titleSection}>
            <View style={styles.membersBookContainer}>
              <Text style={styles.membersText} variant="h1">MEMBERS</Text>
            <View style={styles.bookRow}>
              <Text style={styles.bookText} variant="h1">BOOK</Text>
              <Text style={styles.yearText} variant="h2">2025</Text>
            </View>
            </View>
          </View>

          {/* Bottom Section */}
          <View style={styles.bottomSection}>
            <Text style={styles.veggetiText} variant="h3">Veggeti</Text>
            
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText} variant="button">ENTRAR</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 60,
  },
  headerSection: {
    alignItems: 'center',
    marginTop: 40,
  },
  comunidadeText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
    letterSpacing: 3,
    marginBottom: 5,
  },
  disruptionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D4AF37',
    letterSpacing: 2,
  },
  titleSection: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: -50,
  },
  membersBookContainer: {
    alignItems: 'center',
  },
  membersText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 4,
    marginBottom: 10,
  },
  bookRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  bookText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 4,
    marginRight: 15,
  },
  yearText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D4AF37',
    letterSpacing: 2,
  },
  bottomSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  veggetiText: {
    fontSize: 32,
    fontWeight: '300',
    color: '#FFFFFF',
    fontStyle: 'italic',
    marginBottom: 40,
  },
  loginButton: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#D4AF37',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0a0a0a',
    letterSpacing: 1,
  },
});