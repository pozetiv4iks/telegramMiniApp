import { useState, useCallback } from 'react';
import { 
  apiClient, 
  ApiResponse,
  SubAccount, 
  CreateSubAccountRequest, 
  SubAccountQueryParams,
  WithdrawRequest,
  DepositRequest
} from '../services/api';

// Базовый хук для работы с sub-accounts
export function useSubAccounts() {
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
      console.error('Sub-account API request failed:', err);
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

// Хук для управления sub-accounts
export function useSubAccountManagement() {
  const { loading, error, executeRequest } = useSubAccounts();

  const getSubAccounts = useCallback((params?: SubAccountQueryParams) => {
    return executeRequest(() => apiClient.getSubAccounts(params));
  }, [executeRequest]);

  const createSubAccount = useCallback((data: CreateSubAccountRequest) => {
    return executeRequest(() => apiClient.createSubAccount(data));
  }, [executeRequest]);

  const getSubAccountById = useCallback((subAccountId: string) => {
    return executeRequest(() => apiClient.getSubAccountById(subAccountId));
  }, [executeRequest]);

  const getSubAccountTransactions = useCallback((subAccountId: string, params?: SubAccountQueryParams) => {
    return executeRequest(() => apiClient.getSubAccountTransactions(subAccountId, params));
  }, [executeRequest]);

  const withdrawFromSubAccount = useCallback((subAccountId: string, data: WithdrawRequest) => {
    return executeRequest(() => apiClient.withdrawFromSubAccount(subAccountId, data));
  }, [executeRequest]);

  const depositToSubAccount = useCallback((subAccountId: string, data: DepositRequest) => {
    return executeRequest(() => apiClient.depositToSubAccount(subAccountId, data));
  }, [executeRequest]);

  return {
    loading,
    error,
    getSubAccounts,
    createSubAccount,
    getSubAccountById,
    getSubAccountTransactions,
    withdrawFromSubAccount,
    depositToSubAccount,
  };
}

// Хук для работы с конкретным sub-account
export function useSubAccount(subAccountId: string) {
  const { loading, error, executeRequest } = useSubAccounts();
  const [subAccount, setSubAccount] = useState<SubAccount | null>(null);

  const loadSubAccount = useCallback(async () => {
    const data = await executeRequest(() => apiClient.getSubAccountById(subAccountId));
    if (data) {
      setSubAccount(data);
    }
    return data;
  }, [subAccountId, executeRequest]);

  const loadTransactions = useCallback(async (params?: SubAccountQueryParams) => {
    return executeRequest(() => apiClient.getSubAccountTransactions(subAccountId, params));
  }, [subAccountId, executeRequest]);

  const withdraw = useCallback(async (data: WithdrawRequest) => {
    const result = await executeRequest(() => apiClient.withdrawFromSubAccount(subAccountId, data));
    if (result) {
      // Перезагружаем данные sub-account после операции
      await loadSubAccount();
    }
    return result;
  }, [subAccountId, executeRequest, loadSubAccount]);

  const deposit = useCallback(async (data: DepositRequest) => {
    const result = await executeRequest(() => apiClient.depositToSubAccount(subAccountId, data));
    if (result) {
      // Перезагружаем данные sub-account после операции
      await loadSubAccount();
    }
    return result;
  }, [subAccountId, executeRequest, loadSubAccount]);

  return {
    subAccount,
    loading,
    error,
    loadSubAccount,
    loadTransactions,
    withdraw,
    deposit,
  };
}
