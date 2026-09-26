import { Icon } from '../ui/Icon'
import './TrustBadges.css'

export function TrustBadges({ items }: { items: readonly string[] }) {
  return (
    <ul className="trust-badges" aria-label="Our commitments">
      {items.map((item) => (
        <li key={item}>
          <span className="trust-badges__tick" aria-hidden="true">
            <Icon name="check" size={12} strokeWidth={2.4} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  )
}
