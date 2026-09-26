import { Fragment, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { useLocation } from 'react-router'
import { useAppActions } from '../../context/AppActions'
import { faqCategories, faqs as allFaqs, type FaqItem } from '../../data/faq'
import { Button } from '../ui/Button'
import { Reveal, SectionHeading } from '../ui/primitives'
import { FAQItem } from './FAQItem'
import './FAQSection.css'

interface FAQSectionProps {
  items?: FaqItem[]
  /** Group questions under category headings (full FAQ page). */
  grouped?: boolean
  eyebrow?: string
  title?: ReactNode
  lede?: string
  /** Extra content under the contact card (e.g. a link to all questions). */
  asideExtra?: ReactNode
  tone?: 'paper' | 'plain'
}

export function FAQSection({
  items = allFaqs,
  grouped = false,
  eyebrow = 'FAQ',
  title = (
    <>
      Questions, <em>answered.</em>
    </>
  ),
  lede = 'How we work, what we support, and how your work and data are protected.',
  asideExtra,
  tone = 'paper',
}: FAQSectionProps) {
  const [open, setOpen] = useState<Set<string>>(() => new Set(items[0] ? [items[0].id] : []))
  const refs = useRef<Map<string, HTMLButtonElement | null>>(new Map())
  const { openContact } = useAppActions()
  const { hash } = useLocation()

  const toggle = (id: string) =>
    setOpen((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  // Open (and focus) a question addressed by #faq-<id> — from links, search or router navigation.
  useEffect(() => {
    const openId = (id: string) => {
      if (!items.some((f) => f.id === id)) return
      setOpen((current) => new Set(current).add(id))
      requestAnimationFrame(() => refs.current.get(id)?.focus())
    }
    if (hash.startsWith('#faq-')) openId(hash.slice(5))
    const onEvent = (e: Event) => openId((e as CustomEvent<string>).detail)
    window.addEventListener('meridian:open-faq', onEvent)
    return () => window.removeEventListener('meridian:open-faq', onEvent)
  }, [hash, items])

  const order = grouped
    ? faqCategories.flatMap((c) => items.filter((f) => f.category === c))
    : items

  // WAI-ARIA accordion keys: Up/Down/Home/End move between headers.
  const onKeyNav = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = order.length - 1
    const target =
      e.key === 'ArrowDown' ? Math.min(last, index + 1)
      : e.key === 'ArrowUp' ? Math.max(0, index - 1)
      : e.key === 'Home' ? 0
      : e.key === 'End' ? last
      : null
    if (target === null) return
    e.preventDefault()
    refs.current.get(order[target].id)?.focus()
  }

  return (
    <section id="faq" className={tone === 'paper' ? 'section section--paper-deep faq' : 'section faq'} aria-labelledby="faq-title">
      <div className="container container--wide faq__grid">
        <div className="faq__aside">
          <SectionHeading id="faq-title" eyebrow={eyebrow} title={title} lede={lede} />
          <Reveal className="faq__contact">
            <p className="faq__contact-title">Can’t find what you need?</p>
            <p>A research consultant can answer questions about your specific project.</p>
            <Button variant="primary" icon="chat" onClick={openContact}>
              Talk to a consultant
            </Button>
          </Reveal>
          {asideExtra}
        </div>

        <Reveal className="faq__list">
          {order.map((item, i) => (
            <Fragment key={item.id}>
              {grouped && (i === 0 || order[i - 1].category !== item.category) && (
                <h3 className="faq__group">{item.category}</h3>
              )}
              <FAQItem
                ref={(el) => {
                  refs.current.set(item.id, el)
                }}
                item={item}
                index={i}
                level={grouped ? 4 : 3}
                open={open.has(item.id)}
                onToggle={() => toggle(item.id)}
                onKeyNav={(e) => onKeyNav(e, i)}
              />
            </Fragment>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
