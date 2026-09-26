import { useRef, useState, type KeyboardEvent } from 'react'
import { processSteps } from '../../data/process'
import { MOBILE_QUERY, useMediaQuery } from '../../hooks/useMediaQuery'
import { cx } from '../../utils/cx'
import { Icon } from '../ui/Icon'
import { Reveal, SectionHeading } from '../ui/primitives'
import { ProcessStepDetail } from './ProcessStep'
import './ProcessTimeline.css'

export function ProcessTimeline() {
  const isMobile = useMediaQuery(MOBILE_QUERY)
  const [active, setActive] = useState(0)
  const [openMobile, setOpenMobile] = useState<number | null>(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  // WAI-ARIA tabs keyboard model for the desktop timeline.
  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = processSteps.length - 1
    const map: Record<string, number> = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    }
    if (e.key in map) {
      e.preventDefault()
      setActive(map[e.key])
      tabRefs.current[map[e.key]]?.focus()
    }
  }

  const progress = (active / (processSteps.length - 1)) * 100

  return (
    <section id="process" className="section section--surface process" aria-labelledby="process-title">
      <div className="container container--wide">
        <SectionHeading
          id="process-title"
          eyebrow="How it works"
          title={
            <>
              From research question to <em>final manuscript.</em>
            </>
          }
          lede="A transparent, milestone-based workflow. You approve the scope before anything starts, and see progress at every checkpoint."
        />

        {isMobile ? (
          <ol className="process-v">
            {processSteps.map((step, i) => {
              const open = openMobile === i
              return (
                <li key={step.id} className={cx('process-v__item', open && 'is-open')}>
                  <h3 className="process-v__heading">
                    <button
                      type="button"
                      className="process-v__trigger"
                      aria-expanded={open}
                      aria-controls={`process-m-${step.id}`}
                      onClick={() => setOpenMobile(open ? null : i)}
                    >
                      <span className="process-v__num">{step.number}</span>
                      <span className="process-v__titles">
                        <span className="process-v__title">{step.title}</span>
                        <span className="process-v__summary">{step.summary}</span>
                      </span>
                      <Icon name="chevronDown" size={18} className="process-v__chev" />
                    </button>
                  </h3>
                  <div id={`process-m-${step.id}`} className="process-v__panel" hidden={!open}>
                    <ProcessStepDetail step={step} />
                  </div>
                </li>
              )
            })}
          </ol>
        ) : (
          <Reveal className="process-h">
            <div className="process-h__track" aria-hidden="true">
              <span style={{ width: `${progress}%` }} />
            </div>
            <div className="process-h__tabs" role="tablist" aria-label="Workflow steps">
              {processSteps.map((step, i) => {
                const selected = i === active
                return (
                  <button
                    key={step.id}
                    ref={(el) => {
                      tabRefs.current[i] = el
                    }}
                    type="button"
                    role="tab"
                    id={`process-tab-${step.id}`}
                    aria-selected={selected}
                    aria-controls="process-panel"
                    tabIndex={selected ? 0 : -1}
                    className={cx('process-h__tab', selected && 'is-active', i < active && 'is-done')}
                    onClick={() => setActive(i)}
                    onKeyDown={(e) => onTabKey(e, i)}
                  >
                    <span className="process-h__node" aria-hidden="true">
                      {i < active ? <Icon name="check" size={14} strokeWidth={2.4} /> : step.number}
                    </span>
                    <span className="process-h__title">{step.title}</span>
                    <span className="process-h__summary">{step.summary}</span>
                  </button>
                )
              })}
            </div>
            <div
              id="process-panel"
              role="tabpanel"
              aria-labelledby={`process-tab-${processSteps[active].id}`}
              className="process-h__panel"
              key={active}
              tabIndex={0}
            >
              <p className="process-h__panel-step">
                Step {processSteps[active].number} of 0{processSteps.length}
              </p>
              <ProcessStepDetail step={processSteps[active]} />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
