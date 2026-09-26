import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Avatar } from '../components/chat/Avatar'
import { shortTime } from '../components/chat/chatFormat'
import { Seo } from '../components/page/Seo'
import { Button } from '../components/ui/Button'
import { Icon } from '../components/ui/Icon'
import { useToast } from '../components/ui/Toast'
import { estimatorConfig } from '../data/pricing'
import { academicLevels, deadlines, labelFor, projectTypes, services } from '../data/projectOptions'
import { resources } from '../data/resources'
import { serviceItems } from '../data/services'
import { routes } from '../data/site'
import { loadDraft } from '../hooks/useProjectEstimator'
import { ApiError } from '../services/apiClient'
import { accountsEnabled, fetchCurrentUser, fetchProjects, logout, type ClientProject, type ClientUser } from '../services/auth'
import { getChatClient, WELCOME_ID } from '../services/chat'
import type { ChatSnapshot } from '../types/chat'
import { cx } from '../utils/cx'
import { calculateEstimate, formatMoney, formatNumber } from '../utils/pricingCalculator'
import { resolveDeadlineDays } from '../utils/projectValidation'
import './PortalPage.css'

const REQUIRED = ['academicLevel', 'projectType', 'subject', 'service', 'deadline'] as const

const steps = ['Configure your project', 'Send your brief', 'Scope & quote', 'Work in progress', 'Delivery']

export default function PortalPage() {
  const navigate = useNavigate()
  const notify = useToast()
  const [user, setUser] = useState<ClientUser | null>(null)
  const [projects, setProjects] = useState<ClientProject[]>([])
  const [chat, setChat] = useState<ChatSnapshot | null>(null)
  const [draft] = useState(loadDraft)

  // Account mode: load the signed-in client, or send them to sign in.
  useEffect(() => {
    if (!accountsEnabled) return
    let cancelled = false
    Promise.all([fetchCurrentUser(), fetchProjects()])
      .then(([u, p]) => {
        if (cancelled) return
        setUser(u)
        setProjects(p)
      })
      .catch((err) => {
        if (cancelled) return
        if (err instanceof ApiError && err.status === 401) navigate(routes.signIn, { replace: true })
        else notify({ tone: 'error', title: 'Could not load your account', message: (err as Error).message })
      })
    return () => void (cancelled = true)
  }, [navigate, notify])

  useEffect(() => {
    let cancelled = false
    void getChatClient()
      .load()
      .then((s) => !cancelled && setChat(s))
      .catch(() => undefined)
    return () => void (cancelled = true)
  }, [])

  const completed = REQUIRED.filter((f) => draft[f]).length
  const hasDraft = completed > 0 || draft.requirements.length > 0
  const estimate = useMemo(
    () => calculateEstimate({ ...draft, deadlineDays: resolveDeadlineDays(draft) }),
    [draft],
  )

  const threads = (chat?.conversations ?? []).filter((c) => c.id !== WELCOME_ID)
  const unread = (chat?.conversations ?? []).reduce((n, c) => n + c.unread, 0)
  const openThreads = threads.filter((c) => c.status === 'open').length
  const pendingMessages = Object.values(chat?.messages ?? {}).flat().filter((m) => m.delivery === 'pending').length

  const name = user?.name ?? chat?.profile?.name
  const email = user?.email ?? chat?.profile?.email
  const currentStep = completed === REQUIRED.length ? 1 : 0

  const serviceId = serviceItems.find((s) => s.preset.service === draft.service)?.id
  const guides = [
    ...resources.filter((r) => r.relatedService === serviceId),
    ...resources.filter((r) => r.relatedService !== serviceId),
  ].slice(0, 3)

  const signOut = async () => {
    await logout().catch(() => undefined)
    navigate(routes.signIn)
  }

  return (
    <>
      <Seo title="Your workspace" description="Your Meridian project, enquiries and next steps." noindex />
      <section className="portal">
        <div className="container container--wide">
          <header className="portal__head">
            <div className="portal__hello">
              <Avatar name={name ?? 'Guest'} size="lg" tone="navy" />
              <div>
                <p className="eyebrow">{accountsEnabled ? 'Client portal' : 'Your workspace'}</p>
                <h1 className="portal__title">{name ? `Welcome back, ${name.split(' ')[0]}.` : 'Welcome to your workspace.'}</h1>
                {email && <p className="portal__email">{email}</p>}
              </div>
            </div>
            <div className="portal__head-actions">
              <Button to={routes.start} variant="success" arrow>
                {hasDraft ? 'Continue project' : 'Start a project'}
              </Button>
              {accountsEnabled && (
                <Button variant="secondary" onClick={signOut}>
                  Sign out
                </Button>
              )}
            </div>
          </header>

          {!accountsEnabled && (
            <p className="portal__banner" role="note">
              <Icon name="info" size={17} />
              <span>
                You’re viewing what’s saved <strong>in this browser</strong>. Client accounts — with project tracking,
                files and invoices — are launching soon; until then your specialist contacts you by email.
              </span>
            </p>
          )}

          <div className="portal__grid">
            {/* Project */}
            <article className="portal-card portal-card--project" aria-labelledby="portal-project">
              <div className="portal-card__head">
                <h2 id="portal-project">{accountsEnabled ? 'Your projects' : 'Your project'}</h2>
                {!accountsEnabled && hasDraft && <span className="portal-tag">Draft</span>}
              </div>

              {accountsEnabled ? (
                projects.length ? (
                  <ul className="portal-projects">
                    {projects.map((p) => (
                      <li key={p.id}>
                        <strong>{p.title}</strong>
                        <span>{p.service}</span>
                        <span className="portal-tag">{p.status}</span>
                        {p.due_date && <span>Due {new Date(p.due_date).toLocaleDateString()}</span>}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="portal-empty">No projects yet. Start one and it will appear here after scoping.</p>
                )
              ) : hasDraft ? (
                <div className="portal-draft">
                  <dl className="portal-draft__rows">
                    <div>
                      <dt>Project type</dt>
                      <dd>{labelFor(projectTypes, draft.projectType) || '—'}</dd>
                    </div>
                    <div>
                      <dt>Academic level</dt>
                      <dd>{labelFor(academicLevels, draft.academicLevel) || '—'}</dd>
                    </div>
                    <div>
                      <dt>Service</dt>
                      <dd>{labelFor(services, draft.service) || '—'}</dd>
                    </div>
                    <div>
                      <dt>Length</dt>
                      <dd>{formatNumber(draft.wordCount)} words</dd>
                    </div>
                    <div>
                      <dt>Deadline</dt>
                      <dd>
                        {draft.deadline === 'custom' ? draft.customDeadline || '—' : labelFor(deadlines, draft.deadline) || '—'}
                      </dd>
                    </div>
                  </dl>
                  <div className="portal-draft__estimate">
                    <span>{estimate.isComplete ? 'Estimated price' : 'Estimate so far'}</span>
                    <strong className="tabular">{formatMoney(estimate.finalTotal)}</strong>
                    <div
                      className="portal-progress"
                      role="progressbar"
                      aria-label="Project details completed"
                      aria-valuemin={0}
                      aria-valuemax={REQUIRED.length}
                      aria-valuenow={completed}
                    >
                      <span style={{ width: `${(completed / REQUIRED.length) * 100}%` }} />
                    </div>
                    <small>
                      {completed} of {REQUIRED.length} details · {estimatorConfig.isIndicative ? 'indicative' : 'confirmed rates'}
                    </small>
                    <Button to={routes.start} variant="primary" size="sm" arrow>
                      {estimate.isComplete ? 'Review & send brief' : 'Finish details'}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="portal-empty">
                  <p>You haven’t configured a project yet. It takes about two minutes and shows an estimate instantly.</p>
                  <Button to={routes.start} variant="primary" size="sm" arrow>
                    Configure a project
                  </Button>
                </div>
              )}
            </article>

            {/* Enquiries */}
            <article className="portal-card" aria-labelledby="portal-enquiries">
              <div className="portal-card__head">
                <h2 id="portal-enquiries">Enquiries</h2>
                <Link to={routes.messages} className="portal-card__link">
                  Open inbox <Icon name="arrowRight" size={14} />
                </Link>
              </div>
              <dl className="portal-stats">
                <div>
                  <dt>Open</dt>
                  <dd className="tabular">{openThreads}</dd>
                </div>
                <div>
                  <dt>Unread</dt>
                  <dd className="tabular">{unread}</dd>
                </div>
                <div>
                  <dt>Not sent</dt>
                  <dd className={cx('tabular', pendingMessages > 0 && 'is-warn')}>{pendingMessages}</dd>
                </div>
              </dl>
              {threads.length ? (
                <ul className="portal-threads">
                  {threads.slice(0, 3).map((c) => {
                    const last = chat?.messages[c.id]?.at(-1)
                    return (
                      <li key={c.id}>
                        <Link to={routes.messages}>
                          <strong>{c.subject}</strong>
                          <span>{last ? last.body : 'No messages yet'}</span>
                          <time dateTime={c.updatedAt}>{shortTime(c.updatedAt)}</time>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <p className="portal-empty">No enquiries yet. Questions before you commit? Ask a specialist.</p>
              )}
            </article>

            {/* Next steps */}
            <article className="portal-card portal-card--wide" aria-labelledby="portal-steps">
              <div className="portal-card__head">
                <h2 id="portal-steps">Where you are</h2>
                <Link to={routes.howItWorks} className="portal-card__link">
                  How it works <Icon name="arrowRight" size={14} />
                </Link>
              </div>
              <ol className="portal-steps">
                {steps.map((s, i) => (
                  <li key={s} className={cx(i < currentStep && 'is-done', i === currentStep && 'is-current')}>
                    <span className="portal-steps__dot">{i < currentStep ? <Icon name="check" size={12} strokeWidth={2.6} /> : i + 1}</span>
                    <span className="portal-steps__label">{s}</span>
                  </li>
                ))}
              </ol>
            </article>

            {/* Guides */}
            <article className="portal-card" aria-labelledby="portal-guides">
              <div className="portal-card__head">
                <h2 id="portal-guides">Recommended guides</h2>
              </div>
              <ul className="portal-guides">
                {guides.map((g) => (
                  <li key={g.id}>
                    <Link to={routes.resource(g.id)}>
                      <span className="portal-guides__cat">{g.category}</span>
                      <strong>{g.title}</strong>
                      <span>{g.readingMinutes} min read</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
