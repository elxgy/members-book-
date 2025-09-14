// Configurações da aplicação

// URL base da API - Backend Flask roda na porta 5002
export const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5002/api';

// Configurações de desenvolvimento
export const MOCK_MODE = process.env.EXPO_PUBLIC_MOCK_MODE === 'true' || false;
export const DEBUG_MODE = process.env.EXPO_PUBLIC_DEBUG_MODE === 'true' || true;

// Configurações da aplicação
export const APP_VERSION = '1.0.0';
export const MAX_UPLOAD_SIZE = 5 * 1024 * 1024; // 5MB
export const API_TIMEOUT = 10000; // 10 segundos

// Configurações de autenticação
export const TOKEN_STORAGE_KEY = '@members_book_token';
export const USER_STORAGE_KEY = '@members_book_user';

// Configurações de tunnel para desenvolvimento
export const TUNNEL_CONFIG = {
  enabled: process.env.EXPO_PUBLIC_TUNNEL_ENABLED === 'true' || false,
  authToken: process.env.EXPO_PUBLIC_TUNNEL_AUTH_TOKEN,
  encryptionKey: process.env.EXPO_PUBLIC_ENCRYPTION_KEY
};