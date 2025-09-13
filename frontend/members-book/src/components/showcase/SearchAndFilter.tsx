import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import type { FilterType } from '../../types';

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchQuery,
  onSearchChange,
  selectedFilter,
  onFilterChange,
}) => {
  const filterOptions: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'Todos' },
    { value: 'socios', label: 'Sócios' },
    { value: 'infinity', label: 'Infinity' },
    { value: 'disruption', label: 'Disruption' },
  ];

  const renderFilterButton = (option: { value: FilterType; label: string }) => (
    <TouchableOpacity
      key={option.value}
      style={[
        styles.filterButton,
        selectedFilter === option.value && styles.filterButtonActive
      ]}
      onPress={() => onFilterChange(option.value)}
      activeOpacity={0.7}
    >
      <Text style={[
        styles.filterButtonText,
        selectedFilter === option.value && styles.filterButtonTextActive
      ]}>
        {option.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons 
          name="search-outline" 
          size={20} 
          color={Colors.text.secondary} 
          style={styles.searchIcon} 
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar membros..."
          placeholderTextColor={Colors.text.secondary}
          value={searchQuery}
          onChangeText={onSearchChange}
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => onSearchChange('')}
            style={styles.clearButton}
            activeOpacity={0.7}
          >
            <Ionicons 
              name="close-circle" 
              size={20} 
              color={Colors.text.secondary} 
            />
          </TouchableOpacity>
        )}
      </View>
      
      {/* Filter Buttons */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {filterOptions.map(renderFilterButton)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text.primary,
    paddingVertical: 0,
  },
  clearButton: {
    marginLeft: 8,
    padding: 4,
  },
  filterContainer: {
    paddingLeft: 20,
  },
  filterContent: {
    paddingRight: 20,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.background.secondary,
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text.secondary,
  },
  filterButtonTextActive: {
    color: Colors.white,
  },
});

export default SearchAndFilter;