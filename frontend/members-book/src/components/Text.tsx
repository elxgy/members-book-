import React from 'react';
import { Text as RNText, TextProps, StyleSheet, TextStyle } from 'react-native';
import { useFonts } from '../context/FontContext';

interface CustomTextProps extends TextProps {
  style?: TextStyle | TextStyle[];
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'bodySmall' | 'caption' | 'button';
}

const Text: React.FC<CustomTextProps> = ({ style, variant, children, ...props }) => {
  const { fontsLoaded } = useFonts();
  
  // Definir estilos base para cada variante
  const getVariantStyle = (): TextStyle => {
    switch (variant) {
      case 'h1':
        return styles.h1;
      case 'h2':
        return styles.h2;
      case 'h3':
        return styles.h3;
      case 'h4':
        return styles.h4;
      case 'bodySmall':
        return styles.bodySmall;
      case 'caption':
        return styles.caption;
      case 'button':
        return styles.button;
      case 'body':
      default:
        return styles.body;
    }
  };

  // Combinar estilos: base + variante + personalizado
  const combinedStyle = [
    styles.baseText,
    variant ? getVariantStyle() : null,
    style,
  ];

  return (
    <RNText style={combinedStyle} {...props}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'System',
  },
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

export default Text;