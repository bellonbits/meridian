export interface ProcessStepData {
  id: string
  number: string
  title: string
  summary: string
  detail: string
  youReceive: string[]
  yourRole: string
  duration: string
}

export const processSteps: ProcessStepData[] = [
  {
    id: 'brief',
    number: '01',
    title: 'Share Your Brief',
    summary: 'Tell us your topic, stage, guidelines and deadline.',
    detail:
      'Use the project builder or talk to a specialist. Upload marking criteria, supervisor comments and any draft work so we can understand exactly where you are.',
    youReceive: ['Indicative estimate', 'Confirmation of scope questions'],
    yourRole: 'Share guidelines, drafts and constraints.',
    duration: 'Same day',
  },
  {
    id: 'scope',
    number: '02',
    title: 'Scope & Methodology',
    summary: 'We match a specialist and agree the plan.',
    detail:
      'A specialist in your discipline reviews your materials and proposes a scope, methodology notes and milestones. Nothing starts until you confirm.',
    youReceive: ['Matched specialist', 'Written scope & milestones', 'Confirmed quote'],
    yourRole: 'Review and approve the plan.',
    duration: '24–48 hours',
  },
  {
    id: 'research',
    number: '03',
    title: 'Research & Development',
    summary: 'Evidence gathering, analysis and structured drafting.',
    detail:
      'Your specialist works through the agreed milestones — sourcing literature, running analysis or editing — with progress visible at each checkpoint.',
    youReceive: ['Milestone updates', 'Working notes and source logs'],
    yourRole: 'Answer questions and give feedback at checkpoints.',
    duration: 'Per agreed timeline',
  },
  {
    id: 'review',
    number: '04',
    title: 'Expert Review',
    summary: 'A second specialist checks quality and rigour.',
    detail:
      'An independent reviewer checks argument, methodology, citations and consistency. Similarity checks are used as a quality-control signal and reviewed by a person.',
    youReceive: ['Reviewer notes', 'Quality checklist'],
    yourRole: 'None — this happens before delivery.',
    duration: '1–2 days',
  },
  {
    id: 'revisions',
    number: '05',
    title: 'Revisions',
    summary: 'Refine together until it meets the brief.',
    detail:
      'Request revisions against the agreed scope. Each change is tracked and explained so you understand the reasoning behind every improvement.',
    youReceive: ['Tracked revisions', 'Rationale notes'],
    yourRole: 'Request changes against the original brief.',
    duration: 'Included within scope',
  },
  {
    id: 'delivery',
    number: '06',
    title: 'Final Delivery',
    summary: 'Clean files, notes and a handover summary.',
    detail:
      'Receive final files, source logs and a handover note summarising decisions — so you can confidently own, present and defend your work.',
    youReceive: ['Final files', 'Handover summary', 'Reference library export'],
    yourRole: 'Review, ask final questions, and take it forward.',
    duration: 'On your deadline',
  },
]

/** What clients should gather before the scoping review. */
export const prepareChecklist = [
  'Assignment brief, marking criteria or journal guidelines',
  'Your current draft, outline or notes — at any stage',
  'Supervisor, reviewer or examiner feedback',
  'Datasets, codebooks or transcripts (for analysis work)',
  'Your institution’s citation style and formatting rules',
  'Hard deadlines, including any internal submission dates',
]

/** Illustrative planning guide; the confirmed timeline is set in each written scope. */
export const typicalTimelines = [
  { scope: 'Editing — up to 10,000 words', timeline: '2–5 days', milestones: 'Single delivery with editorial letter' },
  { scope: 'Research proposal', timeline: '5–10 days', milestones: 'Outline → draft → review' },
  { scope: 'Literature review chapter', timeline: '7–14 days', milestones: 'Search log → matrix → synthesis' },
  { scope: 'Data analysis (clean dataset)', timeline: '5–12 days', milestones: 'Plan → analysis → report' },
  { scope: 'Full dissertation support', timeline: '4–12 weeks', milestones: 'Chapter-by-chapter milestones' },
]
