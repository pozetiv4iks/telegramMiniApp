import React, { useState, useCallback } from 'react'
import { Button } from 'primereact/button'
import WebApp from '@twa-dev/sdk'
import ReferralModal from '../components/ReferralModal'
import CardIssueModal from '../components/CardIssueModal'
import EmailActivationModal from '../components/EmailActivationModal'
import CodeConfirmationModal from '../components/CodeConfirmationModal'
import TopUpModal from '../components/TopUpModal'
import CardManagementModal from '../components/CardManagementModal'
import PaymentModal from '../components/PaymentModal'
import { User } from '../types/user'
import { apiClient, Card } from '../services/api'

interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
}

interface HomePageProps {
  user: TelegramUser | null
  appUser?: User | null
  isNewUser?: boolean
  onCloseModals?: (closeFunction: () => void) => void
}


const HomePage: React.FC<HomePageProps> = ({ user, appUser, isNewUser, onCloseModals }) => {
  // Используем user для отображения имени в заголовке
  const userName = user?.first_name || 'Пользователь'
  
  // Логируем информацию о пользователе
  React.useEffect(() => {
    if (appUser) {
      console.log('🏠 HomePage: Данные пользователя из системы:', {
        id: appUser.id,
        nick_name: appUser.nick_name,
        telegram_id: appUser.telegram_id,
        isNewUser: isNewUser,
        status: appUser.status
      })
      
      if (isNewUser) {
        console.log('🎉 Добро пожаловать, новый пользователь!')
      }
    }
  }, [appUser, isNewUser])
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false)
  const [isCardIssueModalOpen, setIsCardIssueModalOpen] = useState(false)
  const [isEmailActivationModalOpen, setIsEmailActivationModalOpen] = useState(false)
  const [isCodeConfirmationModalOpen, setIsCodeConfirmationModalOpen] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  // const [isUserRegistered, setIsUserRegistered] = useState(false) // Состояние регистрации пользователя
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false)
  const [isCardManagementModalOpen, setIsCardManagementModalOpen] = useState(false)
  const [selectedCardIndex, setSelectedCardIndex] = useState(0)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [paymentAmount, setPaymentAmount] = useState(0)
  const [userCards, setUserCards] = useState<Card[]>([])
  const [isLoadingCards, setIsLoadingCards] = useState(false)
  
  // Функция получения карт пользователя
  const fetchUserCards = async () => {
    try {
      setIsLoadingCards(true)
      console.log('🃏 Получение карт пользователя...')
      
      const response = await apiClient.getCards({
        program_id: 'bbcaff9a-dfdc-4274-a8e5-b65733b8a4e7' // Используем заглушку program_id
      })
      
      if (response.success && response.data) {
        console.log('✅ Карты получены:', response.data)
        setUserCards(response.data)
      } else {
        console.error('❌ Ошибка при получении карт:', response.error)
        setUserCards([])
      }
    } catch (error) {
      console.error('❌ Ошибка при получении карт:', error)
      setUserCards([])
    } finally {
      setIsLoadingCards(false)
    }
  }
  
  // Функция закрытия всех модалок
  const closeAllModals = useCallback(() => {
    setIsReferralModalOpen(false)
    setIsCardIssueModalOpen(false)
    setIsEmailActivationModalOpen(false)
    setIsCodeConfirmationModalOpen(false)
    setIsTopUpModalOpen(false)
    setIsCardManagementModalOpen(false)
    setIsPaymentModalOpen(false)
  }, [])
  
  // Передаем функцию закрытия модалок в родительский компонент
  React.useEffect(() => {
    if (onCloseModals) {
      onCloseModals(closeAllModals)
    }
  }, [onCloseModals, closeAllModals])
  

  // Функция для тестирования Telegram WebApp API
  const testTelegramAPI = () => {
    try {
      const userInfo = WebApp.initDataUnsafe?.user
      const platform = WebApp.platform
      const version = WebApp.version
      const theme = WebApp.colorScheme
      
      console.log(`Telegram WebApp Info:
Пользователь: ${userInfo ? `${userInfo.first_name} ${userInfo.last_name || ''}` : 'Не определен'}
Платформа: ${platform}
Версия: ${version}
Тема: ${theme}
Готов: ${WebApp.isExpanded ? 'Да' : 'Нет'}`)
    } catch (error) {
      console.error('Ошибка при получении данных Telegram WebApp: ' + error)
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
            <p className="text-gray-300 text-sm">Добро пожаловать, {userName}!</p>
            
            {/* Приветственное сообщение для новых пользователей */}
            {isNewUser && (
              <div className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                <p className="text-green-400 text-sm font-medium">
                  🎉 Добро пожаловать в наше приложение!
                </p>
                <p className="text-green-300 text-xs mt-1">
                  Ваш аккаунт успешно создан в системе
                </p>
              </div>
            )}
          </div>

          {/* Список карточек */}
          <div className="space-y-4 mb-6">
            {/* Карточка для добавления новой карты */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                {/* Иконка карты */}
                <div className="w-16 h-10 mr-4 flex items-center justify-center">
                  <i className="pi pi-credit-card text-gray-400 text-2xl"></i>
                </div>
                
                {/* Информация о карте */}
                <div className="flex-1">
                  <h3 className="text-white text-lg font-medium">Виртуальная карта</h3>
                  <p className="text-gray-300 text-sm">Mastercard , Visa</p>
                  <div className="flex items-center mt-2">
                    <span className="text-gray-300 text-sm">Стоимость:</span>
                    <span className="text-white text-xl font-bold ml-2">$10</span>
                  </div>
                </div>
              </div>
              
              {/* Кнопка действия */}
              <button 
                onClick={() => setIsCardIssueModalOpen(true)}
                className="w-full bg-yellow-400 text-black font-semibold py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors"
              >
                Выбрать карту
              </button>
            </div>

            {userCards.map((card) => (
              <div key={card.id} className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  {/* Иконка карты */}
                  <div className="w-16 h-10 mr-4 flex items-center justify-center">
                    <i className="pi pi-credit-card text-white text-2xl"></i>
                  </div>
                  
                  {/* Информация о карте */}
                  <div className="flex-1">
                    <h3 className="text-white text-lg font-medium">{card.title}</h3>
                    <p className="text-gray-300 text-sm">{card.brand} •••• {card.last4}</p>
                    <p className="text-gray-400 text-xs">Истекает: {card.expiration_date_short}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-gray-300 text-sm">Баланс:</span>
                      <span className="text-white text-xl font-bold ml-2">${card.spent_amount}</span>
                    </div>
                  </div>
                </div>
                
                {/* Кнопка действия */}
                <button 
                  onClick={() => {
                    if (card.status === 'ACTIVE') {
                      // Находим индекс активной карты
                      const activeCards = userCards.filter(c => c.status === 'ACTIVE')
                      const cardIndex = activeCards.findIndex(c => c.id === card.id)
                      setSelectedCardIndex(cardIndex)
                      setIsCardManagementModalOpen(true)
                    } else {
                      console.log('Карта неактивна!')
                    }
                  }}
                  className="w-full bg-yellow-400 text-black font-semibold py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors"
                >
                  {card.status === 'ACTIVE' ? 'Управлять картой' : 'Активировать'}
                </button>
              </div>
            ))}
          </div>

          {/* Секция реферальной программы - показывается только если карточек 2 или меньше */}
          {userCards.length <= 1 && (
            <button 
              onClick={() => setIsReferralModalOpen(true)}
              className="w-full bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors"
            >
              <div className="flex items-center">
                {/* Иконка друзей */}
                <div className="w-8 h-8 border-2 border-white rounded-full mr-3 flex items-center justify-center">
                  <i className="pi pi-users text-white text-sm"></i>
                </div>
                
                <div className="flex-1 text-left">
                  <p className="text-white font-medium">Приглашай друзей и получай бонусы!</p>
                  <p className="text-gray-300 text-sm mt-1">Твоя персональная ссылка здесь</p>
                </div>
              </div>
            </button>
          )}

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
              onClick={() => console.log('Кнопка работает!')}
              className="p-button-sm p-button-secondary"
            />
          </div>
        </div>
      </div>

      {/* Referral Modal */}
      <ReferralModal 
        isOpen={isReferralModalOpen}
        onClose={() => setIsReferralModalOpen(false)}
      />

      {/* Card Issue Modal */}
      <CardIssueModal 
        isOpen={isCardIssueModalOpen}
        onClose={() => setIsCardIssueModalOpen(false)}
        onNext={async () => {
          setIsCardIssueModalOpen(false)
          // Проверяем, есть ли email у пользователя в БД
          const hasEmail = appUser?.metadata?.email && appUser.metadata.email.trim() !== '' && appUser.metadata.email !== 'Email не подтвержден'
          
          console.log('🔍 Проверка email при выборе карты:')
          console.log('📧 Email пользователя:', appUser?.metadata?.email)
          console.log('✅ Email валиден:', hasEmail)
          
          if (hasEmail) {
            // Если email есть в БД, получаем карты и переходим к пополнению
            console.log('✅ Email найден в БД, получаем карты и переходим к пополнению')
            await fetchUserCards()
            setIsTopUpModalOpen(true)
          } else {
            // Если email нет в БД, переходим к активации
            console.log('❌ Email не найден в БД, требуем активацию')
            setIsEmailActivationModalOpen(true)
          }
        }}
      />

      {/* Email Activation Modal */}
      <EmailActivationModal 
        isOpen={isEmailActivationModalOpen}
        onClose={() => setIsEmailActivationModalOpen(false)}
        onNext={(email) => {
          setUserEmail(email)
          setIsEmailActivationModalOpen(false)
          setIsCodeConfirmationModalOpen(true)
        }}
      />

      {/* Code Confirmation Modal */}
      <CodeConfirmationModal 
        isOpen={isCodeConfirmationModalOpen}
        onClose={() => setIsCodeConfirmationModalOpen(false)}
        onConfirm={async (code) => {
          try {
            console.log('Подтверждение кода:', code, 'для email:', userEmail)
            
            if (!appUser?.telegram_id) {
              console.error('❌ Ошибка: не найден Telegram ID пользователя')
              return
            }

            // Обновляем email в базе данных
            const response = await apiClient.updateUserDataByTgId(appUser.telegram_id, {
              email: userEmail
            })

            if (response.success) {
              console.log('✅ Email успешно обновлен в БД:', response.data)
              // setIsUserRegistered(true) // Пользователь теперь зарегистрирован
              setIsCodeConfirmationModalOpen(false)
              // Получаем карты и переходим к пополнению
              await fetchUserCards()
              setIsTopUpModalOpen(true)
            } else {
              console.error('❌ Ошибка при обновлении email:', response.error)
            }
          } catch (error) {
            console.error('❌ Ошибка при подтверждении кода:', error)
          }
        }}
        onResend={() => {
          console.log('Код отправлен повторно')
        }}
        email={userEmail}
      />

      {/* Top Up Modal */}
      <TopUpModal 
        isOpen={isTopUpModalOpen}
        onClose={() => setIsTopUpModalOpen(false)}
        onPay={(amount) => {
          setPaymentAmount(amount)
          setIsTopUpModalOpen(false)
          setIsPaymentModalOpen(true)
        }}
        cards={userCards}
        isLoadingCards={isLoadingCards}
      />

      {/* Card Management Modal */}
      <CardManagementModal 
        isOpen={isCardManagementModalOpen}
        onClose={() => setIsCardManagementModalOpen(false)}
        cards={userCards.filter(c => c.status === 'ACTIVE')}
        currentCardIndex={selectedCardIndex}
        onCardChange={setSelectedCardIndex}
        onTopUp={() => {
          setIsCardManagementModalOpen(false)
          setIsTopUpModalOpen(true)
        }}
        onNewCard={() => {
          setIsCardManagementModalOpen(false)
          setIsCardIssueModalOpen(true)
        }}
      />

      {/* Payment Modal */}
      <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        amount={paymentAmount}
        onSuccess={() => {
          console.log('Платеж успешно обработан!')
          setIsPaymentModalOpen(false)
        }}
      />
    </div>
  )
}

export default HomePage