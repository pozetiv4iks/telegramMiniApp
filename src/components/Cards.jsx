import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { WebApp } from '@twa-dev/sdk'

const Cards = () => {
  const navigate = useNavigate()
  const [cards] = useState([
    {
      id: 1,
      number: '**** **** **** 1234',
      type: 'Visa',
      balance: 12580.50,
      color: 'from-blue-500 to-purple-600',
      isMain: true
    },
    {
      id: 2,
      number: '**** **** **** 5678',
      type: 'Mastercard',
      balance: 5420.30,
      color: 'from-red-500 to-pink-600',
      isMain: false
    },
    {
      id: 3,
      number: '**** **** **** 9012',
      type: 'Visa',
      balance: 890.75,
      color: 'from-green-500 to-teal-600',
      isMain: false
    }
  ])

  const handleBack = () => {
    navigate(-1)
  }

  const handleCardAction = (action, card) => {
    try {
      WebApp.HapticFeedback.impactOccurred('medium')
      WebApp.showAlert(`${action} для карты ${card.number}`)
    } catch (error) {
      console.log('WebApp methods not available')
      alert(`${action} для карты ${card.number}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 shadow-sm border-b border-gray-700">
        <div className="px-4 py-6">
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleBack}
              className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center"
            >
              <span className="text-gray-300">←</span>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">Мои карты</h1>
              <p className="text-gray-300">Управление картами</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Добавить карту */}
        <button className="w-full bg-gray-800 border-2 border-dashed border-gray-600 rounded-xl p-6 text-center hover:border-blue-500 transition-colors duration-200">
          <div className="text-4xl mb-2">💳</div>
          <div className="text-white font-medium">Добавить новую карту</div>
          <div className="text-gray-400 text-sm">Нажмите для привязки карты</div>
        </button>

        {/* Список карт */}
        <div className="space-y-4">
          {cards.map((card) => (
            <div key={card.id} className="relative">
              <div className={`bg-gradient-to-r ${card.color} rounded-xl p-6 shadow-lg`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-white">
                    <div className="text-sm opacity-80">{card.type}</div>
                    <div className="text-lg font-bold">{card.number}</div>
                  </div>
                  {card.isMain && (
                    <div className="bg-white bg-opacity-20 rounded-full px-3 py-1">
                      <span className="text-white text-xs font-medium">Основная</span>
                    </div>
                  )}
                </div>
                
                <div className="text-white">
                  <div className="text-sm opacity-80">Баланс</div>
                  <div className="text-2xl font-bold">
                    {card.balance.toLocaleString('ru-RU')} ₽
                  </div>
                </div>
              </div>
              
              {/* Действия с картой */}
              <div className="mt-3 flex space-x-2">
                <button 
                  onClick={() => handleCardAction('Пополнить', card)}
                  className="flex-1 bg-gray-800 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors duration-200"
                >
                  💰 Пополнить
                </button>
                <button 
                  onClick={() => handleCardAction('Заблокировать', card)}
                  className="flex-1 bg-gray-800 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors duration-200"
                >
                  🔒 Заблокировать
                </button>
                <button 
                  onClick={() => handleCardAction('Настройки', card)}
                  className="flex-1 bg-gray-800 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors duration-200"
                >
                  ⚙️ Настройки
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Статистика */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Статистика</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {cards.reduce((sum, card) => sum + card.balance, 0).toLocaleString('ru-RU')} ₽
              </div>
              <div className="text-sm text-gray-400">Общий баланс</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{cards.length}</div>
              <div className="text-sm text-gray-400">Активных карт</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cards
