import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { useAppActions } from '../../context/AppActions'
import { MOBILE_QUERY, useMediaQuery } from '../../hooks/useMediaQuery'
import { useLazyMount } from '../../hooks/useLazyMount'
import { useProjectEstimator } from '../../hooks/useProjectEstimator'
import type { ProjectField } from '../../types/project'
import { cx } from '../../utils/cx'
import { formatMoney } from '../../utils/pricingCalculator'
import { validateProject } from '../../utils/projectValidation'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { useToast } from '../ui/Toast'
import { BuilderFields } from './BuilderFields'
import { builderSteps, desktopGroups, fieldDomId } from './builderSteps'
import { ProjectSummary } from './ProjectSummary'
import './ProjectBuilder.css'

const BriefModal = lazy(() => import('./BriefModal'))

const fieldOrder: ProjectField[] = builderSteps.flatMap((s) => s.fields)

interface ProjectBuilderProps {
  /** Pull the card up over the preceding hero (home page). */
  overlap?: boolean
}

export function ProjectBuilder({ overlap = false }: ProjectBuilderProps) {
  const estimator = useProjectEstimator()
  const { project, errors, estimate, setField, merge, reset, validate } = estimator
  const isMobile = useMediaQuery(MOBILE_QUERY)
  const [step, setStep] = useState(0)
  const [briefOpen, setBriefOpen] = useState(false)
  const briefMounted = useLazyMount(briefOpen)
  const notify = useToast()
  const { preset } = useAppActions()
  const stepHeadingRef = useRef<HTMLHeadingElement>(null)
  const lastPreset = useRef(0)

  // Apply presets from service cards, pricing tabs and the promo bar.
  useEffect(() => {
    if (!preset || preset.nonce === lastPreset.current) return
    lastPreset.current = preset.nonce
    merge(preset.values)
    setStep(0)
  }, [preset, merge])

  const focusField = (field: ProjectField) => {
    const el = document.getElementById(fieldDomId(field))
    const target = el?.matches('fieldset') ? el.querySelector<HTMLElement>('input') ?? el : el
    target?.focus({ preventScroll: false })
  }

  const goToStep = useCallback((next: number) => {
    setStep(next)
    // Move focus to the new step heading for screen-reader and keyboard users.
    requestAnimationFrame(() => stepHeadingRef.current?.focus())
  }, [])

  const openBrief = () => {
    const found = validateProject(project)
    validate()
    const invalid = fieldOrder.filter((f) => found[f])
    if (invalid.length) {
      notify({ tone: 'error', title: 'A few details are missing', message: found[invalid[0]] })
      if (isMobile) {
        const target = builderSteps.findIndex((s) => s.fields.includes(invalid[0]))
        goToStep(Math.max(0, target))
      } else {
        focusField(invalid[0])
      }
      return
    }
    setBriefOpen(true)
  }

  const current = builderSteps[step]
  const isLast = step === builderSteps.length - 1

  const onContinueStep = () => {
    if (current.fields.length && !validate(current.fields)) {
      const firstInvalid = current.fields.find((f) => validateProject(project, current.fields)[f])
      if (firstInvalid) focusField(firstInvalid)
      return
    }
    goToStep(step + 1)
  }

  const summary = (
    <ProjectSummary
      project={project}
      estimate={estimate}
      onToggleDiscount={(v) => setField('applyFirstProjectDiscount', v)}
      onContinue={openBrief}
    />
  )

  return (
    <section id="start" className={cx('builder-section', overlap && 'builder-section--overlap')} aria-labelledby="builder-title">
      <div className="container container--wide">
        <div className="builder">
          <div className="builder__main">
            <header className="builder__header">
              <div>
                <p className="eyebrow">Start your project</p>
                <h2 id="builder-title" className="builder__title">
                  Tell us what you’re working on
                </h2>
              </div>
              <p className="builder__live">
                <span className="builder__live-dot" aria-hidden="true" /> Estimate updates as you type
              </p>
            </header>

            {isMobile ? (
              <div className="wizard">
                <div className="wizard__progress">
                  <p className="wizard__count">
                    Step {step + 1} of {builderSteps.length}
                    <span aria-hidden="true"> · </span>
                    <span className="wizard__step-name">{current.title}</span>
                  </p>
                  <div
                    className="wizard__bar"
                    role="progressbar"
                    aria-label="Project builder progress"
                    aria-valuemin={1}
                    aria-valuemax={builderSteps.length}
                    aria-valuenow={step + 1}
                  >
                    <span style={{ width: `${((step + 1) / builderSteps.length) * 100}%` }} />
                  </div>
                  <ol className="wizard__dots" aria-hidden="true">
                    {builderSteps.map((s, i) => (
                      <li key={s.id} className={cx(i < step && 'is-done', i === step && 'is-current')}>
                        {s.title}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="wizard__panel" key={current.id}>
                  <h3 ref={stepHeadingRef} tabIndex={-1} className="wizard__prompt">
                    {current.prompt}
                  </h3>
                  {current.id === 'estimate' ? (
                    summary
                  ) : (
                    <BuilderFields group={current.id} project={project} errors={errors} setField={setField} />
                  )}
                </div>

                {!isLast && (
                  <div className="wizard__estimate" aria-hidden="true">
                    <span>Estimate so far</span>
                    <strong className="tabular">{formatMoney(estimate.finalTotal)}</strong>
                  </div>
                )}

                <div className="wizard__nav">
                  {step > 0 && (
                    <Button variant="secondary" icon="chevronLeft" onClick={() => goToStep(step - 1)}>
                      Back
                    </Button>
                  )}
                  {!isLast && (
                    <Button variant="primary" arrow onClick={onContinueStep} className="wizard__next">
                      Continue
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <form className="builder__form" onSubmit={(e) => e.preventDefault()} noValidate>
                {desktopGroups.map((group, index) => (
                  <fieldset key={group.id} className="builder__group">
                    <legend className="builder__group-title">
                      <span className="builder__group-num">0{index + 1}</span>
                      {group.title}
                    </legend>
                    <BuilderFields group={group.id} project={project} errors={errors} setField={setField} />
                  </fieldset>
                ))}
                <div className="builder__form-foot">
                  <p>
                    <Icon name="info" size={15} /> Your selections are saved on this device.
                  </p>
                  <button type="button" className="builder__reset" onClick={reset}>
                    Reset form
                  </button>
                </div>
              </form>
            )}
          </div>

          {!isMobile && <div className="builder__aside">{summary}</div>}
        </div>
      </div>

      {briefMounted && (
        <Suspense fallback={null}>
          <BriefModal
            open={briefOpen}
            onClose={() => setBriefOpen(false)}
            project={project}
            estimate={estimate}
            onSubmitted={reset}
          />
        </Suspense>
      )}
    </section>
  )
}
