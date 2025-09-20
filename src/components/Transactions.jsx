import React, { useState } from 'react'
import { WebApp } from '@twa-dev/sdk'

const Transactions = () => {
  const [filter, setFilter] = useState('all')
  
  const transactions = [
    { id: 1, type: 'income', amount: 2500, description: 'Зарплата', date: '2024-01-15', time: '09:00', icon: '💰', category: 'Доходы' },
    { id: 2, type: 'expense', amount: -150, description: 'Продукты в супермаркете', date: '2024-01-14', time: '18:30', icon: '🛒', category: 'Продукты' },
    { id: 3, type: 'expense', amount: -89, description: 'Метро', date: '2024-01-13', time: '08:15', icon: '🚌', category: 'Транспорт' },
    { id: 4, type: 'income', amount: 500, description: 'Бонус за активность', date: '2024-01-12', time: '12:00', icon: '🎁', category: 'Бонусы' },
    { id: 5, type: 'expense', amount: -2500, description: 'Аренда квартиры', date: '2024-01-10', time: '10:00', icon: '🏠', category: 'Жилье' },
    { id: 6, type: 'expense', amount: -120, description: 'Кафе', date: '2024-01-09', time: '19:45', icon: '☕', category: 'Развлечения' },
    { id: 7, type: 'income', amount: 800, description: 'Фриланс', date: '2024-01-08', time: '16:20', icon: '💻', category: 'Доходы' },
    { id: 8, type: 'expense', amount: -45, description: 'Такси', date: '2024-01-07', time: '22:10', icon: '🚕', category: 'Транспорт' },
  ]

  const filteredTransactions = filter === 'all' 
    ? transactions 
    : transactions.filter(t => t.type === filter)

  const getTotalAmount = (type) => {
    return transactions
      .filter(t => t.type === type)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0)
  }

  const handleTransactionClick = (transaction) => {
    WebApp.HapticFeedback.impactOccurred('light')
    WebApp.showAlert(`Операция: ${transaction.description}\nСумма: ${transaction.amount} ₽`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Транзакции</h1>
              <p className="text-gray-600">История операций</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">📊</span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Доходы</p>
                <p className="text-xl font-bold text-green-600">
                  +{getTotalAmount('income').toLocaleString('ru-RU')} ₽
                </p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-lg">📈</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Расходы</p>
                <p className="text-xl font-bold text-red-600">
                  -{getTotalAmount('expense').toLocaleString('ru-RU')} ₽
                </p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 text-lg">📉</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 mb-4">
        <div className="flex space-x-2 bg-gray-100 rounded-lg p-1">
          {[
            { key: 'all', label: 'Все', icon: '📋' },
            { key: 'income', label: 'Доходы', icon: '💰' },
            { key: 'expense', label: 'Расходы', icon: '💸' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all duration-200 ${
                filter === tab.key
                  ? 'bg-white shadow-sm text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>{tab.icon}</span>
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Transactions List */}
      <div className="px-4">
        <div className="space-y-3">
          {filteredTransactions.map((transaction) => (
            <div 
              key={transaction.id} 
              onClick={() => handleTransactionClick(transaction)}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 active:bg-gray-50 transition-colors duration-150"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    <span className="text-xl">{transaction.icon}</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{transaction.description}</div>
                    <div className="text-sm text-gray-500">{transaction.category}</div>
                    <div className="text-xs text-gray-400">{transaction.date} в {transaction.time}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-bold text-lg ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : ''}{transaction.amount.toLocaleString('ru-RU')} ₽
                  </div>
                  <div className={`text-xs ${
                    transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {transaction.type === 'income' ? 'Поступление' : 'Списание'}
                  </div>
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

export default Transactions
