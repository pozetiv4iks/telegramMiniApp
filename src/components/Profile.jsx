import React, { useState } from 'react'
import { WebApp } from '@twa-dev/sdk'

const Profile = ({ user }) => {
  const [settings] = useState({
    notifications: true,
    biometric: false,
    darkMode: false,
  })

  const menuItems = [
    { id: 'cards', title: 'Мои карты', icon: '💳', color: 'bg-blue-500' },
    { id: 'limits', title: 'Лимиты', icon: '🛡️', color: 'bg-green-500' },
    { id: 'security', title: 'Безопасность', icon: '🔒', color: 'bg-red-500' },
    { id: 'support', title: 'Поддержка', icon: '💬', color: 'bg-purple-500' },
    { id: 'about', title: 'О приложении', icon: 'ℹ️', color: 'bg-gray-500' },
  ]

  const handleMenuItemClick = (item) => {
    WebApp.HapticFeedback.impactOccurred('medium')
    WebApp.showAlert(`Открыт раздел: ${item.title}`)
  }

  const handleLogout = () => {
    WebApp.showConfirm('Вы уверены, что хотите выйти?', (confirmed) => {
      if (confirmed) {
        WebApp.close()
      }
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Профиль</h1>
              <p className="text-gray-600">Настройки и информация</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">👤</span>
            </div>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="px-4 py-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img 
                src={user?.photo_url || '/default-avatar.png'} 
                alt="User Avatar" 
                className="w-16 h-16 rounded-full border-4 border-blue-500"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              <div className="w-16 h-16 rounded-full border-4 border-blue-500 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold hidden">
                {user?.first_name?.[0] || 'U'}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">
                {user?.first_name} {user?.last_name}
              </h2>
              <p className="text-gray-600">@{user?.username || 'username'}</p>
              <div className="flex items-center mt-2">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  Верифицирован
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="text-2xl font-bold text-blue-600">12</div>
            <div className="text-sm text-gray-600">Карт</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="text-2xl font-bold text-green-600">156</div>
            <div className="text-sm text-gray-600">Операций</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="text-2xl font-bold text-purple-600">4.8</div>
            <div className="text-sm text-gray-600">Рейтинг</div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 mb-6">
        <div className="space-y-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuItemClick(item)}
              className="w-full bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center space-x-4 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center`}>
                <span className="text-white text-lg">{item.icon}</span>
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium text-gray-900">{item.title}</div>
              </div>
              <div className="text-gray-400">
                <span>›</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="px-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Настройки</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-lg">🔔</span>
                <span className="text-gray-900">Уведомления</span>
              </div>
              <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                settings.notifications ? 'bg-blue-500' : 'bg-gray-300'
              }`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                  settings.notifications ? 'translate-x-6' : 'translate-x-0.5'
                } mt-0.5`} />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-lg">👆</span>
                <span className="text-gray-900">Биометрия</span>
              </div>
              <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                settings.biometric ? 'bg-blue-500' : 'bg-gray-300'
              }`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                  settings.biometric ? 'translate-x-6' : 'translate-x-0.5'
                } mt-0.5`} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="px-4 mb-20">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-4 rounded-xl font-semibold hover:bg-red-600 transition-colors duration-200"
        >
          Выйти из аккаунта
        </button>
      </div>
    </div>
  )
}

export default Profile
