import React from 'react'
import { TabView as PrimeTabView, TabPanel } from 'primereact/tabview'

interface Tab {
  header: string
  content: React.ReactNode
  icon?: string
  disabled?: boolean
}

interface TabViewProps {
  tabs: Tab[]
  activeIndex?: number
  onTabChange?: (e: { index: number }) => void
  className?: string
}

const TabView: React.FC<TabViewProps> = ({
  tabs,
  activeIndex = 0,
  onTabChange,
  className = ''
}) => {
  return (
    <PrimeTabView
      activeIndex={activeIndex}
      onTabChange={onTabChange}
      className={className}
    >
      {tabs.map((tab, index) => (
        <TabPanel
          key={index}
          header={tab.header}
          leftIcon={tab.icon}
          disabled={tab.disabled}
        >
          {tab.content}
        </TabPanel>
      ))}
    </PrimeTabView>
  )
}

export default TabView
