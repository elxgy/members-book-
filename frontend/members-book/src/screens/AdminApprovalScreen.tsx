import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Text from '../components/Text';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useUser } from '../context/UserContext';
import { Colors } from '../constants/Colors';
import profileService, { UpdateRequest } from '../services/profileService';

type AdminApprovalScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AdminApproval'>;

type Props = {
  navigation: AdminApprovalScreenNavigationProp;
};

export default function AdminApprovalScreen({ navigation }: Props) {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState<UpdateRequest[]>([]);
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Definir estilos baseados na hierarquia do usuário
  const hierarchyStyles = {
    backgroundColor: Colors.primary,
    headerColor: Colors.secondary,
    textColor: '#FFFFFF',
  };

  // Carregar solicitações pendentes
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      // Em um ambiente real, descomentar a linha abaixo
      // const data = await profileService.getPendingUpdateRequests();
      
      // Simulação de dados para desenvolvimento
      await new Promise(resolve => setTimeout(resolve, 1000));
      const data = [
        {
          request_id: '1',
          user_id: 'user123',
          user_name: 'João Silva',
          request_date: '2023-06-15T10:30:00',
          changes: {
            company: 'Nova Empresa Ltda',
            industry: 'Tecnologia da Informação',
            bio: 'Profissional com mais de 10 anos de experiência em desenvolvimento de software.',
          },
        },
        {
          request_id: '2',
          user_id: 'user456',
          user_name: 'Maria Oliveira',
          request_date: '2023-06-14T14:45:00',
          changes: {
            location: 'Rio de Janeiro, RJ',
            company: 'Tech Solutions S.A.',
          },
        },
        {
          request_id: '3',
          user_id: 'user789',
          user_name: 'Carlos Mendes',
          request_date: '2023-06-13T09:15:00',
          changes: {
            industry: 'Educação',
            bio: 'Especialista em tecnologias educacionais e desenvolvimento de conteúdo digital.',
          },
        },
      ];
      
      setRequests(data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as solicitações pendentes.');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (requestId: string) => {
    try {
      setProcessingId(requestId);
      // Em um ambiente real, descomentar a linha abaixo
      // await profileService.approveUpdateRequest(requestId);
      
      // Simulação para desenvolvimento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Atualizar a lista de solicitações
      setRequests(prev => prev.filter(req => req.request_id !== requestId));
      Alert.alert('Sucesso', 'Solicitação aprovada com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível aprovar a solicitação. Tente novamente.');
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (requestId: string) => {
    try {
      setProcessingId(requestId);
      // Em um ambiente real, descomentar a linha abaixo
      // await profileService.rejectUpdateRequest(requestId);
      
      // Simulação para desenvolvimento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Atualizar a lista de solicitações
      setRequests(prev => prev.filter(req => req.request_id !== requestId));
      Alert.alert('Sucesso', 'Solicitação rejeitada com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível rejeitar a solicitação. Tente novamente.');
    } finally {
      setProcessingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderItem = ({ item }: { item: UpdateRequest }) => {
    const isProcessing = processingId === item.request_id;
    
    return (
      <View style={styles.requestCard}>
        <View style={styles.requestHeader}>
          <Text style={styles.userName}>{item.user_name}</Text>
          <Text style={styles.requestDate}>{formatDate(item.request_date)}</Text>
        </View>
        
        <View style={styles.changesContainer}>
          <Text style={styles.changesTitle}>Alterações solicitadas:</Text>
          {Object.entries(item.changes).map(([field, value]) => (
            <View key={field} style={styles.changeItem}>
              <Text style={styles.fieldName}>{field}:</Text>
              <Text style={styles.fieldValue}>{value}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.rejectButton]}
            onPress={() => handleReject(item.request_id)}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <>
                <Icon name="times" size={16} color="#FFFFFF" />
                <Text style={styles.buttonText}>Rejeitar</Text>
              </>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.approveButton]}
            onPress={() => handleApprove(item.request_id)}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <>
                <Icon name="check" size={16} color="#FFFFFF" />
                <Text style={styles.buttonText}>Aprovar</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: hierarchyStyles.backgroundColor }]}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={hierarchyStyles.backgroundColor} 
      />
      
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={20} color={hierarchyStyles.textColor} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: hierarchyStyles.textColor }]}>Aprovações Pendentes</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={fetchRequests}>
          <Icon name="refresh" size={20} color={hierarchyStyles.textColor} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={hierarchyStyles.headerColor} />
          <Text style={[styles.loadingText, { color: hierarchyStyles.textColor }]}>Carregando solicitações...</Text>
        </View>
      ) : requests.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="check-circle" size={60} color={hierarchyStyles.headerColor} />
          <Text style={styles.emptyText}>Não há solicitações pendentes</Text>
        </View>
      ) : (
        <FlatList
          data={requests}
          renderItem={renderItem}
          keyExtractor={item => item.request_id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  refreshButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  listContainer: {
    padding: 16,
  },
  requestCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  requestDate: {
    fontSize: 12,
    color: '#666',
  },
  changesContainer: {
    marginBottom: 16,
  },
  changesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 8,
  },
  changeItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  fieldName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    marginRight: 8,
    textTransform: 'capitalize',
  },
  fieldValue: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginLeft: 8,
  },
  approveButton: {
    backgroundColor: Colors.success,
  },
  rejectButton: {
    backgroundColor: Colors.error,
  },
  buttonText: {
    color: '#FFFFFF',
    marginLeft: 6,
    fontSize: 14,
    fontWeight: 'bold',
  },
});