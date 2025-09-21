# Настройка API клиента

## Что было создано

1. **`src/services/api.ts`** - Основной API клиент с типами TypeScript
2. **`src/hooks/useApi.ts`** - React хуки для удобного использования API
3. **`src/examples/apiUsage.ts`** - Примеры использования всех методов
4. **`src/components/ApiTestComponent.tsx`** - Тестовый компонент для проверки API
5. **`src/services/README.md`** - Подробная документация

## Как использовать

### 1. Простое использование в компоненте

```typescript
import { apiClient } from '../services/api';

// В любом компоненте или функции
const response = await apiClient.getCards({ limit: 10 });
if (response.success) {
  console.log('Cards:', response.data);
}
```

### 2. Использование с React хуками

```typescript
import { useCards } from '../hooks/useApi';

function MyComponent() {
  const { loading, error, getCards } = useCards();
  
  const handleGetCards = async () => {
    const cards = await getCards({ limit: 5 });
    // cards будет содержать данные или null при ошибке
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

### 3. Тестирование API

Добавьте `ApiTestComponent` в любой из ваших существующих компонентов:

```typescript
import { ApiTestComponent } from '../components/ApiTestComponent';

// В вашем компоненте
<ApiTestComponent />
```

## Запуск

1. Убедитесь, что бэкенд запущен на порту 3001:
   ```bash
   cd ../backendTg
   npm run dev
   ```

2. Запустите фронтенд:
   ```bash
   npm run dev
   ```

3. Откройте браузер и проверьте работу API через тестовый компонент

## Доступные методы

### Основные операции
- `apiClient.checkHealth()` - Проверка здоровья API
- `apiClient.getApiInfo()` - Информация об API
- `apiClient.getIssuingPrograms()` - Программы issuing

### Sub-accounts
- `apiClient.getSubAccounts(params?)` - Получить все sub-accounts
- `apiClient.createSubAccount(data)` - Создать sub-account (program_id опционален, используется заглушка)
- `apiClient.getSubAccount(id)` - Получить sub-account по ID

### Cards
- `apiClient.getCards(params?)` - Получить все карты
- `apiClient.createCard(data)` - Создать карту
- `apiClient.getCard(id)` - Получить карту по ID
- `apiClient.updateCard(id, data)` - Обновить карту
- `apiClient.deleteCard(id)` - Удалить карту
- `apiClient.freezeCard(id)` - Заморозить карту
- `apiClient.unfreezeCard(id)` - Разморозить карту

### Транзакции
- `apiClient.getCardTransactions(id, params?)` - Транзакции карты
- `apiClient.getSubAccountTransactions(id, params?)` - Транзакции sub-account

### Финансовые операции
- `apiClient.depositToCard(id, data)` - Пополнить карту
- `apiClient.withdrawFromCard(id, data)` - Снять с карты
- `apiClient.depositToSubAccount(id, data)` - Пополнить sub-account
- `apiClient.withdrawFromSubAccount(id, data)` - Снять с sub-account

## Параметры запросов

```typescript
interface QueryParams {
  limit?: number;        // Количество записей (1-100)
  offset?: number;       // Смещение для пагинации
  start_date?: string;   // Начальная дата (ISO 8601)
  end_date?: string;     // Конечная дата (ISO 8601)
  type?: string;         // Тип транзакции
  status?: string;       // Статус карты
  sub_account_id?: string; // Фильтр по sub-account
}
```

## Обработка ошибок

Все методы возвращают объект с полем `success`:

```typescript
const response = await apiClient.getCards();

if (response.success) {
  // Успешно
  console.log(response.data);
} else {
  // Ошибка
  console.error(response.error);
  console.error(response.details);
}
```

## Заглушка для program_id

При создании sub-account можно не указывать `program_id` - будет использована заглушка:

```typescript
import { apiClient, DEFAULT_PROGRAM_ID } from '../services/api';

// Создание с заглушкой (program_id = 'bbcaff9a-dfdc-4274-a8e5-b65733b8a4e7')
const response = await apiClient.createSubAccount({
  wallet_id: 'wallet_123'
  // program_id не указан - используется заглушка
});

// Создание с кастомным program_id
const response = await apiClient.createSubAccount({
  wallet_id: 'wallet_123',
  program_id: 'custom-program-id' // Переопределяем заглушку
});
```

## Дополнительная информация

Подробная документация находится в файле `src/services/README.md`
API клиент интегрирован в основное приложение и работает автоматически
