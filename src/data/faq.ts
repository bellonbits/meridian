export type FaqCategory = 'Working with us' | 'Research & analysis' | 'Pricing & deadlines' | 'Policies'

export interface FaqItem {
  id: string
  category: FaqCategory
  question: string
  answer: string
}

export const faqCategories: FaqCategory[] = ['Working with us', 'Research & analysis', 'Pricing & deadlines', 'Policies']

export const faqs: FaqItem[] = [
  {
    id: 'process',
    category: 'Working with us',
    question: 'How does the process work?',
    answer:
      'Share your brief through the project builder, then a specialist in your discipline reviews your materials and proposes a written scope, milestones and a confirmed quote. Work begins only after you approve. You receive milestone updates, an independent expert review, revisions within scope, and a final handover summary.',
  },
  {
    id: 'existing-research',
    category: 'Working with us',
    question: 'Can you work with my existing research?',
    answer:
      'Yes — most projects start from existing drafts, data or supervisor feedback. We build on your work rather than replacing it, and every change is tracked and explained so the reasoning stays yours.',
  },
  {
    id: 'consultant',
    category: 'Working with us',
    question: 'Can I speak with a research consultant?',
    answer:
      'Yes. A free 20-minute discovery call helps define scope, and standard consultation sessions are available for design, methodology or analysis questions. Use “Talk to a Research Specialist” to get started.',
  },
  {
    id: 'specialists',
    category: 'Working with us',
    question: 'Who will work on my project?',
    answer:
      'A specialist with postgraduate training in your discipline, matched by the studio rather than chosen from a marketplace. A second, independent specialist reviews the work before delivery.',
  },
  {
    id: 'quantitative',
    category: 'Research & analysis',
    question: 'Do you support quantitative analysis?',
    answer:
      'Yes. Analysts support descriptive statistics, hypothesis testing, regression, ANOVA, factor analysis, survey analysis and more. You receive reproducible scripts, diagnostics and plain-language interpretation.',
  },
  {
    id: 'qualitative',
    category: 'Research & analysis',
    question: 'Do you support qualitative research?',
    answer:
      'Yes. We support interview and focus-group design, coding frameworks, thematic and content analysis, and NVivo or ATLAS.ti workflows, with attention to reflexivity and trustworthiness criteria.',
  },
  {
    id: 'software',
    category: 'Research & analysis',
    question: 'Which software do you work in?',
    answer:
      'R, Python, SPSS, Stata and Excel for quantitative work; NVivo and ATLAS.ti for qualitative work; and Zotero, Mendeley or EndNote for reference management. Tell us what your institution uses and we will match it.',
  },
  {
    id: 'citation-styles',
    category: 'Research & analysis',
    question: 'What citation styles do you support?',
    answer:
      'APA 7, MLA, Chicago (author-date and notes), Harvard, IEEE, Vancouver, OSCOLA and institution-specific variants. Share your style guide and we will follow it, including reference-manager libraries.',
  },
  {
    id: 'estimate',
    category: 'Pricing & deadlines',
    question: 'Is the online estimate the final price?',
    answer:
      'No — it is an indicative estimate based on length, level, service, discipline and deadline. Your confirmed quote follows a free scoping review of your materials, and nothing is charged until you approve it.',
  },
  {
    id: 'deadlines',
    category: 'Pricing & deadlines',
    question: 'How are deadlines determined?',
    answer:
      'Deadlines are set from your submission date, the scope of work and specialist availability. The builder shows how urgency affects an estimate; the final timeline is confirmed in your written scope before work starts.',
  },
  {
    id: 'discounts',
    category: 'Pricing & deadlines',
    question: 'Do you offer any discounts?',
    answer:
      'First projects receive 15% off the confirmed quote. Planning ahead also helps: longer deadlines carry no urgency adjustment.',
  },
  {
    id: 'revisions',
    category: 'Policies',
    question: 'Can I request revisions?',
    answer:
      'Yes. Revisions against the agreed scope are included. Requests that change the original brief — for example a new research question — are scoped and quoted separately before any work begins.',
  },
  {
    id: 'confidentiality',
    category: 'Policies',
    question: 'How is confidentiality handled?',
    answer:
      'Your materials are shared only with the specialists assigned to your project, who work under confidentiality agreements. We never publish, resell or reuse client work, and you can request deletion of your files after delivery.',
  },
  {
    id: 'integrity',
    category: 'Policies',
    question: 'How do you handle academic integrity?',
    answer:
      'We provide guidance, editing, analysis and coaching that help you improve your own work. We decline requests intended to be submitted as someone else’s work, and we ask every client to confirm they will follow their institution’s policies.',
  },
]

export const faqsById = (ids: string[]) =>
  ids.map((id) => faqs.find((f) => f.id === id)).filter((f): f is FaqItem => Boolean(f))
