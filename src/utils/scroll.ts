/** Scrolls to an in-page anchor, respecting reduced motion, and moves focus for screen readers. */
export function scrollToHash(hash: string) {
  const id = hash.replace(/^#/, '')
  const target = document.getElementById(id)
  if (!target) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
  target.focus({ preventScroll: true })
  // Keep the router's history state intact.
  history.replaceState(history.state, '', `${location.pathname}${location.search}#${id}`)
}
