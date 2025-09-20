import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { WebApp } from '@twa-dev/sdk'

const Settings = () => {
  const navigate = useNavigate()
  const [settings, setSettings] = useState({
    notifications: true,
    biometric: false,
    darkMode: true,
    language: 'ru',
    currency: 'RUB'
  })

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    try {
      WebApp.HapticFeedback.impactOccurred('light')
    } catch (error) {
      console.log('Haptic feedback not available')
    }
  }

  const handleBack = () => {
    navigate(-1)
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
              <h1 className="text-2xl font-bold text-white">Настройки</h1>
              <p className="text-gray-300">Управление приложением</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Уведомления */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Уведомления</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-lg">🔔</span>
                <span className="text-white">Push уведомления</span>
              </div>
              <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                settings.notifications ? 'bg-blue-500' : 'bg-gray-600'
              }`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                  settings.notifications ? 'translate-x-6' : 'translate-x-0.5'
                } mt-0.5`} />
              </div>
            </div>
          </div>
        </div>

        {/* Безопасность */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Безопасность</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-lg">👆</span>
                <span className="text-white">Биометрическая аутентификация</span>
              </div>
              <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                settings.biometric ? 'bg-blue-500' : 'bg-gray-600'
              }`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                  settings.biometric ? 'translate-x-6' : 'translate-x-0.5'
                } mt-0.5`} />
              </div>
            </div>
          </div>
        </div>

        {/* Внешний вид */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Внешний вид</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-lg">🌙</span>
                <span className="text-white">Темная тема</span>
              </div>
              <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                settings.darkMode ? 'bg-blue-500' : 'bg-gray-600'
              }`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                  settings.darkMode ? 'translate-x-6' : 'translate-x-0.5'
                } mt-0.5`} />
              </div>
            </div>
          </div>
        </div>

        {/* Язык и валюта */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Региональные настройки</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Язык</label>
              <select 
                value={settings.language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              >
                <option value="ru">Русский</option>
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Валюта</label>
              <select 
                value={settings.currency}
                onChange={(e) => handleSettingChange('currency', e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              >
                <option value="RUB">₽ Рубль</option>
                <option value="USD">$ Доллар</option>
                <option value="EUR">€ Евро</option>
              </select>
            </div>
          </div>
        </div>

        {/* О приложении */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">О приложении</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">Версия</span>
              <span className="text-white">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Сборка</span>
              <span className="text-white">2024.01.15</span>
            </div>
            <button className="w-full text-left text-blue-400 hover:text-blue-300">
              Политика конфиденциальности
            </button>
            <button className="w-full text-left text-blue-400 hover:text-blue-300">
              Условия использования
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
