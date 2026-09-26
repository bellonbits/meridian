import { FinalCTA } from '../components/cta/FinalCTA'
import { FAQSection } from '../components/faq/FAQSection'
import { PageHero } from '../components/page/PageHero'
import { Seo } from '../components/page/Seo'
import { EstimateFactors } from '../components/pricing/EstimateFactors'
import { PricingSection } from '../components/pricing/PricingSection'
import { Button } from '../components/ui/Button'
import { Icon } from '../components/ui/Icon'
import { faqs } from '../data/faq'
import { routes } from '../data/site'
import './pages.css'

const pricingFaqs = faqs.filter((f) => f.category === 'Pricing & deadlines' || f.id === 'revisions')

export default function PricingPage() {
  return (
    <>
      <Seo
        title="Pricing"
        description="Transparent starting rates for writing support, editing, research, data analysis and consultation — and exactly how project estimates are calculated."
      />
      <PageHero
        crumbs={[{ label: 'Pricing' }]}
        eyebrow="Pricing"
        title={
          <>
            Clear rates. <em>No surprises.</em>
          </>
        }
        lede="Starting rates for every type of support, the exact factors behind every estimate, and a confirmed quote after a free scoping review — nothing is charged until you approve it."
        aside={
          <div className="callout">
            <Icon name="info" size={20} />
            <p>
              <strong>Want a number for your project?</strong> The project builder calculates an indicative estimate as
              you type.
              <span className="link-row">
                <Button to={routes.start} variant="success" size="sm" arrow>
                  Get an estimate
                </Button>
              </span>
            </p>
          </div>
        }
      />
      <PricingSection />
      <EstimateFactors />
      <FAQSection
        items={pricingFaqs}
        tone="plain"
        eyebrow="Pricing questions"
        title={
          <>
            Quotes, deadlines &amp; <em>discounts</em>
          </>
        }
        lede="How estimates become confirmed quotes."
      />
      <FinalCTA />
    </>
  )
}
