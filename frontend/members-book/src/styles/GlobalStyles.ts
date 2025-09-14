import { StyleSheet } from 'react-native';

/**
 * Estilos globais para aplicar a fonte Naville Regular em toda a aplicação
 */
export const GlobalStyles = StyleSheet.create({
  // Estilo base para todos os textos
  text: {
    fontFamily: 'Naville-Regular',
  },
  
  // Estilo para cabeçalhos
  heading: {
    fontFamily: 'Naville-Regular',
    fontWeight: 'bold',
  },
  
  // Estilo para botões
  buttonText: {
    fontFamily: 'Naville-Regular',
    fontWeight: '600',
  },
  
  // Estilo para textos pequenos
  smallText: {
    fontFamily: 'Naville-Regular',
    fontSize: 12,
  },
});

/**
 * Função para aplicar a fonte Naville Regular a qualquer estilo
 * @param styles Estilos originais
 * @returns Estilos com a fonte Naville Regular aplicada
 */
export const withNavilleFont = (styles: any) => {
  const updatedStyles = { ...styles };
  
  // Percorre todas as propriedades do estilo
  Object.keys(updatedStyles).forEach(key => {
    // Se a propriedade for um objeto e tiver propriedades de estilo de texto
    if (typeof updatedStyles[key] === 'object' && 
        (updatedStyles[key].fontSize !== undefined || 
         updatedStyles[key].color !== undefined || 
         updatedStyles[key].fontWeight !== undefined)) {
      // Aplica a fonte Naville Regular
      updatedStyles[key] = {
        ...updatedStyles[key],
        fontFamily: 'Naville-Regular',
      };
    }
  });
  
  return updatedStyles;
};