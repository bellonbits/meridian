import { memo } from 'react'
import { Link } from 'react-router'
import type { ServiceItem } from '../../data/services'
import { routes } from '../../data/site'
import { Icon } from '../ui/Icon'
import './ServiceCard.css'

interface ServiceCardProps {
  service: ServiceItem
}

export const ServiceCard = memo(function ServiceCard({ service }: ServiceCardProps) {
  const titleId = `service-${service.id}-title`
  return (
    <article className="service-card" aria-labelledby={titleId}>
      <div className="service-card__top">
        <span className="service-card__number">{service.number}</span>
        <span className="service-card__mark" aria-hidden="true">
          {service.mark}
        </span>
      </div>
      <h3 id={titleId} className="service-card__title">
        {service.title}
      </h3>
      <p className="service-card__desc">{service.description}</p>
      <ul className="service-card__included" aria-label="Included">
        {service.included.map((item) => (
          <li key={item}>
            <Icon name="check" size={14} strokeWidth={2} />
            {item}
          </li>
        ))}
      </ul>
      <Link to={routes.service(service.id)} className="service-card__cta" aria-label={`Explore ${service.title}`}>
        Explore service
        <Icon name="arrowRight" size={16} className="service-card__arrow" />
      </Link>
    </article>
  )
})
