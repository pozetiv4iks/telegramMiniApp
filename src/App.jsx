import React, { useEffect, useState } from 'react'
import { WebApp } from '@twa-dev/sdk'
import WelcomePage from './components/WelcomePage'
import Dashboard from './components/Dashboard'
import Transactions from './components/Transactions'
import Transfer from './components/Transfer'
import Profile from './components/Profile'
import BottomNavigation from './components/BottomNavigation'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [isReady, setIsReady] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')

  useEffect(() => {
    // Инициализация Telegram WebApp
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
    
    setIsReady(true)
    
    // Настройка темы
    WebApp.setHeaderColor('#2481cc')
    WebApp.setBackgroundColor('#ffffff')
    
    return () => {
      WebApp.close()
    }
  }, [])

  const handleStartApp = () => {
    setShowWelcome(false)
    WebApp.HapticFeedback.notificationOccurred('success')
  }

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard user={user} />
      case 'transactions':
        return <Transactions />
      case 'transfer':
        return <Transfer />
      case 'profile':
        return <Profile user={user} />
      default:
        return <Dashboard user={user} />
    }
  }

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

  if (showWelcome) {
    return (
      <div className="app">
        <WelcomePage user={user} onStart={handleStartApp} />
      </div>
    )
  }

  return (
    <div className="app">
      {renderActiveTab()}
      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}

export default App
