import { useAppActions } from '../../context/AppActions'
import { primaryNav, routes, site } from '../../data/site'
import { NavLink } from 'react-router'
import { cx } from '../../utils/cx'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Modal } from '../ui/Modal'
import './MobileMenu.css'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  portalUrl?: string
}

export function MobileMenu({ open, onClose, portalUrl }: MobileMenuProps) {
  const { startProject, openSearch } = useAppActions()

  const run = (action: () => void) => () => {
    onClose()
    // Let the dialog close (and release focus/scroll lock) before acting.
    window.setTimeout(action, 60)
  }

  return (
    <Modal open={open} onClose={onClose} title="Menu" variant="sheet" className="mobile-menu">
      <nav id="mobile-menu" aria-label="Mobile">
        <ul className="mobile-menu__list">
          {primaryNav.map((item, index) => (
            <li key={item.href} style={{ animationDelay: `${60 + index * 35}ms` }}>
              <NavLink
                to={item.href}
                className={({ isActive }) => cx('mobile-menu__link', isActive && 'is-active')}
                onClick={onClose}
              >
                <span className="mobile-menu__index">0{index + 1}</span>
                {item.label}
                <Icon name="arrowRight" size={18} className="mobile-menu__arrow" />
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mobile-menu__actions">
        <Button variant="success" size="lg" block arrow onClick={run(() => startProject())}>
          Start a Project
        </Button>
        <div className="mobile-menu__row">
          <Button variant="secondary" icon="chat" block to={routes.messages} onClick={onClose}>
            Live Chat
          </Button>
          <Button variant="secondary" icon="search" block onClick={run(openSearch)}>
            Search
          </Button>
        </div>
        {portalUrl ? (
          <Button variant="ghost" block href={portalUrl}>
            Sign In
          </Button>
        ) : (
          <Button variant="ghost" block to={routes.signIn} onClick={onClose}>
            Sign In
          </Button>
        )}
      </div>

      <div className="mobile-menu__contact">
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
        <span>{site.contact.hours}</span>
      </div>
    </Modal>
  )
}
