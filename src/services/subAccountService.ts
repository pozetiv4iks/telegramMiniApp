// Сервис для работы с sub-accounts
import { 
  apiClient,
  SubAccount, 
  CreateSubAccountRequest, 
  SubAccountQueryParams,
  SubAccountTransaction,
  WithdrawRequest,
  DepositRequest
} from './api';

export class SubAccountService {
  private static instance: SubAccountService;

  private constructor() {}

  public static getInstance(): SubAccountService {
    if (!SubAccountService.instance) {
      SubAccountService.instance = new SubAccountService();
    }
    return SubAccountService.instance;
  }

  /**
   * Получить все sub-accounts
   */
  public async getAllSubAccounts(params?: SubAccountQueryParams): Promise<SubAccount[] | null> {
    try {
      console.log('📋 Получение всех sub-accounts...');
      const response = await apiClient.getSubAccounts(params);
      
      if (response.success && response.data) {
        console.log(`✅ Получено ${response.data.length} sub-accounts`);
        return response.data;
      }
      
      console.log('❌ Ошибка при получении sub-accounts:', response.error);
      return null;
    } catch (error) {
      console.error('❌ Ошибка при получении sub-accounts:', error);
      return null;
    }
  }

  /**
   * Создать новый sub-account
   */
  public async createSubAccount(data: CreateSubAccountRequest): Promise<SubAccount | null> {
    try {
      console.log('📝 Создание нового sub-account...');
      console.log('📋 Данные для создания:', data);
      
      const response = await apiClient.createSubAccount(data);
      
      if (response.success && response.data) {
        console.log('✅ Sub-account создан успешно:', {
          id: response.data.id,
          wallet_id: response.data.wallet_id,
          program_id: response.data.program_id,
          balance: response.data.balance,
          currency: response.data.currency
        });
        return response.data;
      }
      
      console.log('❌ Ошибка при создании sub-account:', response.error);
      return null;
    } catch (error) {
      console.error('❌ Ошибка при создании sub-account:', error);
      return null;
    }
  }

  /**
   * Получить sub-account по ID
   */
  public async getSubAccountById(subAccountId: string): Promise<SubAccount | null> {
    try {
      console.log(`🔍 Поиск sub-account по ID: ${subAccountId}`);
      
      const response = await apiClient.getSubAccountById(subAccountId);
      
      if (response.success && response.data) {
        console.log('✅ Sub-account найден:', {
          id: response.data.id,
          wallet_id: response.data.wallet_id,
          balance: response.data.balance,
          currency: response.data.currency,
          status: response.data.status
        });
        return response.data;
      }
      
      console.log('❌ Sub-account не найден:', response.error);
      return null;
    } catch (error) {
      console.error('❌ Ошибка при поиске sub-account:', error);
      return null;
    }
  }

  /**
   * Получить транзакции sub-account
   */
  public async getSubAccountTransactions(subAccountId: string, params?: SubAccountQueryParams): Promise<SubAccountTransaction[] | null> {
    try {
      console.log(`📊 Получение транзакций sub-account: ${subAccountId}`);
      
      const response = await apiClient.getSubAccountTransactions(subAccountId, params);
      
      if (response.success && response.data) {
        console.log(`✅ Получено ${response.data.length} транзакций`);
        return response.data;
      }
      
      console.log('❌ Ошибка при получении транзакций:', response.error);
      return null;
    } catch (error) {
      console.error('❌ Ошибка при получении транзакций:', error);
      return null;
    }
  }

  /**
   * Снять средства с sub-account
   */
  public async withdrawFromSubAccount(subAccountId: string, data: WithdrawRequest): Promise<any> {
    try {
      console.log(`💰 Снятие средств с sub-account: ${subAccountId}`);
      console.log('📋 Данные операции:', data);
      
      const response = await apiClient.withdrawFromSubAccount(subAccountId, data);
      
      if (response.success) {
        console.log('✅ Средства успешно сняты');
        return response.data;
      }
      
      console.log('❌ Ошибка при снятии средств:', response.error);
      return null;
    } catch (error) {
      console.error('❌ Ошибка при снятии средств:', error);
      return null;
    }
  }

  /**
   * Пополнить sub-account
   */
  public async depositToSubAccount(subAccountId: string, data: DepositRequest): Promise<any> {
    try {
      console.log(`💳 Пополнение sub-account: ${subAccountId}`);
      console.log('📋 Данные операции:', data);
      
      const response = await apiClient.depositToSubAccount(subAccountId, data);
      
      if (response.success) {
        console.log('✅ Sub-account успешно пополнен');
        return response.data;
      }
      
      console.log('❌ Ошибка при пополнении:', response.error);
      return null;
    } catch (error) {
      console.error('❌ Ошибка при пополнении:', error);
      return null;
    }
  }

  /**
   * Создать sub-account для пользователя
   */
  public async createSubAccountForUser(userId: string, walletId?: string): Promise<SubAccount | null> {
    try {
      const wallet_id = walletId || `wallet_${userId}`;
      
      console.log(`👤 Создание sub-account для пользователя: ${userId}`);
      console.log(`💼 Wallet ID: ${wallet_id}`);
      
      const subAccount = await this.createSubAccount({
        wallet_id: wallet_id
        // program_id будет взят из заглушки автоматически
      });
      
      if (subAccount) {
        console.log('✅ Sub-account создан для пользователя:', {
          user_id: userId,
          sub_account_id: subAccount.id,
          wallet_id: subAccount.wallet_id
        });
      }
      
      return subAccount;
    } catch (error) {
      console.error('❌ Ошибка при создании sub-account для пользователя:', error);
      return null;
    }
  }
}

// Экспортируем экземпляр сервиса
export const subAccountService = SubAccountService.getInstance();
