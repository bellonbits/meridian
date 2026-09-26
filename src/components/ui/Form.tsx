import { useId, type ChangeEvent, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from 'react'
import type { Option } from '../../data/projectOptions'
import { describedBy } from '../../utils/aria'
import { cx } from '../../utils/cx'
import { Icon } from './Icon'
import './Form.css'

/* ---------- Field wrapper ---------- */

interface FieldProps {
  id: string
  label: string
  hint?: ReactNode
  error?: string
  optional?: boolean
  className?: string
  children: ReactNode
}

export function Field({ id, label, hint, error, optional, className, children }: FieldProps) {
  return (
    <div className={cx('field', error && 'field--invalid', className)}>
      <label className="field__label" htmlFor={id}>
        {label}
        {optional && <span className="field__optional">Optional</span>}
      </label>
      {children}
      {error ? (
        <p className="field__error" id={`${id}-error`} role="alert">
          <Icon name="alert" size={14} /> {error}
        </p>
      ) : (
        hint && (
          <p className="field__hint" id={`${id}-hint`}>
            {hint}
          </p>
        )
      )}
    </div>
  )
}

/* ---------- Select (native for full accessibility) ---------- */

interface SelectProps<T extends string> {
  id: string
  label: string
  value: T | ''
  options: readonly Option<T>[]
  onChange: (value: T) => void
  placeholder?: string
  error?: string
  hint?: string
  optional?: boolean
  className?: string
}

export function Select<T extends string>({
  id,
  label,
  value,
  options,
  onChange,
  placeholder = 'Select…',
  error,
  hint,
  optional,
  className,
}: SelectProps<T>) {
  return (
    <Field id={id} label={label} error={error} hint={hint} optional={optional} className={className}>
      <div className="select">
        <select
          id={id}
          value={value}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, error, Boolean(hint))}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value as T)}
          className={cx('control', !value && 'control--placeholder')}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Icon name="chevronDown" size={18} className="select__chevron" />
      </div>
    </Field>
  )
}

/* ---------- ChoiceGroup (radio chips) ---------- */

interface ChoiceGroupProps<T extends string> {
  name: string
  legend: string
  value: T | ''
  options: readonly Option<T>[]
  onChange: (value: T) => void
  error?: string
  columns?: number
  className?: string
}

export function ChoiceGroup<T extends string>({
  name,
  legend,
  value,
  options,
  onChange,
  error,
  className,
}: ChoiceGroupProps<T>) {
  const errorId = `${name}-error`
  return (
    <fieldset
      className={cx('choice-group', error && 'field--invalid', className)}
      aria-describedby={error ? errorId : undefined}
      id={name}
      tabIndex={-1}
    >
      <legend className="field__label">{legend}</legend>
      <div className="choice-group__options">
        {options.map((option) => {
          const checked = option.value === value
          return (
            <label key={option.value} className={cx('choice', checked && 'choice--checked')}>
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="visually-hidden"
              />
              <span className="choice__tick" aria-hidden="true">
                <Icon name="check" size={12} strokeWidth={2.4} />
              </span>
              <span>{option.label}</span>
            </label>
          )
        })}
      </div>
      {error && (
        <p className="field__error" id={errorId} role="alert">
          <Icon name="alert" size={14} /> {error}
        </p>
      )}
    </fieldset>
  )
}

/* ---------- Text inputs ---------- */

interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  id: string
  label: string
  error?: string
  hint?: string
  optional?: boolean
  onValueChange: (value: string) => void
}

export function TextInput({ id, label, error, hint, optional, onValueChange, className, ...rest }: TextInputProps) {
  return (
    <Field id={id} label={label} error={error} hint={hint} optional={optional} className={className}>
      <input
        id={id}
        className="control"
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, Boolean(hint))}
        onChange={(e) => onValueChange(e.target.value)}
        {...rest}
      />
    </Field>
  )
}

interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  id: string
  label: string
  error?: string
  hint?: string
  optional?: boolean
  onValueChange: (value: string) => void
}

export function TextArea({ id, label, error, hint, optional, onValueChange, className, ...rest }: TextAreaProps) {
  return (
    <Field id={id} label={label} error={error} hint={hint} optional={optional} className={className}>
      <textarea
        id={id}
        className="control control--textarea"
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, Boolean(hint))}
        onChange={(e) => onValueChange(e.target.value)}
        {...rest}
      />
    </Field>
  )
}

/* ---------- Checkbox ---------- */

interface CheckboxProps {
  id: string
  checked: boolean
  onChange: (checked: boolean) => void
  children: ReactNode
  error?: string
  className?: string
}

export function Checkbox({ id, checked, onChange, children, error, className }: CheckboxProps) {
  const autoId = useId()
  const errorId = `${autoId}-error`
  return (
    <div className={cx('checkbox', error && 'field--invalid', className)}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
      />
      <label htmlFor={id}>{children}</label>
      {error && (
        <p className="field__error checkbox__error" id={errorId} role="alert">
          <Icon name="alert" size={14} /> {error}
        </p>
      )}
    </div>
  )
}
