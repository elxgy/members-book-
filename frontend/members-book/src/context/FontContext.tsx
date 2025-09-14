import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import * as Font from 'expo-font';

interface FontContextType {
  fontsLoaded: boolean;
  fontError: Error | null;
}

interface FontProviderProps {
  children: ReactNode;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

export const useFonts = (): FontContextType => {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error('useFonts must be used within a FontProvider');
  }
  return context;
};

export const FontProvider: React.FC<FontProviderProps> = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);
  const [fontError, setFontError] = useState<Error | null>(null);

  useEffect(() => {
    // Como a fonte customizada não está disponível, vamos usar fontes do sistema
    // e marcar como carregada imediatamente
    setFontsLoaded(true);
  }, []);

  const value = {
    fontsLoaded,
    fontError,
  };

  return (
    <FontContext.Provider value={value}>
      {children}
    </FontContext.Provider>
  );
};