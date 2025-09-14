import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import Text from '../components/Text';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Icon from 'react-native-vector-icons/FontAwesome';

type ChatScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Chat'>;

interface Props {
  navigation: ChatScreenNavigationProp;
}

// Tipo para as mensagens
interface Message {
  id: string;
  text: string;
  sender: string;
  senderName: string;
  senderImage: string;
  timestamp: Date;
  isCurrentUser: boolean;
}

// Tipo para os contatos
interface Contact {
  id: string;
  name: string;
  imageUrl: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export default function ChatScreen({ navigation }: Props): React.JSX.Element {
  // Estado para armazenar a mensagem atual sendo digitada
  const [currentMessage, setCurrentMessage] = useState('');
  
  // Estado para controlar se estamos na lista de contatos ou em uma conversa específica
  const [activeChat, setActiveChat] = useState<string | null>(null);
  
  // Dados simulados de contatos
  const contacts: Contact[] = [
    {
      id: '1',
      name: 'Wander Miranda',
      imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
      lastMessage: 'Olá, tudo bem?',
      lastMessageTime: '10:30',
      unreadCount: 2,
    },
    {
      id: '2',
      name: 'Dalto Bozzetti',
      imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
      lastMessage: 'Vamos marcar uma reunião?',
      lastMessageTime: '09:15',
      unreadCount: 0,
    },
    {
      id: '3',
      name: 'Rafael Rodrigues',
      imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
      lastMessage: 'Obrigado pelo contato!',
      lastMessageTime: 'Ontem',
      unreadCount: 0,
    },
    {
      id: '4',
      name: 'José Roberto Favato',
      imageUrl: 'https://randomuser.me/api/portraits/men/4.jpg',
      lastMessage: 'Precisamos conversar sobre o projeto',
      lastMessageTime: 'Ontem',
      unreadCount: 1,
    },
    {
      id: '5',
      name: 'Vinicius Avancini',
      imageUrl: 'https://randomuser.me/api/portraits/men/5.jpg',
      lastMessage: 'Vamos agendar um café?',
      lastMessageTime: 'Seg',
      unreadCount: 0,
    },
  ];

  // Dados simulados de mensagens para um chat específico
  const messages: Message[] = [
    {
      id: '1',
      text: 'Olá, tudo bem?',
      sender: '1',
      senderName: 'Wander Miranda',
      senderImage: 'https://randomuser.me/api/portraits/men/1.jpg',
      timestamp: new Date(2023, 5, 10, 10, 30),
      isCurrentUser: false,
    },
    {
      id: '2',
      text: 'Tudo ótimo! E com você?',
      sender: 'currentUser',
      senderName: 'Você',
      senderImage: 'https://randomuser.me/api/portraits/men/99.jpg',
      timestamp: new Date(2023, 5, 10, 10, 32),
      isCurrentUser: true,
    },
    {
      id: '3',
      text: 'Estou bem também! Gostaria de discutir uma oportunidade de negócio com você.',
      sender: '1',
      senderName: 'Wander Miranda',
      senderImage: 'https://randomuser.me/api/portraits/men/1.jpg',
      timestamp: new Date(2023, 5, 10, 10, 35),
      isCurrentUser: false,
    },
    {
      id: '4',
      text: 'Claro, estou interessado! Podemos marcar uma reunião?',
      sender: 'currentUser',
      senderName: 'Você',
      senderImage: 'https://randomuser.me/api/portraits/men/99.jpg',
      timestamp: new Date(2023, 5, 10, 10, 36),
      isCurrentUser: true,
    },
    {
      id: '5',
      text: 'Perfeito! Que tal na próxima semana?',
      sender: '1',
      senderName: 'Wander Miranda',
      senderImage: 'https://randomuser.me/api/portraits/men/1.jpg',
      timestamp: new Date(2023, 5, 10, 10, 38),
      isCurrentUser: false,
    },
  ];

  // Função para enviar mensagem
  const sendMessage = () => {
    if (currentMessage.trim() === '') return;
    
    // Aqui você adicionaria a lógica para enviar a mensagem para o backend
    alert(`Mensagem enviada: ${currentMessage}`);
    
    // Limpa o campo de mensagem
    setCurrentMessage('');
  };

  // Função para formatar a data da mensagem
  const formatMessageTime = (date: Date) => {
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  // Renderiza um item de contato
  const renderContactItem = ({ item }: { item: Contact }) => (
    <TouchableOpacity 
      style={styles.contactItem} 
      onPress={() => setActiveChat(item.id)}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.contactImage} />
      <View style={styles.contactInfo}>
        <Text style={styles.contactName} variant="body">{item.name}</Text>
        <Text style={styles.lastMessage} variant="caption">{item.lastMessage}</Text>
      </View>
      <View style={styles.contactMeta}>
        <Text style={styles.lastMessageTime} variant="caption">{item.lastMessageTime}</Text>
        {item.unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadCount} variant="caption">{item.unreadCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  // Renderiza uma mensagem
  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.messageContainer, item.isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage]}>
      {!item.isCurrentUser && (
        <Image source={{ uri: item.senderImage }} style={styles.messageSenderImage} />
      )}
      <View style={[styles.messageBubble, item.isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble]}>
        {!item.isCurrentUser && (
          <Text style={styles.messageSenderName} variant="caption">{item.senderName}</Text>
        )}
        <Text style={[styles.messageText, item.isCurrentUser ? styles.currentUserText : styles.otherUserText]} variant="body">
          {item.text}
        </Text>
        <Text style={styles.messageTime} variant="caption">
          {formatMessageTime(item.timestamp)}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => activeChat ? setActiveChat(null) : navigation.goBack()}
        >
          <Icon name="arrow-left" size={20} color="#1a1a2e" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle} variant="h2">
          {activeChat ? contacts.find(c => c.id === activeChat)?.name : "CONVERSAS"}
        </Text>
        
        <TouchableOpacity style={styles.headerAction}>
          <Icon name="search" size={20} color="#1a1a2e" />
        </TouchableOpacity>
      </View>

      {/* Lista de contatos ou mensagens */}
      {!activeChat ? (
        <FlatList
          data={contacts}
          renderItem={renderContactItem}
          keyExtractor={item => item.id}
          style={styles.contactsList}
        />
      ) : (
        <>
          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={item => item.id}
            style={styles.messagesList}
            inverted={false}
          />
          
          {/* Input de mensagem */}
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.attachButton}>
              <Icon name="paperclip" size={20} color="#1a1a2e" />
            </TouchableOpacity>
            
            <TextInput
              style={styles.messageInput}
              placeholder="Digite sua mensagem..."
              value={currentMessage}
              onChangeText={setCurrentMessage}
              multiline
            />
            
            <TouchableOpacity 
              style={[styles.sendButton, currentMessage.trim() === '' ? styles.sendButtonDisabled : {}]}
              onPress={sendMessage}
              disabled={currentMessage.trim() === ''}
            >
              <Icon name="send" size={20} color={currentMessage.trim() === '' ? '#ccc' : '#fff'} />
            </TouchableOpacity>
          </View>
        </>
      )}
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
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a2e',
    flex: 1,
    textAlign: 'center',
  },
  headerAction: {
    padding: 5,
  },
  contactsList: {
    flex: 1,
  },
  contactItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 3,
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
  },
  contactMeta: {
    alignItems: 'flex-end',
  },
  lastMessageTime: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  unreadBadge: {
    backgroundColor: '#D4AF37',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadCount: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  messagesList: {
    flex: 1,
    padding: 15,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    maxWidth: '80%',
  },
  currentUserMessage: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  otherUserMessage: {
    alignSelf: 'flex-start',
  },
  messageSenderImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
    alignSelf: 'flex-end',
  },
  messageBubble: {
    padding: 10,
    borderRadius: 15,
  },
  currentUserBubble: {
    backgroundColor: '#1a1a2e',
    borderBottomRightRadius: 0,
  },
  otherUserBubble: {
    backgroundColor: '#f0f0f0',
    borderBottomLeftRadius: 0,
  },
  messageSenderName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 3,
  },
  messageText: {
    fontSize: 14,
    marginBottom: 5,
  },
  currentUserText: {
    color: '#FFFFFF',
  },
  otherUserText: {
    color: '#1a1a2e',
  },
  messageTime: {
    fontSize: 10,
    color: '#999',
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  attachButton: {
    padding: 10,
  },
  messageInput: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    maxHeight: 100,
    marginHorizontal: 10,
  },
  sendButton: {
    backgroundColor: '#D4AF37',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#f0f0f0',
  },
});