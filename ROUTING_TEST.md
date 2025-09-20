# Тест роутинга

## Как проверить, работает ли роутинг:

### 1. Откройте приложение
- Перейдите на http://localhost:3000
- Откройте консоль браузера (F12)

### 2. Проверьте консоль
Должны появиться сообщения:
```
AppRouter rendered with user: {id: 123456789, first_name: "Иван", ...}
BottomNavigation - current path: /dashboard
Dashboard rendered with user: {id: 123456789, first_name: "Иван", ...}
```

### 3. Тестируйте навигацию
- Нажмите на кнопки в нижнем меню
- В консоли должны появиться сообщения:
```
Navigating to: /transactions
BottomNavigation - current path: /transactions
Checking if /dashboard is active: false
Checking if /transactions is active: true
```

### 4. Проверьте URL
URL должен меняться на:
- http://localhost:3000/#/dashboard
- http://localhost:3000/#/transactions
- http://localhost:3000/#/transfer
- http://localhost:3000/#/profile

### 5. Тестовая страница
Перейдите на http://localhost:3000/#/test для тестирования роутинга

## Возможные проблемы:

### Проблема 1: Роутинг не работает
**Решение:** Убедитесь, что используется HashRouter вместо BrowserRouter

### Проблема 2: Компоненты не рендерятся
**Решение:** Проверьте импорты в AppRouter.jsx

### Проблема 3: Навигация не работает
**Решение:** Проверьте, что BottomNavigation использует useNavigate

## Ожидаемое поведение:
✅ Приложение загружается на /dashboard
✅ Нижнее меню показывает активную страницу
✅ Клик по меню меняет страницу
✅ URL обновляется
✅ Контент страницы меняется
✅ В консоли появляются логи навигации
