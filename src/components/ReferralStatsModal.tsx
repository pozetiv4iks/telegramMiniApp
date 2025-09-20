import React from 'react'

interface ReferralStatsModalProps {
  isOpen: boolean
  onClose: () => void
}

const ReferralStatsModal: React.FC<ReferralStatsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      <div 
        className="relative bg-gray-800 rounded-t-2xl w-full modal-slide-up overflow-y-auto"
        style={{ marginTop: '373px' }}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-white text-lg font-semibold">Реферальная статистика</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <i className="pi pi-times text-xl"></i>
          </button>
        </div>
        
        <div className="p-6 space-y-4" style={{ paddingBottom: '120px' }}>
          {/* Количество друзей, перешедших по ссылке */}
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium text-sm">Количество друзей, перешедших по ссылке</h3>
              </div>
              <div className="text-white text-2xl font-bold">0</div>
            </div>
          </div>

          {/* Количество выпущенных карт */}
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium text-sm">Количество выпущенных карт</h3>
              </div>
              <div className="text-white text-2xl font-bold">0</div>
            </div>
          </div>

          {/* Сумма вознаграждения */}
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium text-sm">Сумма вознаграждения</h3>
              </div>
              <div className="text-white text-2xl font-bold">$0</div>
            </div>
          </div>
        </div>
        
        {/* Кнопка "Понятно" - фиксированная внизу с отступом */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gray-800 border-t border-gray-700" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0) + 24px)' }}>
          <button 
            onClick={onClose}
            className="w-full bg-yellow-400 text-black font-semibold py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"
            style={{ height: '54px' }}
          >
            <i className="pi pi-check"></i>
            Понятно
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReferralStatsModal
