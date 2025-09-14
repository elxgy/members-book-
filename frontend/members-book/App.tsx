import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { UserProvider } from './src/context/UserContext';
import { FontProvider } from './src/context/FontContext';
import DefaultFontProvider from './src/components/DefaultFontProvider';
import ErrorBoundary from './src/components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <FontProvider>
        <DefaultFontProvider>
          <UserProvider>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </UserProvider>
        </DefaultFontProvider>
      </FontProvider>
    </ErrorBoundary>
  );
}
