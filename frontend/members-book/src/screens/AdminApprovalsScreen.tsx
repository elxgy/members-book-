import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
  ActivityIndicator,
  Modal,
  TextInput,
} from 'react-native';
import Text from '../components/Text';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import approvalsService, { ApprovalRequest } from '../services/approvalsService';
import { useUser } from '../context/UserContext';

type AdminApprovalsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AdminApprovals'>;

interface Props {
  navigation: AdminApprovalsScreenNavigationProp;
}

export default function AdminApprovalsScreen({ navigation }: Props): React.JSX.Element {
  const { user } = useUser();
  const [approvals, setApprovals] = useState<ApprovalRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<ApprovalRequest | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'approve' | 'reject'>('approve');
  const [comments, setComments] = useState('');
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'pending' | 'all'>('pending');

  useEffect(() => {
    loadApprovals();
  }, [filter]);

  const loadApprovals = async () => {
    try {
      setInitialLoading(true);
      const response = filter === 'pending' 
        ? await approvalsService.getPendingApprovals()
        : await approvalsService.getAllApprovals();
      
      if (response.success && response.data) {
        setApprovals(response.data);
      } else {
        Alert.alert('Erro', response.message || 'Erro ao carregar solicitações');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao carregar solicitações');
    } finally {
      setInitialLoading(false);
    }
  };

  const handleApprove = (request: ApprovalRequest) => {
    setSelectedRequest(request);
    setModalType('approve');
    setComments('');
    setShowModal(true);
  };

  const handleReject = (request: ApprovalRequest) => {
    setSelectedRequest(request);
    setModalType('reject');
    setComments('');
    setShowModal(true);
  };

  const confirmAction = async () => {
    if (!selectedRequest) return;
    
    if (modalType === 'reject' && !comments.trim()) {
      Alert.alert('Erro', 'Por favor, forneça um motivo para a rejeição.');
      return;
    }

    setProcessingId(selectedRequest.id);
    setShowModal(false);

    try {
      const response = modalType === 'approve'
        ? await approvalsService.approveRequest(selectedRequest.id, comments)
        : await approvalsService.rejectRequest(selectedRequest.id, comments);
      
      if (response.success) {
        Alert.alert('Sucesso', response.message);
        loadApprovals(); // Recarregar lista
      } else {
        Alert.alert('Erro', response.message || 'Erro ao processar solicitação');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao processar solicitação');
    } finally {
      setProcessingId(null);
      setSelectedRequest(null);
      setComments('');
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return '#4CAF50';
      case 'rejected': return '#F44336';
      case 'pending': return '#FF9800';
      default: return '#757575';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'Aprovada';
      case 'rejected': return 'Rejeitada';
      case 'pending': return 'Pendente';
      default: return status;
    }
  };

  const renderChangeItem = (label: string, currentValue: any, newValue: any) => {
    if (currentValue === newValue) return null;
    
    return (
      <View style={styles.changeItem}>
        <Text style={styles.changeLabel} variant="body">{label}:</Text>
        <View style={styles.changeValues}>
          <Text style={styles.currentValue} variant="body">
            {typeof currentValue === 'number' && label.includes('Valor') 
              ? formatCurrency(currentValue) 
              : currentValue || 'N/A'}
          </Text>
          <Icon name="arrow-right" size={12} color="#666" style={styles.arrowIcon} />
          <Text style={styles.newValue} variant="body">
            {typeof newValue === 'number' && label.includes('Valor') 
              ? formatCurrency(newValue) 
              : newValue}
          </Text>
        </View>
      </View>
    );
  };

  const renderApprovalItem = (request: ApprovalRequest) => (
    <View key={request.id} style={styles.requestItem}>
      <View style={styles.requestHeader}>
        <View style={styles.userInfo}>
          <Text style={styles.userName} variant="h3">{request.userName}</Text>
          <Text style={styles.userEmail} variant="body">{request.userEmail}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(request.status) }]}>
          <Text style={styles.statusText}>{getStatusText(request.status)}</Text>
        </View>
      </View>

      <Text style={styles.requestDate} variant="body">
        Solicitado em: {formatDate(request.createdAt)}
      </Text>

      <View style={styles.changesContainer}>
        <Text style={styles.changesTitle} variant="h3">Alterações Solicitadas:</Text>
        {renderChangeItem('Negócios Fechados', request.currentValues.negociosFechados, request.requestedChanges.negociosFechados)}
        {renderChangeItem('Valor Total Acumulado', request.currentValues.valorTotalAcumulado, request.requestedChanges.valorTotalAcumulado)}
        {renderChangeItem('Recomendação', request.currentValues.recomendacao, request.requestedChanges.recomendacao)}
      </View>

      <View style={styles.justificationContainer}>
        <Text style={styles.justificationTitle} variant="h3">Justificativa:</Text>
        <Text style={styles.justificationText} variant="body">{request.justification}</Text>
      </View>

      {request.status === 'pending' && (
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.rejectButton]}
            onPress={() => handleReject(request)}
            disabled={processingId === request.id}
          >
            {processingId === request.id ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <>
                <Icon name="times" size={16} color="#FFFFFF" />
                <Text style={styles.actionButtonText}>Rejeitar</Text>
              </>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, styles.approveButton]}
            onPress={() => handleApprove(request)}
            disabled={processingId === request.id}
          >
            {processingId === request.id ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <>
                <Icon name="check" size={16} color="#FFFFFF" />
                <Text style={styles.actionButtonText}>Aprovar</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      )}

      {request.reviewedAt && (
        <View style={styles.reviewInfo}>
          <Text style={styles.reviewDate} variant="body">
            Revisado em: {formatDate(request.reviewedAt)} por {request.reviewedBy}
          </Text>
          {request.reviewComments && (
            <Text style={styles.reviewComments} variant="body">
              Comentários: {request.reviewComments}
            </Text>
          )}
        </View>
      )}
    </View>
  );

  const renderModal = () => (
    <Modal
      visible={showModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle} variant="h3">
              {modalType === 'approve' ? 'Aprovar Solicitação' : 'Rejeitar Solicitação'}
            </Text>
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={styles.closeButton}
            >
              <Icon name="times" size={20} color="#333" />
            </TouchableOpacity>
          </View>

          <View style={styles.modalBody}>
            <Text style={styles.modalDescription} variant="body">
              {modalType === 'approve' 
                ? 'Deseja aprovar esta solicitação? Você pode adicionar comentários opcionais.'
                : 'Por favor, forneça um motivo para a rejeição desta solicitação.'}
            </Text>
            
            <TextInput
              style={styles.commentsInput}
              placeholder={modalType === 'approve' ? 'Comentários (opcional)' : 'Motivo da rejeição (obrigatório)'}
              placeholderTextColor="#666"
              value={comments}
              onChangeText={setComments}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.confirmButton, modalType === 'approve' ? styles.approveButton : styles.rejectButton]}
              onPress={confirmAction}
            >
              <Text style={styles.confirmButtonText}>
                {modalType === 'approve' ? 'Aprovar' : 'Rejeitar'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={20} color="#D4AF37" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle} variant="h2">APROVAÇÕES</Text>
          <Text style={styles.headerSubtitle} variant="body">Gerenciar solicitações de atualização</Text>
        </View>
        <View style={styles.placeholder} />
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterTab, filter === 'pending' && styles.activeFilterTab]}
          onPress={() => setFilter('pending')}
        >
          <Text style={[styles.filterTabText, filter === 'pending' && styles.activeFilterTabText]}>Pendentes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterTab, filter === 'all' && styles.activeFilterTab]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterTabText, filter === 'all' && styles.activeFilterTabText]}>Todas</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {initialLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#D4AF37" />
          <Text style={styles.loadingText} variant="body">Carregando solicitações...</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {approvals.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Icon name="inbox" size={48} color="#CCCCCC" />
                <Text style={styles.emptyText} variant="h3">
                  {filter === 'pending' ? 'Nenhuma solicitação pendente' : 'Nenhuma solicitação encontrada'}
                </Text>
                <Text style={styles.emptySubtext} variant="body">
                  {filter === 'pending' 
                    ? 'Todas as solicitações foram processadas.'
                    : 'Não há solicitações no sistema.'}
                </Text>
              </View>
            ) : (
              <>
                <Text style={styles.resultsCount} variant="body">
                  {approvals.length} solicitaç{approvals.length !== 1 ? 'ões' : 'ão'} encontrada{approvals.length !== 1 ? 's' : ''}
                </Text>
                {approvals.map(renderApprovalItem)}
              </>
            )}
          </View>
        </ScrollView>
      )}

      {renderModal()}
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D4AF37',
    textAlign: 'center',
    letterSpacing: 1.2,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  placeholder: {
    width: 36,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#F8F9FA',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  filterTab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  activeFilterTab: {
    backgroundColor: '#D4AF37',
    borderColor: '#D4AF37',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeFilterTabText: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  resultsCount: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  requestItem: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  requestDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 16,
  },
  changesContainer: {
    marginBottom: 16,
  },
  changesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 8,
  },
  changeItem: {
    marginBottom: 8,
  },
  changeLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  changeValues: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentValue: {
    fontSize: 14,
    color: '#F44336',
    textDecorationLine: 'line-through',
  },
  arrowIcon: {
    marginHorizontal: 8,
  },
  newValue: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  justificationContainer: {
    marginBottom: 16,
  },
  justificationTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 8,
  },
  justificationText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  approveButton: {
    backgroundColor: '#4CAF50',
  },
  rejectButton: {
    backgroundColor: '#F44336',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  reviewInfo: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  reviewDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  reviewComments: {
    fontSize: 12,
    color: '#333',
    fontStyle: 'italic',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#CCCCCC',
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 0,
    margin: 20,
    maxWidth: 400,
    width: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    padding: 20,
  },
  modalDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  commentsInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#333',
    minHeight: 100,
  },
  modalActions: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});