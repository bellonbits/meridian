import { metrics, testimonials, trustContent } from '../../data/trust'
import { formatNumber } from '../../utils/pricingCalculator'
import { Reveal, Stars } from '../ui/primitives'
import { Metrics } from './Metrics'
import { TestimonialCard } from './TestimonialCard'
import './TrustSection.css'

export function TrustSection() {
  const { rating } = trustContent
  return (
    <section className="trust" aria-labelledby="trust-title">
      <div className="container container--wide">
        <div className="trust__top">
          <Reveal className="trust__rating">
            <p className="eyebrow">Trusted by researchers</p>
            <h2 id="trust-title" className="trust__title">
              Careful work, <em>measured</em> by the people we support.
            </h2>
            <div className="trust__score">
              <span className="trust__score-value tabular">{rating.value.toFixed(1)}</span>
              <div>
                <Stars value={rating.value} size={18} />
                <p className="trust__score-meta">
                  Average rating from {formatNumber(rating.reviewCount)} client reviews
                </p>
              </div>
            </div>
          </Reveal>
          <Metrics items={metrics} />
        </div>

        <div className="trust__testimonials">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 90} className="trust__card-wrap">
              <TestimonialCard testimonial={t} />
            </Reveal>
          ))}
        </div>

        {trustContent.isIllustrative && (
          <p className="trust__disclosure">
            Figures and testimonials shown are illustrative placeholders pending verified client data.
          </p>
        )}
      </div>
    </section>
  )
}
