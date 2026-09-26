/**
 * Hero configuration. `image` is an optional art-directed photograph slot: drop licensed,
 * high-resolution files into /public/images and describe them here. When null, the hero
 * renders its composed manuscript scene instead of a stock photo.
 */
export interface HeroImage {
  src: string
  srcSet?: string
  sizes?: string
  alt: string
  width: number
  height: number
}

export const heroContent = {
  eyebrow: 'Academic research support',
  headline: ['Your Research.', 'Sharper Thinking.', 'Stronger Work.'] as const,
  lede: 'Professional research, academic editing, data analysis, and manuscript support designed around your topic, methodology, standards, and deadline.',
  trust: ['Confidential', 'Expert-reviewed', 'Deadline-focused', 'Research-led'],
  image: null as HeroImage | null,
}
