# API Client Documentation

Этот API клиент предоставляет удобный интерфейс для работы с бэкендом NoName Cards API.

## Установка и настройка

API клиент уже настроен и готов к использованию. Базовый URL: `http://localhost:3001/api`

## Основные компоненты

### 1. ApiClient класс (`api.ts`)

Основной класс для выполнения HTTP запросов к API.

```typescript
import { apiClient } from '../services/api';

// Проверка здоровья API
const health = await apiClient.checkHealth();

// Получение всех карт
const cards = await apiClient.getCards({ limit: 10 });
```

### 2. React хуки (`useApi.ts`)

Специализированные хуки для использования в React компонентах.

```typescript
import { useCards, useSubAccounts } from '../hooks/useApi';

function MyComponent() {
  const { loading, error, getCards, createCard } = useCards();
  
  const handleGetCards = async () => {
    const cards = await getCards({ limit: 5 });
    console.log(cards);
  };
  
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <button onClick={handleGetCards}>Get Cards</button>
    </div>
  );
}
```

## Доступные методы

### Health & Info
- `checkHealth()` - Проверка здоровья API
- `getApiInfo()` - Получение информации об API
- `getIssuingPrograms()` - Получение доступных программ issuing

### Sub-accounts
- `getSubAccounts(params?)` - Получение всех sub-accounts
- `createSubAccount(data)` - Создание нового sub-account (program_id опционален, используется заглушка)
- `getSubAccount(id)` - Получение sub-account по ID
- `getSubAccountTransactions(id, params?)` - Получение транзакций sub-account
- `withdrawFromSubAccount(id, data)` - Снятие средств с sub-account
- `depositToSubAccount(id, data)` - Пополнение sub-account

### Cards
- `getCards(params?)` - Получение всех карт
- `createCard(data)` - Создание новой карты
- `getCard(id)` - Получение карты по ID
- `updateCard(id, data)` - Обновление данных карты
- `deleteCard(id)` - Удаление карты
- `getCardSensitiveData(id)` - Получение чувствительных данных карты
- `freezeCard(id)` - Заморозка карты
- `unfreezeCard(id)` - Разморозка карты
- `getCardTransactions(id, params?)` - Получение транзакций карты
- `updateCardLimits(id, data)` - Обновление лимитов карты
- `depositToCard(id, data)` - Пополнение карты
- `withdrawFromCard(id, data)` - Снятие средств с карты
- `createBalanceCard(data)` - Создание balance карты
- `createPrepaidCard(data)` - Создание prepaid карты

## Типы данных

### Основные типы
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  details?: string[];
}

interface SubAccount {
  id: string;
  wallet_id: string;
  program_id: string;
  balance: number;
  currency: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface Card {
  id: string;
  sub_account_id: string;
  name: string;
  description: string;
  status: string;
  type: string;
  balance: number;
  currency: string;
  limits: {
    daily: number;
    monthly: number;
    yearly: number;
  };
  created_at: string;
  updated_at: string;
}

interface Transaction {
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
```

## Параметры запросов

### QueryParams
```typescript
interface QueryParams {
  limit?: number;        // Количество записей (1-100, по умолчанию 10)
  offset?: number;       // Смещение для пагинации (по умолчанию 0)
  start_date?: string;   // Начальная дата (ISO 8601 формат)
  end_date?: string;     // Конечная дата (ISO 8601 формат)
  type?: string;         // Тип транзакции
  status?: string;       // Статус карты
  sub_account_id?: string; // Фильтр по sub-account
}
```

## Примеры использования

### 1. Простой запрос
```typescript
import { apiClient } from '../services/api';

async function getCards() {
  try {
    const response = await apiClient.getCards({ limit: 5 });
    if (response.success) {
      console.log('Cards:', response.data);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### 2. Создание sub-account с заглушкой program_id
```typescript
import { apiClient, DEFAULT_PROGRAM_ID } from '../services/api';

async function createSubAccount() {
  try {
    // Создание с заглушкой program_id (автоматически используется DEFAULT_PROGRAM_ID)
    const response = await apiClient.createSubAccount({
      wallet_id: 'wallet_123'
      // program_id не указан - будет использована заглушка
    });
    
    if (response.success) {
      console.log('Sub-account created:', response.data);
      console.log('Used program_id:', response.data.program_id); // bbcaff9a-dfdc-4274-a8e5-b65733b8a4e7
    }
  } catch (error) {
    console.error('Failed to create sub-account:', error);
  }
}

// Или с кастомным program_id
async function createSubAccountWithCustomProgram() {
  try {
    const response = await apiClient.createSubAccount({
      wallet_id: 'wallet_123',
      program_id: 'custom-program-id' // Переопределяем заглушку
    });
    
    if (response.success) {
      console.log('Sub-account created with custom program:', response.data);
    }
  } catch (error) {
    console.error('Failed to create sub-account:', error);
  }
}
```

### 3. Создание карты
```typescript
async function createNewCard() {
  try {
    const response = await apiClient.createCard({
      sub_account_id: 'ee2244b4-257f-4df1-a2e6-ec73ef1f7926'
    });
    
    if (response.success) {
      console.log('Card created:', response.data);
    }
  } catch (error) {
    console.error('Failed to create card:', error);
  }
}
```

### 4. Использование в React компоненте
```typescript
import React, { useEffect, useState } from 'react';
import { useCards } from '../hooks/useApi';

function CardsList() {
  const { loading, error, getCards } = useCards();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    const data = await getCards({ limit: 10 });
    if (data) {
      setCards(data);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {cards.map(card => (
        <div key={card.id}>
          <h3>{card.name}</h3>
          <p>Balance: {card.balance} {card.currency}</p>
        </div>
      ))}
    </div>
  );
}
```

### 5. Работа с транзакциями
```typescript
async function getCardTransactions(cardId: string) {
  try {
    const response = await apiClient.getCardTransactions(cardId, {
      limit: 20,
      start_date: '2024-01-01T00:00:00Z',
      end_date: '2024-12-31T23:59:59Z'
    });
    
    if (response.success) {
      console.log('Transactions:', response.data);
    }
  } catch (error) {
    console.error('Failed to get transactions:', error);
  }
}
```

## Обработка ошибок

Все методы API клиента возвращают объект `ApiResponse<T>` с полем `success`. При ошибках:

```typescript
const response = await apiClient.getCards();

if (!response.success) {
  console.error('API Error:', response.error);
  console.error('Details:', response.details);
}
```

## Аутентификация

API клиент автоматически добавляет необходимые заголовки:
- `Content-Type: application/json`
- `x-api-key: nnc_0YGtwEeh2oHoLja07rRHNt3NqvmW6jgfg-MliHXY1Q4`

## Заглушка для program_id

API клиент включает заглушку для `program_id` при создании sub-accounts:

```typescript
// Константа заглушки
const DEFAULT_PROGRAM_ID = 'bbcaff9a-dfdc-4274-a8e5-b65733b8a4e7';

// Использование заглушки (program_id не указывается)
const response = await apiClient.createSubAccount({
  wallet_id: 'wallet_123'
  // program_id автоматически будет установлен в DEFAULT_PROGRAM_ID
});

// Переопределение заглушки
const response = await apiClient.createSubAccount({
  wallet_id: 'wallet_123',
  program_id: 'custom-program-id' // Переопределяем заглушку
});
```

## Использование в приложении

API клиент интегрирован в основное приложение и автоматически работает при входе пользователей. Все методы доступны через импорт:

```typescript
import { apiClient } from '../services/api';
```
