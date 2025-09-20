import React from 'react'
import { Sidebar as PrimeSidebar } from 'primereact/sidebar'

interface SidebarProps {
  visible: boolean
  onHide: () => void
  position?: 'left' | 'right' | 'top' | 'bottom'
  fullScreen?: boolean
  blockScroll?: boolean
  baseZIndex?: number
  dismissable?: boolean
  showCloseIcon?: boolean
  closeOnEscape?: boolean
  modal?: boolean
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

const Sidebar: React.FC<SidebarProps> = ({
  visible,
  onHide,
  position = 'left',
  fullScreen = false,
  blockScroll = true,
  baseZIndex = 1000,
  dismissable = true,
  showCloseIcon = true,
  closeOnEscape = true,
  modal = true,
  className = '',
  style,
  children
}) => {
  return (
    <PrimeSidebar
      visible={visible}
      onHide={onHide}
      position={position}
      fullScreen={fullScreen}
      blockScroll={blockScroll}
      baseZIndex={baseZIndex}
      dismissable={dismissable}
      showCloseIcon={showCloseIcon}
      closeOnEscape={closeOnEscape}
      modal={modal}
      className={className}
      style={style}
    >
      {children}
    </PrimeSidebar>
  )
}

export default Sidebar
