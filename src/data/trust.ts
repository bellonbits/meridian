/**
 * Social-proof content.
 *
 * IMPORTANT: The values below are ILLUSTRATIVE PLACEHOLDERS. Replace them with verified
 * figures and consented client testimonials, then set `isIllustrative` to false — the UI
 * shows a disclosure note and "Sample" labels while it is true.
 * Never publish review structured data from these placeholders.
 */

export const trustContent = {
  isIllustrative: true,
  rating: { value: 4.9, outOf: 5, reviewCount: 1860 },
}

export interface Metric {
  id: string
  value: number
  suffix?: string
  label: string
  detail: string
}

export const metrics: Metric[] = [
  { id: 'projects', value: 12400, suffix: '+', label: 'Projects completed', detail: 'Since the studio opened' },
  { id: 'disciplines', value: 60, suffix: '+', label: 'Research disciplines', detail: 'From law to data science' },
  { id: 'countries', value: 48, label: 'Countries served', detail: 'Clients across six continents' },
  { id: 'reviewers', value: 320, label: 'Expert reviewers', detail: "Master's & doctoral specialists" },
]

export interface Testimonial {
  id: string
  /**
   * Display name. Sample entries use fictional first-name-plus-initial placeholders and must keep
   * status 'sample' (which shows the "Sample" label) until replaced with real, consented testimonials.
   */
  name: string
  academicLevel: string
  discipline: string
  quote: string
  rating: number
  /** 'sample' = placeholder copy; 'verified' = consented, real client feedback. */
  status: 'sample' | 'verified'
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Amara N.',
    academicLevel: 'PhD candidate',
    discipline: 'Public Health',
    quote:
      'The methodology notes explained why each change mattered. My supervisor’s second round of comments was half the length of the first.',
    rating: 5,
    status: 'sample',
  },
  {
    id: 't2',
    name: 'Daniel K.',
    academicLevel: "Master's student",
    discipline: 'Economics',
    quote:
      'I finally understood my regression output. The analyst walked me through every assumption check before I wrote a single sentence.',
    rating: 5,
    status: 'sample',
  },
  {
    id: 't3',
    name: 'Priya S.',
    academicLevel: 'Research lead',
    discipline: 'Education',
    quote:
      'Editing was careful and respected our voice. The consistency sheet alone saved our team days before journal submission.',
    rating: 5,
    status: 'sample',
  },
  {
    id: 't4',
    name: 'Tomás R.',
    academicLevel: 'Undergraduate',
    discipline: 'Business',
    quote:
      'The literature matrix showed me where my argument was thin. I rewrote my review with far more confidence.',
    rating: 4,
    status: 'sample',
  },
]
