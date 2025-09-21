import React, { useState, useEffect } from 'react'
import QRCode from 'qrcode'

interface ReferralModalProps {
  isOpen: boolean
  onClose: () => void
}

const ReferralModal: React.FC<ReferralModalProps> = ({ isOpen, onClose }) => {
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string>('')
  const [referralLink, setReferralLink] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  // Генерируем реферальную ссылку и QR-код
  useEffect(() => {
    if (isOpen) {
      generateReferralData()
    }
  }, [isOpen])

  const generateReferralData = async () => {
    try {
      setIsLoading(true)
      
      // Генерируем реферальную ссылку на бота
      const botUsername = 'burbulbulbot'
      const referralCode = generateReferralCode()
      const link = `https://t.me/${botUsername}?start=${referralCode}`
      
      setReferralLink(link)
      
      // Генерируем QR-код
      const qrDataURL = await QRCode.toDataURL(link, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      })
      
      setQrCodeDataURL(qrDataURL)
    } catch (error) {
      console.error('Ошибка при генерации реферальных данных:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateReferralCode = (): string => {
    // Генерируем уникальный реферальный код
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 8)
    return `ref_${timestamp}_${random}`
  }

  const handleShareQR = async () => {
    try {
      if (navigator.share && qrCodeDataURL) {
        // Конвертируем data URL в blob
        const response = await fetch(qrCodeDataURL)
        const blob = await response.blob()
        const file = new File([blob], 'referral-qr.png', { type: 'image/png' })
        
        await navigator.share({
          title: 'Реферальная ссылка',
          text: 'Присоединяйся к нашей программе!',
          files: [file]
        })
      } else {
        // Fallback для браузеров без поддержки Web Share API
        const link = document.createElement('a')
        link.download = 'referral-qr.png'
        link.href = qrCodeDataURL
        link.click()
      }
    } catch (error) {
      console.error('Ошибка при поделиться QR-кодом:', error)
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink)
      console.log('Ссылка скопирована!')
      // Можно добавить уведомление пользователю
    } catch (error) {
      console.error('Ошибка при копировании ссылки:', error)
      // Fallback для старых браузеров
      const textArea = document.createElement('textarea')
      textArea.value = referralLink
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div 
        className="relative bg-gray-800 rounded-t-2xl w-full modal-slide-up"
        style={{ marginTop: '167px' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-white text-lg font-semibold">Реферальная программа</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <i className="pi pi-times text-xl"></i>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Instruction */}
          <p className="text-gray-300 text-sm mb-6 text-center">
            Пригласите друзей и получите бонусы! Поделитесь ссылкой или QR-кодом.
          </p>

          {/* Referral Link Display */}
          {referralLink && (
            <div className="mb-4 p-3 bg-gray-700 rounded-lg">
              <p className="text-gray-400 text-xs mb-1">Ваша реферальная ссылка:</p>
              <p className="text-white text-sm break-all">{referralLink}</p>
            </div>
          )}

          {/* QR Code */}
          <div className="flex justify-center mb-6">
            <div 
              className="bg-white p-4 rounded-lg"
              style={{ width: '250px', height: '250px' }}
            >
              {isLoading ? (
                <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-2 border-gray-600 border-t-transparent rounded-full mx-auto mb-2"></div>
                    <p className="text-gray-600 text-xs">Генерация QR-кода...</p>
                  </div>
                </div>
              ) : qrCodeDataURL ? (
                <img 
                  src={qrCodeDataURL} 
                  alt="Реферальный QR-код" 
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gray-400 rounded mx-auto mb-2"></div>
                    <p className="text-gray-600 text-xs">QR Code</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Reward text */}
          <p className="text-gray-300 text-sm mb-6 text-center">
            Если ваш друг откроет карту через вашу ссылку, на ваш счёт будет зачислено <span className="text-yellow-400 font-semibold">10$</span>
          </p>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleShareQR}
              disabled={!qrCodeDataURL || isLoading}
              className="w-full bg-yellow-400 text-black font-semibold py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="pi pi-share-alt"></i>
              Поделиться QR-кодом
            </button>
            
            <button
              onClick={handleCopyLink}
              disabled={!referralLink}
              className="w-full bg-yellow-400 text-black font-semibold py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="pi pi-copy"></i>
              Скопировать ссылку
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ReferralModal
