import React, { useState, useEffect } from 'react'

interface EmailActivationModalProps {
  isOpen: boolean
  onClose: () => void
  onNext: (email: string) => void
}

const EmailActivationModal: React.FC<EmailActivationModalProps> = ({ isOpen, onClose, onNext }) => {
  const [email, setEmail] = useState('')
  const [consentChecked, setConsentChecked] = useState(true)

  useEffect(() => {
    if (isOpen) {
      setEmail('')
      setConsentChecked(true)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = () => {
    if (email && consentChecked) {
      onNext(email)
    }
  }

  return (
    <div className="fixed inset-0 z-[120]">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      <div 
        className="relative bg-gray-800 w-full h-full overflow-y-auto"
        style={{ 
          paddingTop: 'env(safe-area-inset-top, 0)',
          paddingBottom: 'env(safe-area-inset-bottom, 0)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <i className="pi pi-chevron-left"></i>
            <span>Back</span>
          </button>
        </div>
        
        <div className="p-6 space-y-6" style={{ paddingBottom: '120px' }}>
          {/* Title */}
          <div className="text-center">
            <h1 className="text-white text-2xl font-bold mb-4">Введите свой email</h1>
            <p className="text-gray-300 text-sm">
              На вашу почту придёт код подтверждения для активации карты
            </p>
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <label className="block text-white text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Введите свой email"
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-yellow-400 focus:outline-none"
            />
          </div>

          {/* Consent Checkbox */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={consentChecked}
              onChange={(e) => setConsentChecked(e.target.checked)}
              className="mt-1 w-4 h-4 text-yellow-400 bg-gray-700 border-gray-600 rounded focus:ring-yellow-400 focus:ring-2"
            />
            <span className="text-gray-300 text-sm">
              Даю согласие на <strong className="text-white">Обработку персональных данных</strong>
            </span>
          </div>
        </div>
        
        {/* Buttons */}
        <div className="p-6 border-t border-gray-700" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0) + 120px)' }}>
          <button 
            onClick={handleSubmit}
            disabled={!email || !consentChecked}
            className="w-full bg-yellow-400 text-black font-semibold py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed mb-3"
            style={{ height: '54px' }}
          >
            Отправить код
          </button>
          <button 
            onClick={onClose}
            className="w-full bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors"
            style={{ height: '54px' }}
          >
            Отменить
          </button>
        </div>
      </div>
    </div>
  )
}

export default EmailActivationModal
