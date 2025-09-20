import React, { useState, useEffect, useRef } from 'react'
import { Card } from '../types/card'

interface CardManagementModalProps {
  isOpen: boolean
  onClose: () => void
  cards: Card[]
  currentCardIndex: number
  onCardChange: (index: number) => void
  onTopUp: () => void
  onNewCard: () => void
}

const CardManagementModal: React.FC<CardManagementModalProps> = ({ 
  isOpen, 
  onClose, 
  cards,
  currentCardIndex,
  onCardChange,
  onTopUp, 
  onNewCard 
}) => {
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const currentCard = cards[currentCardIndex]

  useEffect(() => {
    if (isOpen) {
      setIsReferralModalOpen(false)
    }
  }, [isOpen])

  if (!isOpen || !currentCard || cards.length === 0) return null

  // Минимальное расстояние для свайпа
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && currentCardIndex < cards.length - 1) {
      // Свайп влево - следующая карта
      onCardChange(currentCardIndex + 1)
    }
    if (isRightSwipe && currentCardIndex > 0) {
      // Свайп вправо - предыдущая карта
      onCardChange(currentCardIndex - 1)
    }
  }

  // Моковые данные для последних операций
  const recentTransactions = [
    {
      id: '1',
      status: 'APPROVED',
      description: 'Пополнение баланса',
      cardNumber: '**** 3456',
      amount: 7,
      time: '11:30',
      date: 'Сегодня, 22 августа'
    },
    {
      id: '2', 
      status: 'DECLINED',
      description: 'Пополнение баланса',
      cardNumber: '**** 3456',
      amount: 7,
      time: '10:30',
      date: 'Сегодня, 22 августа'
    },
    {
      id: '3',
      status: 'PENDING',
      description: 'Пополнение баланса', 
      cardNumber: '**** 3456',
      amount: 7,
      time: '10:30',
      date: 'Вчера, 21 августа'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <i className="pi pi-check text-white text-xs"></i>
      case 'DECLINED':
        return <i className="pi pi-times text-white text-xs"></i>
      case 'PENDING':
        return <div className="w-3 h-3 border border-white rounded-full"></div>
      default:
        return <div className="w-3 h-3 border border-white rounded-full"></div>
    }
  }


  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-gray-900 rounded-t-2xl modal-slide-up h-full">
        {/* Header */}
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center"
          >
            <i className="pi pi-times text-white text-sm"></i>
          </button>
        </div>

        {/* Fixed Content - Card and Buttons */}
        <div className="px-6 pb-4">
          {/* Card Swipe Container */}
          <div 
            ref={cardRef}
            className="relative overflow-hidden mb-4"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-6 mb-2">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white rounded-full mr-3"></div>
                <div className="w-8 h-8 bg-white rounded-full -ml-2"></div>
              </div>
              <div className="text-right">
                <div className="text-white text-sm font-medium">{currentCard.brand}</div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="text-gray-300 text-sm mb-2">Номер карты</div>
              <div className="text-white text-lg font-mono">
                •••• •••• •••• {currentCard.last4}
              </div>
            </div>
            
            <div className="flex justify-between items-end">
              <div>
                <div className="text-gray-300 text-xs mb-1">Срок действия</div>
                <div className="text-white text-sm">{currentCard.expiration_date_short}</div>
              </div>
              <div className="text-right">
                <div className="text-gray-300 text-xs mb-1">Баланс</div>
                <div className="text-white text-lg font-semibold">
                  ${currentCard.spent_amount.toFixed(2)}
                </div>
              </div>
            </div>
            </div>
            
            {/* Card Indicators */}
            {cards.length > 1 && (
              <div className="flex justify-center space-x-2">
                {cards.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentCardIndex ? 'bg-white' : 'bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-4">
            <button
              onClick={onTopUp}
              className="flex-1 bg-gray-700 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Пополнить
            </button>
            <button
              onClick={onNewCard}
              className="flex-1 bg-gray-700 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Новая карта
            </button>
          </div>

          {/* Referral Section */}
          <div 
            onClick={() => setIsReferralModalOpen(true)}
            className="bg-gray-700 rounded-lg p-4 mb-4 hover:bg-gray-600 transition-colors cursor-pointer"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 border-2 border-white rounded-full mr-3 flex items-center justify-center">
                <i className="pi pi-users text-white text-sm"></i>
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">Приглашай друзей и получай бонусы!</p>
                <p className="text-gray-300 text-sm mt-1">Твоя персональная ссылка здесь</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Transactions Section */}
        <div className="flex-1 overflow-y-auto px-6" style={{ paddingBottom: '120px' }}>
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Последние операции</h3>
            
            {recentTransactions.map((transaction, index) => (
              <div key={transaction.id}>
                {/* Date Header */}
                {index === 0 || recentTransactions[index - 1].date !== transaction.date ? (
                  <div className="text-gray-400 text-sm mb-3 mt-4 first:mt-0">
                    {transaction.date}
                  </div>
                ) : null}
                
                {/* Transaction Item */}
                <div className="flex items-center py-3">
                  <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center mr-3">
                    {getStatusIcon(transaction.status)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="text-white font-medium">{transaction.description}</div>
                    <div className="text-gray-400 text-sm">{transaction.cardNumber}</div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-white font-medium">+${transaction.amount}</div>
                    <div className="text-gray-400 text-sm">{transaction.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Referral Modal */}
      {isReferralModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-end justify-center">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsReferralModalOpen(false)}
          />
          <div className="relative w-full max-w-md bg-gray-900 rounded-t-2xl modal-slide-up">
            <div className="p-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Реферальная программа</h2>
                <p className="text-gray-400 text-sm">
                  Приглашай друзей и получай бонусы за каждую активацию карты
                </p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4 mb-6">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gray-700 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <i className="pi pi-qrcode text-gray-400 text-4xl"></i>
                  </div>
                  <p className="text-white text-sm">QR-код для приглашения</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => console.log('Поделиться QR-кодом')}
                  className="flex-1 bg-gray-700 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Поделиться
                </button>
                <button
                  onClick={() => console.log('Ссылка скопирована!')}
                  className="flex-1 bg-yellow-400 text-black py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors"
                >
                  Копировать ссылку
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CardManagementModal
