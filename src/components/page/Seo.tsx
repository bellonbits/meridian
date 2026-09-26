import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { site } from '../../data/site'

interface SeoProps {
  title: string
  description: string
  /** Exclude from search indexes (e.g. 404 pages). */
  noindex?: boolean
}

function setMeta(selector: string, attr: 'content' | 'href', value: string) {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute(attr, value)
}

/**
 * Updates the document title and the per-page meta tags that index.html declares
 * (description, canonical, Open Graph, Twitter). Site-wide tags stay static.
 */
export function Seo({ title, description, noindex = false }: SeoProps) {
  const { pathname } = useLocation()

  useEffect(() => {
    const fullTitle = pathname === '/' ? title : `${title} · ${site.name}`
    const url = `${site.url}${pathname === '/' ? '/' : pathname}`
    document.title = fullTitle
    setMeta('meta[name="description"]', 'content', description)
    setMeta('link[rel="canonical"]', 'href', url)
    setMeta('meta[property="og:title"]', 'content', fullTitle)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[property="og:url"]', 'content', url)
    setMeta('meta[name="twitter:title"]', 'content', fullTitle)
    setMeta('meta[name="twitter:description"]', 'content', description)
    setMeta('meta[name="robots"]', 'content', noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large')
  }, [title, description, pathname, noindex])

  return null
}
