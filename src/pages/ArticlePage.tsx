import { Link, useParams } from 'react-router'
import { PageHero } from '../components/page/PageHero'
import { Seo } from '../components/page/Seo'
import { ResourceCard } from '../components/resources/ResourceCard'
import { Button } from '../components/ui/Button'
import { AnchorLink } from '../components/ui/AnchorLink'
import { Icon } from '../components/ui/Icon'
import { Reveal } from '../components/ui/primitives'
import { useAppActions } from '../context/AppActions'
import { findResource, resources } from '../data/resources'
import { findService } from '../data/services'
import { routes } from '../data/site'
import NotFoundPage from './NotFoundPage'
import './pages.css'
import './ArticlePage.css'

const sectionId = (i: number) => `section-${i + 1}`

export default function ArticlePage() {
  const { slug = '' } = useParams()
  const article = findResource(slug)
  const { openContact } = useAppActions()

  if (!article) return <NotFoundPage />

  const service = findService(article.relatedService)
  const more = resources.filter((r) => r.id !== article.id).slice(0, 3)

  return (
    <>
      <Seo title={article.title} description={article.description} />
      <PageHero
        crumbs={[{ label: 'Resources', to: routes.resources }, { label: article.title }]}
        eyebrow={`${article.category} · ${article.readingMinutes} min read`}
        title={article.title}
        lede={article.description}
      />

      <div className="container container--wide article">
        <aside className="article__toc" aria-label="In this guide">
          <p className="article__toc-title">In this guide</p>
          <ol>
            {article.sections.map((s, i) => (
              <li key={s.heading}>
                <AnchorLink href={`#${sectionId(i)}`}>{s.heading}</AnchorLink>
              </li>
            ))}
          </ol>
        </aside>

        <article className="article__body">
          <div className="article__takeaways">
            <p className="article__takeaways-title">Key takeaways</p>
            <ul className="checklist">
              {article.takeaways.map((t) => (
                <li key={t}>
                  <Icon name="check" size={18} strokeWidth={2} /> {t}
                </li>
              ))}
            </ul>
          </div>

          {article.sections.map((s, i) => (
            <section key={s.heading} id={sectionId(i)} className="article__section">
              <span className="article__num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h2>{s.heading}</h2>
              <p>{s.body}</p>
            </section>
          ))}

          <footer className="article__footer">
            <p className="annot">— Meridian editorial team</p>
            <p className="article__note">
              Guides are general advice. Always follow your institution’s and supervisor’s specific requirements.
            </p>
          </footer>
        </article>

        {service && (
          <aside className="article__service" aria-label="Related service">
            <p className="eyebrow">Related service</p>
            <p className="article__service-title">{service.title}</p>
            <p className="article__service-text">{service.description}</p>
            <Button to={routes.service(service.id)} variant="primary" arrow block>
              Explore service
            </Button>
            <Button variant="ghost" icon="chat" block onClick={openContact}>
              Ask a specialist
            </Button>
          </aside>
        )}
      </div>

      <section className="block block--deep" aria-labelledby="more-title">
        <div className="container container--wide">
          <div className="block__head article__more-head">
            <h2 id="more-title" className="block__title">
              More <em>guides</em>
            </h2>
            <Link to={routes.resources} className="btn btn--secondary btn--md">
              All guides
            </Link>
          </div>
          <ul className="article__more">
            {more.map((r, i) => (
              <Reveal as="li" key={r.id} delay={i * 70}>
                <ResourceCard resource={r} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
