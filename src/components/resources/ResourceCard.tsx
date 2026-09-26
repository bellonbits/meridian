import { memo } from 'react'
import { Link } from 'react-router'
import type { ResourceItem } from '../../data/resources'
import { routes } from '../../data/site'
import { cx } from '../../utils/cx'
import { Icon } from '../ui/Icon'
import './ResourceCard.css'

interface ResourceCardProps {
  resource: ResourceItem
  featured?: boolean
}

export const ResourceCard = memo(function ResourceCard({ resource, featured }: ResourceCardProps) {
  return (
    <article className={cx('resource-card', featured && 'resource-card--featured')}>
      <div className="resource-card__meta">
        <span className="resource-card__category">{resource.category}</span>
        <span className="resource-card__time">
          <Icon name="clock" size={13} /> {resource.readingMinutes} min read
        </span>
      </div>
      <h3 className="resource-card__title">{resource.title}</h3>
      <p className="resource-card__desc">{resource.description}</p>
      <Link to={routes.resource(resource.id)} className="resource-card__cta">
        Read article
        <span className="visually-hidden">: {resource.title}</span>
        <Icon name="arrowUpRight" size={16} />
      </Link>
    </article>
  )
})
