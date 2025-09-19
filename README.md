<<<<<<< HEAD
# telegramMiniApp
=======
# Telegram Mini App

Полнофункциональное Telegram Mini App, созданное с использованием React и Vite.

## 🚀 Возможности

- ✅ Интеграция с Telegram WebApp API
- ✅ Адаптивный дизайн для мобильных устройств
- ✅ Поддержка темной и светлой темы
- ✅ Haptic Feedback (вибрация)
- ✅ Отправка данных в Telegram
- ✅ Работа с пользовательскими данными
- ✅ Главная кнопка (Main Button)
- ✅ Кнопка "Назад" (Back Button)
- ✅ Модальные окна (Alert, Confirm)
- ✅ Открытие внешних ссылок

## 📁 Структура проекта

```
telegram-mini-app/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Шапка с информацией о пользователе
│   │   ├── MainContent.jsx     # Основной контент с функциональностью
│   │   ├── Footer.jsx          # Подвал с дополнительными кнопками
│   │   └── *.css               # Стили для каждого компонента
│   ├── App.jsx                 # Главный компонент приложения
│   ├── main.jsx                # Точка входа React приложения
│   ├── App.css                 # Стили главного компонента
│   └── index.css               # Глобальные стили
├── index.html                  # HTML шаблон
├── package.json                # Зависимости и скрипты
├── vite.config.js              # Конфигурация Vite
├── .eslintrc.cjs               # Настройки ESLint
├── .gitignore                  # Игнорируемые файлы
└── README.md                   # Документация
```

## 🛠 Установка и запуск

### Предварительные требования

- Node.js (версия 16 или выше)
- npm или yarn

### Установка зависимостей

```bash
npm install
```

### Запуск в режиме разработки

```bash
npm run dev
```

Приложение будет доступно по адресу: `http://localhost:3000`

### Сборка для продакшена

```bash
npm run build
```

Собранные файлы будут в папке `dist/`

### Предварительный просмотр сборки

```bash
npm run preview
```

## 🔧 Основные компоненты

### App.jsx
Главный компонент, который:
- Инициализирует Telegram WebApp
- Получает данные пользователя
- Настраивает тему и цвета
- Управляет состоянием приложения

### Header.jsx
Компонент шапки, отображающий:
- Аватар пользователя
- Имя и username
- Кнопку "Назад"

### MainContent.jsx
Основной контент с функциональностью:
- Счетчик с кнопками +/-
- Кнопки для показа Alert и Confirm
- Форма для отправки данных
- Информация о WebApp

### Footer.jsx
Подвал с дополнительными действиями:
- Управление главной кнопкой
- Кнопка закрытия приложения

## 🎨 Стилизация

Приложение использует CSS переменные для поддержки тем Telegram:

```css
:root {
  --tg-theme-bg-color: #ffffff;
  --tg-theme-text-color: #000000;
  --tg-theme-hint-color: #999999;
  --tg-theme-link-color: #2481cc;
  --tg-theme-button-color: #2481cc;
  --tg-theme-button-text-color: #ffffff;
  --tg-theme-secondary-bg-color: #f1f1f1;
}
```

## 📱 Telegram WebApp API

### Основные методы

```javascript
import { WebApp } from '@twa-dev/sdk'

// Инициализация
WebApp.ready()
WebApp.expand()

// Получение данных пользователя
const user = WebApp.initDataUnsafe?.user

// Haptic Feedback
WebApp.HapticFeedback.impactOccurred('medium')
WebApp.HapticFeedback.notificationOccurred('success')

// Модальные окна
WebApp.showAlert('Сообщение')
WebApp.showConfirm('Вопрос?', (confirmed) => {
  // обработка ответа
})

// Отправка данных
WebApp.sendData(JSON.stringify(data))

// Открытие ссылок
WebApp.openLink('https://example.com')

// Главная кнопка
WebApp.MainButton.setText('Готово')
WebApp.MainButton.show()
WebApp.MainButton.onClick(() => {
  // обработка клика
})

// Кнопка "Назад"
WebApp.BackButton.show()
WebApp.BackButton.onClick(() => {
  // обработка клика
})
```

## 🚀 Развертывание

### 1. Сборка приложения

```bash
npm run build
```

### 2. Загрузка на хостинг

Загрузите содержимое папки `dist/` на ваш веб-сервер.

### 3. Настройка в Telegram

1. Создайте бота через [@BotFather](https://t.me/botfather)
2. Используйте команду `/newapp` для создания Mini App
3. Укажите URL вашего приложения
4. Настройте параметры приложения

### 4. Тестирование

- Откройте бота в Telegram
- Нажмите на кнопку Mini App
- Проверьте все функции

## 🔍 Отладка

### В браузере

1. Откройте DevTools (F12)
2. Перейдите в Console
3. Проверьте ошибки и логи

### В Telegram

1. Включите режим разработчика в настройках Telegram
2. Используйте `tgWebAppDebug` для отладки

## 📚 Полезные ссылки

- [Telegram WebApp API](https://core.telegram.org/bots/webapps)
- [@twa-dev/sdk](https://github.com/twa-dev/sdk)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции
3. Внесите изменения
4. Создайте Pull Request

## 📄 Лицензия

MIT License - см. файл LICENSE для подробностей.

## 🆘 Поддержка

Если у вас есть вопросы или проблемы:

1. Проверьте [Issues](https://github.com/your-repo/issues)
2. Создайте новый Issue с описанием проблемы
3. Приложите скриншоты и логи ошибок

---

**Удачной разработки! 🚀**
>>>>>>> c2ffd3d (feat: create first step)
