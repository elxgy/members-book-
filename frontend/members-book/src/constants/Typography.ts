import { StyleSheet, TextStyle } from 'react-native';

// Definição de estilos de tipografia padrão usando a fonte Naville Regular
export const Typography = StyleSheet.create({
  // Estilos de texto base que serão herdados por todos os componentes de texto
  baseText: {
    fontFamily: 'Naville-Regular',
  },
  
  // Variações de tamanho e peso
  h1: {
    fontFamily: 'Naville-Regular',
    fontSize: 32,
    fontWeight: 'bold',
  },
  h2: {
    fontFamily: 'Naville-Regular',
    fontSize: 24,
    fontWeight: 'bold',
  },
  h3: {
    fontFamily: 'Naville-Regular',
    fontSize: 20,
    fontWeight: 'bold',
  },
  h4: {
    fontFamily: 'Naville-Regular',
    fontSize: 18,
    fontWeight: 'bold',
  },
  body: {
    fontFamily: 'Naville-Regular',
    fontSize: 16,
  },
  bodySmall: {
    fontFamily: 'Naville-Regular',
    fontSize: 14,
  },
  caption: {
    fontFamily: 'Naville-Regular',
    fontSize: 12,
  },
  button: {
    fontFamily: 'Naville-Regular',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// Função auxiliar para aplicar a fonte Naville Regular a qualquer estilo de texto
export const applyNavilleFont = (style: TextStyle): TextStyle => {
  return {
    ...style,
    fontFamily: 'Naville-Regular',
  };
};