import React, { useState } from 'react'
import { Card } from 'primereact/card'
import { Avatar } from 'primereact/avatar'
import Button from '../components/Button'
import InputText from '../components/InputText'
import Checkbox from '../components/Checkbox'
import Dropdown from '../components/Dropdown'
import Sidebar from '../components/Sidebar'
import BottomNavigation from '../components/BottomNavigation'

interface User {
  id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
}

interface ProfilePageProps {
  user: User | null
  currentPage: string
  setCurrentPage: (page: string) => void
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, currentPage, setCurrentPage }) => {
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
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-black mb-6">Редактировать профиль</h2>
      
      <div className="mt-6">
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">Имя:</label>
          <InputText
            value={user?.first_name || ''}
            placeholder="Введите имя"
            className="w-full"
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">Фамилия:</label>
          <InputText
            value={user?.last_name || ''}
            placeholder="Введите фамилию"
            className="w-full"
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">Username:</label>
          <InputText
            value={user?.username || ''}
            placeholder="Введите username"
            className="w-full"
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">Язык:</label>
          <Dropdown
            value={language}
            onChange={(e) => setLanguage(e.value)}
            options={languageOptions}
            className="w-full"
          />
        </div>
      </div>
      
      <div className="flex flex-col gap-3 mt-8">
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
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      <div className="flex-1 overflow-y-auto" style={{ paddingTop: 'env(safe-area-inset-top, 0)' }}>
        <div className="p-4 pb-20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Профиль</h1>
          <p className="text-gray-600 text-base">Управление настройками</p>
        </div>

        {/* Профиль пользователя */}
        <Card className="mb-6 shadow-lg border border-gray-200">
          <div className="flex items-center gap-4">
            <Avatar 
              image={user?.photo_url} 
              icon="pi pi-user" 
              size="xlarge" 
              shape="circle"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-black mb-1">{user?.first_name} {user?.last_name}</h2>
              <p className="text-tg-blue font-medium mb-1">@{user?.username}</p>
              <p className="text-gray-600 text-sm">ID: {user?.id}</p>
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
        <Card className="mb-6 shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-black mb-4">Настройки</h3>
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex-1">
                <h4 className="text-base font-medium text-black mb-1">Уведомления</h4>
                <p className="text-sm text-gray-600">Получать push-уведомления</p>
              </div>
              <Checkbox
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
              />
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex-1">
                <h4 className="text-base font-medium text-black mb-1">Темная тема</h4>
                <p className="text-sm text-gray-600">Использовать темную тему</p>
              </div>
              <Checkbox
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
              />
            </div>
            
            <div className="flex items-center justify-between py-3">
              <div className="flex-1">
                <h4 className="text-base font-medium text-black mb-1">Язык</h4>
                <p className="text-sm text-gray-600">Выберите язык интерфейса</p>
              </div>
              <Dropdown
                value={language}
                onChange={(e) => setLanguage(e.value)}
                options={languageOptions}
                className="min-w-[120px]"
              />
            </div>
          </div>
        </Card>

        {/* Действия */}
        <Card className="shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-black mb-4">Действия</h3>
          
          <div className="flex flex-col gap-3">
            <Button 
              label="Поделиться приложением" 
              icon="pi pi-share-alt"
              outlined
              className="w-full justify-start"
            />
            <Button 
              label="Скопировать ссылку" 
              icon="pi pi-copy"
              outlined
              className="w-full justify-start"
            />
            <Button 
              label="О приложении" 
              icon="pi pi-info-circle"
              outlined
              className="w-full justify-start"
            />
            <Button 
              label="Выйти" 
              icon="pi pi-sign-out"
              severity="danger"
              outlined
              className="w-full justify-start"
            />
          </div>
        </Card>
        </div>
      </div>

      <div style={{ paddingBottom: 'env(safe-area-inset-bottom, 0)' }}>
        <BottomNavigation
          items={navigationItems}
          onItemClick={handleNavigationClick}
        />
      </div>

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
