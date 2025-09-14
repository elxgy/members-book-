import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { useFonts } from '../context/FontContext';

interface DefaultFontProviderProps {
  children: ReactNode;
}

/**
 * Componente que aplica a fonte Naville Regular como padrão em toda a aplicação
 * através de estilos globais e configurações de texto padrão.
 */
const DefaultFontProvider: React.FC<DefaultFontProviderProps> = ({ children }) => {
  const { fontsLoaded, fontError } = useFonts();

  // Se as fontes ainda não foram carregadas, podemos mostrar um indicador de carregamento
  // ou simplesmente renderizar os filhos com a fonte padrão do sistema até que a fonte seja carregada
  if (!fontsLoaded && !fontError) {
    // Opcionalmente, você pode mostrar um indicador de carregamento aqui
    return <>{children}</>;
  }

  // Se houver um erro ao carregar as fontes, renderizamos os filhos com a fonte padrão do sistema
  if (fontError) {
    console.warn('Erro ao carregar fontes:', fontError);
    return <>{children}</>;
  }

  // Fontes carregadas com sucesso, renderizamos os filhos
  return <>{children}</>;
};

export default DefaultFontProvider;