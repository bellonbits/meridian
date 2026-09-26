import { forwardRef, type KeyboardEvent } from 'react'
import type { FaqItem as FaqData } from '../../data/faq'
import { cx } from '../../utils/cx'
import { Icon } from '../ui/Icon'

interface FAQItemProps {
  item: FaqData
  index: number
  open: boolean
  onToggle: () => void
  onKeyNav: (e: KeyboardEvent<HTMLButtonElement>) => void
  /** Heading level for the question (4 when nested under a group heading). */
  level?: 3 | 4
}

export const FAQItem = forwardRef<HTMLButtonElement, FAQItemProps>(function FAQItem(
  { item, index, open, onToggle, onKeyNav, level = 3 },
  ref,
) {
  const buttonId = `faq-${item.id}`
  const panelId = `faq-panel-${item.id}`
  const Heading = level === 4 ? 'h4' : 'h3'
  return (
    <div className={cx('faq-item', open && 'is-open')}>
      <Heading className="faq-item__heading">
        <button
          ref={ref}
          id={buttonId}
          type="button"
          className="faq-item__trigger"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          onKeyDown={onKeyNav}
        >
          <span className="faq-item__num">{String(index + 1).padStart(2, '0')}</span>
          <span className="faq-item__q">{item.question}</span>
          <span className="faq-item__icon" aria-hidden="true">
            <Icon name="plus" size={18} />
          </span>
        </button>
      </Heading>
      {/* Grid-rows animation keeps height transitions smooth without measuring. */}
      <div id={panelId} role="region" aria-labelledby={buttonId} className="faq-item__panel" inert={!open}>
        <div className="faq-item__inner">
          <p>{item.answer}</p>
        </div>
      </div>
    </div>
  )
})
