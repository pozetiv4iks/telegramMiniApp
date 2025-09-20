import React, { useState } from 'react'
import { WebApp } from '@twa-dev/sdk'

const Dashboard = ({ user }) => {
  const [balance] = useState(12580.50)
  const [transactions] = useState([
    { id: 1, type: 'income', amount: 2500, description: 'Зарплата', date: '2024-01-15', icon: '💰' },
    { id: 2, type: 'expense', amount: -150, description: 'Продукты', date: '2024-01-14', icon: '🛒' },
    { id: 3, type: 'expense', amount: -89, description: 'Транспорт', date: '2024-01-13', icon: '🚌' },
    { id: 4, type: 'income', amount: 500, description: 'Бонус', date: '2024-01-12', icon: '🎁' },
  ])

  const quickActions = [
    { id: 1, title: 'Перевести', icon: '💸', color: 'bg-blue-500' },
    { id: 2, title: 'Пополнить', icon: '💳', color: 'bg-green-500' },
    { id: 3, title: 'Снять', icon: '🏧', color: 'bg-purple-500' },
    { id: 4, title: 'История', icon: '📊', color: 'bg-orange-500' },
  ]

  const handleQuickAction = (action) => {
    try {
      WebApp.HapticFeedback.impactOccurred('medium')
      WebApp.showAlert(`Выбрано: ${action.title}`)
    } catch (error) {
      console.log('WebApp methods not available')
      alert(`Выбрано: ${action.title}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Кошелек</h1>
              <p className="text-gray-600">Добро пожаловать, {user?.first_name || 'Пользователь'}!</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">💳</span>
            </div>
          </div>
        </div>
      </div>

      {/* Balance Card */}
      <div className="px-4 py-6">
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium opacity-90">Общий баланс</h2>
            <span className="text-2xl">💎</span>
          </div>
          <div className="text-3xl font-bold mb-2">
            {balance.toLocaleString('ru-RU')} ₽
          </div>
          <div className="flex items-center text-sm opacity-90">
            <span className="text-green-300 mr-2">↗ +2.5%</span>
            <span>за месяц</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Быстрые действия</h3>
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleQuickAction(action)}
              className={`${action.color} text-white p-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200`}
            >
              <div className="text-2xl mb-2">{action.icon}</div>
              <div className="font-medium">{action.title}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Последние операции</h3>
          <button className="text-blue-600 font-medium">Все</button>
        </div>
        
        <div className="space-y-3">
          {transactions.slice(0, 3).map((transaction) => (
            <div key={transaction.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    <span className="text-lg">{transaction.icon}</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{transaction.description}</div>
                    <div className="text-sm text-gray-500">{transaction.date}</div>
                  </div>
                </div>
                <div className={`font-semibold ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'income' ? '+' : ''}{transaction.amount.toLocaleString('ru-RU')} ₽
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-20"></div>
    </div>
  )
}

export default Dashboard
