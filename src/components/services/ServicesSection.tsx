import type { ReactNode } from 'react'
import { serviceItems, type ServiceItem } from '../../data/services'
import { Reveal, SectionHeading } from '../ui/primitives'
import { ServiceCard } from './ServiceCard'
import './ServicesSection.css'

interface ServicesSectionProps {
  items?: ServiceItem[]
  /** Hide the section heading (e.g. when the page hero already introduces services). */
  showHeading?: boolean
  eyebrow?: string
  title?: ReactNode
  footer?: ReactNode
}

export function ServicesSection({
  items = serviceItems,
  showHeading = true,
  eyebrow = 'Services',
  title = (
    <>
      Research support for every stage of <em>serious</em> academic work.
    </>
  ),
  footer,
}: ServicesSectionProps) {
  return (
    <section
      id="services"
      className="section services"
      aria-labelledby={showHeading ? 'services-title' : undefined}
      aria-label={showHeading ? undefined : 'Services'}
    >
      <div className="container container--wide">
        {showHeading && (
          <div className="services__head">
            <SectionHeading id="services-title" eyebrow={eyebrow} title={title} />
            <Reveal as="p" className="services__intro" delay={120}>
              Every engagement is scoped by a specialist in your discipline, reviewed by a second expert, and delivered
              with notes that explain the reasoning — so the work stays yours.
            </Reveal>
          </div>
        )}

        <ul className="services__grid">
          {items.map((service, i) => (
            <Reveal as="li" key={service.id} delay={(i % 4) * 70}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </ul>
        {footer && <div className="services__footer">{footer}</div>}
      </div>
    </section>
  )
}
