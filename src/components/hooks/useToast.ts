import { Toast } from 'primereact/toast'

interface ToastMessage {
  severity: 'success' | 'info' | 'warn' | 'error'
  summary: string
  detail?: string
  life?: number
}

class ToastService {
  private toastRef: React.RefObject<Toast> | null = null

  setToastRef(ref: React.RefObject<Toast>) {
    this.toastRef = ref
  }

  show(message: ToastMessage) {
    if (this.toastRef?.current) {
      this.toastRef.current.show(message)
    }
  }

  showSuccess(summary: string, detail?: string, life?: number) {
    this.show({
      severity: 'success',
      summary,
      detail,
      life: life || 3000
    })
  }

  showInfo(summary: string, detail?: string, life?: number) {
    this.show({
      severity: 'info',
      summary,
      detail,
      life: life || 3000
    })
  }

  showWarn(summary: string, detail?: string, life?: number) {
    this.show({
      severity: 'warn',
      summary,
      detail,
      life: life || 3000
    })
  }

  showError(summary: string, detail?: string, life?: number) {
    this.show({
      severity: 'error',
      summary,
      detail,
      life: life || 5000
    })
  }

  clear() {
    if (this.toastRef?.current) {
      this.toastRef.current.clear()
    }
  }
}

export const useToast = new ToastService()
