import type { Testimonial } from '../../data/trust'
import { cx } from '../../utils/cx'
import { Stars } from '../ui/primitives'
import './TestimonialCard.css'

const initials = (name: string) =>
  name
    .replace(/[^A-Za-z ]/g, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')

export function TestimonialCard({ testimonial, className }: { testimonial: Testimonial; className?: string }) {
  const { name, academicLevel, discipline, quote, rating, status } = testimonial
  return (
    <figure className={cx('testimonial', className)}>
      <div className="testimonial__top">
        <Stars value={rating} size={14} />
        {status === 'sample' && <span className="testimonial__sample">Sample</span>}
      </div>
      <blockquote className="testimonial__quote">
        <p>{quote}</p>
      </blockquote>
      <figcaption className="testimonial__who">
        <span className="testimonial__avatar" aria-hidden="true">
          {initials(name)}
        </span>
        <span>
          <span className="testimonial__name">{name}</span>
          <span className="testimonial__meta">
            {academicLevel} · {discipline}
          </span>
        </span>
      </figcaption>
    </figure>
  )
}
