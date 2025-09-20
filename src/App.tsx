import { useEffect, useState } from 'react'
import WebApp from '@twa-dev/sdk'
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
    <div className="app">
      <div className="container">
        <h1>Telegram Mini App</h1>
        {user && (
          <div className="user-info">
            <h2>Добро пожаловать, {user.first_name}!</h2>
            <p>ID: {user.id}</p>
            {user.username && <p>Username: @{user.username}</p>}
          </div>
        )}
        <div className="content">
          <p>Ваше Telegram Mini App готово к работе!</p>
        </div>
      </div>
    </div>
  )
}

export default App
