import React, { useState, useEffect } from 'react'
import { Card } from '../services/api'

interface TopUpModalProps {
  isOpen: boolean
  onClose: () => void
  onPay: (amount: number) => void
  cards?: Card[]
  isLoadingCards?: boolean
}

const TopUpModal: React.FC<TopUpModalProps> = ({ isOpen, onClose, onPay, cards = [], isLoadingCards = false }) => {
  const [amount, setAmount] = useState(5)
  const [consentChecked, setConsentChecked] = useState(true)

  useEffect(() => {
    if (isOpen) {
      setAmount(5)
      setConsentChecked(true)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleAmountChange = (value: number) => {
    if (value >= 1) {
      setAmount(value)
    }
  }

  const handlePay = () => {
    if (consentChecked) {
      onPay(amount)
    }
  }

  // Конвертация в рубли (примерный курс)
  const rubAmount = (amount * 161.22).toFixed(1)

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-gray-900 rounded-t-2xl modal-slide-up">
        <div className="p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Пополнение</h2>
            <p className="text-gray-400 text-sm">
              Введите сумму и выберите способ пополнения
            </p>
          </div>

          {/* Cards Section */}
          <div className="mb-6">
            <h3 className="text-white text-lg font-medium mb-3">Ваши карты</h3>
            {isLoadingCards ? (
              <div className="text-center py-4">
                <div className="text-gray-400">Загрузка карт...</div>
              </div>
            ) : cards.length > 0 ? (
              <div className="space-y-3">
                {cards.map((card, index) => (
                  <div key={card.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-medium">{card.title}</div>
                        <div className="text-gray-400 text-sm">{card.brand} •••• {card.last4}</div>
                        <div className="text-gray-400 text-sm">Истекает: {card.expiration_date_short}</div>
                        <div className="text-gray-400 text-sm">Статус: {card.status}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-yellow-400 font-medium">${card.spent_amount || '0.00'}</div>
                        <div className="text-gray-400 text-xs">Баланс</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="text-gray-400">У вас пока нет карт</div>
              </div>
            )}
          </div>

          {/* Amount Input */}
          <div className="mb-6">
            <label className="block text-white text-sm font-medium mb-2">
              Сумма, $
            </label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => handleAmountChange(Number(e.target.value))}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-yellow-400 focus:outline-none"
                min="1"
                step="1"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex flex-col">
                <button
                  onClick={() => handleAmountChange(amount + 1)}
                  className="text-gray-400 hover:text-white text-xs"
                >
                  ▲
                </button>
                <button
                  onClick={() => handleAmountChange(amount - 1)}
                  className="text-gray-400 hover:text-white text-xs"
                >
                  ▼
                </button>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-6">
            <div className="bg-gray-800 rounded-lg p-4 flex items-center">
              <div className="w-10 h-10 bg-gray-600 rounded-lg mr-3 flex items-center justify-center">
                <i className="pi pi-phone text-white"></i>
              </div>
              <span className="text-white">По номеру телефона</span>
            </div>
          </div>

          {/* Terms */}
          <div className="mb-6">
            <label className="flex items-start">
              <input
                type="checkbox"
                checked={consentChecked}
                onChange={(e) => setConsentChecked(e.target.checked)}
                className="mt-1 mr-3 w-4 h-4 text-yellow-400 bg-gray-800 border-gray-600 rounded focus:ring-yellow-400 focus:ring-2"
              />
              <span className="text-gray-400 text-sm">
                Открывая карту, вы соглашаетесь с{' '}
                <span className="text-white font-semibold">Условиями использования</span>{' '}
                и{' '}
                <span className="text-white font-semibold">Политикой конфиденциальности</span>
              </span>
            </label>
          </div>
        </div>

        {/* Fixed Button */}
        <div 
          className="sticky bottom-0 bg-gray-900 border-t border-gray-700 p-4"
          style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0) + 16px)' }}
        >
          <button
            onClick={handlePay}
            disabled={!consentChecked}
            className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-colors ${
              consentChecked
                ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            Оплатить {rubAmount}₽
          </button>
        </div>
      </div>
    </div>
  )
}

export default TopUpModal
