import type { ReactNode } from 'react'
import { useAppActions } from '../../context/AppActions'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/primitives'
import './FinalCTA.css'

interface FinalCTAProps {
  eyebrow?: string
  title?: ReactNode
  text?: string
}

export function FinalCTA({
  eyebrow = 'Begin your project',
  title = (
    <>
      Your research deserves <em>careful</em> work.
    </>
  ),
  text = 'Tell us where you are in the process and what you need help with.',
}: FinalCTAProps) {
  const { startProject, openContact } = useAppActions()
  return (
    <section className="final-cta" aria-labelledby="final-cta-title">
      <div className="container container--wide">
        <Reveal className="final-cta__card">
          <div className="final-cta__rules" aria-hidden="true" />
          <span className="final-cta__glyph" aria-hidden="true">
            ¶
          </span>
          <span className="final-cta__note annot" aria-hidden="true">
            start here →
          </span>

          <div className="final-cta__content">
            <p className="eyebrow">{eyebrow}</p>
            <h2 id="final-cta-title" className="final-cta__title">
              {title}
            </h2>
            <p className="final-cta__text">{text}</p>
            <div className="final-cta__actions">
              <Button variant="success" size="lg" arrow onClick={() => startProject()}>
                Start a Project
              </Button>
              <Button variant="secondary" size="lg" icon="chat" onClick={openContact}>
                Talk to a Research Specialist
              </Button>
            </div>
          </div>

          <ol className="final-cta__footnotes" aria-hidden="true">
            <li>
              <sup>1</sup> Free scoping review before any commitment.
            </li>
            <li>
              <sup>2</sup> Specialist matched to your discipline.
            </li>
            <li>
              <sup>3</sup> Independent expert review on every project.
            </li>
          </ol>
        </Reveal>
      </div>
    </section>
  )
}
