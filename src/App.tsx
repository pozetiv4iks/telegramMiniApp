import { useEffect, useState } from 'react'
import WebApp from '@twa-dev/sdk'
import { NavigationProvider, useNavigation } from './contexts/NavigationContext'
import HomePage from './pages/HomePage'
import HistoryPage from './pages/HistoryPage'
import ProfilePage from './pages/ProfilePage'
import Toast from './components/Toast'
import 'primereact/resources/themes/lara-light-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import './App.css'

interface User {
  id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
}

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Инициализация Telegram WebApp
    try {
      WebApp.ready()
      WebApp.expand()
      
      // Получаем данные пользователя
      if (WebApp.initDataUnsafe?.user) {
        setUser(WebApp.initDataUnsafe.user)
      } else {
        setUser({
          id: 123456789,
          first_name: 'Иван',
          last_name: 'Петров',
          username: 'ivan_petrov',
          photo_url: 'https://via.placeholder.com/150'
        })
      }
      
      // Настройка темы
      WebApp.setHeaderColor('#ffffff')
      WebApp.setBackgroundColor('#ffffff')
    } catch (error) {
      console.log('Telegram WebApp not available, using mock data')
      // Для тестирования создаем мокового пользователя
      setUser({
        id: 123456789,
        first_name: 'Иван',
        last_name: 'Петров',
        username: 'ivan_petrov',
        photo_url: 'https://via.placeholder.com/150'
      })
    }
    
    // Устанавливаем isReady в true с небольшой задержкой
    setTimeout(() => {
      setIsReady(true)
    }, 100)
    
    return () => {
      try {
        WebApp.close()
      } catch (error) {
        console.log('WebApp.close() not available')
      }
    }
  }, [])

  if (!isReady) {
    return (
      <div className="app">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Загрузка...</p>
        </div>
      </div>
    )
  }

  return (
    <NavigationProvider>
      <div className="app">
        <AppContent user={user} />
        <Toast />
      </div>
    </NavigationProvider>
  )
}

function AppContent({ user }: { user: User | null }) {
  const { currentPage } = useNavigation()

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage user={user} />
      case 'history':
        return <HistoryPage user={user} />
      case 'profile':
        return <ProfilePage user={user} />
      default:
        return <HomePage user={user} />
    }
  }

  return renderCurrentPage()
}

export default App
