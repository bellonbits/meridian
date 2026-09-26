import type { AcademicLevel, ProjectType, ServiceType, Subject } from '../data/projectOptions'

export interface UrgencyBand {
  /** Inclusive upper bound, in days, for this band. */
  maxDays: number
  multiplier: number
  label: string
}

export interface EstimatorConfig {
  currency: string
  locale: string
  /** True while figures are illustrative rather than a published rate card. */
  isIndicative: boolean
  /** Base rate for 1,000 words of undergraduate writing support in a standard discipline. */
  ratePerThousandWords: number
  minimumCharge: number
  words: { min: number; max: number; step: number; perPage: number; default: number }
  projectTypeFactor: Record<ProjectType, number>
  serviceMultiplier: Record<ServiceType, number>
  academicLevelMultiplier: Record<AcademicLevel, number>
  subjectComplexity: Record<Subject, number>
  urgency: UrgencyBand[]
  firstProjectDiscount: { rate: number; code: string; label: string }
}

export interface EstimateInput {
  academicLevel: AcademicLevel | ''
  projectType: ProjectType | ''
  service: ServiceType | ''
  subject: Subject | ''
  wordCount: number
  /** Days until delivery, or null if no deadline chosen. */
  deadlineDays: number | null
  applyFirstProjectDiscount: boolean
}

export interface EstimateBreakdown {
  /** Words × rate × project-type factor × subject complexity. */
  basePrice: number
  urgencyMultiplier: number
  urgencyLabel: string
  serviceMultiplier: number
  academicLevelMultiplier: number
  complexity: number
  /** Before discount, after minimum charge. */
  estimatedTotal: number
  discount: number
  finalTotal: number
  /** False until the fields that drive price are all chosen. */
  isComplete: boolean
  currency: string
}

export interface RateRow {
  name: string
  note: string
  price: number
  unit: string
}

export interface PricingPlan {
  id: string
  tab: string
  title: string
  summary: string
  startingFrom: { price: number; unit: string }
  included: string[]
  turnaround: { label: string; detail: string }
  deliverables: string[]
  rates: RateRow[]
  cta: { label: string; service: ServiceType }
}
