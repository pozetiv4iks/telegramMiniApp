import React, { useEffect, useState } from 'react'

interface ToastProps {
  type: 'success' | 'error' | 'info'
  message: string
  isVisible: boolean
  onClose: () => void
  duration?: number
}

const Toast: React.FC<ToastProps> = ({ 
  type, 
  message, 
  isVisible, 
  onClose, 
  duration = 8000 
}) => {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true)
      
      const timer = setTimeout(() => {
        setIsAnimating(false)
        // Задержка для завершения анимации исчезновения
        setTimeout(() => {
          onClose()
        }, 300)
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  if (!isVisible) return null

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          container: 'bg-green-50 border-green-200',
          leftBar: 'bg-green-500',
          icon: 'pi pi-check',
          text: 'text-green-600',
          closeIcon: 'text-green-600'
        }
      case 'error':
        return {
          container: 'bg-red-50 border-red-200',
          leftBar: 'bg-red-500',
          icon: 'pi pi-times',
          text: 'text-red-600',
          closeIcon: 'text-red-600'
        }
      case 'info':
        return {
          container: 'bg-blue-50 border-blue-200',
          leftBar: 'bg-blue-500',
          icon: 'pi pi-info-circle',
          text: 'text-blue-600',
          closeIcon: 'text-blue-600'
        }
      default:
        return {
          container: 'bg-gray-50 border-gray-200',
          leftBar: 'bg-gray-500',
          icon: 'pi pi-info-circle',
          text: 'text-gray-600',
          closeIcon: 'text-gray-600'
        }
    }
  }

  const styles = getToastStyles()

  return (
    <div className="fixed bottom-24 left-4 right-4 z-[200] flex justify-center">
      <div className={`
        ${styles.container} 
        rounded-lg 
        flex 
        items-center 
        shadow-lg 
        max-w-md 
        w-full 
        overflow-hidden
        transition-all 
        duration-300 
        ease-in-out
        transform
        ${isAnimating 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-4 opacity-0'
        }
      `}>
        {/* Left colored bar */}
        <div className={`${styles.leftBar} w-1 h-full`}></div>
        
        {/* Content */}
        <div className="flex items-center gap-3 p-4 flex-1">
          {/* Icon */}
          <div className="flex-shrink-0">
            <i className={`${styles.icon} ${styles.text} text-lg`}></i>
          </div>
          
          {/* Message */}
          <div className="flex-1">
            <p className={`${styles.text} font-medium`}>{message}</p>
          </div>
          
          {/* Close Button */}
          <button 
            onClick={() => {
              setIsAnimating(false)
              setTimeout(() => onClose(), 300)
            }}
            className={`flex-shrink-0 ${styles.closeIcon} hover:opacity-70 transition-opacity`}
          >
            <i className="pi pi-times text-lg"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Toast