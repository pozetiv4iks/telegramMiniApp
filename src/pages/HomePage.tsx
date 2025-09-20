import React, { useState } from 'react'
import { Card } from 'primereact/card'
import { Avatar } from 'primereact/avatar'
import { TabView, TabPanel } from 'primereact/tabview'
import BottomNavigation from '../components/BottomNavigation'
import { HomeIcon, HistoryIcon, ProfileIcon } from '../components/icons'

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

const HomePage: React.FC<HomePageProps> = ({ user, currentPage, setCurrentPage }) => {
  const [inputValue, setInputValue] = useState('')
  const [numberValue, setNumberValue] = useState<number | null>(null)
  const [checkboxValue, setCheckboxValue] = useState(false)
  const [dropdownValue, setDropdownValue] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState(0)

  const dropdownOptions = [
    { label: 'Опция 1', value: 'option1' },
    { label: 'Опция 2', value: 'option2' },
    { label: 'Опция 3', value: 'option3' }
  ]

  const navigationItems = [
    { id: 'home', label: 'Главная', icon: <HomeIcon />, path: '/', active: currentPage === 'home' },
    { id: 'history', label: 'История', icon: <HistoryIcon />, path: '/history', active: currentPage === 'history' },
    { id: 'profile', label: 'Профиль', icon: <ProfileIcon />, path: '/profile', active: currentPage === 'profile' }
  ]

  const tabs = [
    {
      header: 'Основная информация',
      leftIcon: 'pi pi-info-circle',
      content: (
        <div>
          <h3 className="text-xl font-semibold mb-3">Добро пожаловать в Telegram Mini App!</h3>
          <p className="text-gray-600 mb-6">Это главная страница с различными компонентами PrimeReact.</p>
          
          <div className="mt-6">
            <h4 className="text-lg font-medium mb-4">Форма ввода</h4>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-medium text-gray-700">Текстовое поле:</label>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Введите текст..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-colors focus:outline-none focus:border-tg-blue focus:ring-2 focus:ring-tg-blue/10"
                />
              </div>
              
              <div>
                <label className="block mb-2 font-medium text-gray-700">Числовое поле:</label>
                <input
                  type="number"
                  value={numberValue || ''}
                  onChange={(e) => setNumberValue(e.target.value ? Number(e.target.value) : null)}
                  placeholder="Введите число..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-colors focus:outline-none focus:border-tg-blue focus:ring-2 focus:ring-tg-blue/10"
                />
              </div>
              
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checkboxValue}
                    onChange={(e) => setCheckboxValue(e.target.checked)}
                    className="w-5 h-5 text-tg-blue bg-white border-gray-300 rounded focus:ring-tg-blue focus:ring-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Согласен с условиями</span>
                </label>
              </div>
              
              <div>
                <label className="block mb-2 font-medium text-gray-700">Выпадающий список:</label>
                <select
                  value={dropdownValue || ''}
                  onChange={(e) => setDropdownValue(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-colors focus:outline-none focus:border-tg-blue focus:ring-2 focus:ring-tg-blue/10"
                >
                  <option value="">Выберите опцию...</option>
                  {dropdownOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      header: 'Пользователь',
      leftIcon: 'pi pi-user',
      content: (
        <div>
          {user && (
            <Card className="mb-6 shadow-lg border border-gray-200">
              <div className="p-0">
                <div className="flex items-center gap-4">
                  <Avatar 
                    image={user.photo_url} 
                    icon="pi pi-user" 
                    size="xlarge" 
                    shape="circle"
                  />
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-black mb-2">{user.first_name} {user.last_name}</h2>
                    <p className="font-mono bg-gray-100 px-2 py-1 rounded text-sm inline-block mb-1">ID: {user.id}</p>
                    {user.username && <p className="text-tg-blue font-medium">@{user.username}</p>}
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      )
    },
    {
      header: 'Действия',
      leftIcon: 'pi pi-cog',
      content: (
        <div>
          <h3 className="text-xl font-semibold mb-6">Доступные действия</h3>
          <div className="flex flex-col gap-4">
            <button 
              className="flex items-center justify-center gap-2 px-6 py-3 border-none rounded-lg font-medium cursor-pointer transition-all text-base bg-tg-blue text-white hover:bg-tg-blue-hover"
              onClick={() => alert('Основная кнопка нажата!')}
            >
              <i className="pi pi-check"></i>
              Основная кнопка
            </button>
            <button 
              className="flex items-center justify-center gap-2 px-6 py-3 border-none rounded-lg font-medium cursor-pointer transition-all text-base bg-gray-600 text-white hover:bg-gray-700"
              onClick={() => alert('Вторичная кнопка нажата!')}
            >
              <i className="pi pi-star"></i>
              Вторичная кнопка
            </button>
            <button 
              className="flex items-center justify-center gap-2 px-6 py-3 border-none rounded-lg font-medium cursor-pointer transition-all text-base bg-green-500 text-white hover:bg-green-600"
              onClick={() => alert('Успех!')}
            >
              <i className="pi pi-check-circle"></i>
              Успех
            </button>
            <button 
              className="flex items-center justify-center gap-2 px-6 py-3 border-none rounded-lg font-medium cursor-pointer transition-all text-base bg-yellow-500 text-white hover:bg-yellow-600"
              onClick={() => alert('Предупреждение!')}
            >
              <i className="pi pi-exclamation-triangle"></i>
              Предупреждение
            </button>
          </div>
        </div>
      )
    }
  ]

  const handleNavigationClick = (item: any) => {
    setCurrentPage(item.id)
  }

  console.log('HomePage rendered, tabs:', tabs)

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      {/* Основной контент с учетом status bar */}
      <div className="flex-1 overflow-y-auto" style={{ paddingTop: 'env(safe-area-inset-top, 0)' }}>
        <div className="p-4 pb-20">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">Telegram Mini App</h1>
            <p className="text-gray-600 text-base">Главная страница с компонентами</p>
          </div>

          {/* Простой тест */}
          <div className="bg-blue-100 p-5 m-5 border-2 border-blue-500 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Тест: HomePage работает!</h2>
            <p className="mb-1">Текущая страница: {currentPage}</p>
            <p className="mb-3">Пользователь: {user ? user.first_name : 'Нет пользователя'}</p>
            <button 
              onClick={() => alert('Кнопка работает!')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Тестовая кнопка
            </button>
          </div>

          {/* PrimeReact TabView */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <TabView 
              activeIndex={activeTab} 
              onTabChange={(e) => setActiveTab(e.index)}
              className="custom-tabview"
            >
              {tabs.map((tab, index) => (
                <TabPanel
                  key={index}
                  header={tab.header}
                  leftIcon={tab.leftIcon}
                >
                  {tab.content}
                </TabPanel>
              ))}
            </TabView>
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
