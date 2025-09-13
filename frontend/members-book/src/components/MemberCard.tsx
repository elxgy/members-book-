import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

type RelevanceLevel = 'Socios' | 'Infinity' | 'Disruption';

interface Member {
  id: number;
  name: string;
  company: string;
  description: string;
  photo: string;
  email?: string;
  linkedin?: string;
  instagram?: string;
  relevanceLevel: RelevanceLevel;
  sectorId: number;
  sector: string;
}

interface MemberCardProps {
  member: Member;
}

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  const handleEmailPress = () => {
    if (member.email) {
      Linking.openURL(`mailto:${member.email}`);
    }
  };

  const handleLinkedInPress = () => {
    if (member.linkedin) {
      Linking.openURL(`https://linkedin.com/in/${member.linkedin}`);
    }
  };

  const handleInstagramPress = () => {
    if (member.instagram) {
      const username = member.instagram.replace('@', '');
      Linking.openURL(`https://instagram.com/${username}`);
    }
  };

  const getRelevanceBadgeColor = (level: RelevanceLevel) => {
    switch (level) {
      case 'Socios':
        return ['#FFD700', '#FFA500']; // Dourado
      case 'Infinity':
        return ['#8A2BE2', '#4B0082']; // Roxo
      case 'Disruption':
        return ['#FF6B6B', '#FF4757']; // Vermelho
      default:
        return ['#6C5CE7', '#A29BFE']; // Azul padrão
    }
  };

  const badgeColors = getRelevanceBadgeColor(member.relevanceLevel);

  return (
    <View style={styles.cardContainer}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)']}
        style={styles.card}
      >
        {/* Badge de Hierarquia */}
        <LinearGradient
          colors={badgeColors}
          style={styles.badge}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.badgeText}>{member.relevanceLevel}</Text>
        </LinearGradient>

        {/* Foto do Membro */}
        <View style={styles.photoContainer}>
          <Image source={{ uri: member.photo }} style={styles.photo} />
        </View>

        {/* Informações do Membro */}
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{member.name}</Text>
          <Text style={styles.company}>{member.company}</Text>
          <Text style={styles.sector}>{member.sector}</Text>
          <Text style={styles.description} numberOfLines={3}>
            {member.description}
          </Text>
        </View>

        {/* Botões de Contato */}
        <View style={styles.contactContainer}>
          {member.email && (
            <TouchableOpacity
              style={styles.contactButton}
              onPress={handleEmailPress}
            >
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.contactButtonGradient}
              >
                <Ionicons name="mail" size={20} color="white" />
              </LinearGradient>
            </TouchableOpacity>
          )}

          {member.linkedin && (
            <TouchableOpacity
              style={styles.contactButton}
              onPress={handleLinkedInPress}
            >
              <LinearGradient
                colors={['#0077B5', '#005885']}
                style={styles.contactButtonGradient}
              >
                <Ionicons name="logo-linkedin" size={20} color="white" />
              </LinearGradient>
            </TouchableOpacity>
          )}

          {member.instagram && (
            <TouchableOpacity
              style={styles.contactButton}
              onPress={handleInstagramPress}
            >
              <LinearGradient
                colors={['#E4405F', '#C13584']}
                style={styles.contactButtonGradient}
              >
                <Ionicons name="logo-instagram" size={20} color="white" />
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
  },
  badge: {
    position: 'absolute',
    top: 15,
    right: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    zIndex: 1,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 4,
  },
  company: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 4,
    fontWeight: '600',
  },
  sector: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  description: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 20,
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  contactButton: {
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  contactButtonGradient: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MemberCard;