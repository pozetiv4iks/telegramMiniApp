import React, { useState } from 'react'
import { Avatar } from 'primereact/avatar'
import Button from '../components/Button'
import InputText from '../components/InputText'
import Checkbox from '../components/Checkbox'
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
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false)
  const [personalInfoModalVisible, setPersonalInfoModalVisible] = useState(false)
  const [email, setEmail] = useState('test@gmail.com')
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [patronymic, setPatronymic] = useState('')
  const [passportSeries, setPassportSeries] = useState('')
  const [passportNumber, setPassportNumber] = useState('')
  const [registrationPlace, setRegistrationPlace] = useState('')
  const [consentChecked, setConsentChecked] = useState(true)


  const navigationItems = [
    { id: 'home', label: 'Главная', icon: 'pi pi-home', path: '/', active: currentPage === 'home' },
    { id: 'history', label: 'История', icon: 'pi pi-history', path: '/history', active: currentPage === 'history' },
    { id: 'profile', label: 'Профиль', icon: 'pi pi-user', path: '/profile', active: currentPage === 'profile' }
  ]

  const handleNavigationClick = (item: any) => {
    setCurrentPage(item.id)
  }

  const handlePersonalInfoClick = () => {
    setPersonalInfoModalVisible(true)
  }

  const handleSave = () => {
    setSidebarVisible(false)
    // Здесь можно добавить логику сохранения данных
    alert('Данные сохранены!')
  }

  const handlePersonalInfoSave = () => {
    setPersonalInfoModalVisible(false)
    alert('Личная информация сохранена!')
  }

  const sidebarContent = (
    <div className="p-4 bg-gray-800 h-full">
      <h2 className="text-2xl font-semibold text-white mb-6">Редактировать профиль</h2>
      
      <div className="mt-6">
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-300">ID (неизменяемый):</label>
          <InputText
            value={user?.id?.toString() || ''}
            disabled
            className="w-full bg-gray-600 text-gray-400 border-gray-500 cursor-not-allowed"
          />
        </div>
        
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
                  <label className="block mb-2 font-medium text-gray-300">Email:</label>
                  <InputText
                    value={email}
                    disabled
                    placeholder="Введите email"
                    className="w-full bg-gray-600 text-gray-400 border-gray-500 cursor-not-allowed"
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
      <div className="flex-1 overflow-y-auto" style={{ paddingTop: 'env(safe-area-inset-top, 0)', paddingBottom: '110px' }}>
        <div className="p-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Профиль</h1>
          <p className="text-gray-300 text-sm">Управление настройками</p>
        </div>

        {/* Профиль пользователя */}
        <div className="text-center mb-8">
          <div className="w-32 h-32 rounded-lg mx-auto mb-4 flex items-center justify-center">
            <Avatar 
              image={user?.photo_url} 
              icon="pi pi-user" 
              size="xlarge" 
              shape="circle"
              className="bg-gray-600 text-white"
              style={{ width: '120px', height: '120px', fontSize: '48px' }}
            />
          </div>
          <h2 className="text-white text-lg font-medium">{user?.first_name} {user?.last_name}</h2>
        </div>

        {/* Меню профиля */}
        <div className="mb-6">
          <div className="bg-gray-800 rounded-lg">
                    <button 
                      onClick={handlePersonalInfoClick}
                      className="w-full flex items-center gap-3 p-4 border-b border-gray-700 hover:bg-gray-700 transition-colors"
                    >
                      <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                        <i className="pi pi-user-edit text-white text-sm"></i>
                      </div>
                      <div className="flex-1 text-left">
                        <h4 className="text-white font-medium">Личная информация</h4>
                      </div>
                    </button>
            
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

      <BottomNavigation
        items={navigationItems}
        onItemClick={handleNavigationClick}
      />

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

      {/* Personal Information Modal */}
      {personalInfoModalVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setPersonalInfoModalVisible(false)}
          ></div>
          <div className="relative bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-lg font-semibold">Личная информация</h2>
              <button 
                onClick={() => setPersonalInfoModalVisible(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <i className="pi pi-times text-xl"></i>
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Email */}
              <div>
                <label className="block mb-2 font-medium text-gray-300">Email</label>
                <InputText
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-700 text-white border-gray-600 focus:border-yellow-400"
                />
              </div>

              {/* Фамилия */}
              <div>
                <label className="block mb-2 font-medium text-gray-300">Фамилия</label>
                <InputText
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Введите свою фамилию"
                  className="w-full bg-gray-700 text-white border-gray-600 focus:border-yellow-400"
                />
              </div>

              {/* Имя */}
              <div>
                <label className="block mb-2 font-medium text-gray-300">Имя</label>
                <InputText
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Введите своё имя"
                  className="w-full bg-gray-700 text-white border-gray-600 focus:border-yellow-400"
                />
              </div>

              {/* Отчество */}
              <div>
                <label className="block mb-2 font-medium text-gray-300">Отчество</label>
                <InputText
                  value={patronymic}
                  onChange={(e) => setPatronymic(e.target.value)}
                  placeholder="Введите своё отчество"
                  className="w-full bg-gray-700 text-white border-gray-600 focus:border-yellow-400"
                />
              </div>

              {/* Серия паспорта */}
              <div>
                <label className="block mb-2 font-medium text-gray-300">Серия паспорта</label>
                <InputText
                  value={passportSeries}
                  onChange={(e) => setPassportSeries(e.target.value)}
                  placeholder="Введите серию паспорта"
                  className="w-full bg-gray-700 text-white border-gray-600 focus:border-yellow-400"
                />
              </div>

              {/* Номер паспорта */}
              <div>
                <label className="block mb-2 font-medium text-gray-300">Номер паспорта</label>
                <InputText
                  value={passportNumber}
                  onChange={(e) => setPassportNumber(e.target.value)}
                  placeholder="Введите номер паспорта"
                  className="w-full bg-gray-700 text-white border-gray-600 focus:border-yellow-400"
                />
              </div>

              {/* Место регистрации */}
              <div>
                <label className="block mb-2 font-medium text-gray-300">Место регистрации</label>
                <InputText
                  value={registrationPlace}
                  onChange={(e) => setRegistrationPlace(e.target.value)}
                  placeholder="Введите место регистрации"
                  className="w-full bg-gray-700 text-white border-gray-600 focus:border-yellow-400"
                />
              </div>

              {/* Согласие на обработку данных */}
              <div className="flex items-center gap-2 mt-6">
                <Checkbox
                  checked={consentChecked}
                  onChange={(e) => setConsentChecked(e.target.checked)}
                  className="custom-checkbox"
                />
                <span className="text-gray-300 text-sm">
                  Даю согласие на <strong>Обработку персональных данных</strong>
                </span>
              </div>

              {/* Кнопка сохранения */}
              <button 
                onClick={handlePersonalInfoSave}
                className="w-full bg-yellow-400 text-black font-semibold py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors mt-6"
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfilePage

