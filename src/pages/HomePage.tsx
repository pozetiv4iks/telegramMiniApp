import React, { useState } from 'react'
import { Card } from 'primereact/card'
import { Avatar } from 'primereact/avatar'
import BottomNavigation from '../components/BottomNavigation'
import '../components/BottomNavigation.css'
import './Pages.css'

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
    { id: 'home', label: 'Главная', icon: 'pi pi-home', path: '/', active: currentPage === 'home' },
    { id: 'history', label: 'История', icon: 'pi pi-history', path: '/history', active: currentPage === 'history' },
    { id: 'profile', label: 'Профиль', icon: 'pi pi-user', path: '/profile', active: currentPage === 'profile' }
  ]

  const tabs = [
    {
      header: 'Основная информация',
      icon: 'pi pi-info-circle',
      content: (
        <div className="tab-content">
          <h3>Добро пожаловать в Telegram Mini App!</h3>
          <p>Это главная страница с различными компонентами PrimeReact.</p>
          
          <div className="form-section">
            <h4>Форма ввода</h4>
            <div className="form-group">
              <label>Текстовое поле:</label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Введите текст..."
                className="form-input w-full"
              />
            </div>
            
            <div className="form-group">
              <label>Числовое поле:</label>
              <input
                type="number"
                value={numberValue || ''}
                onChange={(e) => setNumberValue(e.target.value ? Number(e.target.value) : null)}
                placeholder="Введите число..."
                className="form-input w-full"
              />
            </div>
            
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={checkboxValue}
                  onChange={(e) => setCheckboxValue(e.target.checked)}
                  className="form-checkbox"
                />
                Согласен с условиями
              </label>
            </div>
            
            <div className="form-group">
              <label>Выпадающий список:</label>
              <select
                value={dropdownValue || ''}
                onChange={(e) => setDropdownValue(e.target.value)}
                className="form-select w-full"
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
      )
    },
    {
      header: 'Пользователь',
      icon: 'pi pi-user',
      content: (
        <div className="tab-content">
          {user && (
            <Card className="user-card">
              <div className="user-info">
                <div className="user-header">
                  <Avatar 
                    image={user.photo_url} 
                    icon="pi pi-user" 
                    size="xlarge" 
                    shape="circle"
                  />
                  <div className="user-details">
                    <h2>{user.first_name} {user.last_name}</h2>
                    <p className="user-id">ID: {user.id}</p>
                    {user.username && <p className="user-username">@{user.username}</p>}
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
      icon: 'pi pi-cog',
      content: (
        <div className="tab-content">
          <h3>Доступные действия</h3>
          <div className="button-group">
            <button 
              className="btn btn-primary w-full"
              onClick={() => alert('Основная кнопка нажата!')}
            >
              <i className="pi pi-check"></i>
              Основная кнопка
            </button>
            <button 
              className="btn btn-secondary w-full"
              onClick={() => alert('Вторичная кнопка нажата!')}
            >
              <i className="pi pi-star"></i>
              Вторичная кнопка
            </button>
            <button 
              className="btn btn-success w-full"
              onClick={() => alert('Успех!')}
            >
              <i className="pi pi-check-circle"></i>
              Успех
            </button>
            <button 
              className="btn btn-warning w-full"
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
    <div className="home-page">
      <div className="page-content">
        <div className="page-header">
          <h1>Telegram Mini App</h1>
          <p>Главная страница с компонентами</p>
        </div>

        {/* Простой тест */}
        <div style={{ background: 'lightblue', padding: '20px', margin: '20px', border: '2px solid blue' }}>
          <h2>Тест: HomePage работает!</h2>
          <p>Текущая страница: {currentPage}</p>
          <p>Пользователь: {user ? user.first_name : 'Нет пользователя'}</p>
          <button onClick={() => alert('Кнопка работает!')}>
            Тестовая кнопка
          </button>
        </div>

        {/* Простой TabView */}
        <div className="simple-tabview">
          <div className="tab-headers">
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={`tab-header ${activeTab === index ? 'active' : ''}`}
                onClick={() => setActiveTab(index)}
              >
                {tab.icon && <i className={tab.icon}></i>}
                {tab.header}
              </button>
            ))}
          </div>
          <div className="tab-content">
            {tabs[activeTab] && tabs[activeTab].content}
          </div>
        </div>
      </div>

      <BottomNavigation
        items={navigationItems}
        onItemClick={handleNavigationClick}
      />
    </div>
  )
}

export default HomePage
