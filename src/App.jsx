import React, { useEffect, useState } from 'react'
import { WebApp } from '@twa-dev/sdk'
import AppRouter from './components/AppRouter'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
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
        // Для тестирования создаем мокового пользователя
        setUser({
          id: 123456789,
          first_name: 'Иван',
          last_name: 'Петров',
          username: 'ivan_petrov',
          photo_url: 'https://via.placeholder.com/150'
        })
      }
      
      // Настройка темы
      WebApp.setHeaderColor('#1a1a1a')
      WebApp.setBackgroundColor('#1a1a1a')
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
      <AppRouter user={user} />
    </div>
  )
}

export default App
