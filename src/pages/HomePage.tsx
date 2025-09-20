import React, { useState, useCallback } from 'react'
import { Button } from 'primereact/button'
import WebApp from '@twa-dev/sdk'
import ReferralModal from '../components/ReferralModal'
import CardIssueModal from '../components/CardIssueModal'
import { Card } from '../types/card'

interface User {
  id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
}

interface HomePageProps {
  user: User | null
  onCloseModals?: (closeFunction: () => void) => void
}


const HomePage: React.FC<HomePageProps> = ({ user, onCloseModals }) => {
  // Используем user для отображения имени в заголовке
  const userName = user?.first_name || 'Пользователь'
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false)
  const [isCardIssueModalOpen, setIsCardIssueModalOpen] = useState(false)
  
  // Функция закрытия всех модалок
  const closeAllModals = useCallback(() => {
    setIsReferralModalOpen(false)
    setIsCardIssueModalOpen(false)
  }, [])
  
  // Передаем функцию закрытия модалок в родительский компонент
  React.useEffect(() => {
    if (onCloseModals) {
      onCloseModals(closeAllModals)
    }
  }, [onCloseModals, closeAllModals])
  
  // Моковые данные карточек
  const cards: Card[] = [
    {
      id: "79a59b14-23e5-42c8-848c-ff8fa9850b8d",
      title: "Виртуальная карта Mastercard",
      last4: "4242",
      expiration_date: "2028-09-20T18:37:25.129",
      expiration_date_short: "09/28",
      form_factor: "VIRTUAL",
      status: "ACTIVE",
      currency: "USD",
      created_at: "2025-09-20T18:11:27.060218+00:00",
      updated_at: "2025-09-20T18:37:25.725022+00:00",
      sub_account_id: "ae8cf7e1-9481-441f-9294-85a8b7addaea",
      vendor_sub_account_id: "badacad1-5664-4d90-b215-89ab87f00e0b",
      brand: "MASTERCARD",
      vendor_id: "98121811-debb-409e-83da-db8512f33253",
      vendor_card_id: "fc22a5fb-18bb-4a04-bade-e4c1ff8627dc",
      tokenizable: true,
      spend_cap: 0,
      spent_amount: 0,
      card_name: "Test Card 1",
      email: "user@example.com",
      mobile: "+1234567890",
      type: "balance",
      wallet_id: "8205c701-cd41-4929-910f-fccbb949729a",
      program_id: "dbb74408-0318-401c-ac5d-72e522fa8aaa",
      limits: {
        all_time_enabled: false,
        all_time_cap: 0,
        all_time_spent: 0,
        daily_enabled: true,
        daily_cap: 1000,
        daily_spent: 0,
        weekly_enabled: false,
        weekly_cap: 0,
        weekly_spent: 0,
        monthly_enabled: true,
        monthly_cap: 10000,
        monthly_spent: 0,
        yearly_enabled: false,
        yearly_cap: 0,
        yearly_spent: 0,
        per_transaction_enabled: true,
        per_transaction_cap: 500,
        per_transaction_spent: 0
      }
    },
    {
      id: "79a59b14-23e5-42c8-848c-ff8fa9850b8e",
      title: "Виртуальная карта Visa",
      last4: "1234",
      expiration_date: "2029-12-15T10:30:00.000",
      expiration_date_short: "12/29",
      form_factor: "VIRTUAL",
      status: "ACTIVE",
      currency: "USD",
      created_at: "2025-09-20T18:11:27.060218+00:00",
      updated_at: "2025-09-20T18:37:25.725022+00:00",
      sub_account_id: "ae8cf7e1-9481-441f-9294-85a8b7addaea",
      vendor_sub_account_id: "badacad1-5664-4d90-b215-89ab87f00e0b",
      brand: "VISA",
      vendor_id: "98121811-debb-409e-83da-db8512f33253",
      vendor_card_id: "fc22a5fb-18bb-4a04-bade-e4c1ff8627dd",
      tokenizable: true,
      spend_cap: 0,
      spent_amount: 150.50,
      card_name: "Test Card 2",
      email: "user@example.com",
      mobile: "+1234567890",
      type: "balance",
      wallet_id: "8205c701-cd41-4929-910f-fccbb949729a",
      program_id: "dbb74408-0318-401c-ac5d-72e522fa8aaa",
      limits: {
        all_time_enabled: false,
        all_time_cap: 0,
        all_time_spent: 0,
        daily_enabled: true,
        daily_cap: 1000,
        daily_spent: 150.50,
        weekly_enabled: false,
        weekly_cap: 0,
        weekly_spent: 0,
        monthly_enabled: true,
        monthly_cap: 10000,
        monthly_spent: 150.50,
        yearly_enabled: false,
        yearly_cap: 0,
        yearly_spent: 0,
        per_transaction_enabled: true,
        per_transaction_cap: 500,
        per_transaction_spent: 0
      }
    },
    {
      id: "79a59b14-23e5-42c8-848c-ff8fa9850b8f",
      title: "Виртуальная карта Mastercard",
      last4: "5678",
      expiration_date: "2027-06-30T15:45:00.000",
      expiration_date_short: "06/27",
      form_factor: "VIRTUAL",
      status: "ACTIVE",
      currency: "USD",
      created_at: "2025-09-20T18:11:27.060218+00:00",
      updated_at: "2025-09-20T18:37:25.725022+00:00",
      sub_account_id: "ae8cf7e1-9481-441f-9294-85a8b7addaea",
      vendor_sub_account_id: "badacad1-5664-4d90-b215-89ab87f00e0b",
      brand: "MASTERCARD",
      vendor_id: "98121811-debb-409e-83da-db8512f33253",
      vendor_card_id: "fc22a5fb-18bb-4a04-bade-e4c1ff8627de",
      tokenizable: true,
      spend_cap: 0,
      spent_amount: 75.25,
      card_name: "Test Card 3",
      email: "user@example.com",
      mobile: "+1234567890",
      type: "balance",
      wallet_id: "8205c701-cd41-4929-910f-fccbb949729a",
      program_id: "dbb74408-0318-401c-ac5d-72e522fa8aaa",
      limits: {
        all_time_enabled: false,
        all_time_cap: 0,
        all_time_spent: 0,
        daily_enabled: true,
        daily_cap: 1000,
        daily_spent: 75.25,
        weekly_enabled: false,
        weekly_cap: 0,
        weekly_spent: 0,
        monthly_enabled: true,
        monthly_cap: 10000,
        monthly_spent: 75.25,
        yearly_enabled: false,
        yearly_cap: 0,
        yearly_spent: 0,
        per_transaction_enabled: true,
        per_transaction_cap: 500,
        per_transaction_spent: 0
      }
    }
  ]

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
            <p className="text-gray-300 text-sm">Добро пожаловать, {userName}!</p>
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

            {cards.map((card) => (
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
                  onClick={() => alert(card.status === 'ACTIVE' ? 'Карта активна!' : 'Карта неактивна!')}
                  className="w-full bg-yellow-400 text-black font-semibold py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors"
                >
                  {card.status === 'ACTIVE' ? 'Управлять картой' : 'Активировать'}
                </button>
              </div>
            ))}
          </div>

          {/* Секция реферальной программы - показывается только если карточек 2 или меньше */}
          {cards.length <= 1 && (
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
              onClick={() => alert('Кнопка работает!')}
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
      />
    </div>
  )
}

export default HomePage