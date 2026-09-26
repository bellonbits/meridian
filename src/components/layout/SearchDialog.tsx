import { useDeferredValue, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAppActions } from '../../context/AppActions'
import { faqs } from '../../data/faq'
import { resources } from '../../data/resources'
import { serviceItems } from '../../data/services'
import { routes } from '../../data/site'
import { Icon } from '../ui/Icon'
import { Modal } from '../ui/Modal'
import './SearchDialog.css'

interface Entry {
  id: string
  group: 'Services' | 'Guides' | 'Questions'
  title: string
  text: string
  href: string
}

const index: Entry[] = [
  ...serviceItems.map((s) => ({ id: `s-${s.id}`, group: 'Services' as const, title: s.title, text: s.description, href: routes.service(s.id) })),
  ...resources.map((r) => ({ id: `r-${r.id}`, group: 'Guides' as const, title: r.title, text: r.description, href: routes.resource(r.id) })),
  ...faqs.map((f) => ({ id: `f-${f.id}`, group: 'Questions' as const, title: f.question, text: f.answer, href: `${routes.faq}#faq-${f.id}` })),
]

const suggestions = ['Dissertation', 'Regression', 'APA 7', 'Revisions', 'Confidentiality']

export function SearchDialog() {
  const { searchOpen, closeSearch } = useAppActions()
  const [query, setQuery] = useState('')
  const deferred = useDeferredValue(query)

  const results = useMemo(() => {
    const terms = deferred.toLowerCase().trim().split(/\s+/).filter(Boolean)
    if (!terms.length) return []
    return index
      .map((entry) => {
        const title = entry.title.toLowerCase()
        const text = entry.text.toLowerCase()
        let score = 0
        for (const term of terms) {
          if (title.includes(term)) score += 3
          else if (text.includes(term)) score += 1
          else return null
        }
        return { entry, score }
      })
      .filter((r): r is { entry: Entry; score: number } => r !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((r) => r.entry)
  }, [deferred])

  const navigate = useNavigate()

  const go = (href: string) => {
    closeSearch()
    setQuery('')
    navigate(href)
    // If already on the FAQ page, open the requested question in place.
    const [, hash] = href.split('#')
    if (hash?.startsWith('faq-')) window.dispatchEvent(new CustomEvent('meridian:open-faq', { detail: hash.slice(4) }))
  }

  return (
    <Modal open={searchOpen} onClose={closeSearch} title="Search Meridian" size="md" className="search-dialog">
      <div className="search">
        <div className="search__field">
          <Icon name="search" size={20} />
          <input
            type="search"
            data-autofocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Services, guides, questions…"
            aria-label="Search services, guides and questions"
            aria-controls="search-results"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && results[0]) go(results[0].href)
            }}
          />
          <kbd>Esc</kbd>
        </div>

        {query.trim() === '' ? (
          <div className="search__suggest">
            <p className="search__group">Popular</p>
            <div className="search__chips">
              {suggestions.map((s) => (
                <button key={s} type="button" className="search__chip" onClick={() => setQuery(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div id="search-results" aria-live="polite">
            {results.length === 0 ? (
              <p className="search__empty">
                No matches for “{query}”. Try a broader term, or talk to a specialist.
              </p>
            ) : (
              <ul className="search__results">
                {results.map((r) => (
                  <li key={r.id}>
                    <button type="button" className="search__result" onClick={() => go(r.href)}>
                      <span className="search__result-group">{r.group}</span>
                      <span className="search__result-title">{r.title}</span>
                      <span className="search__result-text">{r.text}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </Modal>
  )
}
