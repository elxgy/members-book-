import { StyleSheet } from 'react-native';

/**
 * Estilos globais para aplicar fontes do sistema em toda a aplicação
 */
export const GlobalStyles = StyleSheet.create({
  // Estilo base para todos os textos
  text: {
    fontFamily: 'System',
  },
  
  // Estilo para cabeçalhos
  heading: {
    fontFamily: 'System',
    fontWeight: 'bold',
  },
  
  // Estilo para botões
  buttonText: {
    fontFamily: 'System',
    fontWeight: '600',
  },
  
  // Estilo para textos pequenos
  smallText: {
    fontFamily: 'System',
    fontSize: 12,
  },
});

/**
 * Função para aplicar fonte do sistema a qualquer estilo
 * @param styles Estilos originais
 * @returns Estilos com a fonte do sistema aplicada
 */
export const withSystemFont = (styles: any) => {
  const updatedStyles = { ...styles };
  
  // Percorre todas as propriedades do estilo
  Object.keys(updatedStyles).forEach(key => {
    // Se a propriedade for um objeto e tiver propriedades de estilo de texto
    if (typeof updatedStyles[key] === 'object' && 
        (updatedStyles[key].fontSize !== undefined || 
         updatedStyles[key].color !== undefined || 
         updatedStyles[key].fontWeight !== undefined)) {
      // Aplica a fonte do sistema
      updatedStyles[key] = {
        ...updatedStyles[key],
        fontFamily: 'System',
      };
    }
  });
  
  return updatedStyles;
};