import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react'
import { cx } from '../../utils/cx'
import { Icon, type IconName } from './Icon'
import './Toast.css'

type Tone = 'success' | 'info' | 'error'

interface Toast {
  id: number
  tone: Tone
  title: string
  message?: string
}

type Notify = (toast: Omit<Toast, 'id'>) => void

const ToastContext = createContext<Notify | null>(null)

const toneIcon: Record<Tone, IconName> = { success: 'check', info: 'info', error: 'alert' }

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const nextId = useRef(1)

  const dismiss = useCallback((id: number) => setToasts((list) => list.filter((t) => t.id !== id)), [])

  const notify = useCallback<Notify>(
    (toast) => {
      const id = nextId.current++
      setToasts((list) => [...list.slice(-2), { ...toast, id }])
      window.setTimeout(() => dismiss(id), toast.tone === 'error' ? 7000 : 5000)
    },
    [dismiss],
  )

  const value = useMemo(() => notify, [notify])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toasts" role="region" aria-label="Notifications">
        <div aria-live="polite" aria-atomic="false" className="toasts__stack">
          {toasts.map((toast) => (
            <div key={toast.id} className={cx('toast', `toast--${toast.tone}`)} role="status">
              <span className="toast__icon">
                <Icon name={toneIcon[toast.tone]} size={16} strokeWidth={2} />
              </span>
              <div className="toast__text">
                <p className="toast__title">{toast.title}</p>
                {toast.message && <p className="toast__message">{toast.message}</p>}
              </div>
              <button type="button" className="toast__close" onClick={() => dismiss(toast.id)} aria-label="Dismiss notification">
                <Icon name="close" size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  )
}

// oxlint-disable-next-line react/only-export-components
export function useToast(): Notify {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
