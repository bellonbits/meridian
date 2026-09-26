import { processSteps } from '../../data/process'
import { routes } from '../../data/site'
import { Button } from '../ui/Button'
import { Reveal, SectionHeading } from '../ui/primitives'
import './ProcessPreview.css'

/** Compact six-step strip for the home page; the full timeline lives on /how-it-works. */
export function ProcessPreview() {
  return (
    <section className="section section--surface process-preview" aria-labelledby="process-preview-title">
      <div className="container container--wide">
        <div className="process-preview__head">
          <SectionHeading
            id="process-preview-title"
            eyebrow="How it works"
            title={
              <>
                From research question to <em>final manuscript.</em>
              </>
            }
          />
          <Reveal delay={100}>
            <Button to={routes.howItWorks} variant="secondary" arrow>
              See the full process
            </Button>
          </Reveal>
        </div>
        <ol className="process-preview__list">
          {processSteps.map((step, i) => (
            <Reveal as="li" key={step.id} delay={i * 60} className="process-preview__step">
              <span className="process-preview__num">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.summary}</p>
              <span className="process-preview__time">{step.duration}</span>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
