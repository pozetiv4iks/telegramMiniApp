import React from 'react'
import { Card } from 'primereact/card'
import { Avatar } from 'primereact/avatar'
import Button from '../components/Button'
import BottomNavigation from '../components/BottomNavigation'
import { useNavigation } from '../contexts/NavigationContext'
import '../components/BottomNavigation.css'
import './Pages.css'

interface HistoryPageProps {
  user: any
}

const HistoryPage: React.FC<HistoryPageProps> = ({ user: _user }) => {
  const { currentPage, setCurrentPage } = useNavigation()
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
    <div className="history-page">
      <div className="page-content">
        <div className="page-header">
          <h1>История операций</h1>
          <p>Все ваши транзакции</p>
        </div>

        <div className="history-filters">
          <Button 
            label="Все" 
            size="small"
            className="filter-button active"
          />
          <Button 
            label="Доходы" 
            size="small"
            severity="secondary"
            className="filter-button"
          />
          <Button 
            label="Расходы" 
            size="small"
            severity="secondary"
            className="filter-button"
          />
        </div>

        <div className="history-list">
          {historyItems.map((item) => (
            <Card key={item.id} className="history-item">
              <div className="history-item-content">
                <div className="history-item-icon">
                  <Avatar 
                    icon={item.icon} 
                    size="large" 
                    shape="circle"
                    className={item.type === 'income' ? 'income-icon' : 'expense-icon'}
                  />
                </div>
                
                <div className="history-item-details">
                  <h3>{item.title}</h3>
                  <p className="history-date">{item.date}</p>
                </div>
                
                <div className="history-item-amount">
                  <span className={`amount ${getAmountClass(item.amount)}`}>
                    {formatAmount(item.amount)}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="load-more">
          <Button 
            label="Загрузить еще" 
            icon="pi pi-refresh"
            outlined
            className="w-full"
          />
        </div>
      </div>

      <BottomNavigation
        items={navigationItems}
        onItemClick={handleNavigationClick}
      />
    </div>
  )
}

export default HistoryPage
