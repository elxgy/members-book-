import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to console or error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // You can also log the error to an error reporting service here
    // Example: Sentry.captureException(error);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <View style={styles.container}>
          <View style={styles.content}>
            <Ionicons 
              name="warning-outline" 
              size={64} 
              color={Colors.interactive.error} 
              style={styles.icon}
            />
            
            <Text style={styles.title}>Oops! Algo deu errado</Text>
            
            <Text style={styles.message}>
              Ocorreu um erro inesperado. Por favor, tente novamente.
            </Text>

            {__DEV__ && this.state.error && (
              <View style={styles.debugContainer}>
                <Text style={styles.debugTitle}>Detalhes do Erro (Dev Mode):</Text>
                <Text style={styles.debugText}>{this.state.error.toString()}</Text>
                {this.state.errorInfo && (
                  <Text style={styles.debugText}>
                    {this.state.errorInfo.componentStack}
                  </Text>
                )}
              </View>
            )}

            <TouchableOpacity 
              style={styles.retryButton} 
              onPress={this.handleRetry}
              activeOpacity={0.8}
            >
              <Ionicons name="refresh-outline" size={20} color={Colors.white} />
              <Text style={styles.retryText}>Tentar Novamente</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    maxWidth: 300,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  retryButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  retryText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  debugContainer: {
    backgroundColor: Colors.background.secondary,
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
  },
  debugTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  debugText: {
    fontSize: 12,
    color: Colors.text.secondary,
    fontFamily: 'monospace',
    lineHeight: 16,
  },
});

export default ErrorBoundary;