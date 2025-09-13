import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors';
import { useMembers } from '../hooks/useMembers';
import SearchAndFilter from '../components/showcase/SearchAndFilter';
import MembersGrid from '../components/showcase/MembersGrid';
import type { Member, FilterType } from '../types';

const ShowcaseScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const { members, loading, error, refetch, connectToMember } = useMembers();
  const [refreshing, setRefreshing] = useState(false);

  const filteredMembers = useMemo(() => {
    let filtered = members;

    // Apply hierarchy filter
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(member => member.hierarchy === selectedFilter);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(member => 
        member.name.toLowerCase().includes(query) ||
        member.title?.toLowerCase().includes(query) ||
        member.company.toLowerCase().includes(query) ||
        member.expertise?.some(skill => skill.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [members, searchQuery, selectedFilter]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (error) {
      console.error('Error refreshing members:', error);
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  const handleMemberPress = useCallback((member: Member) => {
    // Navigate to member profile
    console.log('Navigate to member:', member.name);
  }, []);

  const handleConnectPress = useCallback(async (memberId: string) => {
    try {
      await connectToMember(memberId);
      console.log('Connected to member:', memberId);
    } catch (error) {
      console.error('Error connecting to member:', error);
    }
  }, [connectToMember]);



  return (
    <SafeAreaView style={styles.container}>
      <SearchAndFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
      />
      
      <MembersGrid
        members={filteredMembers}
        loading={loading}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onMemberPress={handleMemberPress}
        onConnectPress={handleConnectPress}
        searchQuery={searchQuery}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
});

export default ShowcaseScreen;