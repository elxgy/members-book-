import { useState, useEffect, useCallback } from 'react';
import { apiService, ApiError } from '../services/api';
import { mockAdminUsers, mockSystemMetrics, filterAdminUsers } from '../services/mockData';
import type { AdminUser, SystemMetric } from '../types';

interface UseAdminUsersOptions {
  search?: string;
  status?: string;
  useMockData?: boolean;
}

interface UseAdminUsersReturn {
  users: AdminUser[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  updateUserStatus: (userId: string, status: 'active' | 'suspended') => Promise<boolean>;
  deleteUser: (userId: string) => Promise<boolean>;
}

interface UseSystemMetricsReturn {
  metrics: SystemMetric[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useAdminUsers = (options: UseAdminUsersOptions = {}): UseAdminUsersReturn => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if (options.useMockData) {
        const filtered = filterAdminUsers(mockAdminUsers, {
          search: options.search,
          status: options.status,
        });
        setUsers(filtered);
        return;
      }

      const data = await apiService.getUsers({
        search: options.search,
        status: options.status,
      });
      setUsers(data);
    } catch (err) {
      console.warn('Failed to fetch users from API, using mock data:', err);
      
      const filtered = filterAdminUsers(mockAdminUsers, {
        search: options.search,
        status: options.status,
      });
      setUsers(filtered);
      
      if (err instanceof ApiError) {
        setError(`API Error: ${err.message}`);
      } else {
        setError('Failed to load users. Using offline data.');
      }
    } finally {
      setLoading(false);
    }
  }, [options.search, options.status, options.useMockData]);

  const updateUserStatus = useCallback(async (userId: string, status: 'active' | 'suspended'): Promise<boolean> => {
    try {
      if (options.useMockData) {
        // Simulate status update
        setUsers(prev => prev.map(user => 
          user.id === userId ? { ...user, status } : user
        ));
        return true;
      }

      const result = await apiService.updateUserStatus(userId, status);
      if (result.success) {
        setUsers(prev => prev.map(user => 
          user.id === userId ? { ...user, status } : user
        ));
      }
      return result.success;
    } catch (err) {
      console.error('Failed to update user status:', err);
      return false;
    }
  }, [options.useMockData]);

  const deleteUser = useCallback(async (userId: string): Promise<boolean> => {
    try {
      if (options.useMockData) {
        // Simulate user deletion
        setUsers(prev => prev.filter(user => user.id !== userId));
        return true;
      }

      const result = await apiService.deleteUser(userId);
      if (result.success) {
        setUsers(prev => prev.filter(user => user.id !== userId));
      }
      return result.success;
    } catch (err) {
      console.error('Failed to delete user:', err);
      return false;
    }
  }, [options.useMockData]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    refetch: fetchUsers,
    updateUserStatus,
    deleteUser,
  };
};

export const useSystemMetrics = (useMockData = false): UseSystemMetricsReturn => {
  const [metrics, setMetrics] = useState<SystemMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if (useMockData) {
        setMetrics(mockSystemMetrics);
        return;
      }

      const data = await apiService.getSystemMetrics();
      setMetrics(data);
    } catch (err) {
      console.warn('Failed to fetch metrics from API, using mock data:', err);
      setMetrics(mockSystemMetrics);
      
      if (err instanceof ApiError) {
        setError(`API Error: ${err.message}`);
      } else {
        setError('Failed to load metrics. Using offline data.');
      }
    } finally {
      setLoading(false);
    }
  }, [useMockData]);

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  return {
    metrics,
    loading,
    error,
    refetch: fetchMetrics,
  };
};