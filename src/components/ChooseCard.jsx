import React from 'react'
import { useNavigate } from 'react-router-dom'
import { WebApp } from '@twa-dev/sdk'
import 'primeicons/primeicons.css'

const ChooseCard = () => {
  const navigate = useNavigate()


  const handleSelectCard = () => {
    try {
      WebApp.HapticFeedback.notificationOccurred('success')
      WebApp.showAlert('Выбрана карта: Виртуальная карта')
      // Переходим на главную страницу после выбора
      navigate('/dashboard')
    } catch (error) {
      console.log('WebApp methods not available')
      alert('Выбрана карта: Виртуальная карта')
      navigate('/dashboard')
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
    <div className="min-h-screen bg-white relative">
      {/* Status Bar - системный, не в коде */}

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 pt-6">
        <button 
          onClick={handleClose}
          className="flex items-center space-x-2 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 border-0"
        >
          <i className="pi pi-times text-gray-600"></i>
          <span className="text-gray-600 text-sm">Close</span>
        </button>
        
        <div className="flex space-x-2">
          <button className="w-8 h-8 rounded-full bg-gray-100 border-0 flex items-center justify-center">
            <i className="pi pi-chevron-down text-gray-600"></i>
          </button>
          <button className="w-8 h-8 rounded-full bg-gray-100 border-0 flex items-center justify-center">
            <i className="pi pi-ellipsis-v text-gray-600"></i>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 pb-24">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Выберите карту</h1>
          <p className="text-gray-500 text-lg">Доступные варианты ниже</p>
        </div>

        {/* Card Block */}
        <div className="mb-8">
          <div className="flex items-start space-x-4">
            {/* Card Image Placeholder */}
            <div className="w-20 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
            
            {/* Card Details */}
            <div className="flex-1">
              <h3 className="text-lg font-bold text-black mb-1">Виртуальная карта</h3>
              <p className="text-black font-bold mb-4">Mastercard</p>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">Стоимость:</span>
                <span className="text-2xl font-bold text-black">$10</span>
              </div>
            </div>
          </div>
        </div>

        {/* Select Button */}
        <div className="mb-8">
          <button
            onClick={handleSelectCard}
            className="w-full py-4 text-lg font-semibold bg-gray-200 text-black border-0 hover:bg-gray-300 rounded-lg"
          >
            Выбрать карту
          </button>
        </div>

        {/* Promotional Banner */}
        <div className="p-4 border border-gray-300 rounded-lg bg-white">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
              <i className="pi pi-gift text-gray-600"></i>
            </div>
            <div>
              <p className="text-black font-bold mb-1">Приглашай друзей и получай</p>
              <p className="text-black font-bold mb-2">бонусы!</p>
              <p className="text-gray-500 text-sm">Твоя персональная ссылка здесь</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around items-center py-3">
          <button 
            onClick={() => navigate('/choose-card')}
            className="flex flex-col items-center py-2 px-3 border-0 bg-transparent"
          >
            <i className="pi pi-home text-2xl mb-1 text-black"></i>
            <span className="text-xs font-medium text-black">Главная</span>
          </button>
          <button 
            onClick={() => navigate('/transactions')}
            className="flex flex-col items-center py-2 px-3 border-0 bg-transparent"
          >
            <i className="pi pi-refresh text-2xl mb-1 text-gray-400"></i>
            <span className="text-xs font-medium text-gray-400">История</span>
          </button>
          <button 
            onClick={() => navigate('/profile')}
            className="flex flex-col items-center py-2 px-3 border-0 bg-transparent"
          >
            <i className="pi pi-user text-2xl mb-1 text-gray-400"></i>
            <span className="text-xs font-medium text-gray-400">Профиль</span>
          </button>
        </div>
        {/* Home indicator */}
        <div className="flex justify-center pb-2">
          <div className="w-32 h-1 bg-black rounded-full"></div>
        </div>
      </div>
    </div>
  )
}

export default ChooseCard
