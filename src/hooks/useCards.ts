import { useState, useCallback } from 'react';
import { 
  apiClient, 
  ApiResponse,
  Card, 
  CreateCardRequest, 
  UpdateCardRequest,
  QueryParams
} from '../services/api';

// Базовый хук для работы с картами
export function useCards() {
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
      console.error('Card API request failed:', err);
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

// Хук для управления картами
export function useCardManagement() {
  const { loading, error, executeRequest } = useCards();

  const getCards = useCallback((params?: QueryParams) => {
    return executeRequest(() => apiClient.getCards(params));
  }, [executeRequest]);

  const getCardsByProgramId = useCallback((programId: string, params?: QueryParams) => {
    const queryParams = {
      ...params,
      program_id: programId
    };
    return executeRequest(() => apiClient.getCards(queryParams));
  }, [executeRequest]);

  const createCard = useCallback((data: CreateCardRequest) => {
    return executeRequest(() => apiClient.createCard(data));
  }, [executeRequest]);

  const getCardById = useCallback((cardId: string) => {
    return executeRequest(() => apiClient.getCard(cardId));
  }, [executeRequest]);

  const updateCard = useCallback((cardId: string, data: UpdateCardRequest) => {
    return executeRequest(() => apiClient.updateCard(cardId, data));
  }, [executeRequest]);

  const getUserCards = useCallback((subAccountId: string) => {
    return executeRequest(() => apiClient.getCards({ sub_account_id: subAccountId }));
  }, [executeRequest]);

  return {
    loading,
    error,
    getCards,
    getCardsByProgramId,
    createCard,
    getCardById,
    updateCard,
    getUserCards,
  };
}

// Хук для работы с конкретной картой
export function useCard(cardId: string) {
  const { loading, error, executeRequest } = useCards();
  const [card, setCard] = useState<Card | null>(null);

  const loadCard = useCallback(async () => {
    const data = await executeRequest(() => apiClient.getCard(cardId));
    if (data) {
      setCard(data);
    }
    return data;
  }, [cardId, executeRequest]);

  const updateCard = useCallback(async (data: UpdateCardRequest) => {
    const result = await executeRequest(() => apiClient.updateCard(cardId, data));
    if (result) {
      setCard(result);
    }
    return result;
  }, [cardId, executeRequest]);

  return {
    card,
    loading,
    error,
    loadCard,
    updateCard,
  };
}
