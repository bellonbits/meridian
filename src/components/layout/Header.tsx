import { useEffect, useState } from 'react'
import { NavLink } from 'react-router'
import { useAppActions } from '../../context/AppActions'
import { primaryNav } from '../../data/site'
import { useScrolledPast } from '../../hooks/useScrollPosition'
import { cx } from '../../utils/cx'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { useToast } from '../ui/Toast'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'
import './Header.css'

const PORTAL_URL = import.meta.env.VITE_PORTAL_URL

export function Header() {
  const scrolled = useScrolledPast(12)
  const [menuOpen, setMenuOpen] = useState(false)
  const { startProject, openContact, openSearch } = useAppActions()
  const notify = useToast()

  // ⌘K / Ctrl+K opens search.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        openSearch()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openSearch])

  const signIn = () =>
    notify({
      tone: 'info',
      title: 'Client portal launching soon',
      message: 'Until then, your specialist will contact you by email about your project.',
    })

  return (
    <header className={cx('header', scrolled && 'header--scrolled')}>
      <div className="container container--wide header__inner">
        <Logo />

        <nav className="header__nav" aria-label="Primary">
          <ul>
            {primaryNav.map((item) => (
              <li key={item.href}>
                <NavLink to={item.href} className={({ isActive }) => cx('header__link', isActive && 'is-active')}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <button type="button" className="header__icon-btn" onClick={openSearch} aria-label="Search the site (Ctrl+K)">
            <Icon name="search" size={19} />
          </button>
          <button type="button" className="header__chat" onClick={openContact}>
            <span className="header__chat-dot" aria-hidden="true" />
            <Icon name="chat" size={18} />
            <span>Live Chat</span>
          </button>
          {PORTAL_URL ? (
            <a href={PORTAL_URL} className="header__signin">
              Sign In
            </a>
          ) : (
            <button type="button" className="header__signin" onClick={signIn}>
              Sign In
            </button>
          )}
          <Button variant="success" size="sm" arrow onClick={() => startProject()} className="header__cta">
            Start a Project
          </Button>
          <button
            type="button"
            className="header__menu-btn"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <Icon name="menu" size={22} />
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} onSignIn={signIn} portalUrl={PORTAL_URL} />
    </header>
  )
}
