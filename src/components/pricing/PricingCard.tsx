import { estimatorConfig } from '../../data/pricing'
import type { PricingPlan } from '../../types/pricing'
import { formatMoney } from '../../utils/pricingCalculator'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { panelId, tabId } from './pricingIds'

interface PricingCardProps {
  plan: PricingPlan
  onStart: (plan: PricingPlan) => void
}

/** Editorial rate sheet for one support type (not a SaaS tier card). */
export function PricingCard({ plan, onStart }: PricingCardProps) {
  return (
    <div id={panelId} role="tabpanel" aria-labelledby={tabId(plan.id)} className="pricing-card" key={plan.id} tabIndex={0}>
      <div className="pricing-card__intro">
        <h3 className="pricing-card__title">{plan.title}</h3>
        <p className="pricing-card__summary">{plan.summary}</p>
        <div className="pricing-card__from">
          <span className="pricing-card__from-label">Starting from</span>
          <span className="pricing-card__price tabular">{formatMoney(plan.startingFrom.price)}</span>
          <span className="pricing-card__unit">{plan.startingFrom.unit}</span>
        </div>
        <Button variant="success" size="lg" arrow onClick={() => onStart(plan)}>
          {plan.cta.label}
        </Button>
      </div>

      <div className="pricing-card__details">
        <div className="pricing-card__block">
          <h4>What’s included</h4>
          <ul className="pricing-card__included">
            {plan.included.map((item) => (
              <li key={item}>
                <Icon name="check" size={15} strokeWidth={2} /> {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="pricing-card__split">
          <div className="pricing-card__block">
            <h4>Typical turnaround</h4>
            <p className="pricing-card__turnaround">{plan.turnaround.label}</p>
            <p className="pricing-card__muted">{plan.turnaround.detail}</p>
          </div>
          <div className="pricing-card__block">
            <h4>Deliverables</h4>
            <ul className="pricing-card__deliverables">
              {plan.deliverables.map((d) => (
                <li key={d}>
                  <Icon name="doc" size={14} /> {d}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pricing-card__block">
          <h4>Rate sheet</h4>
          <table className="rate-table">
            <tbody>
              {plan.rates.map((rate) => (
                <tr key={rate.name}>
                  <th scope="row">
                    {rate.name}
                    <span>{rate.note}</span>
                  </th>
                  <td className="tabular">
                    {rate.price === 0 ? 'Free' : formatMoney(rate.price)}
                    {rate.price !== 0 && rate.unit && <span> {rate.unit}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {estimatorConfig.isIndicative && (
            <p className="pricing-card__muted pricing-card__fine">
              Indicative rates in {estimatorConfig.currency}. Level, deadline and complexity adjust the final quote.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
