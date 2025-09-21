// API клиент для работы с бэкендом
import { 
  User, 
  CreateUserRequest, 
  UpdateUserRequest, 
  UserSearchParams, 
  TelegramUserData
} from '../types/user';
import { 
  UserData, 
  CreateUserDataRequest, 
  UpdateUserDataRequest, 
  UserDataQueryParams
} from '../types/userData';

const API_BASE_URL = 'https://backend-tg-livid.vercel.app';
const API_KEY = 'nnc_0YGtwEeh2oHoLja07rRHNt3NqvmW6jgfg-MliHXY1Q4';

// Заглушка для program_id
const DEFAULT_PROGRAM_ID = 'dbb74408-0318-401c-ac5d-72e522fa8aaa';

// Типы для API ответов
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  details?: string[];
}

export interface HealthResponse {
  status: string;
  timestamp: string;
  uptime: number;
  version: string;
}

export interface ApiInfoResponse {
  name: string;
  version: string;
  description: string;
  endpoints: string[];
}

export interface IssuingProgram {
  id: string;
  name: string;
  description: string;
  status: string;
}

export interface SubAccount {
  id: string;
  wallet_id: string;
  program_id: string;
  balance: number;
  currency: string;
  status: string;
  created_at: string;
  updated_at: string;
  nick_name?: string;
}

export interface Card {
  id: string;
  title: string;
  last4: string;
  expiration_date: string;
  expiration_date_short: string;
  form_factor: string;
  status: string;
  currency: string;
  created_at: string;
  updated_at: string;
  sub_account_id: string;
  vendor_sub_account_id: string;
  brand: string;
  vendor_id: string;
  vendor_card_id: string;
  tokenizable: boolean;
  spend_cap: number;
  spent_amount: number;
  card_name: string;
  email: string;
  mobile: string;
  type: string;
  wallet_id: string;
  program_id: string;
  limits: {
    all_time_enabled: boolean;
    all_time_cap: number;
    all_time_spent: number;
    daily_enabled: boolean;
    daily_cap: number;
    daily_spent: number;
    weekly_enabled: boolean;
    weekly_cap: number;
    weekly_spent: number;
    monthly_enabled: boolean;
    monthly_cap: number;
    monthly_spent: number;
    yearly_enabled: boolean;
    yearly_cap: number;
    yearly_spent: number;
    per_transaction_enabled: boolean;
    per_transaction_cap: number;
    per_transaction_spent: number;
  };
  metadata: Record<string, any>;
}

export interface Transaction {
  id: string;
  card_id?: string;
  sub_account_id?: string;
  amount: number;
  currency: string;
  type: string;
  status: string;
  description: string;
  created_at: string;
}

export interface CreateSubAccountRequest {
  program_id?: string; // Сделаем опциональным, будет использоваться заглушка
  nick_name?: string; // Telegram ID пользователя
}

export interface SubAccountQueryParams {
  limit?: number;
  offset?: number;
  status?: string;
  wallet_id?: string;
  program_id?: string;
}

export interface SubAccountTransaction {
  id: string;
  sub_account_id: string;
  amount: number;
  currency: string;
  type: string;
  status: string;
  description: string;
  created_at: string;
  metadata?: {
    [key: string]: any;
  };
}

export interface WithdrawRequest {
  amount: number;
  currency: string;
  description?: string;
}

export interface DepositRequest {
  amount: number;
  currency: string;
  description?: string;
}

export interface CreateCardRequest {
  program_id: string;
  sub_account_id: string;
  card_name: string;
  email?: string;
}

export interface UpdateCardRequest {
  name?: string;
  description?: string;
}

export interface WithdrawRequest {
  amount: number;
  currency: string;
}

export interface DepositRequest {
  amount: number;
  currency: string;
}

export interface UpdateLimitsRequest {
  daily: number;
  monthly: number;
  yearly: number;
}

export interface QueryParams {
  limit?: number;
  offset?: number;
  start_date?: string;
  end_date?: string;
  type?: string;
  status?: string;
  sub_account_id?: string;
  program_id?: string;
}

// Базовый класс для API запросов
class ApiClient {
  private baseUrl: string;
  private apiKey: string;

  constructor(baseUrl: string = API_BASE_URL, apiKey: string = API_KEY) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'x-api-key': this.apiKey,
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        // Для 404 ошибок (пользователь не найден) возвращаем success: false вместо исключения
        if (response.status === 404) {
          return {
            success: false,
            error: data.error || 'Not found'
          };
        }
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  private buildQueryString(params: QueryParams): string {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : '';
  }

  // Health & Info Endpoints
  async checkHealth(): Promise<ApiResponse<HealthResponse>> {
    return this.request<HealthResponse>('/health');
  }

  async getApiInfo(): Promise<ApiResponse<ApiInfoResponse>> {
    return this.request<ApiInfoResponse>('/info');
  }

  async getIssuingPrograms(): Promise<ApiResponse<IssuingProgram[]>> {
    return this.request<IssuingProgram[]>('/issuing/programs');
  }


  // Cards Endpoints
  async getCards(params?: QueryParams): Promise<ApiResponse<Card[]>> {
    const queryString = params ? this.buildQueryString(params) : '';
    return this.request<Card[]>(`/issuing/cards${queryString}`);
  }

  async createCard(data: CreateCardRequest): Promise<ApiResponse<Card>> {
    return this.request<Card>('/issuing/cards', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getCard(cardId: string): Promise<ApiResponse<Card>> {
    return this.request<Card>(`/issuing/cards/${cardId}`);
  }

  async updateCard(cardId: string, data: UpdateCardRequest): Promise<ApiResponse<Card>> {
    return this.request<Card>(`/issuing/cards/${cardId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteCard(cardId: string): Promise<ApiResponse<any>> {
    return this.request(`/issuing/cards/${cardId}`, {
      method: 'DELETE',
    });
  }

  async getCardSensitiveData(cardId: string): Promise<ApiResponse<any>> {
    return this.request(`/issuing/cards/${cardId}/sensitive`);
  }

  async freezeCard(cardId: string): Promise<ApiResponse<any>> {
    return this.request(`/issuing/cards/${cardId}/freeze`, {
      method: 'PUT',
    });
  }

  async unfreezeCard(cardId: string): Promise<ApiResponse<any>> {
    return this.request(`/issuing/cards/${cardId}/unfreeze`, {
      method: 'PUT',
    });
  }

  async getCardTransactions(
    cardId: string,
    params?: QueryParams
  ): Promise<ApiResponse<Transaction[]>> {
    const queryString = params ? this.buildQueryString(params) : '';
    return this.request<Transaction[]>(`/issuing/cards/${cardId}/transactions${queryString}`);
  }

  async updateCardLimits(
    cardId: string,
    data: UpdateLimitsRequest
  ): Promise<ApiResponse<any>> {
    return this.request(`/issuing/cards/${cardId}/limits`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async depositToCard(cardId: string, data: DepositRequest): Promise<ApiResponse<any>> {
    return this.request(`/issuing/cards/${cardId}/deposit`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async withdrawFromCard(cardId: string, data: WithdrawRequest): Promise<ApiResponse<any>> {
    return this.request(`/issuing/cards/${cardId}/withdraw`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async createBalanceCard(data: CreateCardRequest): Promise<ApiResponse<Card>> {
    return this.request<Card>('/issuing/cards/balance', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async createPrepaidCard(data: CreateCardRequest): Promise<ApiResponse<Card>> {
    return this.request<Card>('/issuing/cards/prepaid', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Users Endpoints
  async getUsers(params?: UserSearchParams): Promise<ApiResponse<User[]>> {
    const queryString = params ? this.buildQueryString(params) : '';
    return this.request<User[]>(`/users${queryString}`);
  }

  async createUser(data: CreateUserRequest): Promise<ApiResponse<User>> {
    return this.request<User>('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getUser(userId: string): Promise<ApiResponse<User>> {
    return this.request<User>(`/users/${userId}`);
  }

  async updateUser(userId: string, data: UpdateUserRequest): Promise<ApiResponse<User>> {
    return this.request<User>(`/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteUser(userId: string): Promise<ApiResponse<any>> {
    return this.request(`/users/${userId}`, {
      method: 'DELETE',
    });
  }

  async searchUserByNickName(nickName: string): Promise<ApiResponse<User[]>> {
    return this.request<User[]>(`/users/search?nick_name=${encodeURIComponent(nickName)}`);
  }

  async searchUserByTelegramId(telegramId: string): Promise<ApiResponse<User[]>> {
    return this.request<User[]>(`/users/search?telegram_id=${encodeURIComponent(telegramId)}`);
  }

  async findUserByNickNameAndTelegramId(nickName: string, telegramId: string): Promise<ApiResponse<User[]>> {
    return this.request<User[]>(`/users/search?nick_name=${encodeURIComponent(nickName)}&telegram_id=${encodeURIComponent(telegramId)}`);
  }

  async createUserFromTelegramData(telegramData: TelegramUserData, nickName?: string): Promise<ApiResponse<User>> {
    const userData: CreateUserRequest = {
      nick_name: nickName || `user_${telegramData.id}`,
      telegram_id: telegramData.id.toString(),
      first_name: telegramData.first_name,
      last_name: telegramData.last_name,
      username: telegramData.username,
      language_code: telegramData.language_code,
      is_bot: telegramData.is_bot || false,
    };

    return this.createUser(userData);
  }

  // Sub-accounts Endpoints
  async getSubAccounts(params?: SubAccountQueryParams): Promise<ApiResponse<SubAccount[]>> {
    const queryString = params ? this.buildQueryString(params) : '';
    return this.request<SubAccount[]>(`/issuing/sub-accounts${queryString}`);
  }

  async createSubAccount(data: CreateSubAccountRequest): Promise<ApiResponse<SubAccount>> {
    // Используем заглушку для program_id, если не указан
    const requestData = {
      ...data,
      program_id: data.program_id || DEFAULT_PROGRAM_ID
    };
    
    return this.request<SubAccount>('/issuing/sub-accounts', {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
  }

  async getSubAccountById(subAccountId: string): Promise<ApiResponse<SubAccount>> {
    return this.request<SubAccount>(`/issuing/sub-accounts/${subAccountId}`);
  }

  async getSubAccountTransactions(subAccountId: string, params?: SubAccountQueryParams): Promise<ApiResponse<SubAccountTransaction[]>> {
    const queryString = params ? this.buildQueryString(params) : '';
    return this.request<SubAccountTransaction[]>(`/issuing/sub-accounts/${subAccountId}/transactions${queryString}`);
  }

  async withdrawFromSubAccount(subAccountId: string, data: WithdrawRequest): Promise<ApiResponse<any>> {
    return this.request(`/issuing/sub-accounts/${subAccountId}/withdraw`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async depositToSubAccount(subAccountId: string, data: DepositRequest): Promise<ApiResponse<any>> {
    return this.request(`/issuing/sub-accounts/${subAccountId}/deposit`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // User Data Endpoints
  async getAllUserData(params?: UserDataQueryParams): Promise<ApiResponse<UserData[]>> {
    const queryString = params ? this.buildQueryString(params) : '';
    return this.request<UserData[]>(`/user-data${queryString}`);
  }

  async createUserData(data: CreateUserDataRequest): Promise<ApiResponse<UserData>> {
    return this.request<UserData>('/user-data', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getUserDataById(id: number): Promise<ApiResponse<UserData>> {
    return this.request<UserData>(`/user-data/${id}`);
  }

  async getUserDataByTgId(tgId: string): Promise<ApiResponse<UserData>> {
    return this.request<UserData>(`/user-data/tg/${tgId}`);
  }

  async updateUserDataByTgId(tgId: string, data: UpdateUserDataRequest): Promise<ApiResponse<UserData>> {
    return this.request<UserData>(`/user-data/tg/${tgId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteUserDataByTgId(tgId: string): Promise<ApiResponse<UserData>> {
    return this.request<UserData>(`/user-data/tg/${tgId}`, {
      method: 'DELETE',
    });
  }
}

// Создаем и экспортируем экземпляр API клиента
export const apiClient = new ApiClient();

// Экспортируем константы
export { DEFAULT_PROGRAM_ID };

// Экспортируем класс для создания дополнительных экземпляров
export default ApiClient;
