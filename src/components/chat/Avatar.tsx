import { cx } from '../../utils/cx'
import { initials } from './chatFormat'

interface AvatarProps {
  name: string
  tone?: string
  size?: 'sm' | 'md' | 'lg'
  studio?: boolean
}

/** Initials avatar. Studio avatars show the Meridian mark, tinted by `tone` (topic). */
export function Avatar({ name, tone = 'blue', size = 'md', studio }: AvatarProps) {
  return (
    <span className={cx('chat-avatar', `chat-avatar--${size}`, `chat-avatar--${tone}`)} aria-hidden="true">
      {studio ? (
        <svg viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="11" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M18 7c-3.5 3-5.2 6.7-5.2 11s1.7 8 5.2 11M18 7v22M7.5 21h21" fill="none" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      ) : (
        initials(name)
      )}
    </span>
  )
}
