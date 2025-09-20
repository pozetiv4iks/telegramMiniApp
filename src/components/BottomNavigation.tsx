import React from 'react'
import { Button } from 'primereact/button'

interface NavigationItem {
  id: string
  label: string
  icon: string
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
    <div className={`bottom-navigation ${className}`}>
      <div className="navigation-items">
        {items.map((item) => (
          <Button
            key={item.id}
            icon={item.icon}
            label={item.label}
            text
            className={`nav-item ${item.active ? 'active' : ''}`}
            onClick={() => onItemClick(item)}
          />
        ))}
      </div>
      {/* Home indicator */}
      <div className="home-indicator">
        <div className="indicator-bar"></div>
      </div>
    </div>
  )
}

export default BottomNavigation
