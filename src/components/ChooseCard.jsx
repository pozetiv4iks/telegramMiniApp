import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { WebApp } from '@twa-dev/sdk'

const ChooseCard = () => {
  const navigate = useNavigate()
  const [selectedCard, setSelectedCard] = useState(null)

  const cards = [
    {
      id: 1,
      name: 'Виртуальная карта',
      type: 'Mastercard',
      price: '$10',
      description: 'Быстрая и безопасная виртуальная карта',
      icon: '💳'
    },
    {
      id: 2,
      name: 'Физическая карта',
      type: 'Visa',
      price: '$15',
      description: 'Классическая пластиковая карта',
      icon: '💳'
    }
  ]

  const handleCardSelect = (card) => {
    setSelectedCard(card)
    try {
      WebApp.HapticFeedback.impactOccurred('medium')
    } catch (error) {
      console.log('Haptic feedback not available')
    }
  }

  const handleSelectCard = () => {
    if (selectedCard) {
      try {
        WebApp.HapticFeedback.notificationOccurred('success')
        WebApp.showAlert(`Выбрана карта: ${selectedCard.name}`)
        // Переходим на главную страницу после выбора
        navigate('/dashboard')
      } catch (error) {
        console.log('WebApp methods not available')
        alert(`Выбрана карта: ${selectedCard.name}`)
        navigate('/dashboard')
      }
    }
  }

  const handleClose = () => {
    try {
      WebApp.close()
    } catch (error) {
      console.log('WebApp.close() not available')
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <button 
          onClick={handleClose}
          className="flex items-center space-x-2 px-3 py-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
        >
          <span className="text-gray-300 text-lg">✕</span>
          <span className="text-gray-300 text-sm">Close</span>
        </button>
        
        <div className="flex space-x-2">
          <button className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
            <span className="text-gray-300 text-sm">⌄</span>
          </button>
          <button className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
            <span className="text-gray-300 text-sm">⋯</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Выберите карту</h1>
          <p className="text-gray-300 text-lg">Доступные варианты ниже</p>
        </div>

        {/* Cards */}
        <div className="space-y-4 mb-8">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardSelect(card)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                selectedCard?.id === card.id
                  ? 'border-blue-500 bg-blue-900 bg-opacity-20'
                  : 'border-gray-600 bg-gray-800 hover:border-gray-500'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">{card.icon}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">{card.name}</h3>
                  <p className="text-white font-medium">{card.type}</p>
                  <p className="text-gray-400 text-sm">{card.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm">Стоимость:</p>
                  <p className="text-2xl font-bold text-white">{card.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Select Button */}
        <button
          onClick={handleSelectCard}
          disabled={!selectedCard}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
            selectedCard
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Выбрать карту
        </button>

        {/* Promotional Banner */}
        <div className="mt-8 p-4 border border-gray-600 rounded-xl bg-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-gray-300">🎁</span>
            </div>
            <div>
              <p className="text-white font-semibold">Приглашай друзей и получай бонусы!</p>
              <p className="text-gray-400 text-sm">Твоя персональная ссылка здесь</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 px-4 py-2">
        <div className="flex justify-around items-center">
          <button 
            onClick={() => navigate('/choose-card')}
            className="flex flex-col items-center py-2 px-3 rounded-lg"
          >
            <span className="text-2xl mb-1 text-blue-400">💳</span>
            <span className="text-xs font-medium text-blue-400">Карты</span>
          </button>
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex flex-col items-center py-2 px-3 rounded-lg"
          >
            <span className="text-2xl mb-1 text-gray-400">🏠</span>
            <span className="text-xs font-medium text-gray-400">Главная</span>
          </button>
          <button 
            onClick={() => navigate('/transactions')}
            className="flex flex-col items-center py-2 px-3 rounded-lg"
          >
            <span className="text-2xl mb-1 text-gray-400">📊</span>
            <span className="text-xs font-medium text-gray-400">История</span>
          </button>
          <button 
            onClick={() => navigate('/profile')}
            className="flex flex-col items-center py-2 px-3 rounded-lg"
          >
            <span className="text-2xl mb-1 text-gray-400">👤</span>
            <span className="text-xs font-medium text-gray-400">Профиль</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChooseCard
