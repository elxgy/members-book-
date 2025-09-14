import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationProp } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupRequestScreen from '../screens/SignupRequestScreen';
import SegmentListScreen from '../screens/SegmentListScreen';
import MembersBySegmentScreen from '../screens/MembersBySegmentScreen';
import MemberDetailScreen from '../screens/MemberDetailScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ChatScreen from '../screens/ChatScreen';
import AdminFormFieldsScreen from '../screens/AdminFormFieldsScreen';
import UserManagementScreen from '../screens/UserManagementScreen';
import AdminApprovalScreen from '../screens/AdminApprovalScreen';
import AdminScreen from '../screens/AdminScreen';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  SignupRequest: undefined;
  SegmentList: undefined;
  MembersBySegment: { segment: string };
  MemberDetail: { memberId: string; segment: string };
  UserProfile: undefined;
  EditProfile: undefined;
  Chat: undefined;
  AdminFormFields: undefined;
  UserManagement: undefined;
  AdminApproval: undefined;
  AdminScreen: undefined;
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
      <Stack.Screen name="SignupRequest" component={SignupRequestScreen} />
      <Stack.Screen name="SegmentList" component={SegmentListScreen} />
      <Stack.Screen name="MembersBySegment" component={MembersBySegmentScreen} />
      <Stack.Screen name="MemberDetail" component={MemberDetailScreen} />
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="AdminFormFields" component={AdminFormFieldsScreen} />
      <Stack.Screen name="UserManagement" component={UserManagementScreen} />
      <Stack.Screen name="AdminApproval" component={AdminApprovalScreen} />
      <Stack.Screen name="AdminScreen" component={AdminScreen} />
    </Stack.Navigator>
  );
}