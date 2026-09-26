import { resources } from '../data/resources.ts'
import { samples } from '../data/samples.ts'
import { serviceItems } from '../data/services.ts'
import { routes, site } from '../data/site.ts'

/** Every public URL, derived from the route table and content data. */
export function sitemapPaths(): string[] {
  return [
    routes.home,
    routes.services,
    ...serviceItems.map((s) => routes.service(s.id)),
    routes.howItWorks,
    routes.researchSupport,
    routes.pricing,
    routes.resources,
    ...resources.map((r) => routes.resource(r.id)),
    routes.samples,
    ...samples.map((s) => routes.sample(s.id)),
    routes.about,
    routes.integrity,
    routes.faq,
    routes.start,
    routes.contact,
    routes.privacy,
    routes.terms,
  ]
}

export function buildSitemap(): string {
  const urls = sitemapPaths()
    .map((path) => `  <url><loc>${site.url}${path}</loc></url>`)
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}
