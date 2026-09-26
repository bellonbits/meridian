import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { cx } from '../../utils/cx'
import { Icon } from '../ui/Icon'
import './PageHero.css'

export interface Crumb {
  label: string
  to?: string
}

interface PageHeroProps {
  eyebrow: string
  title: ReactNode
  lede?: ReactNode
  crumbs: Crumb[]
  /** Right-hand column (key facts, actions, visual). */
  aside?: ReactNode
  children?: ReactNode
  tone?: 'paper' | 'dark'
  className?: string
}

/** Standard interior-page header: breadcrumbs, h1, lede and an optional aside. */
export function PageHero({ eyebrow, title, lede, crumbs, aside, children, tone = 'paper', className }: PageHeroProps) {
  return (
    <header className={cx('page-hero', `page-hero--${tone}`, aside !== undefined && 'page-hero--split', className)}>
      <div className="page-hero__rules" aria-hidden="true" />
      <div className="container container--wide page-hero__grid">
        <div className="page-hero__copy">
          <nav aria-label="Breadcrumb" className="breadcrumbs">
            <ol>
              <li>
                <Link to="/">Home</Link>
              </li>
              {crumbs.map((crumb) => (
                <li key={crumb.label}>
                  <Icon name="chevronDown" size={12} className="breadcrumbs__sep" />
                  {crumb.to ? <Link to={crumb.to}>{crumb.label}</Link> : <span aria-current="page">{crumb.label}</span>}
                </li>
              ))}
            </ol>
          </nav>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="page-hero__title">{title}</h1>
          {lede && <p className="page-hero__lede">{lede}</p>}
          {children}
        </div>
        {aside !== undefined && <div className="page-hero__aside">{aside}</div>}
      </div>
    </header>
  )
}
