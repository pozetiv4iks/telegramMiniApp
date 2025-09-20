import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { WebApp } from '@twa-dev/sdk'

const Support = () => {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('general')

  const categories = [
    { key: 'general', label: 'Общие вопросы', icon: '❓' },
    { key: 'technical', label: 'Техническая поддержка', icon: '🔧' },
    { key: 'billing', label: 'Биллинг', icon: '💳' },
    { key: 'security', label: 'Безопасность', icon: '🔒' }
  ]

  const faqItems = [
    {
      question: 'Как пополнить карту?',
      answer: 'Вы можете пополнить карту через банкомат, мобильное приложение банка или переводом с другой карты.'
    },
    {
      question: 'Безопасно ли приложение?',
      answer: 'Да, мы используем современные методы шифрования и двухфакторную аутентификацию для защиты ваших данных.'
    },
    {
      question: 'Как заблокировать карту?',
      answer: 'Перейдите в раздел "Мои карты", выберите нужную карту и нажмите "Заблокировать".'
    }
  ]

  const handleBack = () => {
    navigate(-1)
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      try {
        WebApp.HapticFeedback.notificationOccurred('success')
        WebApp.showAlert('Сообщение отправлено! Мы ответим в течение 24 часов.')
        setMessage('')
      } catch (error) {
        console.log('WebApp methods not available')
        alert('Сообщение отправлено! Мы ответим в течение 24 часов.')
        setMessage('')
      }
    }
  }

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
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
              <h1 className="text-2xl font-bold text-white">Поддержка</h1>
              <p className="text-gray-300">Помощь и контакты</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Контакты */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Связаться с нами</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📞</span>
              <div>
                <div className="text-white font-medium">Телефон</div>
                <div className="text-gray-400">+7 (800) 123-45-67</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">✉️</span>
              <div>
                <div className="text-white font-medium">Email</div>
                <div className="text-gray-400">support@fintechwallet.com</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">💬</span>
              <div>
                <div className="text-white font-medium">Telegram</div>
                <div className="text-gray-400">@fintechwallet_support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Категории вопросов */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Выберите категорию</h3>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => handleCategorySelect(category.key)}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  selectedCategory === category.key
                    ? 'border-blue-500 bg-blue-500 bg-opacity-20'
                    : 'border-gray-600 bg-gray-700 hover:border-gray-500'
                }`}
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <div className="text-white text-sm font-medium">{category.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Отправить сообщение */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Написать сообщение</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Ваше сообщение
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Опишите вашу проблему или вопрос..."
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none h-24"
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors duration-200"
            >
              Отправить сообщение
            </button>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Часто задаваемые вопросы</h3>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b border-gray-700 pb-4 last:border-b-0">
                <div className="text-white font-medium mb-2">{item.question}</div>
                <div className="text-gray-400 text-sm">{item.answer}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Время работы */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Время работы</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-300">Пн-Пт</span>
              <span className="text-white">9:00 - 21:00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Сб-Вс</span>
              <span className="text-white">10:00 - 18:00</span>
            </div>
            <div className="text-sm text-gray-400 mt-3">
              Среднее время ответа: 2-4 часа
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Support
