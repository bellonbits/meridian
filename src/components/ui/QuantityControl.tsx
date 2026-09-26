import { useState } from 'react'
import { describedBy } from '../../utils/aria'
import { Field } from './Form'
import { Icon } from './Icon'
import './Form.css'

interface QuantityControlProps {
  id: string
  label: string
  value: number
  min: number
  max: number
  step: number
  unit: string
  onChange: (value: number) => void
  hint?: string
  error?: string
}

/**
 * Stepper with a directly editable number. The input keeps a local text buffer so the
 * user can type freely; the value is clamped and committed on blur / Enter.
 */
export function QuantityControl({ id, label, value, min, max, step, unit, onChange, hint, error }: QuantityControlProps) {
  const [text, setText] = useState(String(value))
  const [synced, setSynced] = useState(value)

  // Re-sync the text buffer when the value changes from outside (stepper, preset, reset).
  if (value !== synced) {
    setSynced(value)
    setText(String(value))
  }

  const commit = (raw: string) => {
    const parsed = Number(raw.replace(/[^\d]/g, ''))
    if (!Number.isFinite(parsed) || parsed === 0) {
      setText(String(value))
      return
    }
    const clamped = Math.min(max, Math.max(min, parsed))
    setText(String(clamped))
    onChange(clamped)
  }

  const nudge = (direction: 1 | -1) => {
    const aligned = direction === 1 ? Math.floor(value / step) * step + step : Math.ceil(value / step) * step - step
    onChange(Math.min(max, Math.max(min, aligned)))
  }

  return (
    <Field id={id} label={label} hint={hint} error={error}>
      <div className="quantity">
        <button
          type="button"
          className="quantity__btn"
          onClick={() => nudge(-1)}
          disabled={value <= min}
          aria-label={`Decrease by ${step} ${unit}`}
          aria-controls={id}
        >
          <Icon name="minus" size={18} />
        </button>
        <div className="quantity__value">
          <input
            id={id}
            className="quantity__input tabular"
            inputMode="numeric"
            value={text}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy(id, error, Boolean(hint))}
            onChange={(e) => setText(e.target.value)}
            onBlur={(e) => commit(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                commit(e.currentTarget.value)
              } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                nudge(1)
              } else if (e.key === 'ArrowDown') {
                e.preventDefault()
                nudge(-1)
              }
            }}
          />
          <span className="quantity__unit" aria-hidden="true">
            {unit}
          </span>
        </div>
        <button
          type="button"
          className="quantity__btn"
          onClick={() => nudge(1)}
          disabled={value >= max}
          aria-label={`Increase by ${step} ${unit}`}
          aria-controls={id}
        >
          <Icon name="plus" size={18} />
        </button>
      </div>
    </Field>
  )
}
