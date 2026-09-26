import { Link } from 'react-router'
import { FinalCTA } from '../components/cta/FinalCTA'
import { PageHero } from '../components/page/PageHero'
import { Seo } from '../components/page/Seo'
import { ServicesSection } from '../components/services/ServicesSection'
import { Button } from '../components/ui/Button'
import { Icon } from '../components/ui/Icon'
import { Reveal } from '../components/ui/primitives'
import { useAppActions } from '../context/AppActions'
import { startingPriceFor } from '../data/pricing'
import { serviceItems } from '../data/services'
import { routes } from '../data/site'
import { formatMoney } from '../utils/pricingCalculator'
import './pages.css'

export default function ServicesPage() {
  const { openContact } = useAppActions()
  return (
    <>
      <Seo
        title="Research Support Services"
        description="Dissertation and thesis support, research proposals, literature reviews, data and statistical analysis, academic editing and research consultation — scoped by specialists in your discipline."
      />
      <PageHero
        crumbs={[{ label: 'Services' }]}
        eyebrow="Services"
        title={
          <>
            Research support for every stage of <em>serious</em> academic work.
          </>
        }
        lede="Eight ways to work with a specialist — from shaping a proposal to preparing a manuscript for submission. Every engagement is scoped in writing, reviewed by a second expert, and delivered with notes that explain the reasoning."
      >
        <div className="link-row">
          <Button to={routes.start} variant="success" arrow>
            Start a project
          </Button>
          <Button variant="secondary" icon="chat" onClick={openContact}>
            Not sure? Ask a specialist
          </Button>
        </div>
      </PageHero>

      <ServicesSection showHeading={false} />

      <section className="block block--surface" aria-labelledby="compare-title">
        <div className="container container--wide">
          <div className="block__head">
            <p className="eyebrow">At a glance</p>
            <h2 id="compare-title" className="block__title">
              Compare <em>services</em>
            </h2>
            <p className="block__lede">Starting rates are indicative; your confirmed quote follows a free scoping review.</p>
          </div>
          <Reveal className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th scope="col">Service</th>
                  <th scope="col">Best for</th>
                  <th scope="col">Typical turnaround</th>
                  <th scope="col">Starting from</th>
                  <th scope="col">
                    <span className="visually-hidden">Details</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {serviceItems.map((s) => {
                  const from = startingPriceFor(s.preset.service)
                  return (
                    <tr key={s.id}>
                      <th scope="row">{s.title}</th>
                      <td>{s.forWhom}</td>
                      <td>{s.turnaround}</td>
                      <td className="num">
                        {formatMoney(from.price)} <span className="facts__unit">{from.unit}</span>
                      </td>
                      <td>
                        <Link to={routes.service(s.id)}>
                          Details <Icon name="arrowRight" size={14} />
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <FinalCTA
        eyebrow="Not sure where to start?"
        title={
          <>
            Tell us where you are. We’ll <em>recommend</em> the right support.
          </>
        }
        text="Describe your project and a specialist will suggest the service — or combination — that fits your stage and deadline."
      />
    </>
  )
}
