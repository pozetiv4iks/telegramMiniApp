import { useState, useCallback } from 'react';
import { apiClient, ApiResponse } from '../services/api';

// Хук для работы с API
export function useApi() {
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
      console.error('API request failed:', err);
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

// Специализированные хуки для конкретных API операций
export function useHealthCheck() {
  const { loading, error, executeRequest } = useApi();

  const checkHealth = useCallback(() => {
    return executeRequest(() => apiClient.checkHealth());
  }, [executeRequest]);

  return {
    loading,
    error,
    checkHealth,
  };
}

export function useSubAccounts() {
  const { loading, error, executeRequest } = useApi();

  const getSubAccounts = useCallback((params?: any) => {
    return executeRequest(() => apiClient.getSubAccounts(params));
  }, [executeRequest]);

  const createSubAccount = useCallback((data: any) => {
    return executeRequest(() => apiClient.createSubAccount(data));
  }, [executeRequest]);

  const getSubAccount = useCallback((id: string) => {
    return executeRequest(() => apiClient.getSubAccountById(id));
  }, [executeRequest]);

  return {
    loading,
    error,
    getSubAccounts,
    createSubAccount,
    getSubAccount,
  };
}

export function useCards() {
  const { loading, error, executeRequest } = useApi();

  const getCards = useCallback((params?: any) => {
    return executeRequest(() => apiClient.getCards(params));
  }, [executeRequest]);

  const createCard = useCallback((data: any) => {
    return executeRequest(() => apiClient.createCard(data));
  }, [executeRequest]);

  const getCard = useCallback((id: string) => {
    return executeRequest(() => apiClient.getCard(id));
  }, [executeRequest]);

  const updateCard = useCallback((id: string, data: any) => {
    return executeRequest(() => apiClient.updateCard(id, data));
  }, [executeRequest]);

  const deleteCard = useCallback((id: string) => {
    return executeRequest(() => apiClient.deleteCard(id));
  }, [executeRequest]);

  const freezeCard = useCallback((id: string) => {
    return executeRequest(() => apiClient.freezeCard(id));
  }, [executeRequest]);

  const unfreezeCard = useCallback((id: string) => {
    return executeRequest(() => apiClient.unfreezeCard(id));
  }, [executeRequest]);

  const getCardTransactions = useCallback((id: string, params?: any) => {
    return executeRequest(() => apiClient.getCardTransactions(id, params));
  }, [executeRequest]);

  const depositToCard = useCallback((id: string, data: any) => {
    return executeRequest(() => apiClient.depositToCard(id, data));
  }, [executeRequest]);

  const withdrawFromCard = useCallback((id: string, data: any) => {
    return executeRequest(() => apiClient.withdrawFromCard(id, data));
  }, [executeRequest]);

  return {
    loading,
    error,
    getCards,
    createCard,
    getCard,
    updateCard,
    deleteCard,
    freezeCard,
    unfreezeCard,
    getCardTransactions,
    depositToCard,
    withdrawFromCard,
  };
}

export function useTransactions() {
  const { loading, error, executeRequest } = useApi();

  const getCardTransactions = useCallback((cardId: string, params?: any) => {
    return executeRequest(() => apiClient.getCardTransactions(cardId, params));
  }, [executeRequest]);

  const getSubAccountTransactions = useCallback((subAccountId: string, params?: any) => {
    return executeRequest(() => apiClient.getSubAccountTransactions(subAccountId, params));
  }, [executeRequest]);

  return {
    loading,
    error,
    getCardTransactions,
    getSubAccountTransactions,
  };
}
