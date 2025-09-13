# Secure Tunnel Access for Members Book App

This document provides instructions for setting up and using secure remote access to the Members Book Expo React Native application through tunneling.

## 🔒 Security Overview

The tunnel implementation includes multiple layers of security:
- **Authentication tokens** for access control
- **Encryption keys** for data protection
- **Session management** with automatic timeouts
- **Secure storage** for sensitive information
- **Origin validation** to prevent unauthorized access

## 📋 Prerequisites

1. **Expo CLI** installed globally
2. **Node.js** version 18 or higher
3. **Valid Expo account** (recommended)
4. **HTTPS support** for secure connections

## 🚀 Quick Start

### 1. Environment Setup

The `.env` file contains all necessary security configurations:

```bash
# Security tokens (auto-generated)
TUNNEL_AUTH_TOKEN=tunnel_auth_[random_hash]
API_KEY=api_key_[random_hash]
ENCRYPTION_KEY=enc_key_[random_hash]

# Security settings
ENABLE_TUNNEL_AUTH=true
TUNNEL_TIMEOUT=300000
MAX_TUNNEL_CONNECTIONS=5
```

### 2. Available Tunnel Commands

```bash
# Basic tunnel (less secure)
npm run tunnel

# Secure tunnel with HTTPS
npm run tunnel-secure

# Authenticated secure tunnel (recommended)
npm run tunnel-auth

# Clear cache and start tunnel
npm run tunnel-clear
```

## 🔧 Configuration

### App Configuration (app.json)

The app is configured with:
- **Privacy**: Set to "unlisted" for security
- **Scheme**: Custom URL scheme for deep linking
- **Extra**: Environment variables for runtime access

### Security Features

1. **Session Tokens**: Generated using cryptographically secure random bytes
2. **Secure Storage**: Sensitive data stored using Expo SecureStore
3. **Timing Attack Protection**: Secure string comparison methods
4. **Session Timeouts**: Automatic session expiration (5 minutes default)
5. **Origin Validation**: Whitelist of allowed connection origins

## 🛡️ Security Best Practices

### For Development

1. **Never commit `.env` files** to version control
2. **Use HTTPS tunnels** for any external testing
3. **Regenerate tokens** regularly during development
4. **Monitor tunnel connections** for unauthorized access
5. **Clear sessions** when switching between devices

### For Testing

1. **Use authenticated tunnels** for team testing
2. **Share tunnel URLs securely** (encrypted channels)
3. **Set short session timeouts** for sensitive testing
4. **Validate all external connections**
5. **Log access attempts** for security auditing

## 📱 Usage Instructions

### Starting a Secure Tunnel

1. **Navigate to the project directory**:
   ```bash
   cd frontend/members-book
   ```

2. **Start the authenticated tunnel**:
   ```bash
   npm run tunnel-auth
   ```

3. **Scan the QR code** with Expo Go app or use the tunnel URL

4. **Verify the connection** is secure (look for HTTPS in the URL)

### Connecting External Devices

1. **Share the tunnel URL** securely with team members
2. **Provide authentication tokens** if required
3. **Verify device connections** in the Expo developer tools
4. **Monitor for unauthorized access attempts**

### Troubleshooting

#### Common Issues

1. **Tunnel fails to start**:
   - Check Expo CLI installation: `expo --version`
   - Verify network connectivity
   - Clear Expo cache: `expo start --clear`

2. **Authentication errors**:
   - Regenerate tokens in `.env` file
   - Clear stored sessions: Use `tunnelAuth.clearSession()`
   - Check token format and validity

3. **Connection timeouts**:
   - Increase `TUNNEL_TIMEOUT` in `.env`
   - Check network stability
   - Verify firewall settings

4. **SSL/HTTPS errors**:
   - Ensure `SSL_VERIFY=true` in `.env`
   - Update Expo CLI to latest version
   - Check certificate validity

## 🔍 Security Monitoring

### Access Logging

The tunnel authentication system logs:
- Session creation and validation attempts
- Failed authentication attempts
- Session timeouts and clearances
- Encryption/decryption operations

### Security Alerts

Monitor for:
- Multiple failed authentication attempts
- Connections from unexpected origins
- Unusual session patterns
- Encryption failures

## 🚨 Emergency Procedures

### Security Breach Response

1. **Immediately stop all tunnels**:
   ```bash
   # Kill all Expo processes
   pkill -f "expo start"
   ```

2. **Regenerate all security tokens**:
   - Update `.env` file with new tokens
   - Clear all stored sessions
   - Restart the application

3. **Audit access logs**:
   - Check for unauthorized connections
   - Identify compromised sessions
   - Document security incident

4. **Update security measures**:
   - Strengthen authentication requirements
   - Reduce session timeouts
   - Implement additional monitoring

## 📞 Support

For security-related issues:
1. Check this documentation first
2. Review Expo tunnel documentation
3. Contact the development team
4. Report security vulnerabilities immediately

## 🔄 Updates

This security configuration should be reviewed and updated:
- **Weekly** during active development
- **Before each release** to production
- **After any security incidents**
- **When team members change**

---

**⚠️ Important**: This tunnel setup is intended for development and testing only. Never use tunnel access for production applications without additional security hardening.