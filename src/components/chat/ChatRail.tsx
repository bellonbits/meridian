import { NavLink } from 'react-router'
import { routes } from '../../data/site'
import type { ChatProfile } from '../../types/chat'
import { cx } from '../../utils/cx'
import { Icon, type IconName } from '../ui/Icon'
import { Avatar } from './Avatar'

interface ChatRailProps {
  profile: ChatProfile | null
  unread: number
  onEditProfile: () => void
}

const links: { to: string; label: string; icon: IconName }[] = [
  { to: routes.start, label: 'New project', icon: 'plus' },
  { to: routes.pricing, label: 'Pricing', icon: 'tag' },
  { to: routes.resources, label: 'Guides', icon: 'book' },
  { to: routes.faq, label: 'Help', icon: 'help' },
]

/** Left rail: who you are, the inbox, and shortcuts to the rest of the studio. */
export function ChatRail({ profile, unread, onEditProfile }: ChatRailProps) {
  return (
    <aside className="chat-rail" aria-label="Inbox navigation">
      <button type="button" className="chat-rail__profile" onClick={onEditProfile}>
        <Avatar name={profile?.name ?? 'Guest'} size="lg" tone="navy" />
        <span className="chat-rail__name">
          {profile?.name ?? 'Guest'}
          <Icon name="chevronDown" size={14} />
        </span>
        <span className="visually-hidden">Edit your details</span>
      </button>

      <nav className="chat-rail__nav">
        <ul>
          <li>
            <span className="chat-rail__link is-active" aria-current="page">
              <Icon name="inbox" size={18} /> Enquiries
              {unread > 0 && <span className="chat-rail__count">{unread}</span>}
            </span>
          </li>
          {links.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} className={({ isActive }) => cx('chat-rail__link', isActive && 'is-active')}>
                <Icon name={l.icon} size={18} /> {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
