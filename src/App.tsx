import { useState, useEffect } from 'react'
import WebApp from '@twa-dev/sdk'
import HomePage from './pages/HomePage'
import HistoryPage from './pages/HistoryPage'
import ProfilePage from './pages/ProfilePage'
import BottomNavigation from './components/BottomNavigation'
import { userService } from './services/userService'
import { TelegramUserData, User } from './types/user'

// Моковые данные пользователя для демонстрации (когда Telegram WebApp недоступен)
const mockUser = {
  id: 123456789,
  first_name: 'Иван',
  last_name: 'Петров',
  username: 'ivan_petrov',
  photo_url: undefined as string | undefined
}

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [user, setUser] = useState(mockUser)
  const [appUser, setAppUser] = useState<User | null>(null) // Пользователь из нашей системы
  const [isNewUser, setIsNewUser] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [closeModalsRef, setCloseModalsRef] = useState<(() => void) | null>(null)

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Инициализация Telegram WebApp
        WebApp.ready()
        WebApp.expand()
        
        // Настройка темы Telegram WebApp
        WebApp.setHeaderColor('#111827')
        WebApp.setBackgroundColor('#111827')

        let tgUserData = null;
        let telegramId = '';

        // Получение данных пользователя из Telegram
        if (WebApp.initDataUnsafe?.user) {
          const tgUser = WebApp.initDataUnsafe.user
          tgUserData = {
            id: tgUser.id,
            first_name: tgUser.first_name || 'Пользователь',
            last_name: tgUser.last_name || '',
            username: tgUser.username || '',
            photo_url: tgUser.photo_url
          }
          
          setUser(tgUserData)
          telegramId = tgUser.id.toString()
          
          console.log('Telegram user data loaded:', tgUser)
        } else {
          console.log('Using mock user data (Telegram WebApp not available)')
          tgUserData = mockUser
          telegramId = mockUser.id.toString()
        }

        // === НОВЫЙ АВТОМАТИЧЕСКИЙ ЦИКЛ ПОЛЬЗОВАТЕЛЯ ===
        console.log('🚀 Начинаем новый автоматический цикл пользователя...')
        
        if (telegramId) {
          // Подготавливаем данные для Telegram
          const telegramData: TelegramUserData = {
            id: parseInt(telegramId),
            first_name: tgUserData.first_name,
            last_name: tgUserData.last_name || '',
            username: tgUserData.username || '',
            language_code: 'ru',
            is_bot: false
          }

          // Выполняем автоматический вход в нашу систему (только с Telegram ID)
          console.log('📞 Вызываем userService.loginUser с параметрами:', {
            telegramId,
            telegramData
          });
          const session = await userService.loginUser(telegramId, telegramData);
          console.log('📥 Ответ от userService.loginUser:', session);
          
          if (session) {
            setAppUser(session.user)
            setIsNewUser(session.isNewUser)
            
            if (session.isNewUser) {
              console.log('🆕 Новый пользователь создан в системе!')
              // Можно показать приветственное сообщение для новых пользователей
            } else {
              console.log('✅ Существующий пользователь найден в системе!')
            }
          } else {
            console.error('❌ Ошибка при входе в систему пользователей')
          }
        }

        // Настройка кнопки "Назад" для Telegram
        WebApp.BackButton.hide()
        
        setIsLoading(false)
        console.log('🎉 Telegram WebApp и пользовательская система инициализированы!')
      } catch (error) {
        console.error('Error initializing app:', error)
        setIsLoading(false)
      }
    }

    initializeApp()
  }, [])

  console.log('App component rendered!', { currentPage, user, isLoading })

  // Элементы навигации
  const navigationItems = [
    { id: 'home', label: 'Главная', icon: 'pi pi-home', path: '/', active: currentPage === 'home' },
    { id: 'history', label: 'История', icon: 'pi pi-history', path: '/history', active: currentPage === 'history' },
    { id: 'profile', label: 'Профиль', icon: 'pi pi-user', path: '/profile', active: currentPage === 'profile' }
  ]

  const handleNavigationClick = (item: any) => {
    setCurrentPage(item.id)
    // Закрываем все модалки при переходе на главную
    if (item.id === 'home' && closeModalsRef) {
      closeModalsRef()
    }
  }

  // Функция для рендера текущей страницы
  const renderCurrentPage = () => {

    switch (currentPage) {
      case 'home':
        return <HomePage user={user} appUser={appUser} isNewUser={isNewUser} onCloseModals={setCloseModalsRef} />
      case 'history':
        return <HistoryPage user={user} appUser={appUser} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      case 'profile':
        return <ProfilePage user={user} appUser={appUser} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      default:
        return <HomePage user={user} appUser={appUser} isNewUser={isNewUser} onCloseModals={setCloseModalsRef} />
    }
  }

  // Экран загрузки
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center" style={{ backgroundColor: '#111827' }}>
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white font-medium">Загрузка...</p>
          <p className="text-gray-400 text-sm mt-2">Инициализация пользователя...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen w-full" style={{ backgroundColor: '#111827' }}>
      {renderCurrentPage()}
      <BottomNavigation
        items={navigationItems}
        onItemClick={handleNavigationClick}
      />
    </div>
  )
}

export default App
