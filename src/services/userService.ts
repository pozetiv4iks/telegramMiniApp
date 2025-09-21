// Сервис для автоматической работы с пользователями
import { apiClient } from './api';
import { 
  User, 
  TelegramUserData, 
  UserSession 
} from '../types/user';
import { 
  UserData, 
  CreateUserDataRequest 
} from '../types/userData';

export class UserService {
  private static instance: UserService;
  private currentSession: UserSession | null = null;

  private constructor() {}

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  /**
   * Основной метод для входа пользователя
   * Новая логика: Telegram ID → проверка в БД → создание sub-account → добавление в БД
   */
  public async loginUser(
    telegramId: string, 
    telegramData?: TelegramUserData
  ): Promise<UserSession | null> {
    try {
      console.log('🚀 Начинаем новый цикл входа пользователя...');
      console.log('🆔 Telegram ID:', telegramId);

      // Шаг 1: Проверяем, есть ли пользователь в БД по Telegram ID
      console.log('🔍 Шаг 1: Проверяем пользователя в БД по Telegram ID...');
      console.log('📞 Вызываем apiClient.getUserDataByTgId с параметром:', telegramId);
      const existingUserData = await apiClient.getUserDataByTgId(telegramId);
      console.log('📥 Ответ от getUserDataByTgId:', existingUserData);
      
      let userData: UserData | null = null;
      let isNewUser = false;

      if (existingUserData.success && existingUserData.data) {
        // Пользователь найден в БД
        userData = existingUserData.data;
        console.log('✅ Пользователь найден в БД!');
        console.log('👤 Данные пользователя:', {
          id: userData.id,
          tgId: userData.tgId,
          tgIdCard: userData.tgIdCard,
          email: userData.email,
          created_at: userData.created_at
        });
      } else {
        // Пользователь не найден, создаем новый
        console.log('❌ Пользователь не найден в БД, создаем нового...');
        
        // Шаг 2: Создаем sub-account
        console.log('📝 Шаг 2: Создаем sub-account...');
        const subAccount = await this.createSubAccountForUser(telegramId);
        
        if (subAccount) {
          console.log('✅ Sub-account создан:', {
            id: subAccount.id,
            wallet_id: subAccount.wallet_id,
            program_id: subAccount.program_id
          });

          // Шаг 3: Добавляем пользователя в БД
          console.log('📝 Шаг 3: Добавляем пользователя в БД...');
          const newUserData = await this.createUserDataInDB(telegramId, subAccount.id, telegramData);
          
          if (newUserData) {
            userData = newUserData;
            isNewUser = true;
            console.log('🆕 Новый пользователь добавлен в БД!');
            console.log('👤 Данные нового пользователя:', {
              id: userData.id,
              tgId: userData.tgId,
              tgIdCard: userData.tgIdCard,
              email: userData.email,
              created_at: userData.created_at
            });
          }
        }
      }

      if (userData) {
        // Создаем сессию
        const session: UserSession = {
          user: this.convertUserDataToUser(userData, telegramData),
          isNewUser,
          sessionId: `session_${Date.now()}_${userData.id}`,
          loginTime: new Date().toISOString()
        };

        this.currentSession = session;

        console.log('🎉 Пользователь успешно вошел в систему!');
        console.log('📊 Статистика сессии:', {
          sessionId: session.sessionId,
          isNewUser: session.isNewUser,
          loginTime: session.loginTime
        });

        return session;
      }

      return null;
    } catch (error) {
      console.error('❌ Ошибка при входе пользователя:', error);
      return null;
    }
  }


  /**
   * Создание sub-account для пользователя
   */
  private async createSubAccountForUser(telegramId: string): Promise<any> {
    try {
      console.log('💼 Создаем sub-account для пользователя...');
      
      console.log('📞 Вызываем apiClient.createSubAccount с параметрами:', {
        nick_name: telegramId,
        program_id: 'будет взят из заглушки автоматически'
      });
      const response = await apiClient.createSubAccount({
        nick_name: telegramId, // Передаем Telegram ID как nick_name
        // program_id будет взят из заглушки автоматически
      });
      console.log('📥 Ответ от createSubAccount:', response);
      
      if (response.success && response.data) {
        console.log('✅ Sub-account создан успешно:', {
          id: response.data.id,
          wallet_id: response.data.wallet_id,
          program_id: response.data.program_id,
          nick_name: response.data.nick_name
        });
        return response.data;
      }
      
      console.error('❌ Ошибка при создании sub-account:', response.error);
      return null;
    } catch (error) {
      console.error('❌ Ошибка при создании sub-account:', error);
      return null;
    }
  }

  /**
   * Создание пользователя в БД
   */
  private async createUserDataInDB(
    telegramId: string, 
    subAccountId: string, 
    telegramData?: TelegramUserData
  ): Promise<UserData | null> {
    try {
      console.log('💾 Создаем пользователя в БД...');
      
      // Email не генерируем автоматически - пользователь должен подтвердить его через код
      const email = '';
      
      const userDataRequest: CreateUserDataRequest = {
        tgId: telegramId,
        tgIdCard: subAccountId, // Используем ID sub-account как tgIdCard
        email: email
      };
      
      console.log('📞 Вызываем apiClient.createUserData с параметрами:', userDataRequest);
      const response = await apiClient.createUserData(userDataRequest);
      console.log('📥 Ответ от createUserData:', response);
      
      if (response.success && response.data) {
        console.log('✅ Пользователь создан в БД:', {
          id: response.data.id,
          tgId: response.data.tgId,
          tgIdCard: response.data.tgIdCard,
          email: response.data.email
        });
        return response.data;
      }
      
      console.error('❌ Ошибка при создании пользователя в БД:', response.error);
      return null;
    } catch (error) {
      console.error('❌ Ошибка при создании пользователя в БД:', error);
      return null;
    }
  }

  /**
   * Конвертация UserData в User для совместимости
   */
  private convertUserDataToUser(userData: UserData, telegramData?: TelegramUserData): User {
    return {
      id: userData.id.toString(),
      nick_name: userData.tgId, // Используем Telegram ID как nick_name
      telegram_id: userData.tgId,
      first_name: telegramData?.first_name || userData.tgId,
      last_name: telegramData?.last_name || '',
      username: telegramData?.username || '',
      language_code: telegramData?.language_code || 'en',
      is_bot: telegramData?.is_bot || false,
      status: 'active',
      created_at: userData.created_at,
      updated_at: userData.updated_at,
      metadata: {
        tgIdCard: userData.tgIdCard,
        email: userData.email,
        last_activity: new Date().toISOString()
      }
    };
  }


  /**
   * Получение текущей сессии
   */
  public getCurrentSession(): UserSession | null {
    return this.currentSession;
  }

  /**
   * Получение текущего пользователя
   */
  public getCurrentUser(): User | null {
    return this.currentSession?.user || null;
  }

  /**
   * Проверка, является ли текущий пользователь новым
   */
  public isCurrentUserNew(): boolean {
    return this.currentSession?.isNewUser || false;
  }

  /**
   * Выход пользователя
   */
  public logout(): void {
    console.log('👋 Пользователь вышел из системы');
    this.currentSession = null;
  }

  /**
   * Получение всех пользователей (для администрирования)
   */
  public async getAllUsers(): Promise<User[] | null> {
    try {
      const response = await apiClient.getUsers({ limit: 100 });
      
      if (response.success && response.data) {
        console.log(`📋 Получено ${response.data.length} пользователей`);
        return response.data;
      }
      
      return null;
    } catch (error) {
      console.error('Ошибка при получении списка пользователей:', error);
      return null;
    }
  }

  /**
   * Поиск пользователя по nick_name
   */
  public async searchUserByNickName(nickName: string): Promise<User[] | null> {
    try {
      const response = await apiClient.searchUserByNickName(nickName);
      
      if (response.success && response.data) {
        console.log(`🔍 Найдено ${response.data.length} пользователей с nick_name: ${nickName}`);
        return response.data;
      }
      
      return null;
    } catch (error) {
      console.error('Ошибка при поиске пользователя по nick_name:', error);
      return null;
    }
  }

  /**
   * Поиск пользователя по telegram_id
   */
  public async searchUserByTelegramId(telegramId: string): Promise<User[] | null> {
    try {
      const response = await apiClient.searchUserByTelegramId(telegramId);
      
      if (response.success && response.data) {
        console.log(`🔍 Найдено ${response.data.length} пользователей с telegram_id: ${telegramId}`);
        return response.data;
      }
      
      return null;
    } catch (error) {
      console.error('Ошибка при поиске пользователя по telegram_id:', error);
      return null;
    }
  }
}

// Экспортируем экземпляр сервиса
export const userService = UserService.getInstance();
