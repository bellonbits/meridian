import { useCallback, useState } from 'react'
import { useAppActions } from '../../context/AppActions'
import { pricingPlans } from '../../data/pricing'
import type { PricingPlan } from '../../types/pricing'
import { Reveal, SectionHeading } from '../ui/primitives'
import { PricingCard } from './PricingCard'
import { PricingTabs } from './PricingTabs'
import './PricingSection.css'

export function PricingSection() {
  const [activeId, setActiveId] = useState(pricingPlans[0].id)
  const { startProject } = useAppActions()
  const plan = pricingPlans.find((p) => p.id === activeId) ?? pricingPlans[0]

  const onStart = useCallback((p: PricingPlan) => startProject({ service: p.cta.service }), [startProject])

  return (
    <section id="pricing" className="section section--surface pricing" aria-labelledby="pricing-title">
      <div className="container container--wide">
        <div className="pricing__head">
          <SectionHeading
            id="pricing-title"
            eyebrow="Pricing"
            title={
              <>
                Choose the support <em>you need.</em>
              </>
            }
            lede="Transparent starting rates. Your confirmed quote follows a free scoping review — and nothing is charged until you approve it."
          />
        </div>
        <Reveal>
          <PricingTabs plans={pricingPlans} activeId={activeId} onChange={setActiveId} />
          <PricingCard plan={plan} onStart={onStart} />
        </Reveal>
      </div>
    </section>
  )
}
