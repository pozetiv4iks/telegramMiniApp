# 🔄 Обновление program_id

## Изменение

Заглушка для `program_id` обновлена на новое значение:

**Старое значение:** `4a244a17-0ade-4f67-94c3-0ac8e25088ae`
**Новое значение:** `bbcaff9a-dfdc-4274-a8e5-b65733b8a4e7`

## Обновленные файлы

### Frontend:
- ✅ `src/services/api.ts` - константа DEFAULT_PROGRAM_ID
- ✅ `src/services/README.md` - документация
- ✅ `API_SETUP.md` - инструкции

### Backend:
- ✅ `API_ENDPOINTS.md` - примеры curl запросов

## Как это работает

Теперь при создании sub-account, если `program_id` не указан, автоматически используется:

```typescript
const DEFAULT_PROGRAM_ID = 'bbcaff9a-dfdc-4274-a8e5-b65733b8a4e7';
```

### Пример использования:

```typescript
// Создание sub-account с автоматическим program_id
const response = await apiClient.createSubAccount({
  wallet_id: 'wallet_123'
  // program_id автоматически будет 'bbcaff9a-dfdc-4274-a8e5-b65733b8a4e7'
});
```

### Переопределение:

```typescript
// Создание sub-account с кастомным program_id
const response = await apiClient.createSubAccount({
  wallet_id: 'wallet_123',
  program_id: 'custom-program-id' // Переопределяет заглушку
});
```

## Готово! ✅

Новое значение `bbcaff9a-dfdc-4274-a8e5-b65733b8a4e7` теперь используется везде, где передается `program_id` в POST запросах.
