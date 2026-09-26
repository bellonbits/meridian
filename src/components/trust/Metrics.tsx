import { useEffect, useRef, useState } from 'react'
import type { Metric } from '../../data/trust'
import { formatNumber } from '../../utils/pricingCalculator'
import { Reveal } from '../ui/primitives'

/** Counts up once when scrolled into view (instant under reduced motion). */
function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [animate] = useState(
    () => 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [shown, setShown] = useState(animate ? 0 : value)

  useEffect(() => {
    const node = ref.current
    if (!node || !animate) return
    let frame = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1400)
          setShown(Math.round(value * (1 - Math.pow(1 - t, 4))))
          if (t < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    io.observe(node)
    return () => {
      io.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value, animate])

  return (
    <span ref={ref} className="tabular">
      {formatNumber(shown)}
    </span>
  )
}

export function Metrics({ items }: { items: Metric[] }) {
  return (
    <dl className="metrics">
      {items.map((metric, i) => (
        <Reveal key={metric.id} className="metrics__item" delay={i * 80}>
          <dt className="metrics__label">{metric.label}</dt>
          <dd className="metrics__value">
            <CountUp value={metric.value} />
            {metric.suffix}
          </dd>
          <dd className="metrics__detail">{metric.detail}</dd>
        </Reveal>
      ))}
    </dl>
  )
}
