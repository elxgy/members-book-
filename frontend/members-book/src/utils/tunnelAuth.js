import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';
import Constants from 'expo-constants';

/**
 * Secure Tunnel Authentication Utility
 * Handles authentication and encryption for secure remote access
 */

class TunnelAuth {
  constructor() {
    this.authToken = Constants.expoConfig?.extra?.tunnelAuthToken;
    this.apiKey = Constants.expoConfig?.extra?.apiKey;
    this.encryptionKey = Constants.expoConfig?.extra?.encryptionKey;
  }

  /**
   * Generate a secure session token
   */
  async generateSessionToken() {
    try {
      const timestamp = Date.now().toString();
      const randomBytes = await Crypto.getRandomBytesAsync(16);
      const sessionData = `${timestamp}-${randomBytes.join('')}`;
      
      // Hash the session data for security
      const sessionToken = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        sessionData
      );
      
      // Store securely
      await SecureStore.setItemAsync('tunnel_session', sessionToken);
      
      return sessionToken;
    } catch (error) {
      console.error('Failed to generate session token:', error);
      throw new Error('Session token generation failed');
    }
  }

  /**
   * Validate tunnel access
   */
  async validateAccess(providedToken) {
    try {
      const storedToken = await SecureStore.getItemAsync('tunnel_session');
      
      if (!storedToken || !providedToken) {
        return false;
      }
      
      // Compare tokens securely
      const isValid = await this.secureCompare(storedToken, providedToken);
      
      if (isValid) {
        // Update last access time
        await SecureStore.setItemAsync('last_tunnel_access', Date.now().toString());
      }
      
      return isValid;
    } catch (error) {
      console.error('Access validation failed:', error);
      return false;
    }
  }

  /**
   * Secure string comparison to prevent timing attacks
   */
  async secureCompare(a, b) {
    if (a.length !== b.length) {
      return false;
    }
    
    let result = 0;
    for (let i = 0; i < a.length; i++) {
      result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }
    
    return result === 0;
  }

  /**
   * Encrypt sensitive data for transmission
   */
  async encryptData(data) {
    try {
      const dataString = JSON.stringify(data);
      const encrypted = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        `${this.encryptionKey}${dataString}`
      );
      
      return {
        encrypted: encrypted,
        timestamp: Date.now(),
        checksum: await Crypto.digestStringAsync(
          Crypto.CryptoDigestAlgorithm.SHA256,
          encrypted
        )
      };
    } catch (error) {
      console.error('Data encryption failed:', error);
      throw new Error('Encryption failed');
    }
  }

  /**
   * Check if tunnel session is still valid
   */
  async isSessionValid() {
    try {
      const lastAccess = await SecureStore.getItemAsync('last_tunnel_access');
      
      if (!lastAccess) {
        return false;
      }
      
      const lastAccessTime = parseInt(lastAccess);
      const currentTime = Date.now();
      const sessionTimeout = 5 * 60 * 1000; // 5 minutes
      
      return (currentTime - lastAccessTime) < sessionTimeout;
    } catch (error) {
      console.error('Session validation failed:', error);
      return false;
    }
  }

  /**
   * Clear tunnel session
   */
  async clearSession() {
    try {
      await SecureStore.deleteItemAsync('tunnel_session');
      await SecureStore.deleteItemAsync('last_tunnel_access');
    } catch (error) {
      console.error('Failed to clear session:', error);
    }
  }

  /**
   * Get tunnel configuration
   */
  getTunnelConfig() {
    return {
      authEnabled: process.env.ENABLE_TUNNEL_AUTH === 'true',
      timeout: parseInt(process.env.TUNNEL_TIMEOUT) || 300000,
      maxConnections: parseInt(process.env.MAX_TUNNEL_CONNECTIONS) || 5,
      allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || ['localhost'],
      sslVerify: process.env.SSL_VERIFY === 'true'
    };
  }
}

export default new TunnelAuth();