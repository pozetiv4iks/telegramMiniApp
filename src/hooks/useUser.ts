import { useState, useCallback } from 'react';
import { apiClient, ApiResponse } from '../services/api';
import { 
  User, 
  CreateUserRequest, 
  UpdateUserRequest, 
  UserSearchParams, 
  TelegramUserData, 
  UserSession 
} from '../types/user';

// Базовый хук для работы с пользователями
export function useUsers() {
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
      console.error('User API request failed:', err);
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

// Хук для работы с пользователями
export function useUserManagement() {
  const { loading, error, executeRequest } = useUsers();

  const getUsers = useCallback((params?: UserSearchParams) => {
    return executeRequest(() => apiClient.getUsers(params));
  }, [executeRequest]);

  const createUser = useCallback((data: CreateUserRequest) => {
    return executeRequest(() => apiClient.createUser(data));
  }, [executeRequest]);

  const getUser = useCallback((userId: string) => {
    return executeRequest(() => apiClient.getUser(userId));
  }, [executeRequest]);

  const updateUser = useCallback((userId: string, data: UpdateUserRequest) => {
    return executeRequest(() => apiClient.updateUser(userId, data));
  }, [executeRequest]);

  const deleteUser = useCallback((userId: string) => {
    return executeRequest(() => apiClient.deleteUser(userId));
  }, [executeRequest]);

  const searchUserByNickName = useCallback((nickName: string) => {
    return executeRequest(() => apiClient.searchUserByNickName(nickName));
  }, [executeRequest]);

  const searchUserByTelegramId = useCallback((telegramId: string) => {
    return executeRequest(() => apiClient.searchUserByTelegramId(telegramId));
  }, [executeRequest]);

  const findUserByNickNameAndTelegramId = useCallback((nickName: string, telegramId: string) => {
    return executeRequest(() => apiClient.findUserByNickNameAndTelegramId(nickName, telegramId));
  }, [executeRequest]);

  const createUserFromTelegramData = useCallback((telegramData: TelegramUserData, nickName?: string) => {
    return executeRequest(() => apiClient.createUserFromTelegramData(telegramData, nickName));
  }, [executeRequest]);

  return {
    loading,
    error,
    getUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    searchUserByNickName,
    searchUserByTelegramId,
    findUserByNickNameAndTelegramId,
    createUserFromTelegramData,
  };
}

// Хук для поиска пользователей
export function useUserSearch() {
  const { loading, error, executeRequest } = useUsers();

  const searchUsers = useCallback((params: UserSearchParams) => {
    return executeRequest(() => apiClient.getUsers(params));
  }, [executeRequest]);

  const searchByNickName = useCallback((nickName: string) => {
    return executeRequest(() => apiClient.searchUserByNickName(nickName));
  }, [executeRequest]);

  const searchByTelegramId = useCallback((telegramId: string) => {
    return executeRequest(() => apiClient.searchUserByTelegramId(telegramId));
  }, [executeRequest]);

  const searchByNickNameAndTelegramId = useCallback((nickName: string, telegramId: string) => {
    return executeRequest(() => apiClient.findUserByNickNameAndTelegramId(nickName, telegramId));
  }, [executeRequest]);

  return {
    loading,
    error,
    searchUsers,
    searchByNickName,
    searchByTelegramId,
    searchByNickNameAndTelegramId,
  };
}

// Хук для работы с текущим пользователем
export function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const { loading, error, executeRequest } = useUsers();

  const loginUser = useCallback(async (nickName: string, telegramId: string, telegramData?: TelegramUserData) => {
    try {
      // Сначала ищем пользователя по nick_name и telegram_id
      const searchResult = await executeRequest(() => 
        apiClient.findUserByNickNameAndTelegramId(nickName, telegramId)
      );

      let user: User | null = null;
      let isNew = false;

      if (searchResult && searchResult.length > 0) {
        // Пользователь найден
        user = searchResult[0];
        console.log('✅ Пользователь найден:', user);
      } else {
        // Пользователь не найден, создаем нового
        if (telegramData) {
          const createResult = await executeRequest(() => 
            apiClient.createUserFromTelegramData(telegramData, nickName)
          );
          if (createResult) {
            user = createResult;
            isNew = true;
            console.log('🆕 Создан новый пользователь:', user);
          }
        } else {
          // Создаем пользователя с минимальными данными
          const createResult = await executeRequest(() => 
            apiClient.createUser({
              nick_name: nickName,
              telegram_id: telegramId,
              first_name: nickName,
            })
          );
          if (createResult) {
            user = createResult;
            isNew = true;
            console.log('🆕 Создан новый пользователь:', user);
          }
        }
      }

      if (user) {
        setCurrentUser(user);
        setIsNewUser(isNew);
        setSessionId(`session_${Date.now()}_${user.id}`);
        
        // Обновляем время последней активности
        if (user.id) {
          await executeRequest(() => 
            apiClient.updateUser(user.id, {
              metadata: {
                ...user.metadata,
                last_activity: new Date().toISOString()
              }
            })
          );
        }

        return {
          user,
          isNewUser: isNew,
          sessionId: `session_${Date.now()}_${user.id}`,
          loginTime: new Date().toISOString()
        } as UserSession;
      }

      return null;
    } catch (err) {
      console.error('Ошибка при входе пользователя:', err);
      return null;
    }
  }, [executeRequest]);

  const logoutUser = useCallback(() => {
    setCurrentUser(null);
    setIsNewUser(false);
    setSessionId(null);
  }, []);

  const updateCurrentUser = useCallback(async (data: UpdateUserRequest) => {
    if (!currentUser) return null;

    const result = await executeRequest(() => 
      apiClient.updateUser(currentUser.id, data)
    );

    if (result) {
      setCurrentUser(result);
    }

    return result;
  }, [currentUser, executeRequest]);

  return {
    currentUser,
    isNewUser,
    sessionId,
    loading,
    error,
    loginUser,
    logoutUser,
    updateCurrentUser,
  };
}
