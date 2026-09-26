import { estimatorConfig } from '../../data/pricing'
import { academicLevels, deadlines, labelFor, projectTypes, services, subjects } from '../../data/projectOptions'
import type { ProjectEstimator } from '../../hooks/useProjectEstimator'
import { cx } from '../../utils/cx'
import { formatMoney, formatNumber } from '../../utils/pricingCalculator'
import { AnimatedNumber } from '../ui/AnimatedNumber'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import './ProjectSummary.css'

interface ProjectSummaryProps {
  project: ProjectEstimator['project']
  estimate: ProjectEstimator['estimate']
  onToggleDiscount: (value: boolean) => void
  onContinue: () => void
  className?: string
}

const REQUIRED = ['academicLevel', 'projectType', 'subject', 'service', 'deadline'] as const
const { firstProjectDiscount } = estimatorConfig
const money = (v: number) => formatMoney(v)
const moneyCents = (v: number) => formatMoney(v, { cents: true })
const times = (v: number) => `× ${v.toFixed(2)}`

function deadlineLabel(project: ProjectEstimator['project']) {
  if (project.deadline === 'custom') {
    if (!project.customDeadline) return ''
    return new Date(`${project.customDeadline}T12:00:00`).toLocaleDateString(undefined, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }
  return labelFor(deadlines, project.deadline)
}

export function ProjectSummary({ project, estimate, onToggleDiscount, onContinue, className }: ProjectSummaryProps) {
  const completed = REQUIRED.filter((field) => project[field]).length

  const rows = [
    { label: 'Project type', value: labelFor(projectTypes, project.projectType) },
    { label: 'Academic level', value: labelFor(academicLevels, project.academicLevel) },
    { label: 'Subject', value: labelFor(subjects, project.subject) },
    { label: 'Service', value: labelFor(services, project.service) },
    {
      label: 'Word count',
      value: `${formatNumber(project.wordCount)} words · ≈ ${Math.ceil(project.wordCount / estimatorConfig.words.perPage)} pp`,
    },
    { label: 'Deadline', value: deadlineLabel(project) },
  ]

  return (
    <aside className={cx('summary', className)} aria-labelledby="summary-title">
      <div className="summary__head">
        <h3 id="summary-title" className="summary__title">
          Project summary
        </h3>
        <span className="summary__progress-text tabular">
          {completed} of {REQUIRED.length} details
        </span>
      </div>
      <div
        className="summary__progress"
        role="progressbar"
        aria-label="Project details completed"
        aria-valuemin={0}
        aria-valuemax={REQUIRED.length}
        aria-valuenow={completed}
      >
        <span style={{ width: `${(completed / REQUIRED.length) * 100}%` }} />
      </div>

      <dl className="summary__rows">
        {rows.map((row) => (
          <div key={row.label} className="summary__row">
            <dt>{row.label}</dt>
            <dd className={cx(!row.value && 'summary__empty')}>{row.value || 'Not selected'}</dd>
          </div>
        ))}
      </dl>

      <details className="summary__breakdown">
        <summary>
          How this estimate is calculated <Icon name="chevronDown" size={16} />
        </summary>
        <dl>
          <div>
            <dt>Base (length × type × discipline)</dt>
            <dd className="tabular">{moneyCents(estimate.basePrice)}</dd>
          </div>
          <div>
            <dt>Service</dt>
            <dd className="tabular">{times(estimate.serviceMultiplier)}</dd>
          </div>
          <div>
            <dt>Academic level</dt>
            <dd className="tabular">{times(estimate.academicLevelMultiplier)}</dd>
          </div>
          <div>
            <dt>Urgency · {estimate.urgencyLabel}</dt>
            <dd className="tabular">{times(estimate.urgencyMultiplier)}</dd>
          </div>
        </dl>
      </details>

      <div className="summary__totals">
        <div className="summary__line">
          <span>Estimated total</span>
          <span className="tabular">
            <AnimatedNumber value={estimate.estimatedTotal} format={moneyCents} />
          </span>
        </div>

        <label className={cx('summary__discount', project.applyFirstProjectDiscount && 'is-on')}>
          <input
            type="checkbox"
            checked={project.applyFirstProjectDiscount}
            onChange={(e) => onToggleDiscount(e.target.checked)}
          />
          <span className="summary__discount-text">
            <strong>{firstProjectDiscount.label}</strong>
            <span className="summary__code">{firstProjectDiscount.code}</span>
          </span>
          <span className="summary__discount-value tabular">
            {project.applyFirstProjectDiscount ? `−${moneyCents(estimate.discount)}` : `−${firstProjectDiscount.rate * 100}%`}
          </span>
        </label>

        <div className="summary__final">
          <span className="summary__final-label">
            {estimate.isComplete ? 'Final estimated price' : 'Estimate so far'}
          </span>
          <span className="summary__final-value tabular" aria-hidden="true">
            <AnimatedNumber value={estimate.finalTotal} format={money} />
          </span>
          <span className="visually-hidden" aria-live="polite">
            {money(estimate.finalTotal)}
          </span>
          {!estimate.isComplete && (
            <span className="summary__final-note">Complete all details for an accurate estimate.</span>
          )}
        </div>
      </div>

      <Button variant="success" size="lg" block arrow onClick={onContinue}>
        Continue to Project Brief
      </Button>

      <ul className="summary__assurances">
        <li>
          <Icon name="lock" size={15} /> Secure &amp; confidential
        </li>
        <li>
          <Icon name="eye" size={15} /> Transparent pricing
        </li>
        <li>
          <Icon name="check" size={15} /> No commitment until confirmed
        </li>
      </ul>

      {estimatorConfig.isIndicative && (
        <p className="summary__fineprint">
          Indicative estimate in {estimate.currency}. Your confirmed quote follows a free scoping review.
        </p>
      )}
    </aside>
  )
}
