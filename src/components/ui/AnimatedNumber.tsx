import { useEffect, useRef, useState } from 'react'

interface AnimatedNumberProps {
  value: number
  format: (value: number) => string
  duration?: number
}

/** Tweens between values with rAF; jumps instantly under reduced motion. */
export function AnimatedNumber({ value, format, duration = 450 }: AnimatedNumberProps) {
  const [display, setDisplay] = useState(value)
  const fromRef = useRef(value)

  useEffect(() => {
    const from = fromRef.current
    if (from === value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      fromRef.current = value
      setDisplay(value)
      return
    }
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      const current = from + (value - from) * eased
      fromRef.current = current
      setDisplay(current)
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value, duration])

  return <>{format(display)}</>
}
