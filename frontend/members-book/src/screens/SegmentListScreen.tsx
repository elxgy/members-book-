import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type SegmentListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SegmentList'>;

interface Props {
  navigation: SegmentListScreenNavigationProp;
}

const segments = [
  'ADVOCACIA',
  'FOOD',
  'ARQUITETURA',
  'FRANQUIAS',
  'COMÉRCIO',
  'IMOBILIÁRIO',
  'COMEX',
  'LICITAÇÃO',
  'CONSTRUTORA &\nINCORPORADORA',
  'LOGÍSTICA &\nTRANSPORTE',
  'CONSULTORIA',
  'MARKETING',
  'CONTÁBIL',
  'RECURSOS\nHUMANOS',
  'EDUCAÇÃO',
  'SAÚDE',
  'ENGENHARIA',
  'SEGUROS',
  'EVENTOS & PRODUÇÕES',
  'TECNOLOGIA',
  'FINANÇAS &\nINVESTIMENTOS',
  'VEÍCULOS',
];

export default function SegmentListScreen({ navigation }: Props): React.JSX.Element {
  const handleSegmentPress = (segment: string) => {
    // Aqui você pode implementar a navegação para a lista de membros do segmento
    console.log('Segmento selecionado:', segment);
  };

  const renderSegmentButton = (segment: string, index: number) => (
    <TouchableOpacity
      key={index}
      style={styles.segmentButton}
      onPress={() => handleSegmentPress(segment)}
    >
      <Text style={styles.segmentText}>{segment}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.mainTitle}>LISTA DE SEGMENTOS</Text>
      </View>

      {/* Segments Grid */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.segmentsContainer}>
          {segments.map((segment, index) => renderSegmentButton(segment, index))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.comunidadeText}>COMUNIDADE</Text>
          <Text style={styles.disruptionText}>DISRUPTION</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D4AF37',
    textAlign: 'center',
    letterSpacing: 1.5,
  },
  scrollView: {
    flex: 1,
  },
  segmentsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  segmentButton: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#D4AF37',
    borderRadius: 0,
    paddingVertical: 18,
    paddingHorizontal: 12,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 65,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  segmentText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1a1a2e',
    textAlign: 'center',
    lineHeight: 14,
    letterSpacing: 0.3,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingBottom: 50,
  },
  comunidadeText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#888',
    letterSpacing: 1,
    marginBottom: 2,
  },
  disruptionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#D4AF37',
    letterSpacing: 1,
  },
});