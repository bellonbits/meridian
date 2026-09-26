import { useParams } from 'react-router'
import { PageHero } from '../components/page/PageHero'
import { Seo } from '../components/page/Seo'
import { SampleCard } from '../components/samples/SampleCard'
import { SampleDocument } from '../components/samples/SampleDocument'
import { Button } from '../components/ui/Button'
import { Icon } from '../components/ui/Icon'
import { Reveal } from '../components/ui/primitives'
import { useAppActions } from '../context/AppActions'
import { findSample, samples } from '../data/samples'
import { findService } from '../data/services'
import { routes } from '../data/site'
import NotFoundPage from './NotFoundPage'
import './pages.css'
import './SampleDetailPage.css'

export default function SampleDetailPage() {
  const { slug = '' } = useParams()
  const sample = findSample(slug)
  const { startProject } = useAppActions()

  if (!sample) return <NotFoundPage />

  const service = findService(sample.service)
  const more = samples.filter((s) => s.id !== sample.id).slice(0, 3)

  const facts = [
    { label: 'Service', value: service?.title ?? '—' },
    { label: 'Format', value: sample.format },
    { label: 'Level', value: sample.level },
    { label: 'Discipline', value: sample.discipline },
    { label: 'Citation style', value: sample.citationStyle },
    { label: 'Full length', value: `${sample.pages} pages` },
  ]

  return (
    <>
      <Seo title={`Sample: ${sample.title}`} description={sample.summary} />
      <PageHero
        crumbs={[{ label: 'Samples', to: routes.samples }, { label: sample.title }]}
        eyebrow={`Sample · ${service?.title ?? sample.format}`}
        title={sample.title}
        lede={sample.summary}
        className="sample-hero"
      />

      <div className="container container--wide sample-detail">
        <aside className="sample-detail__aside" aria-label="About this sample">
          <dl className="sample-detail__facts">
            {facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
          <div className="sample-detail__shows">
            <p className="sample-detail__label">What this shows</p>
            <ul className="checklist">
              {sample.demonstrates.map((d) => (
                <li key={d}>
                  <Icon name="check" size={16} strokeWidth={2} /> {d}
                </li>
              ))}
            </ul>
          </div>
          <div className="sample-detail__actions">
            {service && (
              <Button variant="success" arrow block onClick={() => startProject(service.preset)}>
                Start with {service.title.toLowerCase()}
              </Button>
            )}
            <Button variant="secondary" icon="doc" block onClick={() => window.print()}>
              Print / save as PDF
            </Button>
            {service && (
              <Button to={routes.service(service.id)} variant="ghost" block>
                About this service
              </Button>
            )}
          </div>
        </aside>

        <div className="sample-detail__doc">
          <SampleDocument sample={sample} />
        </div>
      </div>

      <section className="block block--deep sample-more" aria-labelledby="more-samples">
        <div className="container container--wide">
          <div className="block__head">
            <h2 id="more-samples" className="block__title">
              More <em>samples</em>
            </h2>
          </div>
          <ul className="samples__grid">
            {more.map((s, i) => (
              <Reveal as="li" key={s.id} delay={i * 70}>
                <SampleCard sample={s} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
