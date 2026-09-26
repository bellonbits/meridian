import type { CSSProperties } from 'react'
import { pipelineStages, technologySupports } from '../../data/technology'
import { cx } from '../../utils/cx'
import { Icon } from '../ui/Icon'
import { Reveal, SectionHeading } from '../ui/primitives'
import './TechnologySection.css'

export function TechnologySection() {
  return (
    <section id="technology" className="section technology" aria-labelledby="technology-title">
      <div className="container container--wide technology__grid">
        <div className="technology__copy">
          <SectionHeading
            id="technology-title"
            tone="dark"
            eyebrow="Technology & method"
            title={
              <>
                Technology‑assisted. <em>Research-led.</em>
              </>
            }
            lede="Tools keep the work organised, consistent and traceable. Judgement — what to argue, which method fits, what the evidence means — stays with people who know your field."
          />

          <ul className="technology__list">
            {technologySupports.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 50}>
                <strong>{item.title}</strong>
                <span>{item.body}</span>
              </Reveal>
            ))}
          </ul>

          <Reveal className="technology__note">
            <Icon name="shield" size={20} />
            <p>
              <strong>On originality checks.</strong> Similarity reports are one quality-control signal among many. An editor
              reviews every report in context — we don’t promise or target a particular score.
            </p>
          </Reveal>
        </div>

        <Reveal className="pipeline" delay={120}>
          <p className="pipeline__title">Where people and tools meet</p>
          <ol className="pipeline__stages">
            {pipelineStages.map((stage, i) => (
              <li
                key={stage.label}
                className={cx('pipeline__stage', stage.owner === 'Human-led' ? 'is-human' : 'is-tool')}
                style={{ '--i': i } as CSSProperties}
              >
                <span className="pipeline__node" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="pipeline__label">{stage.label}</span>
                <span className="pipeline__owner">
                  <Icon name={stage.owner === 'Human-led' ? 'user' : 'sparkle'} size={13} />
                  {stage.owner}
                </span>
              </li>
            ))}
          </ol>
          <div className="pipeline__pulse" aria-hidden="true" />
          <p className="pipeline__foot">
            <Icon name="user" size={14} /> Human expertise signs off every stage before delivery.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
