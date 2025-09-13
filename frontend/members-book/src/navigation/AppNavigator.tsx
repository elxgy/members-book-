import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

// Screens
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ActionAreasScreen from '../screens/ActionAreasScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SegmentListScreen from '../screens/SegmentListScreen';
import MemberListScreen from '../screens/MemberListScreen';

// Components
import LoadingSpinner from '../components/LoadingSpinner';

// Context
import { useUser } from '../context/UserContext';
import { Colors } from '../constants/Colors';

const Stack = createStackNavigator();
const { width } = Dimensions.get('window');

// Custom Top Tab Navigator with transparent design
function CustomTopTabNavigator() {
  const [activeTab, setActiveTab] = useState('ActionAreas');

  const tabs = [
    { key: 'ActionAreas', title: 'Membros', icon: 'people', component: ActionAreasScreen },
    { key: 'Chat', title: 'Chat', icon: 'chatbubbles', component: ChatScreen },
    { key: 'Profile', title: 'Perfil', icon: 'person', component: ProfileScreen },
  ];

  const ActiveComponent = tabs.find(tab => tab.key === activeTab)?.component || ActionAreasScreen;

  return (
    <View style={styles.container}>
      {/* Transparent Top Tabs */}
      <LinearGradient
        colors={[Colors.primary + '20', 'transparent']}
        style={styles.topTabsContainer}
      >
        <View style={styles.tabsWrapper}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tab,
                activeTab === tab.key && styles.activeTab
              ]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Ionicons 
                name={activeTab === tab.key ? tab.icon as any : `${tab.icon}-outline` as any} 
                size={20} 
                color={activeTab === tab.key ? Colors.accent : Colors.primary} 
              />
              <Text style={[
                styles.tabText,
                activeTab === tab.key && styles.activeTabText
              ]}>
                {tab.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>
      
      {/* Active Screen Content */}
      <View style={styles.screenContainer}>
        <ActiveComponent />
      </View>
    </View>
  );
}

// Styles for the custom top tabs
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topTabsContainer: {
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  tabsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    minWidth: width / 5,
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    shadowColor: Colors.accent,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabText: {
    marginLeft: 5,
    fontSize: 12,
    fontWeight: '500',
    color: Colors.primary,
  },
  activeTabText: {
    color: Colors.accent,
    fontWeight: '700',
  },
  screenContainer: {
    flex: 1,
  },
});

// Main App Navigator
export default function AppNavigator() {
  const { user, isLoading } = useUser();

  // Show loading screen during initial auth check
  if (isLoading) {
    return (
      <LoadingSpinner 
        message="Carregando..." 
        style={{ flex: 1, backgroundColor: Colors.background }}
      />
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: Colors.background },
      }}
    >
      {user ? (
        // User is authenticated
        <>
          <Stack.Screen name="MainTabs" component={CustomTopTabNavigator} />
          <Stack.Screen name="SegmentList" component={SegmentListScreen} />
          <Stack.Screen name="MemberList" component={MemberListScreen} />
        </>
      ) : (
        // User is not authenticated
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      )}
      
      {/* Additional screens that can be navigated to */}
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: Colors.primary },
          headerTintColor: Colors.white,
          headerTitle: 'Configurações',
        }}
      />
    </Stack.Navigator>
  );
}