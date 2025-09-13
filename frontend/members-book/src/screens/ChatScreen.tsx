import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { useUser } from '../context/UserContext';
import ChatRoomCard from '../components/chat/ChatRoomCard';
import MessageBubble from '../components/chat/MessageBubble';
import ChatInput from '../components/chat/ChatInput';
import type { ChatRoom, ChatMessage } from '../types';

const { width } = Dimensions.get('window');

// Type alias for backward compatibility
type Message = ChatMessage;

// Mock data
const mockChatRooms: ChatRoom[] = [
  {
    id: '1',
    name: 'Geral',
    lastMessage: 'Ótima apresentação hoje!',
    lastMessageTime: new Date(Date.now() - 5 * 60 * 1000),
    unreadCount: 3,
    participants: 45,
    isActive: true,
  },
  {
    id: '2',
    name: 'Tecnologia',
    lastMessage: 'Alguém já testou a nova API?',
    lastMessageTime: new Date(Date.now() - 30 * 60 * 1000),
    unreadCount: 1,
    participants: 12,
    isActive: false,
  },
  {
    id: '3',
    name: 'Networking',
    lastMessage: 'Evento na próxima semana',
    lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
    unreadCount: 0,
    participants: 28,
    isActive: false,
  },
];

const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Bem-vindos ao chat geral!',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    senderId: 'system',
    senderName: 'Sistema',
    isOwn: false,
    type: 'system',
  },
  {
    id: '2',
    text: 'Olá pessoal! Como estão?',
    timestamp: new Date(Date.now() - 90 * 60 * 1000),
    senderId: '2',
    senderName: 'Ana Silva',
    isOwn: false,
    type: 'text',
  },
  {
    id: '3',
    text: 'Tudo bem! Animado para o evento de amanhã.',
    timestamp: new Date(Date.now() - 85 * 60 * 1000),
    senderId: '1',
    senderName: 'Você',
    isOwn: true,
    type: 'text',
  },
  {
    id: '4',
    text: 'Vai ser incrível! Já confirmaram a presença?',
    timestamp: new Date(Date.now() - 80 * 60 * 1000),
    senderId: '3',
    senderName: 'Carlos Santos',
    isOwn: false,
    type: 'text',
  },
];

const ChatScreen: React.FC = () => {
  const { user } = useUser();
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef<FlatList>(null);
  
  // Use mock data for now
  const chatRooms = mockChatRooms;
  const roomsLoading = false;
  const roomsError = null;
  const messagesLoading = false;
  const messagesError = null;
  
  const refreshRooms = () => {};
  const refreshMessages = () => {};

  useEffect(() => {
    // Scroll to bottom when messages change
    if (flatListRef.current && messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSendMessage = async (messageContent: string) => {
    if (!selectedRoom || !user) {
      Alert.alert('Erro', 'Não foi possível enviar a mensagem');
      return;
    }
    
    const message: ChatMessage = {
      id: Date.now().toString(),
      text: messageContent.trim(),
      timestamp: new Date(),
      senderId: user.id,
      senderName: user.name,
      isOwn: true,
      type: 'text',
    };
    
    setMessages(prev => [...prev, message]);
    
    // Scroll to bottom
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatLastMessageTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m`;
    } else if (diffInMinutes < 24 * 60) {
      return `${Math.floor(diffInMinutes / 60)}h`;
    } else {
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    }
  };

  const renderChatRoom = ({ item }: { item: ChatRoom }) => (
    <ChatRoomCard
      chatRoom={item}
      onPress={() => handleRoomSelect(item)}
    />
  );

  const handleRoomSelect = (room: ChatRoom) => {
    setSelectedRoom(room);
  };

  const handleAvatarPress = (userId: string) => {
    // Navigate to user profile or show user info
    Alert.alert('Info', `Ver perfil do usuário ${userId}`);
  };

  if (!selectedRoom) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Conversas</Text>
        </View>
        
        {roomsLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Carregando conversas...</Text>
          </View>
        ) : roomsError ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Erro ao carregar conversas</Text>
          </View>
        ) : (
          <FlatList
            data={chatRooms}
            renderItem={renderChatRoom}
            keyExtractor={(item) => item.id}
            style={styles.chatRoomsList}
            showsVerticalScrollIndicator={false}
            refreshing={roomsLoading}
            onRefresh={refreshRooms}
          />
        )}
      </View>
    );
  }

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const isCurrentUser = item.senderId === (user?.id || '1');
    
    return (
      <MessageBubble
        message={item}
        isCurrentUser={isCurrentUser}
        onAvatarPress={handleAvatarPress}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.chatHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setSelectedRoom(null)}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        
        <View style={styles.chatHeaderInfo}>
          <Text style={styles.chatHeaderTitle}>
            {selectedRoom.name}
          </Text>
          <Text style={styles.chatHeaderSubtitle}>
            {`${selectedRoom.participants} participantes`}
          </Text>
        </View>
        
        <TouchableOpacity style={styles.chatHeaderAction} activeOpacity={0.7}>
          <Ionicons name="call" size={24} color={Colors.primary} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.chatHeaderAction} activeOpacity={0.7}>
          <Ionicons name="videocam" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {messagesLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando mensagens...</Text>
        </View>
      ) : messagesError ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Erro ao carregar mensagens</Text>
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          refreshing={messagesLoading}
          onRefresh={refreshMessages}
        />
      )}

      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={!selectedRoom}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: Colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: Colors.text.secondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: Colors.error,
    textAlign: 'center',
  },
  chatRoomsList: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  chatHeaderInfo: {
    flex: 1,
  },
  chatHeaderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  chatHeaderSubtitle: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  chatHeaderAction: {
    padding: 8,
    marginLeft: 8,
  },
  messagesList: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  messagesContent: {
    paddingVertical: 8,
  },
});

export default ChatScreen;