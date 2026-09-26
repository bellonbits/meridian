import type { ProjectField } from '../../types/project'

export type GroupId = 'project' | 'service' | 'requirements' | 'deadline'

export interface BuilderStep {
  id: GroupId | 'estimate'
  title: string
  prompt: string
  fields: readonly ProjectField[]
}

/** Mobile wizard order. Desktop renders the same groups in `desktopGroups` order. */
export const builderSteps: readonly BuilderStep[] = [
  { id: 'project', title: 'Project', prompt: 'What are you working on?', fields: ['academicLevel', 'projectType', 'subject'] },
  { id: 'service', title: 'Service', prompt: 'What kind of support do you need?', fields: ['service', 'citationStyle'] },
  { id: 'requirements', title: 'Requirements', prompt: 'How long is it, and what should we know?', fields: ['wordCount', 'requirements'] },
  { id: 'deadline', title: 'Deadline', prompt: 'When do you need it?', fields: ['deadline', 'customDeadline'] },
  { id: 'estimate', title: 'Estimate', prompt: 'Review your project', fields: [] },
]

export const desktopGroups: readonly { id: GroupId; title: string }[] = [
  { id: 'project', title: 'Project' },
  { id: 'service', title: 'Support' },
  { id: 'deadline', title: 'Deadline' },
  { id: 'requirements', title: 'Scope & requirements' },
]

/** DOM id used for each field's focusable element, for error focusing. */
export const fieldDomId = (field: ProjectField) => `pb-${field}`
