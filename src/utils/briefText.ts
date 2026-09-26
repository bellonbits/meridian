import type { ProjectBriefPayload } from '../types/project'
import { academicLevels, citationStyles, deadlines, labelFor, projectTypes, services, subjects } from '../data/projectOptions'
import { formatMoney, formatNumber } from './pricingCalculator'

/** Plain-text brief used for the email hand-off and "copy brief". */
export function formatBriefText(p: ProjectBriefPayload): string {
  const lines = [
    `Working title: ${p.working_title || '—'}`,
    `Project type: ${labelFor(projectTypes, p.project_type)}`,
    `Academic level: ${labelFor(academicLevels, p.academic_level)}`,
    `Subject: ${labelFor(subjects, p.subject)}`,
    `Service: ${labelFor(services, p.service)}`,
    `Length: ${formatNumber(p.word_count)} words`,
    `Deadline: ${p.deadline_date ?? labelFor(deadlines, p.deadline)}`,
    `Citation style: ${p.citation_style ? labelFor(citationStyles, p.citation_style) : 'Not specified'}`,
    `First-project discount: ${p.first_project_discount ? 'Yes' : 'No'}`,
    `Indicative estimate: ${formatMoney(p.client_estimate.total, { currency: p.client_estimate.currency })}`,
    '',
    'Requirements:',
    p.requirements || '—',
    '',
    `— ${p.contact.full_name} (${p.contact.email})`,
  ]
  return lines.join('\n')
}
