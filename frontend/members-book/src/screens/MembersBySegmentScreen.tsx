import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Text from '../components/Text';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Member, membersBySegment } from '../types/Member';

type MembersBySegmentScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MembersBySegment'
>;

type MembersBySegmentScreenRouteProp = RouteProp<
  RootStackParamList,
  'MembersBySegment'
>;

interface Props {
  navigation: MembersBySegmentScreenNavigationProp;
  route: MembersBySegmentScreenRouteProp;
}

export default function MembersBySegmentScreen({ navigation, route }: Props): React.JSX.Element {
  const { segment } = route.params;
  const members = membersBySegment[segment] || [];

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleMemberPress = (member: Member) => {
    navigation.navigate('MemberDetail', { memberId: member.id, segment });
  };

  const renderMemberCard = (member: Member) => (
    <TouchableOpacity 
      key={member.id} 
      style={styles.memberCard}
      onPress={() => handleMemberPress(member)}
    >
      <Image 
        source={{ uri: member.imageUrl }} 
        style={styles.memberImage} 
        resizeMode="cover"
      />
      <View style={styles.memberInfo}>
        <Text style={styles.memberName} variant="h3">{member.name}</Text>
        <Text style={styles.memberCompany} variant="body">{member.company}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Text style={styles.backButtonText} variant="h2">←</Text>
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle} variant="h1">MEMBROS POR SEGMENTO</Text>
          <Text style={styles.subtitle} variant="body">Clique para acessar</Text>
        </View>
      </View>

      {/* Segment Title */}
      <View style={styles.segmentTitleContainer}>
        <Text style={styles.segmentTitle} variant="h2">{segment}</Text>
      </View>

      {/* Members List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.membersContainer}>
          {members.length > 0 ? (
            members.map(renderMemberCard)
          ) : (
            <Text style={styles.noMembersText} variant="body">Nenhum membro encontrado neste segmento.</Text>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.comunidadeText} variant="caption">COMUNIDADE</Text>
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
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  backButton: {
    padding: 10,
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D4AF37',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D4AF37',
    textAlign: 'center',
    letterSpacing: 1.5,
  },
  subtitle: {
    fontSize: 12,
    color: '#D4AF37',
    marginTop: 5,
  },
  segmentTitleContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#f5f5f5',
  },
  segmentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  membersContainer: {
    padding: 15,
  },
  memberCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderLeftWidth: 5,
    borderLeftColor: '#D4AF37',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  memberImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  memberInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  memberName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  memberCompany: {
    fontSize: 12,
    color: '#666',
  },
  noMembersText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    padding: 20,
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