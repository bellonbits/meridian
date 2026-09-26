import { useState } from 'react'
import { useAppActions } from '../../context/AppActions'
import { site } from '../../data/site'
import { readStorage, writeStorage } from '../../utils/storage'
import { Icon } from '../ui/Icon'
import './PromoBar.css'

const KEY = 'meridian:promo-dismissed'

export function PromoBar() {
  const [dismissed, setDismissed] = useState(() => readStorage(KEY, false, 'session'))
  const { startProject } = useAppActions()

  if (dismissed) return null

  return (
    <div className="promo" role="region" aria-label="Promotion">
      <div className="container container--wide promo__inner">
        <p className="promo__message">
          <span className="promo__label">{site.promo.label}</span>
          <span className="promo__dash" aria-hidden="true">—</span>
          <button type="button" className="promo__link" onClick={() => startProject({ applyFirstProjectDiscount: true })}>
            {site.promo.message}
          </button>
          <span className="promo__code">
            Code <strong>{site.promo.code}</strong>
          </span>
        </p>
        <p className="promo__contact">
          <a href={`mailto:${site.contact.email}`}>
            <Icon name="mail" size={14} /> {site.contact.email}
          </a>
          <span aria-hidden="true">·</span>
          <span>{site.contact.hours}</span>
        </p>
        <button
          type="button"
          className="promo__dismiss"
          aria-label="Dismiss offer"
          onClick={() => {
            setDismissed(true)
            writeStorage(KEY, true, 'session')
          }}
        >
          <Icon name="close" size={16} />
        </button>
      </div>
    </div>
  )
}
