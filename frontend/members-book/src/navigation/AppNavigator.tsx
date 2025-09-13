import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationProp } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SegmentListScreen from '../screens/SegmentListScreen';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  SegmentList: undefined;
};

export type AppNavigationProp = NavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SegmentList" component={SegmentListScreen} />
    </Stack.Navigator>
  );
}