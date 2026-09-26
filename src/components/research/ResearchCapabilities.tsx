import { useState } from 'react'
import { capabilities } from '../../data/research'
import { cx } from '../../utils/cx'
import { Reveal, SectionHeading } from '../ui/primitives'
import { ResearchWorkspace } from './ResearchWorkspace'
import './ResearchCapabilities.css'

export function ResearchCapabilities() {
  const [pinned, setPinned] = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const activeId = hovered ?? pinned
  const highlight = capabilities.find((c) => c.id === activeId)?.relates ?? []

  return (
    <section id="capabilities" className="section capabilities" aria-labelledby="capabilities-title">
      <div className="container container--wide capabilities__grid">
        <div className="capabilities__copy">
          <SectionHeading
            id="capabilities-title"
            eyebrow="Research support"
            title={
              <>
                Depth across the <em>whole</em> research lifecycle.
              </>
            }
            lede="Specialists work inside a structured protocol — so every decision about questions, variables, methods and evidence is explicit, documented and defensible."
          />

          <ol className="capabilities__index" onMouseLeave={() => setHovered(null)}>
            {capabilities.map((cap, i) => {
              const isActive = activeId === cap.id
              return (
                <Reveal as="li" key={cap.id} delay={i * 40}>
                  <button
                    type="button"
                    className={cx('capability', isActive && 'is-active')}
                    aria-pressed={pinned === cap.id}
                    onMouseEnter={() => setHovered(cap.id)}
                    onFocus={() => setHovered(cap.id)}
                    onBlur={() => setHovered(null)}
                    onClick={() => setPinned((p) => (p === cap.id ? null : cap.id))}
                  >
                    <span className="capability__num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="capability__body">
                      <span className="capability__title">{cap.title}</span>
                      <span className="capability__desc">{cap.description}</span>
                    </span>
                  </button>
                </Reveal>
              )
            })}
          </ol>
        </div>

        <Reveal className="capabilities__visual" delay={120}>
          <p className="capabilities__hint annot" aria-hidden="true">
            hover a capability ↓
          </p>
          <ResearchWorkspace highlight={highlight} />
        </Reveal>
      </div>
    </section>
  )
}
