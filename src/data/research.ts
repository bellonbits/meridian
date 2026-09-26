/** Research capabilities, the workspace protocol, and data-analysis content. */

export type WorkspaceKey =
  | 'question'
  | 'variables'
  | 'methodology'
  | 'sample'
  | 'analysis'
  | 'findings'
  | 'references'

export interface Capability {
  id: string
  title: string
  description: string
  relates: WorkspaceKey[]
}

export const capabilities: Capability[] = [
  { id: 'design', title: 'Research Design', description: 'Aligning questions, paradigm and methods into a coherent design.', relates: ['question', 'methodology'] },
  { id: 'literature', title: 'Literature Review', description: 'Systematic search, appraisal and thematic synthesis.', relates: ['references', 'question'] },
  { id: 'qualitative', title: 'Qualitative Research', description: 'Interview guides, coding frameworks, thematic analysis.', relates: ['methodology', 'findings'] },
  { id: 'quantitative', title: 'Quantitative Research', description: 'Instruments, sampling frames and measurement validity.', relates: ['variables', 'sample'] },
  { id: 'statistics', title: 'Statistical Analysis', description: 'Model selection, diagnostics and effect interpretation.', relates: ['analysis', 'findings'] },
  { id: 'visualisation', title: 'Data Visualization', description: 'Publication-ready tables and figures that read clearly.', relates: ['findings'] },
  { id: 'editing', title: 'Academic Editing', description: 'Clarity, flow and discipline-appropriate voice.', relates: ['findings', 'references'] },
  { id: 'citations', title: 'Citation Management', description: 'Reference libraries, style compliance, source integrity.', relates: ['references'] },
  { id: 'methodology', title: 'Methodology Review', description: 'Independent critique of validity, reliability and ethics.', relates: ['methodology', 'sample'] },
  { id: 'structure', title: 'Dissertation Structuring', description: 'Chapter architecture that carries a single argument.', relates: ['question', 'findings'] },
]

export interface WorkspaceRow {
  key: WorkspaceKey
  label: string
  value: string
  chips?: string[]
  meta?: string
}

export const workspaceProject = {
  title: 'Hybrid work and early-career wellbeing',
  code: 'MRS-2026-0417',
  stage: 'Analysis',
}

export const workspaceRows: WorkspaceRow[] = [
  {
    key: 'question',
    label: 'Research question',
    value: 'To what extent does hybrid-work intensity predict wellbeing among early-career professionals, and is this moderated by manager support?',
    meta: 'RQ1 · approved',
  },
  { key: 'variables', label: 'Variables', value: 'IV: hybrid intensity · DV: WEMWBS score · Moderator: manager support', chips: ['Continuous', 'Likert 1–5', 'Controls ×6'] },
  { key: 'methodology', label: 'Methodology', value: 'Cross-sectional survey, explanatory sequential mixed methods', chips: ['Quant → Qual'] },
  { key: 'sample', label: 'Sample', value: 'n = 412 respondents; 18 follow-up interviews', chips: ['Stratified', 'Power ≥ .80'] },
  { key: 'analysis', label: 'Analysis', value: 'Hierarchical OLS regression with interaction term; reflexive thematic analysis', chips: ['R 4.4', 'NVivo'] },
  { key: 'findings', label: 'Findings', value: 'Moderate positive association; effect strengthened where manager support is high', meta: 'Draft · for review' },
  { key: 'references', label: 'References', value: '64 sources · 71% published within 5 years', chips: ['APA 7', 'Zotero library'] },
]

export const analysisTypes = [
  'Statistical analysis',
  'Regression',
  'Descriptive statistics',
  'Hypothesis testing',
  'Survey analysis',
  'Data cleaning',
  'Data visualization',
  'Quantitative research support',
]

/** Illustrative dashboard figures for the data-analysis preview. */
export const analysisDashboard = {
  dataset: 'workforce_wellbeing_2026.csv',
  observations: 12480,
  variables: 36,
  analysis: 'Regression',
  rSquared: 0.78,
  status: 'Analysis complete',
  coefficients: [
    { term: 'Hybrid intensity', beta: 0.42, se: 0.05, p: '< .001' },
    { term: 'Manager support', beta: 0.31, se: 0.04, p: '< .001' },
    { term: 'Interaction', beta: 0.18, se: 0.06, p: '.003' },
    { term: 'Tenure (yrs)', beta: -0.07, se: 0.03, p: '.021' },
  ],
}
