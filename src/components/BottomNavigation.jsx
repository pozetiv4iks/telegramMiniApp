import React from 'react'
import { WebApp } from '@twa-dev/sdk'

const BottomNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard', label: 'Главная', icon: '🏠', color: 'text-blue-600' },
    { id: 'transactions', label: 'История', icon: '📊', color: 'text-purple-600' },
    { id: 'transfer', label: 'Перевод', icon: '💸', color: 'text-green-600' },
    { id: 'profile', label: 'Профиль', icon: '👤', color: 'text-orange-600' },
  ]

  const handleTabClick = (tabId) => {
    onTabChange(tabId)
    try {
      WebApp.HapticFeedback.impactOccurred('light')
    } catch (error) {
      console.log('Haptic feedback not available')
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 safe-area-pb">
      <div className="flex justify-around items-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
              activeTab === tab.id
                ? `${tab.color} bg-opacity-10`
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="text-2xl mb-1">{tab.icon}</span>
            <span className={`text-xs font-medium ${
              activeTab === tab.id ? 'opacity-100' : 'opacity-70'
            }`}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default BottomNavigation
