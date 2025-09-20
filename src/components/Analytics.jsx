import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { WebApp } from '@twa-dev/sdk'

const Analytics = () => {
  const navigate = useNavigate()
  const [selectedPeriod, setSelectedPeriod] = useState('month')

  const periods = [
    { key: 'week', label: 'Неделя' },
    { key: 'month', label: 'Месяц' },
    { key: 'year', label: 'Год' }
  ]

  const categories = [
    { name: 'Продукты', amount: 15420, percentage: 35, color: 'bg-red-500' },
    { name: 'Транспорт', amount: 8900, percentage: 20, color: 'bg-blue-500' },
    { name: 'Развлечения', amount: 6700, percentage: 15, color: 'bg-purple-500' },
    { name: 'Жилье', amount: 12000, percentage: 27, color: 'bg-green-500' },
    { name: 'Прочее', amount: 1980, percentage: 3, color: 'bg-gray-500' }
  ]

  const totalExpenses = categories.reduce((sum, cat) => sum + cat.amount, 0)

  const handleBack = () => {
    navigate(-1)
  }

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period)
    try {
      WebApp.HapticFeedback.impactOccurred('light')
    } catch (error) {
      console.log('Haptic feedback not available')
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
              <h1 className="text-2xl font-bold text-white">Аналитика</h1>
              <p className="text-gray-300">Анализ расходов</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Период */}
        <div className="flex space-x-2 bg-gray-800 rounded-lg p-1">
          {periods.map((period) => (
            <button
              key={period.key}
              onClick={() => handlePeriodChange(period.key)}
              className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 ${
                selectedPeriod === period.key
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>

        {/* Общая статистика */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Общие расходы</h3>
          <div className="text-center">
            <div className="text-4xl font-bold text-red-400 mb-2">
              {totalExpenses.toLocaleString('ru-RU')} ₽
            </div>
            <div className="text-gray-400">за {periods.find(p => p.key === selectedPeriod)?.label.toLowerCase()}</div>
          </div>
        </div>

        {/* Категории расходов */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Расходы по категориям</h3>
          <div className="space-y-4">
            {categories.map((category, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white font-medium">{category.name}</span>
                    <span className="text-white font-bold">
                      {category.amount.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${category.color}`}
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-400 mt-1">{category.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* График (заглушка) */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">График расходов</h3>
          <div className="h-48 bg-gray-700 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-400">
              <div className="text-4xl mb-2">📊</div>
              <div>График будет здесь</div>
            </div>
          </div>
        </div>

        {/* Топ транзакций */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Крупные траты</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2">
              <div>
                <div className="text-white font-medium">Аренда квартиры</div>
                <div className="text-sm text-gray-400">15 января</div>
              </div>
              <div className="text-red-400 font-bold">-25,000 ₽</div>
            </div>
            <div className="flex justify-between items-center py-2">
              <div>
                <div className="text-white font-medium">Продукты в супермаркете</div>
                <div className="text-sm text-gray-400">14 января</div>
              </div>
              <div className="text-red-400 font-bold">-3,200 ₽</div>
            </div>
            <div className="flex justify-between items-center py-2">
              <div>
                <div className="text-white font-medium">Заправка</div>
                <div className="text-sm text-gray-400">13 января</div>
              </div>
              <div className="text-red-400 font-bold">-2,800 ₽</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
