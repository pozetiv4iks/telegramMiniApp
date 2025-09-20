import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { WebApp } from '@twa-dev/sdk'

const BottomNavigation = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  console.log('BottomNavigation - current path:', location.pathname)
  
  const tabs = [
    { id: 'choose-card', label: 'Карты', icon: '💳', color: 'text-blue-400', path: '/choose-card' },
    { id: 'dashboard', label: 'Главная', icon: '🏠', color: 'text-purple-400', path: '/dashboard' },
    { id: 'transactions', label: 'История', icon: '📊', color: 'text-green-400', path: '/transactions' },
    { id: 'profile', label: 'Профиль', icon: '👤', color: 'text-orange-400', path: '/profile' },
  ]

  const handleTabClick = (tab) => {
    console.log('Navigating to:', tab.path)
    navigate(tab.path)
    try {
      WebApp.HapticFeedback.impactOccurred('light')
    } catch (error) {
      console.log('Haptic feedback not available')
    }
  }

  const isActive = (path) => {
    const active = location.pathname === path
    console.log(`Checking if ${path} is active:`, active)
    return active
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 px-4 py-2 safe-area-pb">
      <div className="flex justify-around items-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab)}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
              isActive(tab.path)
                ? `${tab.color} bg-opacity-20`
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <span className="text-2xl mb-1">{tab.icon}</span>
            <span className={`text-xs font-medium ${
              isActive(tab.path) ? 'opacity-100' : 'opacity-70'
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
