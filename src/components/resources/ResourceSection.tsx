import { useMemo, useState, type ReactNode } from 'react'
import { resources as allResources, type ResourceItem } from '../../data/resources'
import { cx } from '../../utils/cx'
import { Reveal, SectionHeading } from '../ui/primitives'
import { ResourceCard } from './ResourceCard'
import './ResourceSection.css'

interface ResourceSectionProps {
  items?: ResourceItem[]
  showHeading?: boolean
  /** Category filter chips (resources index page). */
  filterable?: boolean
  eyebrow?: string
  title?: ReactNode
  lede?: string
  footer?: ReactNode
  /** Style the first card as the dark featured card. */
  featureFirst?: boolean
}

export function ResourceSection({
  items = allResources,
  showHeading = true,
  filterable = false,
  eyebrow = 'Resource centre',
  title = (
    <>
      Guides for <em>better</em> research.
    </>
  ),
  lede = 'Free, practical guides written by our specialists — on methodology, structure, citation and analysis.',
  footer,
  featureFirst = true,
}: ResourceSectionProps) {
  const categories = useMemo(() => ['All', ...new Set(items.map((r) => r.category))], [items])
  const [category, setCategory] = useState('All')
  const shown = category === 'All' ? items : items.filter((r) => r.category === category)

  return (
    <section
      id="resources"
      className="section resources"
      aria-labelledby={showHeading ? "resources-title" : undefined}
      aria-label={showHeading ? undefined : "Guides"}
    >
      <div className="container container--wide">
        {showHeading && (
          <div className="resources__head">
            <SectionHeading id="resources-title" eyebrow={eyebrow} title={title} lede={lede} />
          </div>
        )}

        {filterable && (
          <div className="resources__filters" role="group" aria-label="Filter guides by category">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                className={cx('resources__filter', c === category && 'is-active')}
                aria-pressed={c === category}
                onClick={() => setCategory(c)}
              >
                {c}
                <span className="resources__count">
                  {c === 'All' ? items.length : items.filter((r) => r.category === c).length}
                </span>
              </button>
            ))}
          </div>
        )}

        <ul className="resources__grid" aria-live={filterable ? 'polite' : undefined}>
          {shown.map((resource, i) => (
            <Reveal as="li" key={resource.id} delay={(i % 3) * 70}>
              <ResourceCard resource={resource} featured={featureFirst && category === 'All' && i === 0} />
            </Reveal>
          ))}
        </ul>
        {footer && <div className="resources__footer">{footer}</div>}
      </div>
    </section>
  )
}
