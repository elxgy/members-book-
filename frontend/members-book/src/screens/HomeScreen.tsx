import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import { Colors } from "../constants/Colors"
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.gradientStart, Colors.gradientMiddle, Colors.gradientEnd]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {/* Header Section with Logo */}
          <View style={styles.headerSection}>
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <Ionicons name="people" size={60} color={Colors.text} />
              </View>
            </View>
            <Text style={styles.mainTitle}>MEMBERS BOOK</Text>
            <Text style={styles.yearText}>2025</Text>
            <Text style={styles.subtitle}>ENJOY</Text>
          </View>

          {/* Decorative Elements */}
          <View style={styles.decorativeSection}>
            <View style={styles.decorativeLine} />
            <View style={styles.decorativeCircle} />
            <View style={styles.decorativeLine} />
          </View>

          {/* Enter Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.enterButton}
              onPress={() => navigation.navigate('Login')}
              activeOpacity={0.8}
            >
              <Text style={styles.enterButtonText}>ENTRAR</Text>
            </TouchableOpacity>
          </View>

          {/* Footer Section */}
          <View style={styles.footerSection}>
            <Text style={styles.footerText}>Conectando Profissionais</Text>
            <View style={styles.footerDecorative}>
              <View style={styles.footerDot} />
              <View style={styles.footerDot} />
              <View style={styles.footerDot} />
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  )
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
    paddingHorizontal: 40,
    justifyContent: 'space-between',
    paddingTop: 80,
    paddingBottom: 60,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    marginBottom: 30,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.metallicGold,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.metallicGoldDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 2,
    borderColor: Colors.metallicGoldLight,
  },
  mainTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: Colors.textOnPrimary,
    textAlign: 'center',
    letterSpacing: 3,
    marginBottom: 8,
  },
  yearText: {
    fontSize: 48,
    fontWeight: '900',
    color: Colors.metallicGold,
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: 8,
    textShadowColor: Colors.metallicGoldDark,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textOnPrimary,
    textAlign: 'center',
    letterSpacing: 4,
    opacity: 0.9,
  },
  decorativeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  decorativeLine: {
    width: 60,
    height: 2,
    backgroundColor: Colors.metallicGold,
    opacity: 0.9,
  },
  decorativeCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.metallicGold,
    marginHorizontal: 15,
    shadowColor: Colors.metallicGoldDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  enterButton: {
    backgroundColor: Colors.metallicGold,
    borderRadius: 15,
    paddingHorizontal: 60,
    paddingVertical: 20,
    shadowColor: Colors.metallicGoldDark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
    borderWidth: 1,
    borderColor: Colors.metallicGoldLight,
  },
  enterButtonText: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 2,
  },
  footerSection: {
    alignItems: 'center',
    marginTop: 40,
  },
  footerText: {
    fontSize: 16,
    color: Colors.textOnPrimary,
    textAlign: 'center',
    opacity: 0.8,
    fontWeight: '500',
    letterSpacing: 1,
    marginBottom: 20,
  },
  footerDecorative: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.metallicGold,
    marginHorizontal: 6,
    opacity: 0.8,
  },
})
