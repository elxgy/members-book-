import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import Text from '../components/Text';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useUser } from '../context/UserContext';
import Icon from 'react-native-vector-icons/FontAwesome';

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
];

export default function SegmentListScreen({ navigation }: Props): React.JSX.Element {
  const { canAccessChat, canAccessProfile } = useUser();

  const handleSegmentPress = (segment: string) => {
    // Navega para a tela de membros do segmento selecionado
    navigation.navigate('MembersBySegment', { segment });
  };

  const renderSegmentButton = (segment: string, index: number) => (
    <TouchableOpacity
      key={index}
      style={styles.segmentButton}
      onPress={() => handleSegmentPress(segment)}
    >
      <Text style={styles.segmentText} variant="h3">{segment}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.placeholder} />
        <View style={styles.headerTitleContainer}>
           <View style={styles.headerButtonsContainer}>
             <TouchableOpacity style={[styles.navButton, styles.activeNavButton]}>
               <Icon name="th-large" size={16} color="#FFFFFF" />
               <Text style={[styles.navButtonText, styles.activeNavButtonText]}>SEGMENTOS</Text>
             </TouchableOpacity>
            {canAccessProfile() ? (
              <TouchableOpacity 
                style={styles.navButton}
                onPress={() => navigation.navigate('UserProfile')}
              >
                <Icon name="user" size={16} color="#D4AF37" />
                <Text style={styles.navButtonText}>MEU PERFIL</Text>
              </TouchableOpacity>
            ) : (
              <View style={[styles.navButton, styles.disabledNavButton]}>
                <Icon name="user" size={16} color="#999" />
                <Text style={styles.disabledNavButtonText}>MEU PERFIL</Text>
              </View>
            )}
            {canAccessChat() ? (
              <TouchableOpacity 
                style={styles.navButton}
                onPress={() => navigation.navigate('Chat')}
              >
                <Icon name="comments" size={16} color="#D4AF37" />
                <Text style={styles.navButtonText}>CHAT</Text>
              </TouchableOpacity>
            ) : (
              <View style={[styles.navButton, styles.disabledNavButton]}>
                <Icon name="comments" size={16} color="#999" />
                <Text style={styles.disabledNavButtonText}>CHAT</Text>
              </View>
            )}
           </View>
         </View>
        <View style={styles.placeholder} />
      </View>

      {/* Segments Grid */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.segmentsContainer}>
          {segments.map((segment, index) => renderSegmentButton(segment, index))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.comunidadeText} variant="body">COMUNIDADE</Text>
          <Text style={styles.disruptionText} variant="h3">DISRUPTION</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  placeholder: {
    width: 36,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D4AF37',
    textAlign: 'center',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  headerButtonsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  navButton: {
     flexDirection: 'row',
     alignItems: 'center',
     paddingHorizontal: 12,
     paddingVertical: 6,
     backgroundColor: '#F8F9FA',
     borderRadius: 16,
     borderWidth: 1,
     borderColor: '#D4AF37',
   },
   activeNavButton: {
     backgroundColor: '#D4AF37',
   },
   activeNavButtonText: {
     color: '#FFFFFF',
   },
  navButtonText: {
    fontSize: 12,
    color: '#D4AF37',
    fontWeight: '600',
    marginLeft: 4,
  },
  disabledNavButton: {
    borderColor: '#E0E0E0',
    backgroundColor: '#F5F5F5',
  },
  disabledNavButtonText: {
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
    marginLeft: 4,
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
    minHeight: 75,
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
    fontSize: 12,
    fontWeight: '600',
    color: '#1a1a2e',
    textAlign: 'center',
    lineHeight: 20,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D4AF37',
    letterSpacing: 1,
  },

});