import React, { useState, useEffect } from 'react'

interface CodeConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (code: string) => void
  onResend: () => void
  email: string
}

const CodeConfirmationModal: React.FC<CodeConfirmationModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  onResend, 
  email 
}) => {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setCode('')
      setError('')
      setCountdown(60)
      setCanResend(false)
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setCanResend(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [isOpen])

  const handleSubmit = () => {
    if (code.length === 6) {
      // Проверяем код (здесь можно добавить валидацию)
      if (code === '123456') {
        setError('Неверный код')
        return
      }
      onConfirm(code)
    }
  }

  const handleResend = () => {
    if (canResend) {
      onResend()
      setCountdown(60)
      setCanResend(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[130]">
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
          <div className="flex items-center gap-3">
            <div className="w-6 h-4 bg-white rounded"></div>
            <i className="pi pi-chevron-down text-gray-400"></i>
            <i className="pi pi-ellipsis-v text-gray-400"></i>
          </div>
        </div>
        
        <div className="p-6 space-y-6" style={{ paddingBottom: '120px' }}>
          {/* Title */}
          <div className="text-center">
            <h1 className="text-white text-2xl font-bold mb-4">Введите код подтверждения</h1>
            <p className="text-gray-300 text-sm">
              На вашу почту {email} придёт код подтверждения для активации карты
            </p>
          </div>

          {/* Code Input */}
          <div className="space-y-2">
            <label className="block text-white text-sm font-medium">Код подтверждения</label>
            <input
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value)
                setError('')
              }}
              placeholder="Введите код подтверждения"
              maxLength={6}
              className={`w-full bg-gray-700 text-white border rounded-lg px-4 py-3 focus:outline-none ${
                error ? 'border-red-500' : 'border-gray-600 focus:border-yellow-400'
              }`}
            />
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
          </div>
        </div>
        
        {/* Buttons */}
        <div className="p-6 border-t border-gray-700" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0) + 20px)' }}>
          <button 
            onClick={handleSubmit}
            disabled={code.length !== 6}
            className="w-full bg-yellow-400 text-black font-semibold py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed mb-3"
            style={{ height: '54px' }}
          >
            {code.length === 6 ? 'Подтвердить' : `Подтвердить (${code.length}/6)`}
          </button>
          <button 
            onClick={handleResend}
            disabled={!canResend}
            className="w-full bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"
            style={{ height: '54px' }}
          >
            {canResend ? 'Отправить повторно' : `Отправить повторно через ${formatTime(countdown)}`}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CodeConfirmationModal
