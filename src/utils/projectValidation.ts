import { estimatorConfig } from '../data/pricing'
import { deadlineDays } from '../data/projectOptions'
import type { BriefContact, ProjectDraft, ProjectErrors, ProjectField } from '../types/project'
import { daysUntil } from './pricingCalculator'

export function resolveDeadlineDays(draft: Pick<ProjectDraft, 'deadline' | 'customDeadline'>): number | null {
  if (!draft.deadline) return null
  if (draft.deadline === 'custom') return daysUntil(draft.customDeadline)
  return deadlineDays[draft.deadline]
}

const required: Partial<Record<ProjectField, string>> = {
  academicLevel: 'Choose your academic level.',
  projectType: 'Choose a project type.',
  subject: 'Choose a subject or discipline.',
  service: 'Choose the support you need.',
  deadline: 'Choose a deadline.',
}

export function validateProject(draft: ProjectDraft, fields?: readonly ProjectField[]): ProjectErrors {
  const errors: ProjectErrors = {}
  const check = (field: ProjectField) => !fields || fields.includes(field)

  for (const [field, message] of Object.entries(required) as [ProjectField, string][]) {
    if (check(field) && !draft[field]) errors[field] = message
  }

  if (check('wordCount')) {
    const { min, max } = estimatorConfig.words
    if (!Number.isFinite(draft.wordCount) || draft.wordCount < min || draft.wordCount > max) {
      errors.wordCount = `Enter between ${min.toLocaleString()} and ${max.toLocaleString()} words.`
    }
  }

  if (check('deadline') && draft.deadline === 'custom' && daysUntil(draft.customDeadline) === null) {
    errors.customDeadline = 'Pick a date from tomorrow onwards.'
  }

  if (check('requirements') && draft.requirements.length > 4000) {
    errors.requirements = 'Please keep requirements under 4,000 characters.'
  }

  return errors
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const isValidEmail = (value: string) => EMAIL_RE.test(value.trim())

export type ContactErrors = Partial<Record<keyof BriefContact, string>>

export function validateContact(contact: BriefContact): ContactErrors {
  const errors: ContactErrors = {}
  if (contact.fullName.trim().length < 2) errors.fullName = 'Enter your name.'
  if (!isValidEmail(contact.email)) errors.email = 'Enter a valid email address.'
  if (!contact.integrityAcknowledged) errors.integrityAcknowledged = 'Please confirm to continue.'
  return errors
}
