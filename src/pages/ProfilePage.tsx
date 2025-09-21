import React, { useState, useEffect } from 'react'
import { Avatar } from 'primereact/avatar'
import Button from '../components/Button'
import InputText from '../components/InputText'
import Checkbox from '../components/Checkbox'
import Sidebar from '../components/Sidebar'
import BottomNavigation from '../components/BottomNavigation'
import ReferralModal from '../components/ReferralModal'
import ReferralStatsModal from '../components/ReferralStatsModal'
import EmailActivationModal from '../components/EmailActivationModal'
import CodeConfirmationModal from '../components/CodeConfirmationModal'
import Toast from '../components/Toast'
import { useToast } from '../hooks/useToast'
import { User } from '../types/user'
import { apiClient } from '../services/api'

interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
}

interface ProfilePageProps {
  user: TelegramUser | null
  appUser?: User | null
  currentPage: string
  setCurrentPage: (page: string) => void
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, appUser, currentPage, setCurrentPage }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false)
  const [isReferralStatsModalOpen, setIsReferralStatsModalOpen] = useState(false)
  const [personalInfoModalVisible, setPersonalInfoModalVisible] = useState(false)
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
  const [isCodeConfirmationModalOpen, setIsCodeConfirmationModalOpen] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const { toast, showSuccess, showError, showInfo, hideToast } = useToast()
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [patronymic, setPatronymic] = useState('')
  const [passportSeries, setPassportSeries] = useState('')
  const [passportNumber, setPassportNumber] = useState('')
  const [registrationPlace, setRegistrationPlace] = useState('')
  const [consentChecked, setConsentChecked] = useState(true)

  // Логирование изменений состояния модальных окон
  useEffect(() => {
    console.log('🔍 ProfilePage state change - isEmailModalOpen:', isEmailModalOpen)
  }, [isEmailModalOpen])

  useEffect(() => {
    console.log('🔍 ProfilePage state change - isCodeConfirmationModalOpen:', isCodeConfirmationModalOpen)
  }, [isCodeConfirmationModalOpen])

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

  const handleReferralStatsClick = () => {
    setIsReferralStatsModalOpen(true)
  }

 

  const handlePersonalInfoSave = () => {
    setPersonalInfoModalVisible(false)
    showInfo('Информация сохранена')
  }

  const handleEmailSave = async (newEmail: string) => {
    try {
      console.log('📧 Сохранение email:', newEmail)
      setUserEmail(newEmail)
      setIsEmailModalOpen(false)
      setIsCodeConfirmationModalOpen(true)
      console.log('✅ EmailActivationModal закрыт, CodeConfirmationModal открыт')
    } catch (error) {
      console.error('❌ Ошибка при сохранении email:', error)
      showError('Ошибка при сохранении email')
    }
  }

  const handleCodeConfirmation = async (code: string) => {
    try {
      console.log('🔐 Подтверждение кода:', code, 'для email:', userEmail)

      if (!appUser?.telegram_id) {
        showError('Ошибка: не найден Telegram ID пользователя')
        return
      }

      // Обновляем email в базе данных
      const response = await apiClient.updateUserDataByTgId(appUser.telegram_id, {
        email: userEmail
      })

      if (response.success) {
        console.log('✅ Email успешно обновлен в БД:', response.data)
        setIsCodeConfirmationModalOpen(false)
        showSuccess('Email успешно подтвержден! Переходим к оплате...')
        console.log('🎉 Процесс подтверждения email завершен')

        // Переходим на главную страницу для оплаты
        setTimeout(() => {
          setCurrentPage('home')
          console.log('🔄 Переход на главную страницу для оплаты')
        }, 1500)
      } else {
        console.error('❌ Ошибка при обновлении email:', response.error)
        showError('Ошибка при сохранении email')
      }
    } catch (error) {
      console.error('❌ Ошибка при подтверждении кода:', error)
      showError('Ошибка при подтверждении кода')
    }
  }

  const handleEmailEditOpen = () => {
    console.log('🔧 Открытие модального окна редактирования email')
    setIsEmailModalOpen(true)
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
          onClick={() => {
            setSidebarVisible(false)
            console.log('Данные сохранены!')
          }}
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
          
          {/* Информация о пользователе из системы */}
          {appUser && (
            <div className="mt-2 text-center">
              <p className="text-gray-400 text-sm">ID в системе: {appUser.id}</p>
              <p className="text-gray-400 text-sm">Nick: {appUser.nick_name}</p>
              <p className="text-gray-400 text-sm">Telegram ID: {appUser.telegram_id}</p>
              <p className="text-gray-400 text-sm">Статус: {appUser.status}</p>
              {appUser.metadata?.last_activity && (
                <p className="text-gray-400 text-sm">
                  Последняя активность: {new Date(appUser.metadata.last_activity).toLocaleDateString()}
                </p>
              )}
            </div>
          )}
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
            
            <button 
              onClick={handleReferralStatsClick}
              className="w-full flex items-center gap-3 p-4 hover:bg-gray-700 transition-colors"
            >
              <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                <i className="pi pi-chart-bar text-white text-sm"></i>
              </div>
              <div className="flex-1 text-left">
                <h4 className="text-white font-medium">Реферальная статистика</h4>
              </div>
            </button>
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

      {/* Referral Stats Modal */}
      <ReferralStatsModal 
        isOpen={isReferralStatsModalOpen}
        onClose={() => setIsReferralStatsModalOpen(false)}
      />

      {/* Personal Information Modal */}
      {personalInfoModalVisible && (
        <div className="fixed inset-0 z-[100]">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setPersonalInfoModalVisible(false)}
          ></div>
          <div className="relative bg-gray-800 w-full h-full overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-white text-lg font-semibold">Личная информация</h2>
              <button 
                onClick={() => setPersonalInfoModalVisible(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <i className="pi pi-times text-xl"></i>
              </button>
            </div>
            
            <div className="p-6 space-y-4 pb-32">
              {/* Email */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="font-medium text-gray-300">Email</label>
                  <button 
                    onClick={handleEmailEditOpen}
                    className="text-yellow-400 text-sm hover:text-yellow-300 transition-colors"
                  >
                    Edit
                  </button>
                </div>
                <InputText
                  disabled
                  value={appUser?.metadata?.email || 'Email не подтвержден'}
                  className="w-full bg-gray-600 text-gray-400 border-gray-500 cursor-not-allowed personal-info-input"
                />
              </div>

              {/* Фамилия */}
              <div>
                <label className="block mb-2 font-medium text-gray-300">Фамилия</label>
                <InputText
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Введите свою фамилию"
                  className="w-full bg-gray-700 text-white border-gray-600 focus:border-yellow-400 personal-info-input"
                />
              </div>

              {/* Имя */}
              <div>
                <label className="block mb-2 font-medium text-gray-300">Имя</label>
                <InputText
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Введите своё имя"
                  className="w-full bg-gray-700 text-white border-gray-600 focus:border-yellow-400 personal-info-input"
                />
              </div>

              {/* Отчество */}
              <div>
                <label className="block mb-2 font-medium text-gray-300">Отчество</label>
                <InputText
                  value={patronymic}
                  onChange={(e) => setPatronymic(e.target.value)}
                  placeholder="Введите своё отчество"
                  className="w-full bg-gray-700 text-white border-gray-600 focus:border-yellow-400 personal-info-input"
                />
              </div>

              {/* Серия паспорта */}
              <div>
                <label className="block mb-2 font-medium text-gray-300">Серия паспорта</label>
                <InputText
                  value={passportSeries}
                  onChange={(e) => setPassportSeries(e.target.value)}
                  placeholder="Введите серию паспорта"
                  className="w-full bg-gray-700 text-white border-gray-600 focus:border-yellow-400 personal-info-input"
                />
              </div>

              {/* Номер паспорта */}
              <div>
                <label className="block mb-2 font-medium text-gray-300">Номер паспорта</label>
                <InputText
                  value={passportNumber}
                  onChange={(e) => setPassportNumber(e.target.value)}
                  placeholder="Введите номер паспорта"
                  className="w-full bg-gray-700 text-white border-gray-600 focus:border-yellow-400 personal-info-input"
                />
              </div>

              {/* Место регистрации */}
              <div>
                <label className="block mb-2 font-medium text-gray-300">Место регистрации</label>
                <InputText
                  value={registrationPlace}
                  onChange={(e) => setRegistrationPlace(e.target.value)}
                  placeholder="Введите место регистрации"
                  className="w-full bg-gray-700 text-white border-gray-600 focus:border-yellow-400 personal-info-input"
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

            </div>
            
            {/* Кнопка сохранения - фиксированная внизу */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-gray-800 border-t border-gray-700">
              <button 
                onClick={handlePersonalInfoSave}
                className="w-full bg-yellow-400 text-black font-semibold py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors"
                style={{ height: '54px' }}
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Email Edit Modal */}
      <EmailActivationModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        onNext={handleEmailSave}
      />

      {/* Code Confirmation Modal */}
      <CodeConfirmationModal 
        isOpen={isCodeConfirmationModalOpen}
        onClose={() => setIsCodeConfirmationModalOpen(false)}
        onConfirm={handleCodeConfirmation}
        onResend={() => {
          // TODO: Реализовать повторную отправку кода
          showInfo('Код отправлен повторно')
        }}
        email={userEmail}
      />

      {/* Toast Notification */}
      <Toast
        type={toast.type}
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={hideToast}
        duration={8000}
      />
    </div>
  )
}

export default ProfilePage

