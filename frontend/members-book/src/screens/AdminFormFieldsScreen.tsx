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
} from 'react-native';
import Text from '../components/Text';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import formFieldsService, { FormField } from '../services/formFieldsService';

type AdminFormFieldsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AdminFormFields'>;

interface Props {
  navigation: AdminFormFieldsScreenNavigationProp;
}



export default function AdminFormFieldsScreen({ navigation }: Props): React.JSX.Element {
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    loadFormFields();
  }, []);

  const loadFormFields = async () => {
    try {
      setInitialLoading(true);
      const response = await formFieldsService.getFormFields();
      
      if (response.success && response.data) {
        setFormFields(response.data);
      } else {
        Alert.alert('Erro', response.message || 'Erro ao carregar campos do formulário');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao carregar campos do formulário');
    } finally {
      setInitialLoading(false);
    }
  };

  const toggleFieldStatus = async (fieldId: string) => {
    const field = formFields.find(f => f.id === fieldId);
    if (!field) return;

    const newStatus = !field.active;
    
    // Atualizar UI imediatamente para melhor UX
    setFormFields(prevFields => 
      prevFields.map(f => 
        f.id === fieldId 
          ? { ...f, active: newStatus }
          : f
      )
    );

    try {
      const response = await formFieldsService.toggleFieldStatus(fieldId, newStatus);
      
      if (!response.success) {
        // Reverter mudança se falhou
        setFormFields(prevFields => 
          prevFields.map(f => 
            f.id === fieldId 
              ? { ...f, active: !newStatus }
              : f
          )
        );
        Alert.alert('Erro', response.message || 'Erro ao alterar status do campo');
      }
    } catch (error) {
      // Reverter mudança se falhou
      setFormFields(prevFields => 
        prevFields.map(f => 
          f.id === fieldId 
            ? { ...f, active: !newStatus }
            : f
        )
      );
      Alert.alert('Erro', 'Erro ao alterar status do campo');
    }
  };

  const saveChanges = async () => {
    setLoading(true);
    try {
      const response = await formFieldsService.updateFormFields(formFields);
      
      if (response.success) {
        Alert.alert('Sucesso', response.message || 'Configurações dos campos salvos com sucesso!');
      } else {
        Alert.alert('Erro', response.message || 'Erro ao salvar configurações dos campos.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar configurações dos campos.');
    } finally {
      setLoading(false);
    }
  };

  const renderFieldItem = (field: FormField) => (
    <View key={field.id} style={styles.fieldItem}>
      <View style={styles.fieldInfo}>
        <Text style={styles.fieldLabel} variant="h3">{field.label}</Text>
        <Text style={styles.fieldType} variant="body">
          {field.type} {field.required && '(Obrigatório)'}
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.toggleButton, field.active ? styles.activeButton : styles.inactiveButton]}
        onPress={() => toggleFieldStatus(field.id)}
      >
        <Icon 
          name={field.active ? 'toggle-on' : 'toggle-off'} 
          size={24} 
          color={field.active ? '#4CAF50' : '#757575'} 
        />
        <Text style={[styles.toggleText, { color: field.active ? '#4CAF50' : '#757575' }]}>
          {field.active ? 'Ativo' : 'Inativo'}
        </Text>
      </TouchableOpacity>
    </View>
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
          <Text style={styles.headerTitle} variant="h2">GERENCIAR CAMPOS</Text>
          <View style={styles.headerButtonsContainer}>
            <TouchableOpacity 
              style={styles.userManagementButton}
              onPress={() => navigation.navigate('UserManagement' as never)}
            >
              <Icon name="users" size={16} color="#D4AF37" />
              <Text style={styles.userManagementText}>Usuários</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.approvalsButton}
              onPress={() => navigation.navigate('AdminApprovals' as never)}
            >
              <Icon name="check-circle" size={16} color="#D4AF37" />
              <Text style={styles.approvalsText}>Aprovações</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      {initialLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#D4AF37" />
          <Text style={styles.loadingText} variant="body">Carregando campos...</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
          <Text style={styles.sectionTitle} variant="h3">
            Campos do Formulário de Cadastro
          </Text>
          <Text style={styles.sectionDescription} variant="body">
            Ative ou desative os campos que aparecerão no formulário de criação de conta.
          </Text>

          <View style={styles.fieldsContainer}>
            {formFields.map(renderFieldItem)}
          </View>

          <TouchableOpacity 
            style={[styles.saveButton, loading && styles.saveButtonDisabled]}
            onPress={saveChanges}
            disabled={loading}
          >
            <Text style={styles.saveButtonText} variant="h3">
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </Text>
          </TouchableOpacity>
          </View>
        </ScrollView>
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
    marginBottom: 8,
  },
  headerButtonsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  userManagementButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D4AF37',
  },
  userManagementText: {
    fontSize: 12,
    color: '#D4AF37',
    fontWeight: '600',
    marginLeft: 4,
  },
  approvalsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D4AF37',
  },
  approvalsText: {
    fontSize: 12,
    color: '#D4AF37',
    fontWeight: '600',
    marginLeft: 4,
  },
  placeholder: {
    width: 36,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    lineHeight: 20,
  },
  fieldsContainer: {
    marginBottom: 30,
  },
  fieldItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  fieldInfo: {
    flex: 1,
    marginRight: 16,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  fieldType: {
    fontSize: 12,
    color: '#666',
    textTransform: 'capitalize',
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
  },
  activeButton: {
    backgroundColor: '#E8F5E8',
  },
  inactiveButton: {
    backgroundColor: '#F5F5F5',
  },
  toggleText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  saveButton: {
    backgroundColor: '#D4AF37',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
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
});