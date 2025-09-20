import React from 'react'

interface ReferralModalProps {
  isOpen: boolean
  onClose: () => void
}

const ReferralModal: React.FC<ReferralModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  const handleShareQR = () => {
    // Логика поделиться QR-кодом
    console.log('Поделиться QR-кодом')
  }

  const handleCopyLink = () => {
    // Логика копирования ссылки
    console.log('Ссылка скопирована!')
  }

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
            Скопируйте ссылку или поделитесь QR-кодом.
          </p>

          {/* QR Code */}
          <div className="flex justify-center mb-6">
            <div 
              className="bg-white p-4 rounded-lg"
              style={{ width: '250px', height: '250px' }}
            >
              {/* Placeholder QR Code */}
              <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-black rounded mx-auto mb-2"></div>
                  <p className="text-gray-600 text-xs">QR Code</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reward text */}
          <p className="text-gray-300 text-sm mb-6 text-center">
            Если ваш друг откроет карту, на ваш счёт будет зачислено 10$
          </p>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleShareQR}
              className="w-full bg-yellow-400 text-black font-semibold py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"
            >
              <i className="pi pi-share-alt"></i>
              Поделиться QR-кодом
            </button>
            
            <button
              onClick={handleCopyLink}
              className="w-full bg-yellow-400 text-black font-semibold py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"
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
