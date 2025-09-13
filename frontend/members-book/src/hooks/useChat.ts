import { useState, useEffect, useCallback } from 'react';
import { apiService, ApiError } from '../services/api';
import { mockChatRooms, mockMessages } from '../services/mockData';
import type { ChatRoom, ChatMessage } from '../types';

interface UseChatRoomsReturn {
  rooms: ChatRoom[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface UseChatMessagesOptions {
  roomId: string;
  useMockData?: boolean;
}

interface UseChatMessagesReturn {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  sendMessage: (message: string) => Promise<boolean>;
  refetch: () => Promise<void>;
}

export const useChatRooms = (useMockData = false): UseChatRoomsReturn => {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRooms = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if (useMockData) {
        setRooms(mockChatRooms);
        return;
      }

      const data = await apiService.getChatRooms();
      setRooms(data);
    } catch (err) {
      console.warn('Failed to fetch chat rooms from API, using mock data:', err);
      setRooms(mockChatRooms);
      
      if (err instanceof ApiError) {
        setError(`API Error: ${err.message}`);
      } else {
        setError('Failed to load chat rooms. Using offline data.');
      }
    } finally {
      setLoading(false);
    }
  }, [useMockData]);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  return {
    rooms,
    loading,
    error,
    refetch: fetchRooms,
  };
};

export const useChatMessages = (options: UseChatMessagesOptions): UseChatMessagesReturn => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if (options.useMockData) {
        setMessages(mockMessages);
        return;
      }

      const data = await apiService.getChatMessages(options.roomId);
      setMessages(data);
    } catch (err) {
      console.warn('Failed to fetch messages from API, using mock data:', err);
      setMessages(mockMessages);
      
      if (err instanceof ApiError) {
        setError(`API Error: ${err.message}`);
      } else {
        setError('Failed to load messages. Using offline data.');
      }
    } finally {
      setLoading(false);
    }
  }, [options.roomId, options.useMockData]);

  const sendMessage = useCallback(async (messageText: string): Promise<boolean> => {
    try {
      if (options.useMockData) {
        // Simulate sending message with mock data
        const newMessage: ChatMessage = {
          id: Date.now().toString(),
          text: messageText,
          timestamp: new Date(),
          senderId: 'current-user',
          senderName: 'Você',
          isOwn: true,
          type: 'text',
        };
        
        setMessages(prev => [...prev, newMessage]);
        return true;
      }

      const newMessage = await apiService.sendMessage(options.roomId, messageText);
      setMessages(prev => [...prev, newMessage]);
      return true;
    } catch (err) {
      console.error('Failed to send message:', err);
      return false;
    }
  }, [options.roomId, options.useMockData]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return {
    messages,
    loading,
    error,
    sendMessage,
    refetch: fetchMessages,
  };
};