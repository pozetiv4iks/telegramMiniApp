import { useEffect, useState } from 'react'
import WebApp from '@twa-dev/sdk'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Avatar } from 'primereact/avatar'
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

  const handleButtonClick = () => {
    try {
      WebApp.HapticFeedback.notificationOccurred('success')
      WebApp.showAlert('Кнопка нажата!')
    } catch (error) {
      console.log('WebApp methods not available')
      alert('Кнопка нажата!')
    }
  }

  return (
    <div className="app">
      <div className="container">
        <h1>Telegram Mini App</h1>
        
        {user && (
          <Card className="user-card">
            <div className="user-info">
              <div className="user-header">
                <Avatar 
                  image={user.photo_url} 
                  icon="pi pi-user" 
                  size="large" 
                  shape="circle"
                />
                <div className="user-details">
                  <h2>Добро пожаловать, {user.first_name}!</h2>
                  <p className="user-id">ID: {user.id}</p>
                  {user.username && <p className="user-username">@{user.username}</p>}
                </div>
              </div>
            </div>
          </Card>
        )}
        
        <Card className="content-card">
          <div className="content">
            <p>Ваше Telegram Mini App готово к работе!</p>
            <p>Теперь с PrimeReact компонентами</p>
          </div>
        </Card>

        <div className="button-group">
          <Button 
            label="Тестовая кнопка" 
            icon="pi pi-check" 
            onClick={handleButtonClick}
            className="p-button-primary"
          />
          <Button 
            label="Вторая кнопка" 
            icon="pi pi-star" 
            className="p-button-secondary"
          />
        </div>
      </div>
    </div>
  )
}

export default App
