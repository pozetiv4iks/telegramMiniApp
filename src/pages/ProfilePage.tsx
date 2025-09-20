import React, { useState } from 'react'
import { Avatar } from 'primereact/avatar'
import Button from '../components/Button'
import InputText from '../components/InputText'
import Dropdown from '../components/Dropdown'
import Sidebar from '../components/Sidebar'
import BottomNavigation from '../components/BottomNavigation'
import ReferralModal from '../components/ReferralModal'

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
  const [language, setLanguage] = useState('ru')
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false)

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

  const sidebarContent = (
    <div className="p-4 bg-gray-800 h-full">
      <h2 className="text-2xl font-semibold text-white mb-6">Редактировать профиль</h2>
      
      <div className="mt-6">
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-300">Имя:</label>
          <InputText
            value={user?.first_name || ''}
            placeholder="Введите имя"
            className="w-full bg-gray-700 text-white border-gray-600 focus:border-yellow-400"
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-300">Фамилия:</label>
          <InputText
            value={user?.last_name || ''}
            placeholder="Введите фамилию"
            className="w-full bg-gray-700 text-white border-gray-600 focus:border-yellow-400"
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-300">Username:</label>
          <InputText
            value={user?.username || ''}
            placeholder="Введите username"
            className="w-full bg-gray-700 text-white border-gray-600 focus:border-yellow-400"
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-300">Язык:</label>
          <Dropdown
            value={language}
            onChange={(e) => setLanguage(e.value)}
            options={languageOptions}
            className="w-full bg-gray-700 text-white border-gray-600 focus:border-yellow-400"
          />
        </div>
      </div>
      
      <div className="flex flex-col gap-3 mt-8">
        <Button 
          label="Сохранить" 
          icon="pi pi-check"
          className="w-full bg-yellow-400 text-black hover:bg-yellow-500"
        />
        <Button 
          label="Отмена" 
          icon="pi pi-times"
          severity="secondary"
          outlined
          className="w-full text-white border-gray-600 hover:bg-gray-700"
          onClick={() => setSidebarVisible(false)}
        />
      </div>
    </div>
  )

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ backgroundColor: '#111827' }}>
      <div className="flex-1 overflow-y-auto" style={{ paddingTop: 'env(safe-area-inset-top, 0)' }}>
        <div className="p-4 pb-20">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Профиль</h1>
          <p className="text-gray-300 text-sm">Управление настройками</p>
        </div>

        {/* Профиль пользователя */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gray-700 rounded-lg mx-auto mb-4 flex items-center justify-center">
            <Avatar 
              image={user?.photo_url} 
              icon="pi pi-user" 
              size="xlarge" 
              shape="circle"
              className="bg-gray-600 text-white"
            />
          </div>
          <h2 className="text-white text-lg font-medium">{user?.first_name} {user?.last_name}</h2>
        </div>

        {/* Меню профиля */}
        <div className="mb-6">
          <div className="bg-gray-800 rounded-lg">
            <div className="flex items-center gap-3 p-4 border-b border-gray-700">
              <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                <i className="pi pi-user-edit text-white text-sm"></i>
              </div>
              <div className="flex-1">
                <h4 className="text-white font-medium">Личная информация</h4>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 border-b border-gray-700">
              <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                <i className="pi pi-phone text-white text-sm"></i>
              </div>
              <div className="flex-1">
                <h4 className="text-white font-medium">Поддержка</h4>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4">
              <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                <i className="pi pi-chart-bar text-white text-sm"></i>
              </div>
              <div className="flex-1">
                <h4 className="text-white font-medium">Реферальная статистика</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Реферальная программа */}
        <button 
          onClick={() => setIsReferralModalOpen(true)}
          className="w-full bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <i className="pi pi-users text-gray-800 text-lg"></i>
            </div>
            <div className="flex-1 text-left">
              <h4 className="text-white font-medium mb-1">Приглашай друзей и получай бонусы!</h4>
              <p className="text-gray-400 text-sm">Твоя персональная ссылка здесь</p>
            </div>
          </div>
        </button>
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
        className="w-full md:w-30rem bg-gray-800 text-white"
      >
        {sidebarContent}
      </Sidebar>

      {/* Referral Modal */}
      <ReferralModal 
        isOpen={isReferralModalOpen}
        onClose={() => setIsReferralModalOpen(false)}
      />
    </div>
  )
}

export default ProfilePage

