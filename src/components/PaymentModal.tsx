import React, { useState, useEffect } from 'react'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  amount: number
  onSuccess: () => void
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, amount, onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsProcessing(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handlePayment = () => {
    setIsProcessing(true)
    // Симуляция обработки платежа
    setTimeout(() => {
      setIsProcessing(false)
      onSuccess()
    }, 2000)
  }

  const rubAmount = (amount * 161.22).toFixed(1)

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div 
        className="relative w-full max-w-md bg-gray-900 rounded-t-2xl modal-slide-up"
        style={{ marginTop: '501px' }}
      >
        <div className="p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Оплата</h2>
            <p className="text-gray-400 text-sm">
              Подтвердите платеж на сумму {rubAmount}₽
            </p>
          </div>

          {/* Payment Details */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-300">Сумма к оплате:</span>
              <span className="text-white font-semibold">{rubAmount}₽</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-300">Способ оплаты:</span>
              <span className="text-white">По номеру телефона</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Комиссия:</span>
              <span className="text-white">0₽</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-6">
            <div className="bg-gray-800 rounded-lg p-4 flex items-center">
              <div className="w-10 h-10 bg-gray-600 rounded-lg mr-3 flex items-center justify-center">
                <i className="pi pi-phone text-white"></i>
              </div>
              <div className="flex-1">
                <div className="text-white font-medium">По номеру телефона</div>
                <div className="text-gray-400 text-sm">+7 (***) ***-**-**</div>
              </div>
              <i className="pi pi-chevron-right text-gray-400"></i>
            </div>
          </div>

          {/* Terms */}
          <div className="mb-6">
            <label className="flex items-start">
              <input
                type="checkbox"
                defaultChecked
                className="mt-1 mr-3 w-4 h-4 text-yellow-400 bg-gray-800 border-gray-600 rounded focus:ring-yellow-400 focus:ring-2"
              />
              <span className="text-gray-400 text-sm">
                Я согласен с{' '}
                <span className="text-white font-semibold">Условиями использования</span>{' '}
                и{' '}
                <span className="text-white font-semibold">Политикой конфиденциальности</span>
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-colors ${
                isProcessing
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-yellow-400 text-black hover:bg-yellow-500'
              }`}
            >
              {isProcessing ? 'Обработка...' : `Оплатить ${rubAmount}₽`}
            </button>
            
            <button
              onClick={onClose}
              className="w-full py-3 px-6 rounded-lg font-medium text-gray-400 hover:text-white transition-colors"
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentModal
