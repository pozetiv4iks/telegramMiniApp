import React, { useState } from 'react'
import { WebApp } from '@twa-dev/sdk'

const Transfer = () => {
  const [amount, setAmount] = useState('')
  const [recipient, setRecipient] = useState('')
  const [description, setDescription] = useState('')
  const [step, setStep] = useState(1) // 1: amount, 2: recipient, 3: confirm

  const quickAmounts = [100, 500, 1000, 5000]

  const handleAmountSelect = (selectedAmount) => {
    setAmount(selectedAmount.toString())
    WebApp.HapticFeedback.impactOccurred('light')
  }

  const handleNext = () => {
    if (step === 1 && amount) {
      setStep(2)
    } else if (step === 2 && recipient) {
      setStep(3)
    }
    WebApp.HapticFeedback.impactOccurred('medium')
  }

  const handleTransfer = () => {
    WebApp.HapticFeedback.notificationOccurred('success')
    WebApp.showAlert(`Перевод на сумму ${amount} ₽ выполнен успешно!`)
    // Reset form
    setAmount('')
    setRecipient('')
    setDescription('')
    setStep(1)
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
    WebApp.HapticFeedback.impactOccurred('light')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {step > 1 && (
                <button 
                  onClick={handleBack}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
                >
                  <span className="text-gray-600">←</span>
                </button>
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Перевод</h1>
                <p className="text-gray-600">Шаг {step} из 3</p>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">💸</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 py-4">
        <div className="flex space-x-2">
          {[1, 2, 3].map((stepNumber) => (
            <div
              key={stepNumber}
              className={`flex-1 h-2 rounded-full ${
                stepNumber <= step ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Step 1: Amount */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Сумма перевода</h2>
              <p className="text-gray-600">Введите сумму для перевода</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="text-center mb-6">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  className="text-4xl font-bold text-center border-none outline-none w-full bg-transparent"
                />
                <div className="text-2xl text-gray-500 mt-2">₽</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {quickAmounts.map((quickAmount) => (
                  <button
                    key={quickAmount}
                    onClick={() => handleAmountSelect(quickAmount)}
                    className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                  >
                    {quickAmount.toLocaleString('ru-RU')} ₽
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Recipient */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Получатель</h2>
              <p className="text-gray-600">Введите данные получателя</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Номер телефона или карты
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="+7 (999) 123-45-67"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Назначение платежа (необязательно)
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Например: за обед"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Подтверждение</h2>
              <p className="text-gray-600">Проверьте данные перевода</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Сумма:</span>
                <span className="font-bold text-xl">{amount} ₽</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Получатель:</span>
                <span className="font-medium">{recipient}</span>
              </div>
              
              {description && (
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Назначение:</span>
                  <span className="font-medium">{description}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600">Комиссия:</span>
                <span className="font-medium text-green-600">0 ₽</span>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-center space-x-2">
                <span className="text-blue-600">ℹ️</span>
                <span className="text-sm text-blue-800">
                  Перевод будет выполнен мгновенно без комиссии
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-8">
          {step < 3 ? (
            <button
              onClick={handleNext}
              disabled={step === 1 ? !amount : !recipient}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors duration-200"
            >
              Продолжить
            </button>
          ) : (
            <button
              onClick={handleTransfer}
              className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition-colors duration-200"
            >
              Подтвердить перевод
            </button>
          )}
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-20"></div>
    </div>
  )
}

export default Transfer
