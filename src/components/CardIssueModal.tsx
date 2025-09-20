import React from 'react'

interface CardIssueModalProps {
  isOpen: boolean
  onClose: () => void
}

const CardIssueModal: React.FC<CardIssueModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[40]">
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
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-white text-lg font-semibold">Выпуск карты</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <i className="pi pi-times text-xl"></i>
          </button>
        </div>
        
        <div className="p-6 space-y-6" style={{ paddingBottom: '120px' }}>
          {/* Заголовок */}
          <div className="text-center">
            <p className="text-gray-300 text-sm mb-6">Совершайте платежи по всему миру с виртуальной картой Mastercard</p>
          </div>

          {/* Иконка карты */}
          <div className="flex justify-center mb-6">
            <div className="w-32 h-20 bg-gray-300 rounded-lg flex flex-col justify-between p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-1 bg-gray-600 rounded"></div>
                <div className="w-2 h-1 bg-gray-600 rounded"></div>
                <div className="w-2 h-1 bg-gray-600 rounded"></div>
              </div>
              <div className="flex justify-end">
                <div className="w-8 h-6 bg-gray-600 rounded flex items-center justify-center">
                  <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                </div>
              </div>
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-gray-600 rounded"></div>
                <div className="w-1 h-1 bg-gray-600 rounded"></div>
                <div className="w-1 h-1 bg-gray-600 rounded"></div>
                <div className="w-1 h-1 bg-gray-600 rounded"></div>
              </div>
            </div>
          </div>

          {/* Apple Pay */}
          <div className="text-center mb-6">
            <p className="text-gray-300 text-sm">Привязка к Apple Pay на Iphone</p>
          </div>

          {/* Стоимость */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-400 text-sm">Стоимость:</span>
            <span className="text-white text-xl font-bold">$10</span>
          </div>

          {/* Преимущества карты */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Преимущества карты</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-300 text-sm">Оплата любимых сервисов</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-300 text-sm">Покупки на маркетплейсах</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-300 text-sm">Бронирование и поездки</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-300 text-sm">Сервисы для бизнеса</span>
              </div>
            </div>
          </div>

          {/* Условия выпуска */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Условия выпуска</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-300 text-sm">Выпуск карты = $10</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-300 text-sm">Комиссия пополнения = 0%</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-300 text-sm">Комиссия за транзакции = 0.25%</span>
              </div>
            </div>
          </div>

          {/* Запрещённые операции */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-semibold">Запрещённые операции по карте</h4>
              <i className="pi pi-chevron-up text-gray-400"></i>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-300 text-sm">Финансовые инвестиции и управление активами</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-300 text-sm">Покупка виртуальных валют</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-300 text-sm">Азартные игры</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-300 text-sm">Транзакции, связанные с продуктами для взрослых</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-300 text-sm">Покупка подарочных карт</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Кнопка и текст внизу */}
        <div className="p-6 border-t border-gray-700" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0) + 120px)' }}>
          <button 
            onClick={() => {
              alert('Переход к оплате')
              onClose()
            }}
            className="w-full bg-yellow-400 text-black font-semibold py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors mb-3"
            style={{ height: '54px' }}
          >
            Выпустить карту $10
          </button>
          <p className="text-gray-400 text-xs text-center">
            Для активации и использования карты после выпуска потребуется ввести свой email
          </p>
        </div>
      </div>
    </div>
  )
}

export default CardIssueModal
