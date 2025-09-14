import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import Text from '../Text';
import { Colors } from '../../constants/Colors';
import MemberCard from './MemberCard';
import type { Member } from '../../types';

interface MembersGridProps {
  members: Member[];
  loading: boolean;
  refreshing: boolean;
  onRefresh: () => void;
  onMemberPress: (member: Member) => void;
  onConnectPress: (memberId: string) => void;
  searchQuery: string;
}

const MembersGrid: React.FC<MembersGridProps> = ({
  members,
  loading,
  refreshing,
  onRefresh,
  onMemberPress,
  onConnectPress,
  searchQuery,
}) => {
  const renderMemberCard = ({ item }: { item: Member }) => (
    <MemberCard
      member={item}
      onPress={onMemberPress}
      onConnect={onConnectPress}
    />
  );

  const renderEmptyState = () => {
    if (loading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.emptyText} variant="body">Carregando membros...</Text>
        </View>
      );
    }

    if (searchQuery.length > 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle} variant="title">Nenhum resultado encontrado</Text>
          <Text style={styles.emptyText} variant="body">
            Não encontramos membros que correspondam à sua busca por "{searchQuery}"
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle} variant="title">Nenhum membro encontrado</Text>
        <Text style={styles.emptyText} variant="body">
          Não há membros disponíveis no momento.
        </Text>
      </View>
    );
  };

  const keyExtractor = (item: Member) => item.id;

  return (
    <View style={styles.container}>
      <FlatList
        data={members}
        renderItem={renderMemberCard}
        keyExtractor={keyExtractor}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={[
          styles.listContent,
          members.length === 0 && styles.emptyListContent
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.primary]}
            tintColor={Colors.primary}
          />
        }
        ListEmptyComponent={renderEmptyState}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={8}
        getItemLayout={(data, index) => ({
          length: 200, // Approximate item height
          offset: 200 * Math.floor(index / 2),
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  row: {
    justifyContent: 'space-between',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 8,
  },
});

export default MembersGrid;