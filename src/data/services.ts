import type { ProjectType, ServiceType } from './projectOptions.ts'

export interface ServiceStep {
  title: string
  body: string
}

export interface ServiceItem {
  /** URL slug: /services/:id */
  id: string
  number: string
  /** Typographic mark rendered in the editorial serif. */
  mark: string
  title: string
  description: string
  /** Longer introduction for the detail page. */
  overview: string
  included: string[]
  idealFor: string[]
  approach: ServiceStep[]
  deliverables: string[]
  forWhom: string
  turnaround: string
  /** FAQ ids (src/data/faq.ts) shown on the detail page. */
  faqIds: string[]
  preset: { service: ServiceType; projectType?: ProjectType }
}

export const serviceItems: ServiceItem[] = [
  {
    id: 'dissertation',
    number: '01',
    mark: '§',
    title: 'Dissertation Support',
    description: 'Chapter-by-chapter guidance from proposal to final submission, aligned with your supervisor’s feedback.',
    overview:
      'A dissertation is a long argument sustained across many chapters. We work alongside you at the stage you are at — refining the structure, strengthening each chapter’s contribution to the whole, and responding to supervisor feedback — with notes that explain every recommendation so you stay in control of the work.',
    included: ['Chapter structuring', 'Argument development', 'Supervisor-feedback response'],
    idealFor: [
      "Master's and doctoral candidates at any chapter stage",
      'Researchers who have received major revisions from a supervisor',
      'Candidates restructuring a draft that has lost its thread',
    ],
    approach: [
      { title: 'Diagnostic read', body: 'A specialist reads your current draft, guidelines and feedback, and maps where the argument is strong and where it breaks down.' },
      { title: 'Chapter plan', body: 'We agree a chapter-by-chapter plan with milestones, so each stage has a clear goal and a date.' },
      { title: 'Annotated development', body: 'Each chapter is developed with margin rationale — why a section moved, what a paragraph now does, which source supports a claim.' },
      { title: 'Coherence review', body: 'An independent reviewer reads the chapters together to check that one argument carries from introduction to conclusion.' },
    ],
    deliverables: ['Annotated chapter drafts (.docx)', 'Chapter plan and milestone schedule', 'Coherence review notes', 'Source map'],
    forWhom: "Master's and doctoral candidates working on long-form research.",
    turnaround: 'Staged over weeks, by chapter',
    faqIds: ['existing-research', 'revisions', 'deadlines'],
    preset: { service: 'writing-support', projectType: 'dissertation' },
  },
  {
    id: 'thesis',
    number: '02',
    mark: '¶',
    title: 'Thesis Support',
    description: 'Coherent, defensible theses — from framing a contribution to tightening the discussion chapter.',
    overview:
      'Examiners read a thesis for its contribution: what is new, why it matters, and whether the evidence supports it. We help you articulate that contribution clearly and make sure every chapter serves it — from the literature positioning to the discussion and limitations.',
    included: ['Contribution framing', 'Chapter coherence review', 'Viva preparation notes'],
    idealFor: ['Honours, MPhil and PhD candidates', 'Candidates preparing for submission or viva', 'Theses built from published papers'],
    approach: [
      { title: 'Contribution statement', body: 'We work with you to state your contribution in two or three sentences — the reference point for every chapter.' },
      { title: 'Chapter alignment', body: 'Each chapter is checked against the contribution: what it establishes, what it hands to the next chapter.' },
      { title: 'Discussion strengthening', body: 'We focus on interpretation, implications and limitations — the chapters examiners weigh most heavily.' },
      { title: 'Viva preparation', body: 'Likely examiner questions and weak points are summarised so you can prepare confident answers.' },
    ],
    deliverables: ['Contribution statement', 'Chapter alignment notes', 'Annotated discussion chapter', 'Viva question bank'],
    forWhom: 'Honours, MPhil and PhD researchers.',
    turnaround: 'Staged, with milestone reviews',
    faqIds: ['existing-research', 'consultant', 'revisions'],
    preset: { service: 'writing-support', projectType: 'thesis' },
  },
  {
    id: 'proposal',
    number: '03',
    mark: '?',
    title: 'Research Proposal',
    description: 'Sharpen research questions, justify methods and build a realistic plan reviewers can approve.',
    overview:
      'A strong proposal convinces reviewers that the question matters, the method fits and the plan is feasible. We help you narrow the question, justify each methodological choice with sources, and set out a timeline and ethics plan that stand up to scrutiny.',
    included: ['Research question refinement', 'Methodology rationale', 'Timeline & feasibility'],
    idealFor: ['Doctoral and master’s applicants', 'Candidates at confirmation or upgrade stage', 'Grant and fellowship applicants'],
    approach: [
      { title: 'Question refinement', body: 'We bound population, context and phenomenon until the question is focused and answerable.' },
      { title: 'Literature positioning', body: 'A short, targeted review shows the gap your study addresses.' },
      { title: 'Method justification', body: 'Each design decision is linked to the question and to methodological literature, with alternatives considered.' },
      { title: 'Feasibility plan', body: 'Timeline, resources, risks and ethics are set out clearly for reviewers.' },
    ],
    deliverables: ['Annotated proposal draft', 'Research question worksheet', 'Methodology rationale notes', 'Gantt-style timeline'],
    forWhom: 'Applicants, candidates at confirmation stage, grant writers.',
    turnaround: '5–10 days',
    faqIds: ['process', 'qualitative', 'quantitative'],
    preset: { service: 'research-support', projectType: 'research-proposal' },
  },
  {
    id: 'literature-review',
    number: '04',
    mark: '⁂',
    title: 'Literature Review',
    description: 'A documented search strategy and a synthesis that shows the gap your research fills.',
    overview:
      'A literature review is an argument about the state of knowledge, not a list of summaries. We design and document a search strategy, appraise sources, and organise them into themes that lead logically to your research question.',
    included: ['Search strategy log', 'Evidence matrix', 'Thematic synthesis'],
    idealFor: ['Narrative, scoping and systematic reviews', 'Dissertation literature chapters', 'Standalone review articles'],
    approach: [
      { title: 'Search strategy', body: 'Databases, search strings and inclusion criteria are agreed and documented for reproducibility.' },
      { title: 'Screening & appraisal', body: 'Sources are screened and appraised, with reasons for exclusion recorded.' },
      { title: 'Evidence matrix', body: 'Findings, methods and limitations are organised in a matrix you can reuse and extend.' },
      { title: 'Thematic synthesis', body: 'Themes are developed into a narrative that identifies agreements, tensions and the gap.' },
    ],
    deliverables: ['Search strategy log', 'Evidence matrix (.xlsx)', 'Annotated bibliography', 'Synthesis draft with commentary'],
    forWhom: 'Anyone building a scoping, narrative or systematic review.',
    turnaround: '7–14 days',
    faqIds: ['citation-styles', 'existing-research', 'deadlines'],
    preset: { service: 'literature-review', projectType: 'literature-review' },
  },
  {
    id: 'data-analysis',
    number: '05',
    mark: '∑',
    title: 'Data Analysis',
    description: 'Clean, analyse and report quantitative data with reproducible scripts and clear interpretation.',
    overview:
      'From raw data to results you can present and defend. Analysts audit and clean your dataset, run the agreed analyses with full diagnostics, and deliver reproducible scripts alongside plain-language interpretation.',
    included: ['Data cleaning log', 'Analysis & diagnostics', 'Tables and figures'],
    idealFor: ['Survey and questionnaire studies', 'Experimental and quasi-experimental designs', 'Secondary and administrative datasets'],
    approach: [
      { title: 'Data audit', body: 'We check structure, missingness, coding and outliers, and agree a cleaning plan with you.' },
      { title: 'Analysis plan', body: 'Tests and models are matched to your questions and variables before anything is run.' },
      { title: 'Analysis & diagnostics', body: 'Models are run with assumption checks, robustness tests and effect sizes.' },
      { title: 'Reporting', body: 'Results are written up with publication-ready tables and figures and an interpretation guide.' },
    ],
    deliverables: ['Cleaning log', 'Reproducible script (R / Python / SPSS / Stata)', 'Results tables & figures', 'Interpretation notes'],
    forWhom: 'Survey, experimental and secondary-data projects.',
    turnaround: '5–12 days after data receipt',
    faqIds: ['quantitative', 'software', 'confidentiality'],
    preset: { service: 'data-analysis', projectType: 'data-analysis' },
  },
  {
    id: 'editing',
    number: '06',
    mark: 'Aa',
    title: 'Academic Editing',
    description: 'Discipline-aware editing for clarity, flow and consistency — every change tracked and explained.',
    overview:
      'Editors with experience in your field improve clarity, flow and consistency while keeping your voice. Every change is tracked, recurring issues are explained in an editorial letter, and terminology is kept consistent across the manuscript.',
    included: ['Tracked changes', 'Consistency sheet', 'Editorial letter'],
    idealFor: ['Theses and dissertations near submission', 'Journal manuscripts and revisions', 'Writers working in an additional language'],
    approach: [
      { title: 'Level agreed', body: 'Proofreading, copyediting or developmental editing — agreed up front so expectations are clear.' },
      { title: 'Style sheet', body: 'We record terminology, spelling conventions and abbreviations to keep the manuscript consistent.' },
      { title: 'Tracked edit', body: 'Changes are tracked with margin comments explaining substantive suggestions.' },
      { title: 'Editorial letter', body: 'A summary of patterns and priorities helps you improve future writing too.' },
    ],
    deliverables: ['Tracked-changes manuscript', 'Clean copy', 'Style & consistency sheet', 'Editorial letter'],
    forWhom: 'Manuscripts, theses and articles near submission.',
    turnaround: '2–5 days',
    faqIds: ['citation-styles', 'revisions', 'confidentiality'],
    preset: { service: 'editing', projectType: 'academic-editing' },
  },
  {
    id: 'statistics',
    number: '07',
    mark: 'σ',
    title: 'Statistical Analysis',
    description: 'Choose the right tests and models, check assumptions, and interpret results with confidence.',
    overview:
      'Statistical choices should follow from your design, not from whichever test produced a significant result. We help you select, run and interpret appropriate methods — and explain them well enough that you can defend them to a committee or reviewer.',
    included: ['Test selection', 'Model specification', 'Results interpretation'],
    idealFor: ['Quantitative theses and dissertations', 'Clinical, health and social-science studies', 'Responding to reviewer statistics comments'],
    approach: [
      { title: 'Design review', body: 'We confirm variables, measurement levels and design to narrow the appropriate methods.' },
      { title: 'Model specification', body: 'Models, covariates and interactions are specified and justified before analysis.' },
      { title: 'Assumptions & robustness', body: 'Assumptions are checked and alternatives prepared where they are violated.' },
      { title: 'Interpretation', body: 'Effect sizes, intervals and practical significance are explained in plain language.' },
    ],
    deliverables: ['Statistical analysis plan', 'Annotated output', 'Results write-up', 'Reviewer-response notes (if needed)'],
    forWhom: 'Quantitative theses, clinical and social-science studies.',
    turnaround: '5–10 days',
    faqIds: ['quantitative', 'software', 'consultant'],
    preset: { service: 'statistical-analysis', projectType: 'data-analysis' },
  },
  {
    id: 'consultation',
    number: '08',
    mark: '&',
    title: 'Research Consultation',
    description: 'One-to-one sessions with a specialist to unblock design, methodology or analysis decisions.',
    overview:
      'Sometimes you need an expert conversation rather than a deliverable. Consultations give you focused time with a specialist in your area to talk through design, methodology, analysis or supervisor feedback — followed by written notes and next steps.',
    included: ['Pre-session review', 'Live session', 'Written action plan'],
    idealFor: ['Researchers stuck on a design or analysis decision', 'Preparing for a supervision or committee meeting', 'Early-stage scoping before commissioning larger work'],
    approach: [
      { title: 'Book & brief', body: 'Share your question and materials; we match a specialist in your field.' },
      { title: 'Pre-session review', body: 'Your specialist reviews your materials so the session starts at depth.' },
      { title: 'Live session', body: 'A focused video session on your specific questions.' },
      { title: 'Written follow-up', body: 'A summary, action plan and recommended readings arrive within 24 hours.' },
    ],
    deliverables: ['Session notes', 'Action plan', 'Recommended readings', '7 days of follow-up questions by email'],
    forWhom: 'Researchers who need a second expert opinion.',
    turnaround: 'First session within ~48 hours',
    faqIds: ['consultant', 'process', 'confidentiality'],
    preset: { service: 'consultation', projectType: 'research-consultation' },
  },
]

export const findService = (id: string) => serviceItems.find((s) => s.id === id)
