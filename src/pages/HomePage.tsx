import React, { useState } from 'react'
import { Card } from 'primereact/card'
import { Avatar } from 'primereact/avatar'
import Button from '../components/Button'
import InputText from '../components/InputText'
import InputNumber from '../components/InputNumber'
import Checkbox from '../components/Checkbox'
import Dropdown from '../components/Dropdown'
import TabView from '../components/TabView'
import BottomNavigation from '../components/BottomNavigation'
import { useNavigation } from '../contexts/NavigationContext'
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
}

const HomePage: React.FC<HomePageProps> = ({ user }) => {
  const { currentPage, setCurrentPage } = useNavigation()
  const [inputValue, setInputValue] = useState('')
  const [numberValue, setNumberValue] = useState<number | null>(null)
  const [checkboxValue, setCheckboxValue] = useState(false)
  const [dropdownValue, setDropdownValue] = useState(null)

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
              <InputText
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Введите текст..."
                className="w-full"
              />
            </div>
            
            <div className="form-group">
              <label>Числовое поле:</label>
              <InputNumber
                value={numberValue || undefined}
                onChange={(e) => setNumberValue(e.value || null)}
                placeholder="Введите число..."
                className="w-full"
                mode="currency"
                currency="RUB"
                locale="ru-RU"
              />
            </div>
            
            <div className="form-group">
              <Checkbox
                checked={checkboxValue}
                onChange={(e) => setCheckboxValue(e.checked || false)}
                label="Согласен с условиями"
                id="checkbox1"
              />
            </div>
            
            <div className="form-group">
              <label>Выпадающий список:</label>
              <Dropdown
                value={dropdownValue}
                onChange={(e) => setDropdownValue(e.value)}
                options={dropdownOptions}
                placeholder="Выберите опцию..."
                className="w-full"
                filter
                showClear
              />
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
            <Button 
              label="Основная кнопка" 
              icon="pi pi-check" 
              className="w-full"
            />
            <Button 
              label="Вторичная кнопка" 
              icon="pi pi-star" 
              severity="secondary"
              className="w-full"
            />
            <Button 
              label="Успех" 
              icon="pi pi-check-circle" 
              severity="success"
              className="w-full"
            />
            <Button 
              label="Предупреждение" 
              icon="pi pi-exclamation-triangle" 
              severity="warning"
              className="w-full"
            />
          </div>
        </div>
      )
    }
  ]

  const handleNavigationClick = (item: any) => {
    setCurrentPage(item.id)
  }

  return (
    <div className="home-page">
      <div className="page-content">
        <div className="page-header">
          <h1>Telegram Mini App</h1>
          <p>Главная страница с компонентами</p>
        </div>

        <TabView 
          tabs={tabs}
          className="main-tabs"
        />
      </div>

      <BottomNavigation
        items={navigationItems}
        onItemClick={handleNavigationClick}
      />
    </div>
  )
}

export default HomePage
