import { useSearchParams } from 'react-router'
import { ContactForm } from '../components/contact/ContactForm'
import { PageHero } from '../components/page/PageHero'
import { Seo } from '../components/page/Seo'
import { Icon, type IconName } from '../components/ui/Icon'
import { Reveal } from '../components/ui/primitives'
import { SmartLink } from '../components/ui/SmartLink'
import { isContactTopic } from '../data/contact'
import { routes, site } from '../data/site'
import './pages.css'
import './ContactPage.css'

const channels: { icon: IconName; label: string; value: string; href?: string }[] = [
  { icon: 'mail', label: 'General enquiries', value: site.contact.email, href: `mailto:${site.contact.email}` },
  { icon: 'shield', label: 'Privacy & data requests', value: site.legal.privacyEmail, href: `mailto:${site.legal.privacyEmail}` },
  { icon: 'clock', label: 'Hours', value: site.contact.hours },
  { icon: 'chat', label: 'Response time', value: site.contact.responseTime },
]

const shortcuts: { to: string; title: string; body: string }[] = [
  { to: routes.start, title: 'Start a project', body: 'Get an instant estimate and send your brief.' },
  { to: routes.service('consultation'), title: 'Book a consultation', body: 'Focused time with a specialist in your field.' },
  { to: routes.faq, title: 'Read the FAQ', body: 'Answers about process, pricing and policies.' },
  { to: routes.privacy, title: 'Privacy policy', body: 'How we handle your information and requests.' },
]

export default function ContactPage() {
  const [params] = useSearchParams()
  const topicParam = params.get('topic')
  const initialTopic = isContactTopic(topicParam) ? topicParam : 'general'

  return (
    <>
      <Seo
        title="Contact"
        description={`Contact ${site.name}: speak with a research specialist about your project, a consultation, billing or a privacy request.`}
      />
      <PageHero
        crumbs={[{ label: 'Contact' }]}
        eyebrow="Contact"
        title={
          <>
            Talk to a <em>research specialist.</em>
          </>
        }
        lede="Tell us where you are in your project. A specialist in your discipline replies by email — and everything you share stays confidential."
      />

      <section className="block" aria-labelledby="contact-form-title">
        <div className="container container--wide contact-page">
          <Reveal className="contact-page__form">
            <h2 id="contact-form-title" className="contact-page__title">
              Send us a message
            </h2>
            <ContactForm key={initialTopic} idPrefix="contact-page" initialTopic={initialTopic} />
          </Reveal>

          <div className="contact-page__aside">
            <Reveal as="dl" className="contact-page__channels">
              {channels.map((c) => (
                <div key={c.label}>
                  <dt>
                    <Icon name={c.icon} size={17} /> {c.label}
                  </dt>
                  <dd>{c.href ? <a href={c.href}>{c.value}</a> : c.value}</dd>
                </div>
              ))}
              {site.legal.registeredAddress && (
                <div>
                  <dt>
                    <Icon name="book" size={17} /> Registered address
                  </dt>
                  <dd>{site.legal.registeredAddress}</dd>
                </div>
              )}
            </Reveal>

            <Reveal className="contact-page__shortcuts" delay={80}>
              <p className="contact-page__shortcuts-title">You might be looking for</p>
              <ul>
                {shortcuts.map((s) => (
                  <li key={s.to}>
                    <SmartLink href={s.to} className="contact-page__shortcut">
                      <span>
                        <strong>{s.title}</strong>
                        <span>{s.body}</span>
                      </span>
                      <Icon name="arrowRight" size={16} />
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
