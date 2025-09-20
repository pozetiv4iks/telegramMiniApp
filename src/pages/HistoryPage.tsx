import React, { useState } from 'react'
import BottomNavigation from '../components/BottomNavigation'

interface HistoryPageProps {
  user: any
  currentPage: string
  setCurrentPage: (page: string) => void
}

interface Transaction {
  id: number
  type: 'success' | 'failed' | 'pending'
  description: string
  card: string
  amount: string
  time: string
  date: string
}

const HistoryPage: React.FC<HistoryPageProps> = ({ user: _user, currentPage, setCurrentPage }) => {
  const [activeFilter, setActiveFilter] = useState('all')

  // Моковые данные транзакций
  const transactions: Transaction[] = [
    {
      id: 1,
      type: 'success',
      description: 'Пополнение баланса',
      card: 'Карта **** 3456',
      amount: '+$7',
      time: '11:30',
      date: 'Сегодня, 22 августа'
    },
    {
      id: 2,
      type: 'failed',
      description: 'Пополнение баланса',
      card: 'Карта **** 3456',
      amount: '+$7',
      time: '10:30',
      date: 'Сегодня, 22 августа'
    },
    {
      id: 3,
      type: 'pending',
      description: 'Пополнение баланса',
      card: 'Карта **** 3456',
      amount: '+$7',
      time: '10:30',
      date: 'Вчера, 21 августа'
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

  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <i className="pi pi-check" style={{ color: '#10b981', fontSize: '16px' }}></i>
      case 'failed':
        return <i className="pi pi-times" style={{ color: '#ef4444', fontSize: '16px' }}></i>
      case 'pending':
        return <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      default:
        return null
    }
  }

  const groupedTransactions = transactions.reduce((acc, transaction) => {
    if (!acc[transaction.date]) {
      acc[transaction.date] = []
    }
    acc[transaction.date].push(transaction)
    return acc
  }, {} as Record<string, Transaction[]>)

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ backgroundColor: '#111827' }}>
      {/* Основной контент с учетом status bar */}
      <div className="flex-1 overflow-y-auto" style={{ paddingTop: 'env(safe-area-inset-top, 0)' }}>
        <div className="p-4 pb-20">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">История операций</h1>
          </div>

          {/* Filters */}
          <div className="mb-6">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === 'all' 
                    ? 'bg-yellow-400 text-black' 
                    : 'bg-gray-700 text-gray-300'
                }`}
              >
                Все
              </button>
              <button
                onClick={() => setActiveFilter('card')}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-700 text-gray-300 flex items-center gap-1"
              >
                Карта
                <i className="pi pi-chevron-down text-xs"></i>
              </button>
              <button
                onClick={() => setActiveFilter('type')}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-700 text-gray-300 flex items-center gap-1"
              >
                Вид
                <i className="pi pi-chevron-down text-xs"></i>
              </button>
            </div>
          </div>

          {/* Transactions List */}
          <div>
        {Object.entries(groupedTransactions).map(([date, dateTransactions]) => (
          <div key={date} className="mb-6">
            <h3 className="text-gray-400 text-sm font-medium mb-3">{date}</h3>
            <div className="space-y-3">
              {dateTransactions.map((transaction) => (
                <div key={transaction.id} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center">
                        {getStatusIcon(transaction.type)}
                      </div>
                      <div>
                        <p className="text-white font-medium">{transaction.description}</p>
                        <p className="text-gray-400 text-sm">{transaction.card}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">{transaction.amount}</p>
                      <p className="text-gray-400 text-sm">{transaction.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
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