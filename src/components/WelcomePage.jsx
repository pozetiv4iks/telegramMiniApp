import React, { useState, useEffect } from 'react'
import { WebApp } from '@twa-dev/sdk'
import './WelcomePage.css'

const WelcomePage = ({ user, onStart }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentFeature, setCurrentFeature] = useState(0)

  const features = [
    {
      icon: '🚀',
      title: 'Быстрый старт',
      description: 'Начните использовать приложение за секунды'
    },
    {
      icon: '📱',
      title: 'Мобильный дизайн',
      description: 'Оптимизировано для всех устройств'
    },
    {
      icon: '🔒',
      title: 'Безопасность',
      description: 'Ваши данные защищены'
    },
    {
      icon: '⚡',
      title: 'Высокая скорость',
      description: 'Мгновенная работа без задержек'
    }
  ]

  useEffect(() => {
    // Анимация появления
    const timer = setTimeout(() => setIsVisible(true), 100)
    
    // Автоматическая смена функций
    const featureTimer = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % features.length)
    }, 3000)

    return () => {
      clearTimeout(timer)
      clearInterval(featureTimer)
    }
  }, [features.length])

  const handleStart = () => {
    WebApp.HapticFeedback.impactOccurred('medium')
    onStart()
  }

  const handleFeatureClick = (index) => {
    setCurrentFeature(index)
    WebApp.HapticFeedback.impactOccurred('light')
  }

  return (
    <div className={`welcome-page ${isVisible ? 'visible' : ''}`}>
      <div className="welcome-container">
        {/* Header с приветствием */}
        <div className="welcome-header">
          <div className="app-logo">
            <div className="logo-icon">📱</div>
            <h1 className="app-title">Telegram Mini App</h1>
          </div>
          
          {user && (
            <div className="user-greeting">
              <div className="greeting-avatar">
                <img 
                  src={user.photo_url} 
                  alt="User Avatar" 
                  className="avatar-img"
                />
                <div className="avatar-ring"></div>
              </div>
              <div className="greeting-text">
                <h2>Привет, {user.first_name}! 👋</h2>
                <p>Добро пожаловать в наше приложение</p>
              </div>
            </div>
          )}
        </div>

        {/* Основной контент */}
        <div className="welcome-content">
          <div className="features-section">
            <h3>Что вас ждет:</h3>
            <div className="features-grid">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`feature-card ${currentFeature === index ? 'active' : ''}`}
                  onClick={() => handleFeatureClick(index)}
                >
                  <div className="feature-icon">{feature.icon}</div>
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Статистика */}
          <div className="stats-section">
            <div className="stat-item">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Пользователей</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Время работы</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Поддержка</div>
            </div>
          </div>
        </div>

        {/* Кнопки действий */}
        <div className="welcome-actions">
          <button 
            className="start-button"
            onClick={handleStart}
          >
            <span className="button-icon">🚀</span>
            <span>Начать работу</span>
          </button>
          
          <div className="secondary-actions">
            <button 
              className="info-button"
              onClick={() => WebApp.showAlert('Информация о приложении')}
            >
              <span>ℹ️</span>
              <span>Информация</span>
            </button>
            <button 
              className="help-button"
              onClick={() => WebApp.openLink('https://telegram.org')}
            >
              <span>❓</span>
              <span>Помощь</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="welcome-footer">
          <p>Версия 1.0.0 • Сделано с ❤️ для Telegram</p>
        </div>
      </div>
    </div>
  )
}

export default WelcomePage
