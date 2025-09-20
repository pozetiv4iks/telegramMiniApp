import React from 'react'
import { Button } from 'primereact/button'
import BottomNavigation from '../components/BottomNavigation'
import { HomeIcon, HistoryIcon, ProfileIcon } from '../components/icons'
import WebApp from '@twa-dev/sdk'

interface User {
  id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
}

interface HomePageProps {
  user: User | null
  currentPage: string
  setCurrentPage: (page: string) => void
}

const HomePage: React.FC<HomePageProps> = ({ currentPage, setCurrentPage }) => {
  const navigationItems = [
    { id: 'home', label: 'Главная', icon: <HomeIcon />, path: '/', active: currentPage === 'home' },
    { id: 'history', label: 'История', icon: <HistoryIcon />, path: '/history', active: currentPage === 'history' },
    { id: 'profile', label: 'Профиль', icon: <ProfileIcon />, path: '/profile', active: currentPage === 'profile' }
  ]

  const handleNavigationClick = (item: any) => {
    setCurrentPage(item.id)
  }

  // Функция для тестирования Telegram WebApp API
  const testTelegramAPI = () => {
    try {
      const userInfo = WebApp.initDataUnsafe?.user
      const platform = WebApp.platform
      const version = WebApp.version
      const theme = WebApp.colorScheme
      
      alert(`Telegram WebApp Info:
Пользователь: ${userInfo ? `${userInfo.first_name} ${userInfo.last_name || ''}` : 'Не определен'}
Платформа: ${platform}
Версия: ${version}
Тема: ${theme}
Готов: ${WebApp.isExpanded ? 'Да' : 'Нет'}`)
    } catch (error) {
      alert('Ошибка при получении данных Telegram WebApp: ' + error)
    }
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ backgroundColor: '#111827' }}>
      {/* Основной контент с учетом status bar */}
      <div className="flex-1 overflow-y-auto" style={{ paddingTop: 'env(safe-area-inset-top, 0)' }}>
        <div className="p-4 pb-20">
          {/* Заголовок */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Выберите карту</h1>
            <p className="text-gray-300 text-sm">Доступные варианты ниже</p>
          </div>

          {/* Секция выбора карты */}
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <div className="flex items-center mb-4">
              {/* Иконка карты */}
              <div className="w-16 h-10 border-2 border-white rounded-lg mr-4 flex flex-col justify-between p-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-1 bg-white rounded"></div>
                  <div className="w-2 h-1 bg-white rounded"></div>
                  <div className="w-2 h-1 bg-white rounded"></div>
                </div>
                <div className="flex justify-center">
                  <div className="w-6 h-4 border border-white rounded flex items-center justify-center">
                    <div className="w-3 h-3 border border-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-white rounded"></div>
                  <div className="w-1 h-1 bg-white rounded"></div>
                  <div className="w-1 h-1 bg-white rounded"></div>
                  <div className="w-1 h-1 bg-white rounded"></div>
                </div>
              </div>
              
              {/* Информация о карте */}
              <div className="flex-1">
                <h3 className="text-white text-lg font-medium">Виртуальная карта</h3>
                <p className="text-gray-300 text-sm">Mastercard</p>
                <div className="flex items-center mt-2">
                  <span className="text-gray-300 text-sm">Стоимость:</span>
                  <span className="text-white text-xl font-bold ml-2">$10</span>
                </div>
              </div>
            </div>
            
            {/* Кнопка выбора карты */}
            <button 
              onClick={() => alert('Карта выбрана!')}
              className="w-full bg-yellow-400 text-black font-semibold py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors"
            >
              Выбрать карту
            </button>
          </div>

          {/* Секция реферальной программы */}
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center">
              {/* Иконка друзей */}
              <div className="w-8 h-8 border-2 border-white rounded-full mr-3 flex items-center justify-center">
                <i className="pi pi-users text-white text-sm"></i>
              </div>
              
              <div className="flex-1">
                <p className="text-white font-medium">Приглашай друзей и получай бонусы!</p>
                <p className="text-gray-300 text-sm mt-1">Твоя персональная ссылка здесь</p>
              </div>
            </div>
          </div>

          {/* Тестовые кнопки */}
          <div className="mt-6 flex gap-2 justify-center">
            <Button 
              label="Telegram API"
              icon="pi pi-telegram"
              onClick={testTelegramAPI}
              className="p-button-sm p-button-outlined p-button-secondary"
            />
            <Button 
              label="Тест"
              icon="pi pi-check"
              onClick={() => alert('Кнопка работает!')}
              className="p-button-sm p-button-secondary"
            />
          </div>
        </div>
      </div>

      {/* Bottom Navigation с учетом safe area */}
      <div style={{ paddingBottom: 'env(safe-area-inset-bottom, 0)' }}>
        <BottomNavigation
          items={navigationItems}
          onItemClick={handleNavigationClick}
        />
      </div>
    </div>
  )
}

export default HomePage