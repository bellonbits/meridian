/**
 * Pricing configuration — the single source of truth for every price shown on the site.
 *
 * Figures are INDICATIVE (see `isIndicative`). When the pricing API exists, replace
 * `estimatorConfig` with a fetched config of the same shape, or swap the estimator
 * implementation in `src/utils/pricingCalculator.ts` — components do not change.
 */
import type { EstimatorConfig, PricingPlan } from '../types/pricing'

export const estimatorConfig: EstimatorConfig = {
  currency: 'USD',
  locale: 'en-US',
  isIndicative: true,
  ratePerThousandWords: 36,
  minimumCharge: 45,
  words: { min: 250, max: 60000, step: 250, perPage: 275, default: 3000 },
  projectTypeFactor: {
    dissertation: 1.2,
    thesis: 1.15,
    'research-proposal': 1.05,
    'literature-review': 1.05,
    'journal-article': 1.2,
    'research-paper': 1,
    'case-study': 0.95,
    'white-paper': 1.1,
    'data-analysis': 1.15,
    'academic-editing': 0.9,
    'research-consultation': 1,
  },
  serviceMultiplier: {
    'writing-support': 1,
    editing: 0.45,
    'research-support': 1.15,
    'data-analysis': 1.35,
    'statistical-analysis': 1.4,
    'literature-review': 1.1,
    formatting: 0.25,
    consultation: 0.6,
  },
  academicLevelMultiplier: {
    undergraduate: 1,
    masters: 1.2,
    phd: 1.45,
    professional: 1.3,
    institution: 1.55,
  },
  subjectComplexity: {
    business: 1,
    economics: 1.08,
    finance: 1.08,
    'computer-science': 1.12,
    'data-science': 1.15,
    engineering: 1.12,
    medicine: 1.18,
    'social-sciences': 1,
    education: 1,
    law: 1.15,
    other: 1.05,
  },
  urgency: [
    { maxDays: 1, multiplier: 1.9, label: 'Priority (≤ 24h)' },
    { maxDays: 3, multiplier: 1.35, label: 'Expedited (≤ 3 days)' },
    { maxDays: 7, multiplier: 1.1, label: 'Standard (≤ 7 days)' },
    { maxDays: Number.POSITIVE_INFINITY, multiplier: 1, label: 'Planned (8+ days)' },
  ],
  firstProjectDiscount: { rate: 0.15, code: 'FIRST15', label: 'First project' },
}

/** Rate per 1,000 words for a service at a given academic level multiplier. */
const rateFor = (service: keyof EstimatorConfig['serviceMultiplier'], levelMultiplier = 1) =>
  Math.round(
    estimatorConfig.ratePerThousandWords * estimatorConfig.serviceMultiplier[service] * levelMultiplier,
  )

const levels = estimatorConfig.academicLevelMultiplier

/** Consultation is priced per session rather than per word. */
export const consultationRates = {
  discovery: 0,
  standard: 95,
  extended: 170,
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'writing',
    tab: 'Writing Support',
    title: 'Structured writing support for chapters, papers and proposals.',
    summary:
      'A specialist works from your outline, notes and sources to develop clear, well-argued sections — with commentary so you understand every structural decision.',
    startingFrom: { price: rateFor('writing-support'), unit: 'per 1,000 words' },
    included: [
      'Kick-off call or written scoping',
      'Chapter-level outline aligned to your brief',
      'Annotated drafts with rationale notes',
      'Two revision rounds within scope',
    ],
    turnaround: { label: '5–10 days', detail: 'for a typical 5,000-word chapter' },
    deliverables: ['Annotated draft (.docx)', 'Source map', 'Reviewer notes'],
    rates: [
      { name: 'Undergraduate', note: 'Coursework & capstones', price: rateFor('writing-support', levels.undergraduate), unit: '/ 1k words' },
      { name: "Master's", note: 'Dissertations & reports', price: rateFor('writing-support', levels.masters), unit: '/ 1k words' },
      { name: 'PhD', note: 'Thesis chapters & papers', price: rateFor('writing-support', levels.phd), unit: '/ 1k words' },
    ],
    cta: { label: 'Configure writing support', service: 'writing-support' },
  },
  {
    id: 'editing',
    tab: 'Editing',
    title: 'Research-led editing that respects your argument.',
    summary:
      'Editors with discipline experience improve clarity, flow and consistency while preserving your voice. Every change is tracked and explained.',
    startingFrom: { price: rateFor('editing'), unit: 'per 1,000 words' },
    included: [
      'Tracked changes and margin comments',
      'Terminology and consistency sheet',
      'Citation and reference-list check',
      'Summary letter of key issues',
    ],
    turnaround: { label: '2–5 days', detail: 'for up to 10,000 words' },
    deliverables: ['Tracked-changes manuscript', 'Clean copy', 'Editorial letter'],
    rates: [
      { name: 'Proofreading', note: 'Language and mechanics', price: rateFor('formatting', 1.4), unit: '/ 1k words' },
      { name: 'Copyediting', note: 'Clarity, flow, consistency', price: rateFor('editing'), unit: '/ 1k words' },
      { name: 'Developmental', note: 'Structure and argument', price: rateFor('editing', 1.6), unit: '/ 1k words' },
    ],
    cta: { label: 'Configure editing', service: 'editing' },
  },
  {
    id: 'research',
    tab: 'Research',
    title: 'Literature, frameworks and methodology — grounded in evidence.',
    summary:
      'We help you locate, evaluate and synthesise sources, shape research questions and justify methodological choices with a documented search strategy.',
    startingFrom: { price: rateFor('research-support'), unit: 'per 1,000 words' },
    included: [
      'Documented search strategy',
      'Annotated bibliography',
      'Synthesis matrix / evidence table',
      'Methodology rationale notes',
    ],
    turnaround: { label: '7–14 days', detail: 'depending on scope and databases' },
    deliverables: ['Evidence matrix (.xlsx)', 'Annotated bibliography', 'Synthesis memo'],
    rates: [
      { name: 'Literature review', note: 'Search and synthesis', price: rateFor('literature-review'), unit: '/ 1k words' },
      { name: 'Research support', note: 'Framing and sources', price: rateFor('research-support'), unit: '/ 1k words' },
      { name: 'Doctoral research', note: 'PhD-level scope', price: rateFor('research-support', levels.phd), unit: '/ 1k words' },
    ],
    cta: { label: 'Configure research support', service: 'research-support' },
  },
  {
    id: 'data',
    tab: 'Data Analysis',
    title: 'Quantitative and statistical analysis you can defend.',
    summary:
      'From data cleaning to model diagnostics, analysts prepare reproducible outputs and plain-language interpretation you can present to a committee.',
    startingFrom: { price: rateFor('data-analysis'), unit: 'per 1,000 words of reporting' },
    included: [
      'Data audit and cleaning log',
      'Descriptive and inferential analysis',
      'Assumption checks and diagnostics',
      'Publication-ready tables and figures',
    ],
    turnaround: { label: '5–12 days', detail: 'after data is received' },
    deliverables: ['Analysis report', 'Reproducible script (R / Python / SPSS)', 'Tables & figures'],
    rates: [
      { name: 'Data analysis', note: 'Cleaning to reporting', price: rateFor('data-analysis'), unit: '/ 1k words' },
      { name: 'Statistical analysis', note: 'Modelling and tests', price: rateFor('statistical-analysis'), unit: '/ 1k words' },
      { name: 'Doctoral analysis', note: 'Advanced models', price: rateFor('statistical-analysis', levels.phd), unit: '/ 1k words' },
    ],
    cta: { label: 'Configure data analysis', service: 'data-analysis' },
  },
  {
    id: 'consultation',
    tab: 'Consultation',
    title: 'Talk it through with a research specialist.',
    summary:
      'Focused advisory sessions for research design, methodology choices, supervisor feedback or analysis plans — with written follow-up notes.',
    startingFrom: { price: consultationRates.standard, unit: 'per 60-minute session' },
    included: [
      'Pre-session review of your materials',
      'Video session with a matched specialist',
      'Written summary and next steps',
      'Follow-up questions by email for 7 days',
    ],
    turnaround: { label: '48 hours', detail: 'typical time to first session' },
    deliverables: ['Session notes', 'Action plan', 'Recommended readings'],
    rates: [
      { name: 'Discovery call', note: '20 minutes, scoping only', price: consultationRates.discovery, unit: '' },
      { name: 'Standard session', note: '60 minutes', price: consultationRates.standard, unit: '/ session' },
      { name: 'Extended session', note: '120 minutes', price: consultationRates.extended, unit: '/ session' },
    ],
    cta: { label: 'Book a consultation', service: 'consultation' },
  },
]

/** "Starting from" price for a service, derived from the estimator config (never hard-coded). */
export function startingPriceFor(service: keyof EstimatorConfig['serviceMultiplier']) {
  if (service === 'consultation') return { price: consultationRates.standard, unit: 'per session' }
  return { price: rateFor(service), unit: 'per 1,000 words' }
}
