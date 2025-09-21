// Сервис для работы с пользовательскими данными (tgId, tgIdCard, email)
import { apiClient } from './api';
import { 
  UserData, 
  CreateUserDataRequest, 
  UpdateUserDataRequest, 
  UserDataQueryParams
} from '../types/userData';

export class UserDataService {
  private static instance: UserDataService;

  private constructor() {}

  public static getInstance(): UserDataService {
    if (!UserDataService.instance) {
      UserDataService.instance = new UserDataService();
    }
    return UserDataService.instance;
  }

  /**
   * Получить все пользовательские данные
   */
  public async getAllUserData(params?: UserDataQueryParams): Promise<UserData[] | null> {
    try {
      console.log('📋 Получение всех пользовательских данных...');
      const response = await apiClient.getAllUserData(params);
      
      if (response.success && response.data) {
        console.log(`✅ Получено ${response.data.length} записей пользовательских данных`);
        return response.data;
      }
      
      console.log('❌ Ошибка при получении пользовательских данных:', response.error);
      return null;
    } catch (error) {
      console.error('❌ Ошибка при получении пользовательских данных:', error);
      return null;
    }
  }

  /**
   * Создать новые пользовательские данные
   */
  public async createUserData(data: CreateUserDataRequest): Promise<UserData | null> {
    try {
      console.log('📝 Создание новых пользовательских данных...');
      console.log('📋 Данные для создания:', data);
      
      const response = await apiClient.createUserData(data);
      
      if (response.success && response.data) {
        console.log('✅ Пользовательские данные созданы успешно:', {
          id: response.data.id,
          tgId: response.data.tgId,
          tgIdCard: response.data.tgIdCard,
          email: response.data.email
        });
        return response.data;
      }
      
      console.log('❌ Ошибка при создании пользовательских данных:', response.error);
      return null;
    } catch (error) {
      console.error('❌ Ошибка при создании пользовательских данных:', error);
      return null;
    }
  }

  /**
   * Получить пользовательские данные по Telegram ID
   */
  public async getUserDataByTgId(tgId: string): Promise<UserData | null> {
    try {
      console.log(`🔍 Поиск пользовательских данных по Telegram ID: ${tgId}`);
      
      const response = await apiClient.getUserDataByTgId(tgId);
      
      if (response.success && response.data) {
        console.log('✅ Пользовательские данные найдены:', {
          id: response.data.id,
          tgId: response.data.tgId,
          tgIdCard: response.data.tgIdCard,
          email: response.data.email
        });
        return response.data;
      }
      
      console.log('❌ Пользовательские данные не найдены:', response.error);
      return null;
    } catch (error) {
      console.error('❌ Ошибка при поиске пользовательских данных:', error);
      return null;
    }
  }

  /**
   * Обновить пользовательские данные по Telegram ID
   */
  public async updateUserDataByTgId(tgId: string, data: UpdateUserDataRequest): Promise<UserData | null> {
    try {
      console.log(`📝 Обновление пользовательских данных по Telegram ID: ${tgId}`);
      console.log('📋 Данные для обновления:', data);
      
      const response = await apiClient.updateUserDataByTgId(tgId, data);
      
      if (response.success && response.data) {
        console.log('✅ Пользовательские данные обновлены:', {
          id: response.data.id,
          tgId: response.data.tgId,
          tgIdCard: response.data.tgIdCard,
          email: response.data.email
        });
        return response.data;
      }
      
      console.log('❌ Ошибка при обновлении пользовательских данных:', response.error);
      return null;
    } catch (error) {
      console.error('❌ Ошибка при обновлении пользовательских данных:', error);
      return null;
    }
  }

  /**
   * Удалить пользовательские данные по Telegram ID
   */
  public async deleteUserDataByTgId(tgId: string): Promise<UserData | null> {
    try {
      console.log(`🗑️ Удаление пользовательских данных по Telegram ID: ${tgId}`);
      
      const response = await apiClient.deleteUserDataByTgId(tgId);
      
      if (response.success && response.data) {
        console.log('✅ Пользовательские данные удалены:', {
          id: response.data.id,
          tgId: response.data.tgId,
          tgIdCard: response.data.tgIdCard,
          email: response.data.email
        });
        return response.data;
      }
      
      console.log('❌ Ошибка при удалении пользовательских данных:', response.error);
      return null;
    } catch (error) {
      console.error('❌ Ошибка при удалении пользовательских данных:', error);
      return null;
    }
  }

  /**
   * Получить пользовательские данные по ID
   */
  public async getUserDataById(id: number): Promise<UserData | null> {
    try {
      console.log(`🔍 Поиск пользовательских данных по ID: ${id}`);
      
      const response = await apiClient.getUserDataById(id);
      
      if (response.success && response.data) {
        console.log('✅ Пользовательские данные найдены по ID:', {
          id: response.data.id,
          tgId: response.data.tgId,
          tgIdCard: response.data.tgIdCard,
          email: response.data.email
        });
        return response.data;
      }
      
      console.log('❌ Пользовательские данные не найдены по ID:', response.error);
      return null;
    } catch (error) {
      console.error('❌ Ошибка при поиске пользовательских данных по ID:', error);
      return null;
    }
  }

  /**
   * Создать или обновить пользовательские данные
   */
  public async createOrUpdateUserData(tgId: string, data: CreateUserDataRequest): Promise<UserData | null> {
    try {
      console.log(`🔄 Создание или обновление пользовательских данных для Telegram ID: ${tgId}`);
      
      // Сначала пытаемся найти существующие данные
      const existingData = await this.getUserDataByTgId(tgId);
      
      if (existingData) {
        // Если данные существуют, обновляем их
        console.log('📝 Найдены существующие данные, обновляем...');
        return await this.updateUserDataByTgId(tgId, {
          tgIdCard: data.tgIdCard,
          email: data.email
        });
      } else {
        // Если данных нет, создаем новые
        console.log('🆕 Данных не найдено, создаем новые...');
        return await this.createUserData(data);
      }
    } catch (error) {
      console.error('❌ Ошибка при создании/обновлении пользовательских данных:', error);
      return null;
    }
  }

  /**
   * Связать Telegram ID с картой и email
   */
  public async linkTelegramWithCardAndEmail(tgId: string, tgIdCard: string, email: string): Promise<UserData | null> {
    try {
      console.log(`🔗 Связывание Telegram ID ${tgId} с картой ${tgIdCard} и email ${email}`);
      
      const userData = await this.createOrUpdateUserData(tgId, {
        tgId,
        tgIdCard,
        email
      });
      
      if (userData) {
        console.log('✅ Telegram ID успешно связан с картой и email:', {
          tgId: userData.tgId,
          tgIdCard: userData.tgIdCard,
          email: userData.email
        });
      }
      
      return userData;
    } catch (error) {
      console.error('❌ Ошибка при связывании Telegram ID с картой и email:', error);
      return null;
    }
  }
}

// Экспортируем экземпляр сервиса
export const userDataService = UserDataService.getInstance();
