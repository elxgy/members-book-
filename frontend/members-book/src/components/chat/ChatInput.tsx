import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  placeholder = 'Digite uma mensagem...',
  disabled = false,
}) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage && !disabled) {
      onSendMessage(trimmedMessage);
      setMessage('');
      setIsTyping(false);
    }
  };

  const handleTextChange = (text: string) => {
    setMessage(text);
    setIsTyping(text.trim().length > 0);
  };

  const handleSubmitEditing = () => {
    handleSend();
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TouchableOpacity 
            style={styles.attachButton}
            activeOpacity={0.7}
            disabled={disabled}
          >
            <Ionicons 
              name="attach-outline" 
              size={24} 
              color={disabled ? Colors.text.tertiary : Colors.text.secondary} 
            />
          </TouchableOpacity>
          
          <TextInput
            style={[
              styles.textInput,
              disabled && styles.textInputDisabled
            ]}
            value={message}
            onChangeText={handleTextChange}
            placeholder={placeholder}
            placeholderTextColor={Colors.text.secondary}
            multiline
            maxLength={1000}
            returnKeyType="send"
            onSubmitEditing={handleSubmitEditing}
            blurOnSubmit={false}
            editable={!disabled}
          />
          
          <TouchableOpacity 
            style={[
              styles.sendButton,
              isTyping && !disabled ? styles.sendButtonActive : styles.sendButtonInactive
            ]}
            onPress={handleSend}
            activeOpacity={0.7}
            disabled={!isTyping || disabled}
          >
            <Ionicons 
              name={isTyping && !disabled ? "send" : "mic-outline"} 
              size={20} 
              color={isTyping && !disabled ? Colors.white : Colors.text.secondary} 
            />
          </TouchableOpacity>
        </View>
        
        {disabled && (
          <View style={styles.disabledOverlay}>
            <Text style={styles.disabledText}>
              Você não pode enviar mensagens neste chat
            </Text>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: Colors.background.secondary,
    borderRadius: 24,
    paddingHorizontal: 4,
    paddingVertical: 4,
    minHeight: 48,
  },
  attachButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text.primary,
    paddingHorizontal: 12,
    paddingVertical: 10,
    maxHeight: 120,
    minHeight: 40,
    textAlignVertical: 'center',
  },
  textInputDisabled: {
    color: Colors.text.tertiary,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  sendButtonActive: {
    backgroundColor: Colors.primary,
  },
  sendButtonInactive: {
    backgroundColor: 'transparent',
  },
  disabledOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    margin: 16,
  },
  disabledText: {
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default ChatInput;