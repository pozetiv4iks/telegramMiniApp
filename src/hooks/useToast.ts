import { useState } from 'react'

interface ToastState {
  isVisible: boolean
  type: 'success' | 'error' | 'info'
  message: string
}

export const useToast = () => {
  const [toast, setToast] = useState<ToastState>({
    isVisible: false,
    type: 'info',
    message: ''
  })

  const showToast = (type: 'success' | 'error' | 'info', message: string) => {
    setToast({
      isVisible: true,
      type,
      message
    })
  }

  const hideToast = () => {
    setToast(prev => ({
      ...prev,
      isVisible: false
    }))
  }

  const showSuccess = (message: string) => showToast('success', message)
  const showError = (message: string) => showToast('error', message)
  const showInfo = (message: string) => showToast('info', message)

  return {
    toast,
    showToast,
    hideToast,
    showSuccess,
    showError,
    showInfo
  }
}
