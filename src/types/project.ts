import type {
  AcademicLevel,
  CitationStyle,
  DeadlineOption,
  ProjectType,
  ServiceType,
  Subject,
} from '../data/projectOptions'

/** Client-side project configuration. Empty string = not yet chosen. */
export interface ProjectDraft {
  academicLevel: AcademicLevel | ''
  projectType: ProjectType | ''
  service: ServiceType | ''
  subject: Subject | ''
  wordCount: number
  deadline: DeadlineOption | ''
  /** ISO date (yyyy-mm-dd), only used when `deadline === 'custom'`. */
  customDeadline: string
  citationStyle: CitationStyle | ''
  requirements: string
  applyFirstProjectDiscount: boolean
}

export type ProjectField = keyof ProjectDraft

export type ProjectErrors = Partial<Record<ProjectField, string>>

/** Contact details captured in the project brief step. */
export interface BriefContact {
  fullName: string
  email: string
  workingTitle: string
  integrityAcknowledged: boolean
}

/** Shape sent to `POST /api/projects`. Mirrors the future FastAPI/Pydantic schema. */
export interface ProjectBriefPayload {
  academic_level: AcademicLevel
  project_type: ProjectType
  service: ServiceType
  subject: Subject
  word_count: number
  deadline: DeadlineOption
  deadline_date: string | null
  citation_style: CitationStyle | null
  requirements: string
  working_title: string
  contact: { full_name: string; email: string }
  first_project_discount: boolean
  /** Client-side estimate for reference only — the server must re-price. */
  client_estimate: { total: number; currency: string }
}
