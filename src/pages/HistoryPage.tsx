import React, { useState } from 'react'
import BottomNavigation from '../components/BottomNavigation'
import { Transaction } from '../types/card'

interface HistoryPageProps {
  user: any
  currentPage: string
  setCurrentPage: (page: string) => void
}


const HistoryPage: React.FC<HistoryPageProps> = ({ user: _user, currentPage, setCurrentPage }) => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [showOperationFilter, setShowOperationFilter] = useState(false)
  const [selectedOperation, setSelectedOperation] = useState('all')

  // Моковые данные транзакций
  const transactions: Transaction[] = [
    {
      vendor_transaction_id: "aa499799-f3c7-46c7-bc7e-91ac09765cb5",
      created_at: "2025-01-20T11:30:00.000Z",
      cleared_at: "2025-01-20T11:30:00.000Z",
      merchant: {
        name: "Account Top-up",
        category_code: "",
        city: "",
        country: ""
      },
      last4: "4242",
      title: "Test Card 627dc",
      billing_amount: 128.76,
      billing_currency: "USD",
      transaction_amount: 128.76,
      transaction_currency: "USD",
      conversion_rate: 1,
      vendor_card_id: "fc22a5fb-18bb-4a04-bade-e4c1ff8627dc",
      vendor_sub_account_id: null,
      failure_reason: "",
      status: "APPROVED",
      transaction_type: "DEPOSIT",
      is_credit: true,
      has_receipt: false,
      adjustment_type: null,
      review_status: null,
      group: "Deposit",
      total_amount: 128.76,
      card_id: "79a59b14-23e5-42c8-848c-ff8fa9850b8d"
    },
    {
      vendor_transaction_id: "bb499799-f3c7-46c7-bc7e-91ac09765cb6",
      created_at: "2025-01-20T10:30:00.000Z",
      cleared_at: "2025-01-20T10:30:00.000Z",
      merchant: {
        name: "Failed Transaction",
        category_code: "5999",
        city: "New York",
        country: "US"
      },
      last4: "1234",
      title: "Test Card 2",
      billing_amount: 50.00,
      billing_currency: "USD",
      transaction_amount: 50.00,
      transaction_currency: "USD",
      conversion_rate: 1,
      vendor_card_id: "fc22a5fb-18bb-4a04-bade-e4c1ff8627dd",
      vendor_sub_account_id: null,
      failure_reason: "Insufficient funds",
      status: "DECLINED",
      transaction_type: "PURCHASE",
      is_credit: false,
      has_receipt: false,
      adjustment_type: null,
      review_status: null,
      group: "Purchase",
      total_amount: 50.00,
      card_id: "79a59b14-23e5-42c8-848c-ff8fa9850b8e"
    },
    {
      vendor_transaction_id: "cc499799-f3c7-46c7-bc7e-91ac09765cb7",
      created_at: "2025-01-19T10:30:00.000Z",
      cleared_at: null,
      merchant: {
        name: "Pending Store",
        category_code: "5411",
        city: "Los Angeles",
        country: "US"
      },
      last4: "5678",
      title: "Test Card 3",
      billing_amount: 25.50,
      billing_currency: "USD",
      transaction_amount: 25.50,
      transaction_currency: "USD",
      conversion_rate: 1,
      vendor_card_id: "fc22a5fb-18bb-4a04-bade-e4c1ff8627de",
      vendor_sub_account_id: null,
      failure_reason: "",
      status: "PENDING",
      transaction_type: "PURCHASE",
      is_credit: false,
      has_receipt: true,
      adjustment_type: null,
      review_status: null,
      group: "Purchase",
      total_amount: 25.50,
      card_id: "79a59b14-23e5-42c8-848c-ff8fa9850b8f"
    },
    {
      vendor_transaction_id: "dd499799-f3c7-46c7-bc7e-91ac09765cb8",
      created_at: "2025-01-20T09:15:00.000Z",
      cleared_at: "2025-01-20T09:15:00.000Z",
      merchant: {
        name: "Coffee Shop",
        category_code: "5814",
        city: "San Francisco",
        country: "US"
      },
      last4: "4242",
      title: "Test Card 627dc",
      billing_amount: 15.00,
      billing_currency: "USD",
      transaction_amount: 15.00,
      transaction_currency: "USD",
      conversion_rate: 1,
      vendor_card_id: "fc22a5fb-18bb-4a04-bade-e4c1ff8627dc",
      vendor_sub_account_id: null,
      failure_reason: "",
      status: "APPROVED",
      transaction_type: "PURCHASE",
      is_credit: false,
      has_receipt: true,
      adjustment_type: null,
      review_status: null,
      group: "Purchase",
      total_amount: 15.00,
      card_id: "79a59b14-23e5-42c8-848c-ff8fa9850b8d"
    },
    {
      vendor_transaction_id: "ee499799-f3c7-46c7-bc7e-91ac09765cb9",
      created_at: "2025-01-19T08:45:00.000Z",
      cleared_at: "2025-01-19T08:45:00.000Z",
      merchant: {
        name: "Service Provider",
        category_code: "7372",
        city: "Chicago",
        country: "US"
      },
      last4: "1234",
      title: "Test Card 2",
      billing_amount: 25.00,
      billing_currency: "USD",
      transaction_amount: 25.00,
      transaction_currency: "USD",
      conversion_rate: 1,
      vendor_card_id: "fc22a5fb-18bb-4a04-bade-e4c1ff8627dd",
      vendor_sub_account_id: null,
      failure_reason: "Card blocked",
      status: "DECLINED",
      transaction_type: "PURCHASE",
      is_credit: false,
      has_receipt: false,
      adjustment_type: null,
      review_status: null,
      group: "Purchase",
      total_amount: 25.00,
      card_id: "79a59b14-23e5-42c8-848c-ff8fa9850b8e"
    },
    {
      vendor_transaction_id: "ff499799-f3c7-46c7-bc7e-91ac09765cba",
      created_at: "2025-01-19T16:20:00.000Z",
      cleared_at: "2025-01-19T16:20:00.000Z",
      merchant: {
        name: "Bank Transfer",
        category_code: "",
        city: "",
        country: ""
      },
      last4: "5678",
      title: "Test Card 3",
      billing_amount: 50.00,
      billing_currency: "USD",
      transaction_amount: 50.00,
      transaction_currency: "USD",
      conversion_rate: 1,
      vendor_card_id: "fc22a5fb-18bb-4a04-bade-e4c1ff8627de",
      vendor_sub_account_id: null,
      failure_reason: "",
      status: "APPROVED",
      transaction_type: "DEPOSIT",
      is_credit: true,
      has_receipt: false,
      adjustment_type: null,
      review_status: null,
      group: "Deposit",
      total_amount: 50.00,
      card_id: "79a59b14-23e5-42c8-848c-ff8fa9850b8f"
    },
    {
      vendor_transaction_id: "gg499799-f3c7-46c7-bc7e-91ac09765cbb",
      created_at: "2025-01-18T14:15:00.000Z",
      cleared_at: "2025-01-18T14:15:00.000Z",
      merchant: {
        name: "Online Store",
        category_code: "5999",
        city: "Miami",
        country: "US"
      },
      last4: "4242",
      title: "Test Card 627dc",
      billing_amount: 75.00,
      billing_currency: "USD",
      transaction_amount: 75.00,
      transaction_currency: "USD",
      conversion_rate: 1,
      vendor_card_id: "fc22a5fb-18bb-4a04-bade-e4c1ff8627dc",
      vendor_sub_account_id: null,
      failure_reason: "Transaction canceled by user",
      status: "CANCELED",
      transaction_type: "PURCHASE",
      is_credit: false,
      has_receipt: false,
      adjustment_type: null,
      review_status: null,
      group: "Purchase",
      total_amount: 75.00,
      card_id: "79a59b14-23e5-42c8-848c-ff8fa9850b8d"
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

  const operationOptions = [
    { value: 'all', label: 'Все операции' },
    { value: 'income', label: 'Пополнение' },
    { value: 'expense', label: 'Списание' },
    { value: 'failed', label: 'Отклонения' }
  ]

  const handleOperationSelect = (operation: string) => {
    setSelectedOperation(operation)
    setShowOperationFilter(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <i className="pi pi-check" style={{ color: '#10b981', fontSize: '16px' }}></i>
      case 'DECLINED':
        return <i className="pi pi-times" style={{ color: '#ef4444', fontSize: '16px' }}></i>
      case 'CANCELED':
        return <i className="pi pi-ban" style={{ color: '#f59e0b', fontSize: '16px' }}></i>
      case 'PENDING':
        return <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      default:
        return null
    }
  }

  // Функция фильтрации транзакций
  const filterTransactions = (transactions: Transaction[]) => {
    return transactions.filter(transaction => {
      // Фильтр по типу операции
      if (selectedOperation !== 'all') {
        if (selectedOperation === 'income') {
          // Пополнения - только успешные с положительной суммой
          return transaction.status === 'APPROVED' && transaction.is_credit
        }
        if (selectedOperation === 'expense') {
          // Списания - только успешные с отрицательной суммой
          return transaction.status === 'APPROVED' && !transaction.is_credit
        }
        if (selectedOperation === 'failed') {
          // Отклонения - только неуспешные операции
          return transaction.status === 'DECLINED' || transaction.status === 'CANCELED'
        }
      }
      
      // Фильтр по основному фильтру (можно расширить)
      if (activeFilter !== 'all') {
        // Здесь можно добавить дополнительную логику фильтрации
        // Например, по картам, датам и т.д.
      }
      
      return true
    })
  }

  // Вспомогательные функции для работы с датами
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    
    if (date.toDateString() === today.toDateString()) {
      return 'Сегодня'
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Вчера'
    } else {
      return date.toLocaleDateString('ru-RU', { 
        day: 'numeric', 
        month: 'long' 
      })
    }
  }
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }
  
  const formatAmount = (transaction: Transaction) => {
    const sign = transaction.is_credit ? '+' : '-'
    return `${sign}$${transaction.total_amount.toFixed(2)}`
  }

  const filteredTransactions = filterTransactions(transactions)
  
  const groupedTransactions = filteredTransactions.reduce((acc, transaction) => {
    const dateKey = formatDate(transaction.created_at)
    if (!acc[dateKey]) {
      acc[dateKey] = []
    }
    acc[dateKey].push(transaction)
    return acc
  }, {} as Record<string, Transaction[]>)

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ backgroundColor: '#111827' }}>
      {/* Основной контент с учетом status bar */}
      <div className="flex-1 overflow-y-auto" style={{ paddingTop: 'env(safe-area-inset-top, 0)' }}>
        <div className="p-4 pb-20" onClick={() => setShowOperationFilter(false)}>
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">История операций</h1>
            <p className="text-gray-400 text-sm">
              Показано {filteredTransactions.length} из {transactions.length} операций
            </p>
          </div>

          {/* Filters */}
          <div className="mb-6">
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setActiveFilter('all')
                  setSelectedOperation('all') // Сбрасываем фильтр операций
                  // Здесь можно добавить сброс других фильтров
                  // setSelectedCard('all')
                }}
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
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowOperationFilter(!showOperationFilter)
                  }}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-700 text-gray-300 flex items-center gap-1"
                >
                  {operationOptions.find(opt => opt.value === selectedOperation)?.label || 'Вид'}
                  <i className={`pi pi-chevron-down text-xs transition-transform ${showOperationFilter ? 'rotate-180' : ''}`}></i>
                </button>
                
                {/* Выпадающий список */}
                {showOperationFilter && (
                  <div 
                    className="absolute top-full left-0 mt-1 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {operationOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleOperationSelect(option.value)}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg ${
                          selectedOperation === option.value ? 'bg-yellow-400 text-black' : 'text-gray-300'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
                </div>
                
          {/* Transactions List */}
          <div>
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="pi pi-search text-gray-400 text-2xl"></i>
                </div>
                <p className="text-gray-400 text-lg mb-2">Операции не найдены</p>
                <p className="text-gray-500 text-sm">Попробуйте изменить фильтры</p>
              </div>
            ) : (
              Object.entries(groupedTransactions).map(([date, dateTransactions]) => (
          <div key={date} className="mb-6">
            <h3 className="text-gray-400 text-sm font-medium mb-3">{date}</h3>
            <div className="space-y-3">
              {dateTransactions.map((transaction) => (
                <div key={transaction.vendor_transaction_id} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center">
                        {getStatusIcon(transaction.status)}
                      </div>
                      <div>
                        <p className="text-white font-medium">{transaction.merchant.name}</p>
                        <p className="text-gray-400 text-sm">Карта •••• {transaction.last4}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">{formatAmount(transaction)}</p>
                      <p className="text-gray-400 text-sm">{formatTime(transaction.created_at)}</p>
                    </div>
                  </div>
                </div>
              ))}
                </div>
              </div>
          ))
            )}
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