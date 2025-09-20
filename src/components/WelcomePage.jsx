import React, { useState, useEffect } from 'react'
import { WebApp } from '@twa-dev/sdk'

const WelcomePage = ({ user, onStart }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentFeature, setCurrentFeature] = useState(0)

  const features = [
    {
      icon: '💳',
      title: 'Управление картами',
      description: 'Все ваши карты в одном месте'
    },
    {
      icon: '💸',
      title: 'Быстрые переводы',
      description: 'Переводите деньги за секунды'
    },
    {
      icon: '📊',
      title: 'Аналитика',
      description: 'Отслеживайте свои расходы'
    },
    {
      icon: '🔒',
      title: 'Безопасность',
      description: 'Ваши деньги под защитой'
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
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header с приветствием */}
        <div className="text-center mb-12">
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <span className="text-4xl">💳</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Fintech Wallet</h1>
            <p className="text-gray-600 text-lg">Ваш персональный финансовый помощник</p>
          </div>
          
          {user && (
            <div className="bg-white rounded-2xl p-6 shadow-lg max-w-md mx-auto">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img 
                    src={user.photo_url} 
                    alt="User Avatar" 
                    className="w-16 h-16 rounded-full border-4 border-telegram-blue"
                  />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="text-left">
                  <h2 className="text-xl font-semibold text-gray-900">Привет, {user.first_name}! 👋</h2>
                  <p className="text-gray-600">Добро пожаловать в наше приложение</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Основной контент */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Что вас ждет:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`card cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    currentFeature === index 
                      ? 'ring-2 ring-telegram-blue bg-blue-50' 
                      : 'hover:shadow-xl'
                  }`}
                  onClick={() => handleFeatureClick(index)}
                >
                  <div className="text-4xl mb-3">{feature.icon}</div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h4>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Статистика */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">Наши достижения</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">50K+</div>
            <div className="text-gray-600">Пользователей</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">₽2.5M</div>
            <div className="text-gray-600">Оборот</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">0%</div>
            <div className="text-gray-600">Комиссия</div>
          </div>
            </div>
          </div>
        </div>

        {/* Кнопки действий */}
        <div className="text-center space-y-4">
          <button 
            className="btn-primary text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            onClick={handleStart}
          >
            <span className="mr-2">🚀</span>
            Начать работу
          </button>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="btn-secondary"
              onClick={() => WebApp.showAlert('Информация о приложении')}
            >
              <span className="mr-2">ℹ️</span>
              Информация
            </button>
            <button 
              className="btn-secondary"
              onClick={() => WebApp.openLink('https://telegram.org')}
            >
              <span className="mr-2">❓</span>
              Помощь
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p>Версия 1.0.0 • Сделано с ❤️ для Telegram</p>
        </div>
      </div>
    </div>
  )
}

export default WelcomePage
