import { useRef, type KeyboardEvent } from 'react'
import type { PricingPlan } from '../../types/pricing'
import { cx } from '../../utils/cx'
import { panelId, tabId } from './pricingIds'

interface PricingTabsProps {
  plans: PricingPlan[]
  activeId: string
  onChange: (id: string) => void
}

/** Accessible tablist with roving tabindex and arrow/Home/End keys. */
export function PricingTabs({ plans, activeId, onChange }: PricingTabsProps) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = plans.length - 1
    const target =
      e.key === 'ArrowRight' ? (index === last ? 0 : index + 1)
      : e.key === 'ArrowLeft' ? (index === 0 ? last : index - 1)
      : e.key === 'Home' ? 0
      : e.key === 'End' ? last
      : null
    if (target === null) return
    e.preventDefault()
    onChange(plans[target].id)
    refs.current[target]?.focus()
  }

  return (
    <div className="pricing-tabs" role="tablist" aria-label="Support type">
      {plans.map((plan, i) => {
        const selected = plan.id === activeId
        return (
          <button
            key={plan.id}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="tab"
            id={tabId(plan.id)}
            aria-selected={selected}
            aria-controls={panelId}
            tabIndex={selected ? 0 : -1}
            className={cx('pricing-tabs__tab', selected && 'is-active')}
            onClick={() => onChange(plan.id)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {plan.tab}
          </button>
        )
      })}
    </div>
  )
}
