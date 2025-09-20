import React from 'react'

interface NavigationItem {
  id: string
  label: string
  icon: string | React.ReactNode
  path: string
  active?: boolean
}

interface BottomNavigationProps {
  items: NavigationItem[]
  onItemClick: (item: NavigationItem) => void
  className?: string
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  items,
  onItemClick,
  className = ''
}) => {
  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 ${className}`} style={{ backgroundColor: '#111827' }}>
      <div className="bottom-navigation-tabs">
        <nav className="p-tabview-nav">
          {items.map((item) => (
            <div
              key={item.id}
              className={`p-tabview-nav-item ${item.active ? 'p-highlight' : ''}`}
              onClick={() => onItemClick(item)}
            >
              <div className="p-tabview-nav-link">
                <div className="flex flex-col items-center gap-1 p-2">
                  {typeof item.icon === 'string' ? (
                    <i className={`${item.icon}`} style={{ fontSize: '1.5rem' }}></i>
                  ) : (
                    <div>{item.icon}</div>
                  )}
                  <span className="text-xs font-medium p-tabview-title">{item.label}</span>
                </div>
              </div>
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default BottomNavigation
