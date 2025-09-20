import React, { useState } from 'react'
import { Card } from 'primereact/card'
import { Avatar } from 'primereact/avatar'
import Button from '../components/Button'
import InputText from '../components/InputText'
import Checkbox from '../components/Checkbox'
import Dropdown from '../components/Dropdown'
import Sidebar from '../components/Sidebar'
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

interface ProfilePageProps {
  user: User | null
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  const { currentPage, setCurrentPage } = useNavigation()
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState('ru')

  const languageOptions = [
    { label: 'Русский', value: 'ru' },
    { label: 'English', value: 'en' },
    { label: 'Español', value: 'es' }
  ]

  const navigationItems = [
    { id: 'home', label: 'Главная', icon: 'pi pi-home', path: '/', active: currentPage === 'home' },
    { id: 'history', label: 'История', icon: 'pi pi-history', path: '/history', active: currentPage === 'history' },
    { id: 'profile', label: 'Профиль', icon: 'pi pi-user', path: '/profile', active: currentPage === 'profile' }
  ]

  const handleNavigationClick = (item: any) => {
    setCurrentPage(item.id)
  }

  const handleEditProfile = () => {
    setSidebarVisible(true)
  }

  const sidebarContent = (
    <div className="sidebar-content">
      <h2>Редактировать профиль</h2>
      
      <div className="form-section">
        <div className="form-group">
          <label>Имя:</label>
          <InputText
            value={user?.first_name || ''}
            placeholder="Введите имя"
            className="w-full"
          />
        </div>
        
        <div className="form-group">
          <label>Фамилия:</label>
          <InputText
            value={user?.last_name || ''}
            placeholder="Введите фамилию"
            className="w-full"
          />
        </div>
        
        <div className="form-group">
          <label>Username:</label>
          <InputText
            value={user?.username || ''}
            placeholder="Введите username"
            className="w-full"
          />
        </div>
        
        <div className="form-group">
          <label>Язык:</label>
          <Dropdown
            value={language}
            onChange={(e) => setLanguage(e.value)}
            options={languageOptions}
            className="w-full"
          />
        </div>
      </div>
      
      <div className="sidebar-actions">
        <Button 
          label="Сохранить" 
          icon="pi pi-check"
          className="w-full"
        />
        <Button 
          label="Отмена" 
          icon="pi pi-times"
          severity="secondary"
          outlined
          className="w-full"
          onClick={() => setSidebarVisible(false)}
        />
      </div>
    </div>
  )

  return (
    <div className="profile-page">
      <div className="page-content">
        <div className="page-header">
          <h1>Профиль</h1>
          <p>Управление настройками</p>
        </div>

        {/* Профиль пользователя */}
        <Card className="profile-card">
          <div className="profile-header">
            <Avatar 
              image={user?.photo_url} 
              icon="pi pi-user" 
              size="xlarge" 
              shape="circle"
            />
            <div className="profile-info">
              <h2>{user?.first_name} {user?.last_name}</h2>
              <p className="profile-username">@{user?.username}</p>
              <p className="profile-id">ID: {user?.id}</p>
            </div>
            <Button 
              icon="pi pi-pencil"
              size="small"
              outlined
              onClick={handleEditProfile}
            />
          </div>
        </Card>

        {/* Настройки */}
        <Card className="settings-card">
          <h3>Настройки</h3>
          
          <div className="settings-list">
            <div className="setting-item">
              <div className="setting-info">
                <h4>Уведомления</h4>
                <p>Получать push-уведомления</p>
              </div>
              <Checkbox
                checked={notifications}
                onChange={(e) => setNotifications(e.checked || false)}
              />
            </div>
            
            <div className="setting-item">
              <div className="setting-info">
                <h4>Темная тема</h4>
                <p>Использовать темную тему</p>
              </div>
              <Checkbox
                checked={darkMode}
                onChange={(e) => setDarkMode(e.checked || false)}
              />
            </div>
            
            <div className="setting-item">
              <div className="setting-info">
                <h4>Язык</h4>
                <p>Выберите язык интерфейса</p>
              </div>
              <Dropdown
                value={language}
                onChange={(e) => setLanguage(e.value)}
                options={languageOptions}
                className="language-dropdown"
              />
            </div>
          </div>
        </Card>

        {/* Действия */}
        <Card className="actions-card">
          <h3>Действия</h3>
          
          <div className="actions-list">
            <Button 
              label="Поделиться приложением" 
              icon="pi pi-share-alt"
              outlined
              className="w-full action-button"
            />
            <Button 
              label="Скопировать ссылку" 
              icon="pi pi-copy"
              outlined
              className="w-full action-button"
            />
            <Button 
              label="О приложении" 
              icon="pi pi-info-circle"
              outlined
              className="w-full action-button"
            />
            <Button 
              label="Выйти" 
              icon="pi pi-sign-out"
              severity="danger"
              outlined
              className="w-full action-button"
            />
          </div>
        </Card>
      </div>

      <BottomNavigation
        items={navigationItems}
        onItemClick={handleNavigationClick}
      />

      <Sidebar
        visible={sidebarVisible}
        onHide={() => setSidebarVisible(false)}
        position="right"
        className="profile-sidebar"
      >
        {sidebarContent}
      </Sidebar>
    </div>
  )
}

export default ProfilePage
