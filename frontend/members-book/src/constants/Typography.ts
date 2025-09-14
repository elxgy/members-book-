import { StyleSheet, TextStyle } from 'react-native';

// Definição de estilos de tipografia padrão usando fontes do sistema
export const Typography = StyleSheet.create({
  // Estilos de texto base que serão herdados por todos os componentes de texto
  baseText: {
    fontFamily: 'System',
  },
  
  // Variações de tamanho e peso
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  h3: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  h4: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 16,
  },
  bodySmall: {
    fontSize: 14,
  },
  caption: {
    fontSize: 12,
  },
  button: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// Função auxiliar para aplicar fonte do sistema a qualquer estilo de texto
export const applySystemFont = (style: TextStyle): TextStyle => {
  return {
    ...style,
    fontFamily: 'System',
  };
};