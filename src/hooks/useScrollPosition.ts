import { useEffect, useState } from 'react'

/**
 * Returns whether the page is scrolled past `threshold`.
 * Only re-renders when the boolean flips, not on every scroll frame.
 */
export function useScrolledPast(threshold = 8): boolean {
  const [past, setPast] = useState(false)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      setPast(window.scrollY > threshold)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [threshold])

  return past
}
