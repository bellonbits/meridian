import { estimatorConfig } from '../../data/pricing'
import { academicLevels, labelFor, services, subjects } from '../../data/projectOptions'
import { calculateEstimate, formatMoney, formatNumber } from '../../utils/pricingCalculator'
import { Reveal } from '../ui/primitives'
import './EstimateFactors.css'

const times = (v: number) => `× ${v.toFixed(2)}`

/** A worked example, computed live from the same config the project builder uses. */
const example = {
  academicLevel: 'masters',
  projectType: 'literature-review',
  service: 'literature-review',
  subject: 'education',
  wordCount: 5000,
  deadlineDays: 10,
  applyFirstProjectDiscount: true,
} as const

/** Explains the estimator using the live configuration — no numbers are duplicated here. */
export function EstimateFactors() {
  const c = estimatorConfig
  const e = calculateEstimate(example)

  const tables = [
    {
      title: 'Academic level',
      rows: academicLevels.map((l) => ({ label: l.label, value: times(c.academicLevelMultiplier[l.value]) })),
    },
    {
      title: 'Service',
      rows: services.map((s) => ({ label: s.label, value: times(c.serviceMultiplier[s.value]) })),
    },
    {
      title: 'Deadline',
      rows: c.urgency.map((u) => ({ label: u.label, value: times(u.multiplier) })),
    },
    {
      title: 'Discipline complexity',
      rows: subjects.map((s) => ({ label: s.label, value: times(c.subjectComplexity[s.value]) })),
    },
  ]

  return (
    <section className="block block--surface factors" aria-labelledby="factors-title">
      <div className="container container--wide">
        <div className="block__head">
          <p className="eyebrow">Transparent pricing</p>
          <h2 id="factors-title" className="block__title">
            How estimates are <em>calculated</em>
          </h2>
          <p className="block__lede">
            Base rate {formatMoney(c.ratePerThousandWords)} per 1,000 words, adjusted by the factors below. Minimum
            charge {formatMoney(c.minimumCharge)}. First projects receive {c.firstProjectDiscount.rate * 100}% off.
          </p>
        </div>

        <div className="factors__grid">
          {tables.map((t, i) => (
            <Reveal key={t.title} delay={i * 60} className="factors__table">
              <h3>{t.title}</h3>
              <dl>
                {t.rows.map((r) => (
                  <div key={r.label}>
                    <dt>{r.label}</dt>
                    <dd className="tabular">{r.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ))}
        </div>

        <Reveal className="factors__example">
          <div className="factors__example-head">
            <p className="eyebrow">Worked example</p>
            <h3>
              {formatNumber(example.wordCount)}-word {labelFor(services, example.service).toLowerCase()},{' '}
              {labelFor(academicLevels, example.academicLevel)}, {labelFor(subjects, example.subject)},{' '}
              {example.deadlineDays}-day deadline
            </h3>
          </div>
          <ol className="factors__calc">
            <li>
              <span>Base (length × type × discipline)</span>
              <strong className="tabular">{formatMoney(e.basePrice, { cents: true })}</strong>
            </li>
            <li>
              <span>Service</span>
              <strong className="tabular">{times(e.serviceMultiplier)}</strong>
            </li>
            <li>
              <span>Academic level</span>
              <strong className="tabular">{times(e.academicLevelMultiplier)}</strong>
            </li>
            <li>
              <span>Urgency · {e.urgencyLabel}</span>
              <strong className="tabular">{times(e.urgencyMultiplier)}</strong>
            </li>
            <li>
              <span>Estimated total</span>
              <strong className="tabular">{formatMoney(e.estimatedTotal, { cents: true })}</strong>
            </li>
            <li>
              <span>First-project discount</span>
              <strong className="tabular">−{formatMoney(e.discount, { cents: true })}</strong>
            </li>
            <li className="factors__total">
              <span>Estimated price</span>
              <strong className="tabular">{formatMoney(e.finalTotal)}</strong>
            </li>
          </ol>
        </Reveal>
      </div>
    </section>
  )
}
