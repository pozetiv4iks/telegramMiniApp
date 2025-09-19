import React, { useEffect, useState } from 'react'
import { WebApp } from '@twa-dev/sdk'
import Header from './components/Header'
import MainContent from './components/MainContent'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Инициализация Telegram WebApp
    WebApp.ready()
    WebApp.expand()
    
    // Получаем данные пользователя
    if (WebApp.initDataUnsafe?.user) {
      setUser(WebApp.initDataUnsafe.user)
    }
    
    setIsReady(true)
    
    // Настройка темы
    WebApp.setHeaderColor('#2481cc')
    WebApp.setBackgroundColor('#ffffff')
    
    return () => {
      WebApp.close()
    }
  }, [])

  if (!isReady) {
    return (
      <div className="app">
        <div className="loading">Загрузка...</div>
      </div>
    )
  }

  return (
    <div className="app">
      <Header user={user} />
      <MainContent user={user} />
      <Footer />
    </div>
  )
}

export default App
