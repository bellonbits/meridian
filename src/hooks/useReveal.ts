import { useEffect, useRef } from 'react'

let observer: IntersectionObserver | null = null

/** One shared observer for every revealed element on the page. */
function getObserver() {
  if (observer) return observer
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer?.unobserve(entry.target)
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  )
  return observer
}

/** Adds `.is-visible` to the element (and `.reveal` descendants) once it scrolls into view. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (!('IntersectionObserver' in window)) {
      node.classList.add('is-visible')
      return
    }
    const io = getObserver()
    io.observe(node)
    return () => io.unobserve(node)
  }, [])

  return ref
}
