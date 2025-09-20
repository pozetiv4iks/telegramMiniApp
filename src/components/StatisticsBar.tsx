import React from 'react'

interface StatisticItem {
  label: string
  value: string | number
  icon?: string
  color?: string
}

interface StatisticsBarProps {
  items: StatisticItem[]
  className?: string
}

const StatisticsBar: React.FC<StatisticsBarProps> = ({ 
  items, 
  className = '' 
}) => {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 ${className}`}>
      <div className="flex justify-between items-center">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            {item.icon && (
              <i 
                className={`${item.icon} text-2xl mb-2`}
                style={{ color: item.color || '#2481cc' }}
              ></i>
            )}
            <div className="text-center">
              <div 
                className="text-xl font-bold"
                style={{ color: item.color || '#000000' }}
              >
                {item.value}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {item.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StatisticsBar
