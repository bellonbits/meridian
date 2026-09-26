import { useEffect, useId, useRef, type ReactNode } from 'react'
import { cx } from '../../utils/cx'
import { Icon } from './Icon'
import './Modal.css'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: ReactNode
  eyebrow?: string
  description?: ReactNode
  size?: 'sm' | 'md' | 'lg'
  /** 'sheet' slides in from the side (mobile menu); 'dialog' is centered. */
  variant?: 'dialog' | 'sheet'
  className?: string
  footer?: ReactNode
  children: ReactNode
}

/**
 * Built on the native <dialog> element: focus trapping, Escape, inert background and
 * top-layer rendering come from the platform. Focus returns to the opener on close.
 */
export function Modal({
  open,
  onClose,
  title,
  eyebrow,
  description,
  size = 'md',
  variant = 'dialog',
  className,
  footer,
  children,
}: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const descId = useId()

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) {
      dialog.showModal()
      document.documentElement.classList.add('has-modal')
      dialog.querySelector<HTMLElement>('[data-autofocus]')?.focus()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    const handleClose = () => {
      document.documentElement.classList.remove('has-modal')
      onClose()
    }
    dialog.addEventListener('close', handleClose)
    return () => dialog.removeEventListener('close', handleClose)
  }, [onClose])

  useEffect(() => () => document.documentElement.classList.remove('has-modal'), [])

  return (
    <dialog
      ref={ref}
      className={cx('modal', `modal--${size}`, `modal--${variant}`, className)}
      aria-labelledby={titleId}
      aria-describedby={description ? descId : undefined}
      onClick={(e) => {
        // Click on the backdrop (the dialog element itself, outside the panel) closes it.
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="modal__panel">
        <header className="modal__header">
          <div className="modal__titles">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h2 id={titleId} className="modal__title">
              {title}
            </h2>
            {description && (
              <p id={descId} className="modal__description">
                {description}
              </p>
            )}
          </div>
          <button type="button" className="modal__close" onClick={onClose} aria-label="Close">
            <Icon name="close" size={20} />
          </button>
        </header>
        <div className="modal__body">{children}</div>
        {footer && <footer className="modal__footer">{footer}</footer>}
      </div>
    </dialog>
  )
}
