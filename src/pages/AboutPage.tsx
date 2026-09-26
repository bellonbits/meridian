import { AboutSection } from '../components/about/AboutSection'
import { FinalCTA } from '../components/cta/FinalCTA'
import { PageHero } from '../components/page/PageHero'
import { Seo } from '../components/page/Seo'
import { TrustSection } from '../components/trust/TrustSection'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/primitives'
import { routes } from '../data/site'
import './pages.css'

const selection = [
  { title: 'Postgraduate training', body: 'A master’s or doctorate in the discipline they support, verified before onboarding.' },
  { title: 'Trial assessment', body: 'A supervised trial project, reviewed against our editorial and methodological standards.' },
  { title: 'Integrity induction', body: 'Training on our academic-integrity policy, confidentiality and appropriate forms of support.' },
  { title: 'Ongoing peer review', body: 'Every project is checked by a second specialist; quality is reviewed continuously, not once.' },
]

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About the Studio"
        description="Meridian Research Studio brings together researchers, editors and analysts who care about rigour — matched to your discipline, reviewed by peers, committed to academic integrity."
      />
      <PageHero
        crumbs={[{ label: 'About' }]}
        eyebrow="About"
        title={
          <>
            Research support, held to <em>research standards.</em>
          </>
        }
        lede="We are a studio of researchers, editors and analysts. We believe the best support makes your own thinking sharper — and leaves the ideas and the credit with you."
      >
        <div className="link-row">
          <Button to={routes.integrity} variant="secondary" arrow>
            Our integrity policy
          </Button>
        </div>
      </PageHero>

      <AboutSection />

      <section id="specialists" className="block block--surface" aria-labelledby="specialists-title">
        <div className="container container--wide split">
          <div className="split__label">
            <p className="eyebrow">Our specialists</p>
            <h2 id="specialists-title" className="block__title">
              How specialists are <em>selected</em>
            </h2>
            <p className="block__lede">Matched by the studio to your discipline — not chosen from an open marketplace.</p>
          </div>
          <ol className="steps">
            {selection.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 60}>
                <span className="steps__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <TrustSection />
      <FinalCTA />
    </>
  )
}
