import { useState, type SyntheticEvent } from 'react'
import { footerColumns, legalLinks, site } from '../../data/site'
import { isApiConfigured } from '../../services/apiClient'
import { openMailto } from '../../services/emailHandoff'
import { subscribeToNewsletter } from '../../services/projects'
import { isValidEmail } from '../../utils/projectValidation'
import { Icon } from '../ui/Icon'
import { SmartLink } from '../ui/SmartLink'
import { useToast } from '../ui/Toast'
import { Logo } from './Logo'
import './Footer.css'

export function Footer() {
  const notify = useToast()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const onSubscribe = async (event: SyntheticEvent) => {
    event.preventDefault()
    if (!isValidEmail(email)) {
      setError('Enter a valid email address.')
      return
    }
    setError('')
    if (!isApiConfigured) {
      openMailto('Subscribe to the Meridian research notes', `Please add ${email} to the Meridian research notes.`)
      return
    }
    setBusy(true)
    try {
      await subscribeToNewsletter(email)
      notify({ tone: 'success', title: 'Subscribed', message: 'Research notes arrive twice a month.' })
      setEmail('')
    } catch (err) {
      notify({ tone: 'error', title: 'Subscription failed', message: (err as Error).message })
    } finally {
      setBusy(false)
    }
  }

  return (
    <footer className="footer">
      <div className="container container--wide">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo tone="light" />
            <p className="footer__tagline">{site.tagline}</p>
            <p className="footer__about">
              Expert research support, research-led editing, methodology guidance and data analysis — delivered by
              specialists, reviewed by peers, owned by you.
            </p>
          </div>

          <form className="footer__newsletter" onSubmit={onSubscribe} noValidate>
            <label htmlFor="newsletter-email" className="footer__news-title">
              Research notes, twice a month
            </label>
            <p className="footer__news-text">Methodology tips, citation updates and new guides. No spam; unsubscribe anytime.</p>
            <div className="footer__news-field">
              <input
                id="newsletter-email"
                type="email"
                autoComplete="email"
                placeholder="you@university.edu"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (error) setError('')
                }}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? 'newsletter-error' : undefined}
              />
              <button type="submit" disabled={busy}>
                {busy ? 'Subscribing…' : 'Subscribe'}
                <Icon name="arrowRight" size={16} />
              </button>
            </div>
            {error && (
              <p id="newsletter-error" className="footer__news-error" role="alert">
                {error}
              </p>
            )}
          </form>
        </div>

        <nav className="footer__columns" aria-label="Footer">
          {footerColumns.map((column) => (
            <div key={column.title} className="footer__column">
              <h2 className="footer__column-title">{column.title}</h2>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <SmartLink href={link.href}>{link.label}</SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="footer__wordmark" aria-hidden="true">
          Meridian
        </div>

        <div className="footer__bottom">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="footer__integrity">
            We provide research support, editing and guidance. Clients remain responsible for following their
            institution’s academic integrity policies.
          </p>
          <ul className="footer__legal">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <SmartLink href={link.href}>{link.label}</SmartLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
