/**
 * Canonical option sets for the project builder.
 * `value` strings are stable identifiers intended to match the API/database enums.
 */

export interface Option<T extends string = string> {
  readonly value: T
  readonly label: string
  readonly hint?: string
}

export const academicLevels = [
  { value: 'undergraduate', label: 'Undergraduate' },
  { value: 'masters', label: "Master's" },
  { value: 'phd', label: 'PhD' },
  { value: 'professional', label: 'Professional' },
  { value: 'institution', label: 'Research Institution' },
] as const satisfies readonly Option[]

export const projectTypes = [
  { value: 'dissertation', label: 'Dissertation' },
  { value: 'thesis', label: 'Thesis' },
  { value: 'research-proposal', label: 'Research Proposal' },
  { value: 'literature-review', label: 'Literature Review' },
  { value: 'journal-article', label: 'Journal Article' },
  { value: 'research-paper', label: 'Research Paper' },
  { value: 'case-study', label: 'Case Study' },
  { value: 'white-paper', label: 'White Paper' },
  { value: 'data-analysis', label: 'Data Analysis' },
  { value: 'academic-editing', label: 'Academic Editing' },
  { value: 'research-consultation', label: 'Research Consultation' },
] as const satisfies readonly Option[]

export const subjects = [
  { value: 'business', label: 'Business' },
  { value: 'economics', label: 'Economics' },
  { value: 'finance', label: 'Finance' },
  { value: 'computer-science', label: 'Computer Science' },
  { value: 'data-science', label: 'Data Science' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'medicine', label: 'Medicine' },
  { value: 'social-sciences', label: 'Social Sciences' },
  { value: 'education', label: 'Education' },
  { value: 'law', label: 'Law' },
  { value: 'other', label: 'Other' },
] as const satisfies readonly Option[]

export const services = [
  { value: 'writing-support', label: 'Writing Support', hint: 'Structured drafting guidance' },
  { value: 'editing', label: 'Editing', hint: 'Language, flow and clarity' },
  { value: 'research-support', label: 'Research Support', hint: 'Sources, synthesis, framing' },
  { value: 'data-analysis', label: 'Data Analysis', hint: 'Cleaning, modelling, reporting' },
  { value: 'statistical-analysis', label: 'Statistical Analysis', hint: 'Tests, models, interpretation' },
  { value: 'literature-review', label: 'Literature Review', hint: 'Search strategy and synthesis' },
  { value: 'formatting', label: 'Formatting', hint: 'Style guide and layout' },
  { value: 'consultation', label: 'Consultation', hint: 'Advisory sessions' },
] as const satisfies readonly Option[]

export const deadlines = [
  { value: '24h', label: '24 hours' },
  { value: '3d', label: '3 days' },
  { value: '7d', label: '7 days' },
  { value: '14d', label: '14 days' },
  { value: 'custom', label: 'Custom' },
] as const satisfies readonly Option[]

export const citationStyles = [
  { value: 'apa7', label: 'APA 7' },
  { value: 'mla', label: 'MLA' },
  { value: 'chicago', label: 'Chicago' },
  { value: 'harvard', label: 'Harvard' },
  { value: 'ieee', label: 'IEEE' },
  { value: 'other', label: 'Other' },
] as const satisfies readonly Option[]

export type AcademicLevel = (typeof academicLevels)[number]['value']
export type ProjectType = (typeof projectTypes)[number]['value']
export type Subject = (typeof subjects)[number]['value']
export type ServiceType = (typeof services)[number]['value']
export type DeadlineOption = (typeof deadlines)[number]['value']
export type CitationStyle = (typeof citationStyles)[number]['value']

/** Fixed deadline options expressed in days (custom deadlines are computed from a date). */
export const deadlineDays: Record<Exclude<DeadlineOption, 'custom'>, number> = {
  '24h': 1,
  '3d': 3,
  '7d': 7,
  '14d': 14,
}

export function labelFor<T extends string>(options: readonly Option<T>[], value: T | ''): string {
  return options.find((option) => option.value === value)?.label ?? ''
}
