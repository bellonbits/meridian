import { useState, type SyntheticEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { Seo } from '../components/page/Seo'
import { Button } from '../components/ui/Button'
import { TextInput } from '../components/ui/Form'
import { Icon } from '../components/ui/Icon'
import { routes, site } from '../data/site'
import { accountsEnabled, login, requestMagicLink } from '../services/auth'
import { isValidEmail } from '../utils/projectValidation'
import './SignInPage.css'

type Result = { kind: 'unavailable' } | { kind: 'link-sent'; email: string } | { kind: 'error'; message: string } | null

const features = [
  { icon: 'doc', text: 'Project scope, milestones and deliverables' },
  { icon: 'chat', text: 'Messages with your specialist' },
  { icon: 'tag', text: 'Quotes and invoices' },
  { icon: 'lock', text: 'Confidential file sharing' },
] as const

export default function SignInPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [busy, setBusy] = useState(false)
  const [result, setResult] = useState<Result>(null)

  const check = (needPassword: boolean) => {
    const next = {
      email: isValidEmail(email) ? undefined : 'Enter the email you used with us.',
      password: needPassword && password.length < 1 ? 'Enter your password.' : undefined,
    }
    setErrors(next)
    return !next.email && !next.password
  }

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (!check(true)) return
    if (!accountsEnabled) {
      setResult({ kind: 'unavailable' })
      return
    }
    setBusy(true)
    try {
      await login(email.trim(), password)
      navigate(routes.portal)
    } catch (err) {
      setResult({ kind: 'error', message: (err as Error).message || 'Email or password is incorrect.' })
    } finally {
      setBusy(false)
    }
  }

  const onMagicLink = async () => {
    if (!check(false)) return
    if (!accountsEnabled) {
      setResult({ kind: 'unavailable' })
      return
    }
    setBusy(true)
    try {
      await requestMagicLink(email.trim())
      setResult({ kind: 'link-sent', email: email.trim() })
    } catch (err) {
      setResult({ kind: 'error', message: (err as Error).message })
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <Seo title="Sign In" description={`Sign in to the ${site.name} client portal.`} noindex />
      <section className="signin">
        <div className="container container--wide signin__grid">
          <aside className="signin__brand" aria-label="About the client portal">
            <svg className="signin__arc" viewBox="0 0 400 400" aria-hidden="true">
              <circle cx="200" cy="200" r="199" fill="none" stroke="currentColor" />
              <ellipse cx="200" cy="200" rx="95" ry="199" fill="none" stroke="currentColor" />
              <path d="M200 1v398M1 200h398" stroke="currentColor" />
            </svg>
            <p className="eyebrow">Client portal</p>
            <h1 className="signin__title">
              Your research, <em>in one place.</em>
            </h1>
            <ul className="signin__features">
              {features.map((f) => (
                <li key={f.text}>
                  <span>
                    <Icon name={f.icon} size={17} />
                  </span>
                  {f.text}
                </li>
              ))}
            </ul>
            <p className="signin__annot annot">confidential by default</p>
          </aside>

          <div className="signin__panel">
            <div className="signin__card">
              <h2 className="signin__card-title">Sign in</h2>
              <p className="signin__card-sub">Use the email address you shared with your specialist.</p>

              {!accountsEnabled && result?.kind !== 'unavailable' && (
                <p className="signin__soon">
                  <Icon name="info" size={16} /> Client accounts are launching soon.
                </p>
              )}

              {result?.kind === 'unavailable' ? (
                <div className="signin__result" role="status">
                  <span className="signin__result-icon">
                    <Icon name="clock" size={22} />
                  </span>
                  <h3>Accounts aren’t switched on yet</h3>
                  <p>
                    Online sign-in opens with the client portal. Your specialist will keep you updated by email in the
                    meantime. Anything you’ve started on this device is still here:
                  </p>
                  <div className="signin__result-actions">
                    <Button to={routes.portal} variant="primary" arrow block>
                      Open your workspace
                    </Button>
                    <Button to={routes.messages} variant="secondary" icon="chat" block>
                      Your enquiries
                    </Button>
                  </div>
                  <button type="button" className="signin__back" onClick={() => setResult(null)}>
                    <Icon name="chevronLeft" size={14} /> Back to sign in
                  </button>
                </div>
              ) : result?.kind === 'link-sent' ? (
                <div className="signin__result" role="status">
                  <span className="signin__result-icon signin__result-icon--ok">
                    <Icon name="mail" size={22} />
                  </span>
                  <h3>Check your inbox</h3>
                  <p>
                    We sent a sign-in link to <strong>{result.email}</strong>. It expires shortly, so use it soon.
                  </p>
                  <button type="button" className="signin__back" onClick={() => setResult(null)}>
                    <Icon name="chevronLeft" size={14} /> Use a different email
                  </button>
                </div>
              ) : (
                <form className="signin__form" onSubmit={onSubmit} noValidate>
                  {result?.kind === 'error' && (
                    <p className="signin__error" role="alert">
                      <Icon name="alert" size={16} /> {result.message}
                    </p>
                  )}
                  <TextInput
                    id="signin-email"
                    label="Email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onValueChange={(v) => {
                      setEmail(v)
                      setErrors((x) => ({ ...x, email: undefined }))
                    }}
                    error={errors.email}
                  />
                  <div className="signin__password">
                    <TextInput
                      id="signin-password"
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      value={password}
                      onValueChange={(v) => {
                        setPassword(v)
                        setErrors((x) => ({ ...x, password: undefined }))
                      }}
                      error={errors.password}
                    />
                    <button
                      type="button"
                      className="signin__toggle"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      aria-pressed={showPassword}
                      onClick={() => setShowPassword((v) => !v)}
                    >
                      <Icon name="eye" size={18} />
                    </button>
                  </div>
                  <Button type="submit" variant="primary" size="lg" arrow block disabled={busy}>
                    {busy ? 'Signing in…' : 'Sign in'}
                  </Button>
                  <div className="signin__divider">
                    <span>or</span>
                  </div>
                  <Button variant="secondary" icon="mail" block onClick={onMagicLink} disabled={busy}>
                    Email me a sign-in link
                  </Button>
                </form>
              )}

              <p className="signin__foot">
                New to Meridian? <Link to={routes.start}>Start a project</Link> — your account is created when you
                approve your first scope.
              </p>
            </div>
            <p className="signin__legal">
              By signing in you agree to our <Link to={routes.terms}>Terms</Link> and{' '}
              <Link to={routes.privacy}>Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
