/** Sample manuscript used in the document-preview component. */

export type ReviewStatus = 'reviewed' | 'in-review' | 'pending'

export interface ManuscriptComment {
  author: string
  role: string
  text: string
  kind: 'suggestion' | 'query' | 'praise'
}

export interface ManuscriptSection {
  id: string
  heading: string
  status: ReviewStatus
  /** Paragraph text. `[n]` renders as a citation marker; `==text==` renders highlighted. */
  paragraphs: string[]
  comment?: ManuscriptComment
}

export const manuscript = {
  file: 'Thesis_Chapter1-4_v7.docx',
  title: 'Hybrid Work Intensity and Wellbeing Among Early-Career Professionals: A Mixed-Methods Study',
  page: 4,
  pages: 38,
  reviewProgress: 72,
  sections: [
    {
      id: 'abstract',
      heading: 'Abstract',
      status: 'reviewed',
      paragraphs: [
        'This study examines whether hybrid-work intensity predicts wellbeing among early-career professionals and whether manager support moderates this relationship. Survey data (n = 412) were analysed using hierarchical regression, followed by 18 explanatory interviews.',
      ],
      comment: { author: 'Editor', role: 'Language review', text: 'Clear and within the 250-word limit. Consider naming the country context.', kind: 'praise' },
    },
    {
      id: 'introduction',
      heading: '1. Introduction',
      status: 'reviewed',
      paragraphs: [
        'Hybrid arrangements have shifted from emergency measure to durable organisational design [1]. Yet evidence on ==how early-career employees experience these arrangements remains fragmented== [2, 3].',
      ],
      comment: { author: 'Reviewer', role: 'Methodology', text: 'Strong framing. State the specific gap in one sentence before the aims.', kind: 'suggestion' },
    },
    {
      id: 'literature',
      heading: '2. Literature Review',
      status: 'in-review',
      paragraphs: [
        'Job demands–resources theory suggests autonomy can buffer strain [4], while boundary theory highlights the costs of blurred work–life transitions [5]. ==Few studies test both mechanisms simultaneously.==',
      ],
      comment: { author: 'Reviewer', role: 'Literature', text: 'Add 2–3 post-2022 studies here; the most recent source is 2021.', kind: 'query' },
    },
    {
      id: 'methodology',
      heading: '3. Methodology',
      status: 'in-review',
      paragraphs: [
        'An explanatory sequential design was adopted [6]. A stratified sample was drawn from three regional registers, with power analysis indicating a minimum of 380 respondents [7].',
      ],
      comment: { author: 'Reviewer', role: 'Methodology', text: 'Justify the stratification variables and report the response rate.', kind: 'query' },
    },
    {
      id: 'results',
      heading: '4. Results',
      status: 'pending',
      paragraphs: [
        'Hybrid intensity was positively associated with wellbeing (β = .42, p < .001), and the interaction with manager support was significant (β = .18, p = .003), explaining additional variance (ΔR² = .04).',
      ],
    },
  ] satisfies ManuscriptSection[],
}
