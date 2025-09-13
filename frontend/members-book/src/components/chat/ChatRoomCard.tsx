import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import type { ChatRoom } from '../../types';

interface ChatRoomCardProps {
  chatRoom: ChatRoom;
  onPress: (chatRoom: ChatRoom) => void;
}

const ChatRoomCard: React.FC<ChatRoomCardProps> = ({ chatRoom, onPress }) => {
  const handlePress = () => {
    onPress(chatRoom);
  };

  const formatLastMessageTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Agora';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  };

  const renderAvatar = () => {
    if (chatRoom.type === 'group') {
      return (
        <View style={styles.groupAvatarContainer}>
          <View style={[styles.groupAvatar, { backgroundColor: Colors.primary }]}>
            <Ionicons name="people" size={20} color={Colors.white} />
          </View>
        </View>
      );
    }

    return (
      <View style={styles.avatarContainer}>
        {chatRoom.avatar ? (
          <Image source={{ uri: chatRoom.avatar }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatarPlaceholder, { backgroundColor: Colors.primary }]}>
            <Text style={styles.avatarText}>{chatRoom.name.charAt(0)}</Text>
          </View>
        )}
        {chatRoom.isOnline && <View style={styles.onlineIndicator} />}
      </View>
    );
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {renderAvatar()}
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>
            {chatRoom.name}
          </Text>
          <Text style={styles.time}>
            {formatLastMessageTime(chatRoom.lastMessageTime)}
          </Text>
        </View>
        
        <View style={styles.messageRow}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {chatRoom.lastMessage}
          </Text>
          {chatRoom.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>
                {chatRoom.unreadCount > 99 ? '99+' : chatRoom.unreadCount}
              </Text>
            </View>
          )}
        </View>
        
        {chatRoom.type === 'group' && (
          <Text style={styles.participantsCount}>
            {chatRoom.participantCount} participantes
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.white,
  },
  groupAvatarContainer: {
    marginRight: 16,
  },
  groupAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.interactive.success,
    borderWidth: 2,
    borderColor: Colors.background.primary,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    flex: 1,
    marginRight: 8,
  },
  time: {
    fontSize: 12,
    color: Colors.text.secondary,
    fontWeight: '500',
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  lastMessage: {
    fontSize: 14,
    color: Colors.text.secondary,
    flex: 1,
    marginRight: 8,
  },
  unreadBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.white,
  },
  participantsCount: {
    fontSize: 12,
    color: Colors.text.tertiary,
    marginTop: 2,
  },
});

export default ChatRoomCard;