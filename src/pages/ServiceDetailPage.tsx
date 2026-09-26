import { useParams } from 'react-router'
import { FinalCTA } from '../components/cta/FinalCTA'
import { FAQSection } from '../components/faq/FAQSection'
import { PageHero } from '../components/page/PageHero'
import { Seo } from '../components/page/Seo'
import { ServiceCard } from '../components/services/ServiceCard'
import { Button } from '../components/ui/Button'
import { Icon } from '../components/ui/Icon'
import { Reveal } from '../components/ui/primitives'
import { useAppActions } from '../context/AppActions'
import { faqsById } from '../data/faq'
import { estimatorConfig, startingPriceFor } from '../data/pricing'
import { findService, serviceItems } from '../data/services'
import { routes } from '../data/site'
import { formatMoney } from '../utils/pricingCalculator'
import NotFoundPage from './NotFoundPage'
import './pages.css'
import './ServiceDetailPage.css'

export default function ServiceDetailPage() {
  const { slug = '' } = useParams()
  const service = findService(slug)
  const { startProject, openContact } = useAppActions()

  if (!service) return <NotFoundPage />

  const from = startingPriceFor(service.preset.service)
  const others = serviceItems.filter((s) => s.id !== service.id).slice(0, 3)
  const faqs = faqsById(service.faqIds)

  return (
    <>
      <Seo title={service.title} description={`${service.description} ${service.forWhom}`} />
      <PageHero
        crumbs={[{ label: 'Services', to: routes.services }, { label: service.title }]}
        eyebrow={`Service ${service.number}`}
        title={service.title}
        lede={service.overview}
        className="service-hero"
        aside={
          <aside className="facts" aria-label={`${service.title} at a glance`}>
            <span className="service-hero__mark" aria-hidden="true">
              {service.mark}
            </span>
            <dl>
              <div>
                <dt>Starting from</dt>
                <dd>
                  <span className="facts__price tabular">{formatMoney(from.price)}</span>{' '}
                  <span className="facts__unit">{from.unit}</span>
                </dd>
              </div>
              <div>
                <dt>Typical turnaround</dt>
                <dd>{service.turnaround}</dd>
              </div>
              <div>
                <dt>Best for</dt>
                <dd>{service.forWhom}</dd>
              </div>
            </dl>
            <div className="facts__actions">
              <Button variant="success" size="lg" arrow block onClick={() => startProject(service.preset)}>
                Start with this service
              </Button>
              <Button variant="secondary" icon="chat" block onClick={openContact}>
                Ask a specialist
              </Button>
            </div>
            {estimatorConfig.isIndicative && (
              <p className="facts__unit">Indicative rate. Level, deadline and complexity adjust your quote.</p>
            )}
          </aside>
        }
      />

      <section className="block" aria-labelledby="fit-title">
        <div className="container container--wide split">
          <div className="split__label">
            <p className="eyebrow">Is it right for you?</p>
            <h2 id="fit-title" className="block__title">
              Who it’s <em>for</em>
            </h2>
          </div>
          <Reveal>
            <ul className="checklist">
              {service.idealFor.map((item) => (
                <li key={item}>
                  <Icon name="check" size={18} strokeWidth={2} /> {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="block block--surface" aria-labelledby="approach-title">
        <div className="container container--wide split">
          <div className="split__label">
            <p className="eyebrow">Our approach</p>
            <h2 id="approach-title" className="block__title">
              How we <em>work</em> on it
            </h2>
            <p className="block__lede">Every stage is agreed with you, and an independent specialist reviews the work before delivery.</p>
          </div>
          <ol className="steps">
            {service.approach.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 60}>
                <span className="steps__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="block" aria-labelledby="deliverables-title">
        <div className="container container--wide split">
          <div className="split__label">
            <p className="eyebrow">What you receive</p>
            <h2 id="deliverables-title" className="block__title">
              Included &amp; <em>delivered</em>
            </h2>
          </div>
          <div className="service-deliver">
            <Reveal className="service-deliver__col">
              <h3>Included in every engagement</h3>
              <ul className="checklist">
                {[...service.included, 'Independent expert review', 'Revisions within agreed scope'].map((item) => (
                  <li key={item}>
                    <Icon name="check" size={18} strokeWidth={2} /> {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="service-deliver__col service-deliver__col--files" delay={80}>
              <h3>Deliverables</h3>
              <ul className="service-deliver__files">
                {service.deliverables.map((item) => (
                  <li key={item}>
                    <Icon name="doc" size={18} /> {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {faqs.length > 0 && (
        <FAQSection
          items={faqs}
          eyebrow="Questions"
          title={
            <>
              About <em>{service.title.toLowerCase()}</em>
            </>
          }
          lede="The questions we’re asked most about this service."
          asideExtra={
            <Button to={routes.faq} variant="link" arrow>
              All questions
            </Button>
          }
        />
      )}

      <section className="block" aria-labelledby="related-title">
        <div className="container container--wide">
          <div className="block__head">
            <p className="eyebrow">Related</p>
            <h2 id="related-title" className="block__title">
              Other ways we can <em>help</em>
            </h2>
          </div>
          <ul className="service-related">
            {others.map((s, i) => (
              <Reveal as="li" key={s.id} delay={i * 70}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <FinalCTA
        title={
          <>
            Ready to start your <em>{service.title.toLowerCase()}</em>?
          </>
        }
      />
    </>
  )
}
