import React from 'react'
import { TabView, TabPanel } from 'primereact/tabview'

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
  // Находим активный индекс для TabView
  const activeIndex = items.findIndex(item => item.active)

  const handleTabChange = (e: any) => {
    const clickedItem = items[e.index]
    if (clickedItem) {
      onItemClick(clickedItem)
    }
  }

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 ${className}`}>
      <TabView 
        className="bottom-navigation-tabs"
        activeIndex={activeIndex >= 0 ? activeIndex : 0}
        onTabChange={handleTabChange}
      >
        {items.map((item) => (
          <TabPanel
            key={item.id}
            header={
              <div className="flex flex-col items-center gap-1 p-2">
                {typeof item.icon === 'string' ? (
                  <i className={`${item.icon}`} style={{ fontSize: '1.5rem' }}></i>
                ) : (
                  <div>{item.icon}</div>
                )}
                <span className="text-xs font-medium">{item.label}</span>
              </div>
            }
          />
        ))}
      </TabView>
    </div>
  )
}

export default BottomNavigation
