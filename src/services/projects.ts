import { calculateEstimate } from '../utils/pricingCalculator'
import { resolveDeadlineDays } from '../utils/projectValidation'
import type { BriefContact, ProjectBriefPayload, ProjectDraft } from '../types/project'
import { apiRequest } from './apiClient'

export interface CreatedProject {
  id: string
  status: string
}

/** Maps UI state to the API contract. Assumes the draft has passed validation. */
export function toProjectPayload(draft: ProjectDraft, contact: BriefContact): ProjectBriefPayload {
  if (!draft.academicLevel || !draft.projectType || !draft.service || !draft.subject || !draft.deadline) {
    throw new Error('Project draft is incomplete.')
  }
  const estimate = calculateEstimate({ ...draft, deadlineDays: resolveDeadlineDays(draft) })

  return {
    academic_level: draft.academicLevel,
    project_type: draft.projectType,
    service: draft.service,
    subject: draft.subject,
    word_count: draft.wordCount,
    deadline: draft.deadline,
    deadline_date: draft.deadline === 'custom' ? draft.customDeadline : null,
    citation_style: draft.citationStyle || null,
    requirements: draft.requirements.trim(),
    working_title: contact.workingTitle.trim(),
    contact: { full_name: contact.fullName.trim(), email: contact.email.trim() },
    first_project_discount: draft.applyFirstProjectDiscount,
    client_estimate: { total: estimate.finalTotal, currency: estimate.currency },
  }
}

/** POST /api/projects */
export function submitProjectBrief(payload: ProjectBriefPayload, signal?: AbortSignal) {
  return apiRequest<CreatedProject>('/api/projects', { method: 'POST', body: payload, signal })
}

/** POST /api/inquiries */
export function submitInquiry(body: { name: string; email: string; topic: string; message: string }) {
  return apiRequest<{ id: string }>('/api/inquiries', { method: 'POST', body })
}

/** POST /api/newsletter/subscriptions */
export function subscribeToNewsletter(email: string) {
  return apiRequest<{ ok: boolean }>('/api/newsletter/subscriptions', { method: 'POST', body: { email } })
}
