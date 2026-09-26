import { Fragment, useRef, useState, type ReactNode } from 'react'
import { manuscript, type ManuscriptSection, type ReviewStatus } from '../../data/manuscript'
import { cx } from '../../utils/cx'
import { Icon } from '../ui/Icon'
import { Reveal, SectionHeading } from '../ui/primitives'
import './DocumentPreview.css'

const statusLabel: Record<ReviewStatus, string> = {
  reviewed: 'Reviewed',
  'in-review': 'In review',
  pending: 'Pending',
}

/** Renders `[n]` as citation markers and `==text==` as highlighted passages. */
function richText(text: string): ReactNode[] {
  return text.split(/(\[[\d, ]+\]|==[^=]+==)/g).map((part, i) => {
    if (/^\[[\d, ]+\]$/.test(part)) return <sup key={i} className="doc-cite">{part}</sup>
    if (part.startsWith('==')) return <mark key={i}>{part.slice(2, -2)}</mark>
    return <Fragment key={i}>{part}</Fragment>
  })
}

export function DocumentPreview() {
  const [active, setActive] = useState(manuscript.sections[0].id)
  const [showNotes, setShowNotes] = useState(true)
  const pageRef = useRef<HTMLDivElement>(null)

  const jumpTo = (section: ManuscriptSection) => {
    setActive(section.id)
    const page = pageRef.current
    const target = page?.querySelector<HTMLElement>(`[data-section="${section.id}"]`)
    if (!page || !target) return
    const top = target.getBoundingClientRect().top - page.getBoundingClientRect().top + page.scrollTop - 24
    page.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <section id="manuscript" className="section manuscript" aria-labelledby="manuscript-title">
      <div className="container container--wide">
        <div className="manuscript__head">
          <SectionHeading
            id="manuscript-title"
            eyebrow="Manuscript review"
            title={
              <>
                Editing, the way <em>examiners</em> read.
              </>
            }
            lede="Every edit is tracked, every suggestion explained. Reviewer notes sit in the margin, citations are checked in place, and you can see exactly where your manuscript stands."
          />
        </div>

        <Reveal className="doc">
          <div className="doc__toolbar">
            <span className="doc__file">
              <Icon name="doc" size={16} /> {manuscript.file}
            </span>
            <span className="doc__track">
              <span className="doc__track-dot" aria-hidden="true" /> Track changes on
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={showNotes}
              className="doc__switch"
              onClick={() => setShowNotes((v) => !v)}
            >
              <span className="doc__switch-ui" aria-hidden="true" />
              Reviewer notes
            </button>
          </div>

          <div className={cx('doc__body', !showNotes && 'doc__body--no-notes')}>
            <nav className="doc__outline" aria-label="Manuscript outline">
              <p className="doc__outline-title">Outline</p>
              <ul>
                {manuscript.sections.map((section) => (
                  <li key={section.id}>
                    <button
                      type="button"
                      className={cx('doc__outline-item', active === section.id && 'is-active')}
                      aria-current={active === section.id ? 'true' : undefined}
                      onClick={() => jumpTo(section)}
                    >
                      <span className={cx('doc__status', `doc__status--${section.status}`)} aria-hidden="true" />
                      <span className="doc__outline-label">{section.heading.replace(/^\d\.\s/, '')}</span>
                      <span className="visually-hidden">— {statusLabel[section.status]}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="doc__progress">
                <div className="doc__progress-row">
                  <span>Review progress</span>
                  <strong className="tabular">{manuscript.reviewProgress}%</strong>
                </div>
                <div
                  className="doc__progress-bar"
                  role="progressbar"
                  aria-label="Manuscript review progress"
                  aria-valuenow={manuscript.reviewProgress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <span style={{ width: `${manuscript.reviewProgress}%` }} />
                </div>
                <ul className="doc__legend">
                  {(Object.keys(statusLabel) as ReviewStatus[]).map((s) => (
                    <li key={s}>
                      <span className={cx('doc__status', `doc__status--${s}`)} aria-hidden="true" /> {statusLabel[s]}
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            <div className="doc__page-wrap" ref={pageRef} tabIndex={0} aria-label="Manuscript page">
              <article className="doc__page">
                <h3 className="doc__title">{manuscript.title}</h3>
                {manuscript.sections.map((section) => (
                  <div
                    key={section.id}
                    data-section={section.id}
                    className={cx('doc__section', active === section.id && 'is-active')}
                    onMouseEnter={() => setActive(section.id)}
                  >
                    <div className="doc__section-text">
                      <h4>{section.heading}</h4>
                      {section.paragraphs.map((p, i) => (
                        <p key={i}>{richText(p)}</p>
                      ))}
                    </div>
                    {showNotes && section.comment && (
                      <aside className={cx('doc__comment', `doc__comment--${section.comment.kind}`)}>
                        <p className="doc__comment-who">
                          <Icon name="comment" size={13} /> {section.comment.author}
                          <span> · {section.comment.role}</span>
                        </p>
                        <p>{section.comment.text}</p>
                      </aside>
                    )}
                  </div>
                ))}
                <footer className="doc__page-foot">
                  <span>Meridian Research Studio · Confidential draft</span>
                  <span className="tabular">
                    Page {manuscript.page} of {manuscript.pages}
                  </span>
                </footer>
              </article>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
