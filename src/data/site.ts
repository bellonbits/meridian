/**
 * Brand, navigation and contact configuration.
 * Kept free of `import.meta.env` so it can also be imported by vite.config.ts (SEO injection).
 */

export const site = {
  name: 'Meridian Research Studio',
  shortName: 'Meridian',
  tagline: 'Research support for serious work.',
  description:
    'Meridian Research Studio provides expert research support, research-led academic editing, methodology guidance and data analysis for students, doctoral candidates and research teams.',
  url: 'https://www.meridianresearchstudio.com',
  locale: 'en_US',
  contact: {
    // Replace with the studio's real, monitored contact details before launch.
    email: 'studio@meridianresearchstudio.com',
    hours: 'Mon–Sat · 08:00–20:00 GMT',
    responseTime: 'Usually within a few working hours',
  },
  /** Details used by the Privacy Policy and Terms. Complete before launch and have both reviewed. */
  legal: {
    entityName: 'Meridian Research Studio',
    /** Registered business address; omitted from the policies while empty. */
    registeredAddress: '',
    /** e.g. 'England and Wales'. While empty, the Terms refer to the place of registration. */
    governingLaw: '',
    privacyEmail: 'privacy@meridianresearchstudio.com',
    lastUpdated: '2026-09-26',
  },
  promo: {
    label: 'Limited offer',
    message: 'Get 15% OFF your first project',
    code: 'FIRST15',
  },
} as const

export interface NavItem {
  label: string
  href: string
}

/** Route paths — the single source for internal URLs (also used to build the sitemap). */
export const routes = {
  home: '/',
  services: '/services',
  service: (slug: string) => `/services/${slug}`,
  howItWorks: '/how-it-works',
  researchSupport: '/research-support',
  pricing: '/pricing',
  resources: '/resources',
  resource: (slug: string) => `/resources/${slug}`,
  about: '/about',
  integrity: '/academic-integrity',
  faq: '/faq',
  start: '/start',
  contact: '/contact',
  messages: '/messages',
  privacy: '/privacy',
  terms: '/terms',
} as const

export const primaryNav: NavItem[] = [
  { label: 'Services', href: routes.services },
  { label: 'How It Works', href: routes.howItWorks },
  { label: 'Research Support', href: routes.researchSupport },
  { label: 'Resources', href: routes.resources },
  { label: 'Pricing', href: routes.pricing },
  { label: 'About', href: routes.about },
]

export interface FooterColumn {
  title: string
  links: NavItem[]
}

export const footerColumns: FooterColumn[] = [
  {
    title: 'Services',
    links: [
      { label: 'Dissertation Support', href: routes.service('dissertation') },
      { label: 'Thesis Support', href: routes.service('thesis') },
      { label: 'Academic Editing', href: routes.service('editing') },
      { label: 'Data Analysis', href: routes.service('data-analysis') },
      { label: 'All services', href: routes.services },
    ],
  },
  {
    title: 'Research',
    links: [
      { label: 'Research Design', href: `${routes.researchSupport}#capabilities` },
      { label: 'Data Analysis', href: `${routes.researchSupport}#data-analysis` },
      { label: 'Manuscript Review', href: `${routes.researchSupport}#manuscript` },
      { label: 'Our Methodology', href: `${routes.howItWorks}#technology` },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Guides', href: routes.resources },
      { label: 'Pricing', href: routes.pricing },
      { label: 'How It Works', href: routes.howItWorks },
      { label: 'FAQ', href: routes.faq },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About the Studio', href: routes.about },
      { label: 'Academic Integrity', href: routes.integrity },
      { label: 'Our Specialists', href: `${routes.about}#specialists` },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Start a Project', href: routes.start },
      { label: 'Revisions', href: `${routes.faq}#faq-revisions` },
      { label: 'Confidentiality', href: `${routes.faq}#faq-confidentiality` },
      { label: 'Contact', href: routes.contact },
    ],
  },
]

export const legalLinks: NavItem[] = [
  { label: 'Privacy', href: routes.privacy },
  { label: 'Terms', href: routes.terms },
  { label: 'Academic Integrity', href: routes.integrity },
  { label: 'Contact', href: routes.contact },
]
