import React, { useRef } from 'react'
import { Toast as PrimeToast } from 'primereact/toast'
import { useToast } from './hooks/useToast'

interface ToastProps {
  className?: string
  style?: React.CSSProperties
}

const Toast: React.FC<ToastProps> = ({
  className = '',
  style
}) => {
  const toast = useRef<PrimeToast>(null)
  
  // Экспортируем toast в глобальный контекст для использования в других компонентах
  useToast.setToastRef(toast as React.RefObject<any>)

  return (
    <PrimeToast
      ref={toast}
      className={className}
      style={style}
    />
  )
}

export default Toast
