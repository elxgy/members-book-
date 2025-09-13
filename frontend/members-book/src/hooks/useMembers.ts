import { useState, useEffect, useCallback } from 'react';
import { apiService, ApiError } from '../services/api';
import { mockMembers, filterMembers } from '../services/mockData';
import type { Member } from '../types';

interface UseMembersOptions {
  search?: string;
  hierarchy?: string;
  useMockData?: boolean;
}

interface UseMembersReturn {
  members: Member[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  connectToMember: (memberId: string) => Promise<boolean>;
}

export const useMembers = (options: UseMembersOptions = {}): UseMembersReturn => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMembers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if (options.useMockData) {
        // Use mock data with filtering
        const filtered = filterMembers(mockMembers, {
          search: options.search,
          hierarchy: options.hierarchy,
        });
        setMembers(filtered);
        return;
      }

      // Try to fetch from API
      const data = await apiService.getMembers({
        search: options.search,
        hierarchy: options.hierarchy,
      });
      setMembers(data);
    } catch (err) {
      console.warn('Failed to fetch members from API, using mock data:', err);
      
      // Fallback to mock data
      const filtered = filterMembers(mockMembers, {
        search: options.search,
        hierarchy: options.hierarchy,
      });
      setMembers(filtered);
      
      if (err instanceof ApiError) {
        setError(`API Error: ${err.message}`);
      } else {
        setError('Failed to load members. Using offline data.');
      }
    } finally {
      setLoading(false);
    }
  }, [options.search, options.hierarchy, options.useMockData]);

  const connectToMember = useCallback(async (memberId: string): Promise<boolean> => {
    try {
      if (options.useMockData) {
        // Simulate connection success
        await new Promise(resolve => setTimeout(resolve, 1000));
        return true;
      }

      const result = await apiService.connectToMember(memberId);
      return result.success;
    } catch (err) {
      console.error('Failed to connect to member:', err);
      return false;
    }
  }, [options.useMockData]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  return {
    members,
    loading,
    error,
    refetch: fetchMembers,
    connectToMember,
  };
};