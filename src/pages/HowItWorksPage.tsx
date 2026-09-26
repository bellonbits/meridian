import { FinalCTA } from '../components/cta/FinalCTA'
import { FAQSection } from '../components/faq/FAQSection'
import { PageHero } from '../components/page/PageHero'
import { Seo } from '../components/page/Seo'
import { ProcessTimeline } from '../components/process/ProcessTimeline'
import { TechnologySection } from '../components/technology/TechnologySection'
import { Button } from '../components/ui/Button'
import { Icon } from '../components/ui/Icon'
import { Reveal } from '../components/ui/primitives'
import { faqsById } from '../data/faq'
import { prepareChecklist, typicalTimelines } from '../data/process'
import { routes } from '../data/site'
import './pages.css'

const processFaqs = faqsById(['process', 'deadlines', 'revisions', 'specialists', 'estimate'])

export default function HowItWorksPage() {
  return (
    <>
      <Seo
        title="How It Works"
        description="A transparent, milestone-based research workflow: share your brief, agree a written scope, research and development, independent expert review, revisions and final delivery."
      />
      <PageHero
        crumbs={[{ label: 'How It Works' }]}
        eyebrow="How it works"
        title={
          <>
            A transparent process, from brief to <em>handover.</em>
          </>
        }
        lede="You approve a written scope before anything starts, see progress at every milestone, and receive notes that explain every decision. Here is exactly what happens — and what we need from you."
      >
        <div className="link-row">
          <Button to={routes.start} variant="success" arrow>
            Share your brief
          </Button>
          <Button to={routes.pricing} variant="secondary">
            See pricing
          </Button>
        </div>
      </PageHero>

      <ProcessTimeline />

      <section className="block" aria-labelledby="prepare-title">
        <div className="container container--wide split">
          <div className="split__label">
            <p className="eyebrow">Before you start</p>
            <h2 id="prepare-title" className="block__title">
              What to <em>prepare</em>
            </h2>
            <p className="block__lede">None of this is required to get an estimate — but it makes the scoping review faster and more accurate.</p>
          </div>
          <Reveal>
            <ul className="checklist checklist--2">
              {prepareChecklist.map((item) => (
                <li key={item}>
                  <Icon name="check" size={18} strokeWidth={2} /> {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="block block--surface" aria-labelledby="timelines-title">
        <div className="container container--wide">
          <div className="block__head">
            <p className="eyebrow">Planning</p>
            <h2 id="timelines-title" className="block__title">
              Typical <em>timelines</em>
            </h2>
            <p className="block__lede">A planning guide only — your confirmed timeline is set in the written scope, based on your materials and deadline.</p>
          </div>
          <Reveal className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th scope="col">Project</th>
                  <th scope="col">Typical timeline</th>
                  <th scope="col">Milestones</th>
                </tr>
              </thead>
              <tbody>
                {typicalTimelines.map((row) => (
                  <tr key={row.scope}>
                    <th scope="row">{row.scope}</th>
                    <td className="num">{row.timeline}</td>
                    <td>{row.milestones}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <TechnologySection />

      <FAQSection
        items={processFaqs}
        tone="plain"
        eyebrow="Process questions"
        title={
          <>
            Working with <em>us</em>
          </>
        }
        lede="Common questions about scope, deadlines and revisions."
        asideExtra={
          <Button to={routes.faq} variant="link" arrow>
            All questions
          </Button>
        }
      />
      <FinalCTA />
    </>
  )
}
