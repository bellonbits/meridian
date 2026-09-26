import { Link } from 'react-router'
import { site } from '../../data/site'
import { cx } from '../../utils/cx'
import './Logo.css'

/** Meridian mark: a globe meridian arc crossing a baseline — "a line of reference". */
export function Logo({ tone = 'dark', className }: { tone?: 'dark' | 'light'; className?: string }) {
  return (
    <Link to="/" className={cx('logo', `logo--${tone}`, className)} aria-label={`${site.name} — home`}>
      <svg className="logo__mark" viewBox="0 0 36 36" aria-hidden="true">
        <circle cx="18" cy="18" r="16.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M18 1.75c-5.2 4.4-7.8 9.8-7.8 16.25S12.8 29.85 18 34.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M18 1.75v32.5" stroke="var(--logo-accent)" strokeWidth="1.5" />
        <path d="M3.5 22.5h29" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="18" cy="22.5" r="2.6" fill="var(--logo-accent)" />
      </svg>
      <span className="logo__type">
        <span className="logo__name">Meridian</span>
        <span className="logo__sub">Research Studio</span>
      </span>
    </Link>
  )
}
