# Cards API - Документация

## Обзор

API для работы с картами позволяет создавать, получать и управлять виртуальными картами через NoName Cards API.

## Основные компоненты

### 1. API Client (`src/services/api.ts`)

#### Интерфейсы

```typescript
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
  email: string | null;
  mobile: string | null;
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
}

export interface CreateCardRequest {
  program_id: string;
  sub_account_id: string;
  card_name: string;
  email?: string; // Опциональное поле
}

export interface UpdateCardRequest {
  name?: string;
  description?: string;
  spending_limits?: {
    daily?: number;
    monthly?: number;
    yearly?: number;
  };
  metadata?: {
    [key: string]: any;
  };
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
```

#### Методы

```typescript
// Получить все карты
async getCards(params?: QueryParams): Promise<ApiResponse<Card[]>>

// Создать новую карту
async createCard(data: CreateCardRequest): Promise<ApiResponse<Card>>

// Получить карту по ID
async getCard(cardId: string): Promise<ApiResponse<Card>>

// Обновить карту
async updateCard(cardId: string, data: UpdateCardRequest): Promise<ApiResponse<Card>>

// Удалить карту
async deleteCard(cardId: string): Promise<ApiResponse<void>>

// Получить чувствительные данные карты
async getCardSensitive(cardId: string): Promise<ApiResponse<CardSensitive>>

// Заморозить карту
async freezeCard(cardId: string): Promise<ApiResponse<Card>>

// Разморозить карту
async unfreezeCard(cardId: string): Promise<ApiResponse<Card>>

// Отменить карту
async cancelCard(cardId: string): Promise<ApiResponse<Card>>

// Получить транзакции карты
async getCardTransactions(cardId: string, params?: QueryParams): Promise<ApiResponse<CardTransaction[]>>
```

### 2. Card Service (`src/services/cardService.ts`)

Сервис для работы с картами предоставляет высокоуровневые методы:

```typescript
// Получить все карты
getAllCards(params?: QueryParams): Promise<Card[] | null>

// Получить карты по program_id
getCardsByProgramId(programId: string, params?: QueryParams): Promise<Card[] | null>

// Создать новую карту
createCard(data: CreateCardRequest): Promise<Card | null>

// Получить карту по ID
getCardById(cardId: string): Promise<Card | null>

// Обновить карту
updateCard(cardId: string, data: UpdateCardRequest): Promise<Card | null>

// Создать карту для пользователя
createCardForUser(
  subAccountId: string, 
  cardName: string, 
  email: string, 
  programId?: string
): Promise<Card | null>

// Получить карты пользователя по sub_account_id
getUserCards(subAccountId: string): Promise<Card[] | null>
```

### 3. React Hooks (`src/hooks/useCards.ts`)

#### useCardManagement

```typescript
const {
  loading,
  error,
  getCards,
  getCardsByProgramId,
  createCard,
  getCardById,
  updateCard,
  getUserCards
} = useCardManagement();
```

#### useCard

```typescript
const {
  card,
  loading,
  error,
  loadCard,
  updateCard
} = useCard(cardId);
```

## Примеры использования

### Создание карты

```typescript
import { cardService } from '../services/cardService';

// Создать карту для пользователя
const card = await cardService.createCardForUser(
  'ee2244b4-257f-4df1-a2e6-ec73ef1f7926', // sub_account_id
  'My Card', // card_name
  'user@example.com', // email (опционально)
  'dbb74408-0318-401c-ac5d-72e522fa8aaa' // program_id (опционально)
);

// Создать карту без email
const cardWithoutEmail = await cardService.createCardForUser(
  'ee2244b4-257f-4df1-a2e6-ec73ef1f7926', // sub_account_id
  'My Card Without Email', // card_name
  // email не указан
  'dbb74408-0318-401c-ac5d-72e522fa8aaa' // program_id (опционально)
);

if (card) {
  console.log('Карта создана:', card.id);
}
```

### Получение карт по program_id

```typescript
import { cardService } from '../services/cardService';

// Получить все карты для определенной программы
const cards = await cardService.getCardsByProgramId(
  'dbb74408-0318-401c-ac5d-72e522fa8aaa'
);

if (cards) {
  console.log(`Найдено ${cards.length} карт`);
}
```

### Использование React хуков

```typescript
import { useCardManagement } from '../hooks/useCards';

function CardsComponent() {
  const { 
    loading, 
    error, 
    getCardsByProgramId, 
    createCard 
  } = useCardManagement();

  const handleGetCards = async () => {
    const cards = await getCardsByProgramId('dbb74408-0318-401c-ac5d-72e522fa8aaa');
    if (cards) {
      console.log('Карты:', cards);
    }
  };

  const handleCreateCard = async () => {
    const card = await createCard({
      program_id: 'dbb74408-0318-401c-ac5d-72e522fa8aaa',
      sub_account_id: 'ee2244b4-257f-4df1-a2e6-ec73ef1f7926',
      card_name: 'New Card',
      email: 'user@example.com'
    });
    
    if (card) {
      console.log('Карта создана:', card.id);
    }
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div>
      <button onClick={handleGetCards}>Получить карты</button>
      <button onClick={handleCreateCard}>Создать карту</button>
    </div>
  );
}
```

## Обязательные параметры

При создании карты требуются следующие параметры:

- `program_id` - ID программы карт
- `sub_account_id` - ID суб-аккаунта
- `card_name` - Название карты

## Опциональные параметры

- `email` - Email пользователя (может быть пустым или не указан)

## Поддерживаемые параметры запроса

При получении карт поддерживаются следующие параметры:

- `limit` - Количество карт на странице (1-100)
- `offset` - Смещение для пагинации
- `status` - Статус карты (ACTIVE, CANCELED, etc.)
- `sub_account_id` - ID суб-аккаунта
- `program_id` - ID программы карт

## Обработка ошибок

Все методы возвращают `null` в случае ошибки и логируют детали в консоль. React хуки предоставляют состояние `error` для отображения ошибок пользователю.

## Логирование

Сервис автоматически логирует все операции с подробной информацией:

- ✅ Успешные операции
- ❌ Ошибки
- 📋 Детали запросов и ответов
- 🔍 Поиск и фильтрация
