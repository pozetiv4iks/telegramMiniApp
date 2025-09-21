# Система управления пользователями

## Обзор

Система автоматически обрабатывает пользователей при входе в приложение:
1. **Поиск пользователя** по `nick_name` и `telegram_id`
2. **Если найден** - получает данные и выводит в консоль
3. **Если не найден** - создает нового пользователя

## Структура файлов

```
src/
├── types/user.ts              # Типы для пользователей
├── services/
│   ├── api.ts                 # API методы для пользователей
│   └── userService.ts         # Основной сервис управления пользователями
└── hooks/
    └── useUser.ts             # React хуки для пользователей
```

## Основные компоненты

### 1. UserService (userService.ts)

Главный сервис для работы с пользователями:

```typescript
import { userService } from '../services/userService';

// Автоматический вход пользователя
const session = await userService.loginUser('nick_name', 'telegram_id', telegramData);

// Получение текущего пользователя
const currentUser = userService.getCurrentUser();

// Получение всех пользователей
const allUsers = await userService.getAllUsers();
```

### 2. React хуки (useUser.ts)

```typescript
import { useCurrentUser, useUserManagement } from '../hooks/useUser';

function MyComponent() {
  const { currentUser, isNewUser, loginUser, logoutUser } = useCurrentUser();
  
  const handleLogin = async () => {
    const session = await loginUser('nick_name', 'telegram_id', telegramData);
    // session содержит данные пользователя и информацию о том, новый ли он
  };
}
```

### 3. API методы (api.ts)

```typescript
import { apiClient } from '../services/api';

// Поиск пользователя
const users = await apiClient.findUserByNickNameAndTelegramId('nick', '123456');

// Создание пользователя
const newUser = await apiClient.createUser({
  nick_name: 'nick',
  telegram_id: '123456',
  first_name: 'Имя'
});
```

## Автоматический цикл входа

### При загрузке приложения:

```typescript
// 1. Получаем данные пользователя (из Telegram или формы)
const nickName = 'user_nick';
const telegramId = '123456789';
const telegramData = {
  id: 123456789,
  first_name: 'Иван',
  last_name: 'Петров',
  username: 'ivan_petrov',
  language_code: 'ru',
  is_bot: false
};

// 2. Выполняем автоматический вход
const session = await userService.loginUser(nickName, telegramId, telegramData);

if (session) {
  if (session.isNewUser) {
    console.log('🆕 Создан новый пользователь:', session.user);
  } else {
    console.log('✅ Найден существующий пользователь:', session.user);
  }
}
```

## Типы данных

### User
```typescript
interface User {
  id: string;
  nick_name: string;
  telegram_id: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_bot?: boolean;
  created_at: string;
  updated_at: string;
  status: 'active' | 'inactive' | 'banned';
  metadata?: {
    wallet_id?: string;
    sub_account_id?: string;
    last_activity?: string;
  };
}
```

### UserSession
```typescript
interface UserSession {
  user: User;
  isNewUser: boolean;
  sessionId: string;
  loginTime: string;
}
```

## API эндпоинты

### Пользователи
- `GET /users` - Получить всех пользователей
- `POST /users` - Создать пользователя
- `GET /users/{id}` - Получить пользователя по ID
- `PATCH /users/{id}` - Обновить пользователя
- `DELETE /users/{id}` - Удалить пользователя
- `GET /users/search?nick_name={name}` - Поиск по nick_name
- `GET /users/search?telegram_id={id}` - Поиск по telegram_id
- `GET /users/search?nick_name={name}&telegram_id={id}` - Поиск по обоим параметрам

## Примеры использования

### 1. Простой вход
```typescript
import { userService } from '../services/userService';

const session = await userService.loginUser('my_nick', '123456789');
console.log('Пользователь:', session?.user);
console.log('Новый?', session?.isNewUser);
```

### 2. Вход с данными Telegram
```typescript
const telegramData = {
  id: 123456789,
  first_name: 'Иван',
  last_name: 'Петров',
  username: 'ivan_petrov',
  language_code: 'ru',
  is_bot: false
};

const session = await userService.loginUser('ivan_petrov', '123456789', telegramData);
```

### 3. Использование в React компоненте
```typescript
import React, { useEffect } from 'react';
import { useCurrentUser } from '../hooks/useUser';

function App() {
  const { currentUser, isNewUser, loginUser } = useCurrentUser();

  useEffect(() => {
    // Автоматический вход при загрузке
    const handleAutoLogin = async () => {
      const session = await loginUser('user_nick', '123456789');
      if (session) {
        console.log('Пользователь вошел:', session.user);
      }
    };

    handleAutoLogin();
  }, [loginUser]);

  return (
    <div>
      {currentUser ? (
        <div>
          <h1>Добро пожаловать, {currentUser.first_name}!</h1>
          {isNewUser && <p>Добро пожаловать в наше приложение!</p>}
        </div>
      ) : (
        <div>Загрузка...</div>
      )}
    </div>
  );
}
```

### 4. Поиск пользователей
```typescript
// Поиск по nick_name
const users = await userService.searchUserByNickName('ivan_petrov');

// Поиск по telegram_id
const users = await userService.searchUserByTelegramId('123456789');

// Получение всех пользователей
const allUsers = await userService.getAllUsers();
```

## Логирование

Система автоматически логирует все операции в консоль:

```
🔍 Начинаем поиск пользователя...
📝 Nick name: ivan_petrov
🆔 Telegram ID: 123456789
✅ Пользователь найден!
👤 Данные пользователя: { id: "...", nick_name: "...", ... }
🎉 Пользователь успешно вошел в систему!
📊 Статистика сессии: { sessionId: "...", isNewUser: false, ... }
```

## Интеграция в приложение

### 1. Добавьте компонент в App.tsx:
```typescript
import { UserLoginComponent } from './components/UserLoginComponent';

function App() {
  return (
    <div>
      <UserLoginComponent />
      {/* Ваши другие компоненты */}
    </div>
  );
}
```

### 2. Или используйте сервис напрямую:
```typescript
import { userService } from './services/userService';

// В любом месте приложения
const session = await userService.loginUser(nickName, telegramId, telegramData);
```

## Тестирование

1. Запустите приложение: `npm run dev`
2. При загрузке автоматически выполнится вход пользователя
3. Проверьте консоль браузера для просмотра логов
4. Система автоматически работает с реальными данными Telegram

## Дополнительные возможности

- Автоматическое обновление времени последней активности
- Создание wallet_id для каждого пользователя
- Поддержка метаданных пользователя
- Сессионное управление
- Поиск и фильтрация пользователей
