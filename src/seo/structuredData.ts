/**
 * Site-wide JSON-LD (Organization + Service catalogue), generated from the same data files the
 * UI renders and injected into index.html at build time. FAQPage data is emitted by /faq only.
 * Deliberately excludes AggregateRating/Review: trust figures are placeholders.
 */
import { serviceItems } from '../data/services.ts'
import { site } from '../data/site.ts'

export function buildStructuredData() {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    logo: `${site.url}/favicon.svg`,
    slogan: site.tagline,
    description: site.description,
    email: site.contact.email,
  }

  const services = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${site.url}/#service`,
    name: site.name,
    url: site.url,
    description: site.description,
    provider: { '@id': `${site.url}/#organization` },
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Research support services',
      itemListElement: serviceItems.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.title, description: s.description },
      })),
    },
  }

  return [organization, services]
}
