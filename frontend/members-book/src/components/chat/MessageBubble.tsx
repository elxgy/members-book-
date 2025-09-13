import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import type { ChatMessage } from '../../types';

interface MessageBubbleProps {
  message: ChatMessage;
  isCurrentUser: boolean;
  showAvatar?: boolean;
  onAvatarPress?: (userId: string) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isCurrentUser,
  showAvatar = true,
  onAvatarPress,
}) => {
  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleAvatarPress = () => {
    if (onAvatarPress && !isCurrentUser) {
      onAvatarPress(message.senderId);
    }
  };

  const renderAvatar = () => {
    if (!showAvatar || isCurrentUser) {
      return <View style={styles.avatarSpacer} />;
    }

    return (
      <TouchableOpacity onPress={handleAvatarPress} activeOpacity={0.7}>
        {message.senderAvatar ? (
          <Image source={{ uri: message.senderAvatar }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatarPlaceholder, { backgroundColor: Colors.primary }]}>
            <Text style={styles.avatarText}>
              {message.senderName.charAt(0)}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderMessageStatus = () => {
    if (!isCurrentUser) return null;

    let iconName: string;
    let iconColor: string;

    switch (message.status) {
      case 'sent':
        iconName = 'checkmark';
        iconColor = Colors.text.secondary;
        break;
      case 'delivered':
        iconName = 'checkmark-done';
        iconColor = Colors.text.secondary;
        break;
      case 'read':
        iconName = 'checkmark-done';
        iconColor = Colors.primary;
        break;
      default:
        iconName = 'time';
        iconColor = Colors.text.secondary;
    }

    return (
      <Ionicons 
        name={iconName as any} 
        size={12} 
        color={iconColor} 
        style={styles.statusIcon}
      />
    );
  };

  return (
    <View style={[
      styles.container,
      isCurrentUser ? styles.currentUserContainer : styles.otherUserContainer
    ]}>
      {!isCurrentUser && renderAvatar()}
      
      <View style={[
        styles.messageBubble,
        isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble
      ]}>
        {!isCurrentUser && (
          <Text style={styles.senderName}>{message.senderName}</Text>
        )}
        
        <Text style={[
          styles.messageText,
          isCurrentUser ? styles.currentUserText : styles.otherUserText
        ]}>
          {message.content || message.text}
        </Text>
        
        <View style={styles.messageFooter}>
          <Text style={[
            styles.messageTime,
            isCurrentUser ? styles.currentUserTime : styles.otherUserTime
          ]}>
            {formatMessageTime(message.timestamp)}
          </Text>
          {renderMessageStatus()}
        </View>
      </View>
      
      {isCurrentUser && <View style={styles.avatarSpacer} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 2,
    paddingHorizontal: 16,
  },
  currentUserContainer: {
    justifyContent: 'flex-end',
  },
  otherUserContainer: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  avatarPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  avatarText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.white,
  },
  avatarSpacer: {
    width: 40,
  },
  messageBubble: {
    maxWidth: '75%',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginVertical: 2,
  },
  currentUserBubble: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 4,
  },
  otherUserBubble: {
    backgroundColor: Colors.background.secondary,
    borderBottomLeftRadius: 4,
  },
  senderName: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  currentUserText: {
    color: Colors.white,
  },
  otherUserText: {
    color: Colors.text.primary,
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  messageTime: {
    fontSize: 11,
    fontWeight: '500',
  },
  currentUserTime: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  otherUserTime: {
    color: Colors.text.secondary,
  },
  statusIcon: {
    marginLeft: 4,
  },
});

export default MessageBubble;