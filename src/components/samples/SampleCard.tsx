import { memo } from 'react'
import { Link } from 'react-router'
import type { SampleItem } from '../../data/samples'
import { findService } from '../../data/services'
import { routes } from '../../data/site'
import { Icon } from '../ui/Icon'
import './SampleCard.css'

/** Card with a miniature page preview of the sample document. */
export const SampleCard = memo(function SampleCard({ sample }: { sample: SampleItem }) {
  const service = findService(sample.service)
  const hasTable = sample.document.blocks.some((b) => b.type === 'table')
  const hasComment = sample.document.blocks.some((b) => b.type === 'comment')

  return (
    <article className="sample-card">
      <div className="sample-card__preview" aria-hidden="true">
        <div className="sample-card__page">
          <span className="sample-card__stamp">Sample</span>
          <span className="sample-card__doc-title">{sample.document.title}</span>
          <span className="sample-card__line" />
          <span className="sample-card__line sample-card__line--short" />
          {hasTable ? (
            <span className="sample-card__table">
              {Array.from({ length: 4 }, (_, i) => (
                <span key={i} />
              ))}
            </span>
          ) : (
            <>
              <span className="sample-card__line" />
              <span className="sample-card__line sample-card__line--mark" />
              <span className="sample-card__line" />
            </>
          )}
          {hasComment && <span className="sample-card__comment" />}
          <span className="sample-card__line sample-card__line--short" />
        </div>
      </div>
      <div className="sample-card__body">
        <p className="sample-card__service">{service?.title ?? sample.format}</p>
        <h3 className="sample-card__title">{sample.title}</h3>
        <p className="sample-card__summary">{sample.summary}</p>
        <ul className="sample-card__meta">
          <li>{sample.level}</li>
          <li>{sample.discipline}</li>
          <li>{sample.citationStyle}</li>
        </ul>
        <Link to={routes.sample(sample.id)} className="sample-card__cta">
          View sample
          <span className="visually-hidden">: {sample.title}</span>
          <Icon name="arrowRight" size={16} />
        </Link>
      </div>
    </article>
  )
})
