import React from 'react'
import { Card } from 'primereact/card'
import { Avatar } from 'primereact/avatar'
import Button from '../components/Button'
import BottomNavigation from '../components/BottomNavigation'

interface HistoryPageProps {
  user: any
  currentPage: string
  setCurrentPage: (page: string) => void
}

const HistoryPage: React.FC<HistoryPageProps> = ({ user: _user, currentPage, setCurrentPage }) => {
  // Моковые данные для истории
  const historyItems = [
    {
      id: 1,
      type: 'payment',
      title: 'Оплата услуг',
      amount: -1500,
      date: '2024-01-15',
      icon: 'pi pi-credit-card',
      status: 'completed'
    },
    {
      id: 2,
      type: 'transfer',
      title: 'Перевод другу',
      amount: -500,
      date: '2024-01-14',
      icon: 'pi pi-send',
      status: 'completed'
    },
    {
      id: 3,
      type: 'income',
      title: 'Пополнение счета',
      amount: 5000,
      date: '2024-01-13',
      icon: 'pi pi-plus-circle',
      status: 'completed'
    },
    {
      id: 4,
      type: 'payment',
      title: 'Покупка в магазине',
      amount: -250,
      date: '2024-01-12',
      icon: 'pi pi-shopping-cart',
      status: 'completed'
    }
  ]

  const navigationItems = [
    { id: 'home', label: 'Главная', icon: 'pi pi-home', path: '/', active: currentPage === 'home' },
    { id: 'history', label: 'История', icon: 'pi pi-history', path: '/history', active: currentPage === 'history' },
    { id: 'profile', label: 'Профиль', icon: 'pi pi-user', path: '/profile', active: currentPage === 'profile' }
  ]

  const handleNavigationClick = (item: any) => {
    setCurrentPage(item.id)
  }

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB'
    }).format(amount)
  }

  const getAmountClass = (amount: number) => {
    return amount > 0 ? 'amount-positive' : 'amount-negative'
  }

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      <div className="flex-1 overflow-y-auto" style={{ paddingTop: 'env(safe-area-inset-top, 0)' }}>
        <div className="p-4 pb-20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">История операций</h1>
          <p className="text-gray-600 text-base">Все ваши транзакции</p>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <Button 
            label="Все" 
            size="small"
            className="flex-shrink-0 whitespace-nowrap bg-tg-blue text-white"
          />
          <Button 
            label="Доходы" 
            size="small"
            severity="secondary"
            className="flex-shrink-0 whitespace-nowrap"
          />
          <Button 
            label="Расходы" 
            size="small"
            severity="secondary"
            className="flex-shrink-0 whitespace-nowrap"
          />
        </div>

        <div className="flex-1 space-y-4">
          {historyItems.map((item) => (
            <Card key={item.id} className="mb-4 shadow-sm border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <Avatar 
                    icon={item.icon} 
                    size="large" 
                    shape="circle"
                    className={item.type === 'income' ? 'bg-green-500' : 'bg-red-500'}
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-black mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.date}</p>
                </div>
                
                <div className="flex-shrink-0">
                  <span className={`text-lg font-semibold ${getAmountClass(item.amount) === 'amount-positive' ? 'text-green-500' : 'text-red-500'}`}>
                    {formatAmount(item.amount)}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6">
          <Button 
            label="Загрузить еще" 
            icon="pi pi-refresh"
            outlined
            className="w-full"
          />
        </div>
        </div>
      </div>

      <div style={{ paddingBottom: 'env(safe-area-inset-bottom, 0)' }}>
        <BottomNavigation
          items={navigationItems}
          onItemClick={handleNavigationClick}
        />
      </div>
    </div>
  )
}

export default HistoryPage
