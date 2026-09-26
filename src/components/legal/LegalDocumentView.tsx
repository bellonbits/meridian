import { NavLink } from 'react-router'
import type { LegalDocument } from '../../data/legal'
import { legalLinks } from '../../data/site'
import { cx } from '../../utils/cx'
import { PageHero } from '../page/PageHero'
import { Seo } from '../page/Seo'
import { AnchorLink } from '../ui/AnchorLink'
import { Icon } from '../ui/Icon'
import './LegalDocumentView.css'

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

/** Shared layout for policy pages: summary, sticky contents, numbered sections, related policies. */
export function LegalDocumentView({ doc }: { doc: LegalDocument }) {
  return (
    <>
      <Seo title={doc.title} description={doc.summary} />
      <PageHero crumbs={[{ label: doc.title }]} eyebrow={doc.eyebrow} title={doc.title} lede={doc.summary}>
        <p className="legal__updated">
          <Icon name="clock" size={15} /> Last updated <time dateTime={doc.lastUpdated}>{formatDate(doc.lastUpdated)}</time>
        </p>
      </PageHero>

      <div className="container container--wide legal">
        <aside className="legal__toc" aria-label="Contents">
          <p className="legal__toc-title">Contents</p>
          <ol>
            {doc.sections.map((s, i) => (
              <li key={s.id}>
                <AnchorLink href={`#${s.id}`}>
                  <span className="legal__toc-num">{i + 1}.</span> {s.heading}
                </AnchorLink>
              </li>
            ))}
          </ol>
        </aside>

        <article className="legal__body">
          <section className="legal__summary" aria-labelledby="legal-summary-title">
            <h2 id="legal-summary-title">In short</h2>
            <ul className="checklist">
              {doc.highlights.map((h) => (
                <li key={h}>
                  <Icon name="check" size={18} strokeWidth={2} /> {h}
                </li>
              ))}
            </ul>
            <p className="legal__summary-note">This summary is for convenience. The full text below applies.</p>
          </section>

          {doc.sections.map((s, i) => (
            <section key={s.id} id={s.id} className="legal__section" aria-labelledby={`${s.id}-title`}>
              <h2 id={`${s.id}-title`}>
                <span className="legal__num">{i + 1}.</span> {s.heading}
              </h2>
              {s.paragraphs?.map((p) => <p key={p}>{p}</p>)}
              {s.list && (
                <ul className="legal__list">
                  {s.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {s.after?.map((p) => <p key={p}>{p}</p>)}
            </section>
          ))}
        </article>
      </div>

      <nav className="legal__related" aria-label="Policies">
        <div className="container container--wide legal__related-inner">
          <p className="legal__related-title">Policies &amp; support</p>
          <ul>
            {legalLinks.map((l) => (
              <li key={l.href}>
                <NavLink to={l.href} className={({ isActive }) => cx('legal__related-link', isActive && 'is-active')}>
                  {l.label}
                  <Icon name="arrowRight" size={15} />
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  )
}
