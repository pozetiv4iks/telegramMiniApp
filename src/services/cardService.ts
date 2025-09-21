// Сервис для работы с картами
import { apiClient } from './api';
import { 
  Card, 
  CreateCardRequest, 
  UpdateCardRequest,
  QueryParams
} from './api';

export class CardService {
  private static instance: CardService;

  private constructor() {}

  public static getInstance(): CardService {
    if (!CardService.instance) {
      CardService.instance = new CardService();
    }
    return CardService.instance;
  }

  /**
   * Получить все карты
   */
  public async getAllCards(params?: QueryParams): Promise<Card[] | null> {
    try {
      console.log('📋 Получение всех карт...');
      const response = await apiClient.getCards(params);
      
      if (response.success && response.data) {
        console.log(`✅ Получено ${response.data.length} карт`);
        return response.data;
      }
      
      console.log('❌ Ошибка при получении карт:', response.error);
      return null;
    } catch (error) {
      console.error('❌ Ошибка при получении карт:', error);
      return null;
    }
  }

  /**
   * Получить карты по program_id
   */
  public async getCardsByProgramId(programId: string, params?: QueryParams): Promise<Card[] | null> {
    try {
      console.log(`📋 Получение карт по program_id: ${programId}`);
      
      const queryParams = {
        ...params,
        program_id: programId
      };
      
      const response = await apiClient.getCards(queryParams);
      
      if (response.success && response.data) {
        console.log(`✅ Получено ${response.data.length} карт для program_id: ${programId}`);
        return response.data;
      }
      
      console.log('❌ Ошибка при получении карт по program_id:', response.error);
      return null;
    } catch (error) {
      console.error('❌ Ошибка при получении карт по program_id:', error);
      return null;
    }
  }

  /**
   * Создать новую карту
   */
  public async createCard(data: CreateCardRequest): Promise<Card | null> {
    try {
      console.log('📝 Создание новой карты...');
      console.log('📋 Данные для создания:', data);
      
      const response = await apiClient.createCard(data);
      
      if (response.success && response.data) {
        console.log('✅ Карта создана успешно:', {
          id: response.data.id,
          title: response.data.title,
          sub_account_id: response.data.sub_account_id,
          status: response.data.status,
          currency: response.data.currency
        });
        return response.data;
      }
      
      console.log('❌ Ошибка при создании карты:', response.error);
      return null;
    } catch (error) {
      console.error('❌ Ошибка при создании карты:', error);
      return null;
    }
  }

  /**
   * Получить карту по ID
   */
  public async getCardById(cardId: string): Promise<Card | null> {
    try {
      console.log(`🔍 Поиск карты по ID: ${cardId}`);
      
      const response = await apiClient.getCard(cardId);
      
      if (response.success && response.data) {
        console.log('✅ Карта найдена:', {
          id: response.data.id,
          title: response.data.title,
          sub_account_id: response.data.sub_account_id,
          status: response.data.status
        });
        return response.data;
      }
      
      console.log('❌ Карта не найдена:', response.error);
      return null;
    } catch (error) {
      console.error('❌ Ошибка при поиске карты:', error);
      return null;
    }
  }

  /**
   * Обновить карту
   */
  public async updateCard(cardId: string, data: UpdateCardRequest): Promise<Card | null> {
    try {
      console.log(`📝 Обновление карты: ${cardId}`);
      console.log('📋 Данные для обновления:', data);
      
      const response = await apiClient.updateCard(cardId, data);
      
      if (response.success && response.data) {
        console.log('✅ Карта обновлена:', {
          id: response.data.id,
          title: response.data.title,
          status: response.data.status
        });
        return response.data;
      }
      
      console.log('❌ Ошибка при обновлении карты:', response.error);
      return null;
    } catch (error) {
      console.error('❌ Ошибка при обновлении карты:', error);
      return null;
    }
  }

  /**
   * Создать карту для пользователя
   */
  public async createCardForUser(
    subAccountId: string, 
    cardName: string, 
    email?: string, 
    programId?: string
  ): Promise<Card | null> {
    try {
      console.log(`💳 Создание карты для пользователя...`);
      console.log(`📋 Sub Account ID: ${subAccountId}`);
      console.log(`📋 Card Name: ${cardName}`);
      console.log(`📋 Email: ${email || 'не указан'}`);
      
      const cardData: CreateCardRequest = {
        program_id: programId || 'dbb74408-0318-401c-ac5d-72e522fa8aaa', // Рабочий program_id
        sub_account_id: subAccountId,
        card_name: cardName,
        ...(email && { email }) // Добавляем email только если он указан
      };
      
      const card = await this.createCard(cardData);
      
      if (card) {
        console.log('✅ Карта создана для пользователя:', {
          card_id: card.id,
          card_title: card.title,
          sub_account_id: card.sub_account_id,
          status: card.status
        });
      }
      
      return card;
    } catch (error) {
      console.error('❌ Ошибка при создании карты для пользователя:', error);
      return null;
    }
  }

  /**
   * Получить карты пользователя по sub_account_id
   */
  public async getUserCards(subAccountId: string): Promise<Card[] | null> {
    try {
      console.log(`📋 Получение карт пользователя по sub_account_id: ${subAccountId}`);
      
      const response = await apiClient.getCards({ sub_account_id: subAccountId });
      
      if (response.success && response.data) {
        console.log(`✅ Получено ${response.data.length} карт для пользователя`);
        return response.data;
      }
      
      console.log('❌ Ошибка при получении карт пользователя:', response.error);
      return null;
    } catch (error) {
      console.error('❌ Ошибка при получении карт пользователя:', error);
      return null;
    }
  }
}

// Экспортируем экземпляр сервиса
export const cardService = CardService.getInstance();
