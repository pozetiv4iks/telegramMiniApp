import { useState, useCallback } from 'react';
import { apiClient, ApiResponse } from '../services/api';
import { 
  UserData, 
  CreateUserDataRequest, 
  UpdateUserDataRequest, 
  UserDataQueryParams
} from '../types/userData';

// Базовый хук для работы с пользовательскими данными
export function useUserData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeRequest = useCallback(async <T>(
    requestFn: () => Promise<ApiResponse<T>>
  ): Promise<T | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await requestFn();
      
      if (response.success && response.data) {
        return response.data;
      } else {
        throw new Error(response.error || 'Unknown error occurred');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('User data API request failed:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    executeRequest,
    clearError,
  };
}

// Хук для управления пользовательскими данными
export function useUserDataManagement() {
  const { loading, error, executeRequest } = useUserData();

  const getAllUserData = useCallback((params?: UserDataQueryParams) => {
    return executeRequest(() => apiClient.getAllUserData(params));
  }, [executeRequest]);

  const createUserData = useCallback((data: CreateUserDataRequest) => {
    return executeRequest(() => apiClient.createUserData(data));
  }, [executeRequest]);

  const getUserDataById = useCallback((id: number) => {
    return executeRequest(() => apiClient.getUserDataById(id));
  }, [executeRequest]);

  const getUserDataByTgId = useCallback((tgId: string) => {
    return executeRequest(() => apiClient.getUserDataByTgId(tgId));
  }, [executeRequest]);

  const updateUserDataByTgId = useCallback((tgId: string, data: UpdateUserDataRequest) => {
    return executeRequest(() => apiClient.updateUserDataByTgId(tgId, data));
  }, [executeRequest]);

  const deleteUserDataByTgId = useCallback((tgId: string) => {
    return executeRequest(() => apiClient.deleteUserDataByTgId(tgId));
  }, [executeRequest]);

  return {
    loading,
    error,
    getAllUserData,
    createUserData,
    getUserDataById,
    getUserDataByTgId,
    updateUserDataByTgId,
    deleteUserDataByTgId,
  };
}

// Хук для работы с конкретными пользовательскими данными
export function useUserDataByTgId(tgId: string) {
  const { loading, error, executeRequest } = useUserData();
  const [userData, setUserData] = useState<UserData | null>(null);

  const loadUserData = useCallback(async () => {
    const data = await executeRequest(() => apiClient.getUserDataByTgId(tgId));
    if (data) {
      setUserData(data);
    }
    return data;
  }, [tgId, executeRequest]);

  const updateUserData = useCallback(async (data: UpdateUserDataRequest) => {
    const result = await executeRequest(() => apiClient.updateUserDataByTgId(tgId, data));
    if (result) {
      setUserData(result);
    }
    return result;
  }, [tgId, executeRequest]);

  const deleteUserData = useCallback(async () => {
    const result = await executeRequest(() => apiClient.deleteUserDataByTgId(tgId));
    if (result) {
      setUserData(null);
    }
    return result;
  }, [tgId, executeRequest]);

  return {
    userData,
    loading,
    error,
    loadUserData,
    updateUserData,
    deleteUserData,
  };
}
