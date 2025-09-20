import { useState, useEffect } from 'react'
import WebApp from '@twa-dev/sdk'
import HomePage from './pages/HomePage'
import HistoryPage from './pages/HistoryPage'
import ProfilePage from './pages/ProfilePage'
import BottomNavigation from './components/BottomNavigation'

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
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      // Инициализация Telegram WebApp
      WebApp.ready()
      WebApp.expand()
      
      // Настройка темы Telegram WebApp
      WebApp.setHeaderColor('#111827')
      WebApp.setBackgroundColor('#111827')

      // Получение данных пользователя из Telegram
      if (WebApp.initDataUnsafe?.user) {
        const tgUser = WebApp.initDataUnsafe.user
        setUser({
          id: tgUser.id,
          first_name: tgUser.first_name || 'Пользователь',
          last_name: tgUser.last_name || '',
          username: tgUser.username || '',
          photo_url: tgUser.photo_url
        })
        console.log('Telegram user data loaded:', tgUser)
      } else {
        console.log('Using mock user data (Telegram WebApp not available)')
      }

      // Настройка кнопки "Назад" для Telegram
      WebApp.BackButton.hide()
      
      setIsLoading(false)
      console.log('Telegram WebApp initialized successfully!')
    } catch (error) {
      console.error('Error initializing Telegram WebApp:', error)
      setIsLoading(false)
    }
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
  }

  // Функция для рендера текущей страницы
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage user={user} />
      case 'history':
        return <HistoryPage user={user} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      case 'profile':
        return <ProfilePage user={user} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      default:
        return <HomePage user={user} />
    }
  }

  // Экран загрузки
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center" style={{ backgroundColor: '#111827' }}>
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white font-medium">Загрузка...</p>
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
