import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { useReveal } from '../../hooks/useReveal'
import { cx } from '../../utils/cx'
import { Icon } from './Icon'
import './primitives.css'

/* ---------- Container ---------- */

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'wide' | 'narrow'
}

export function Container({ size = 'default', className, ...rest }: ContainerProps) {
  return <div className={cx('container', size !== 'default' && `container--${size}`, className)} {...rest} />
}

/* ---------- Badge ---------- */

interface BadgeProps {
  tone?: 'neutral' | 'blue' | 'green' | 'outline' | 'dark'
  children: ReactNode
  className?: string
}

export function Badge({ tone = 'neutral', children, className }: BadgeProps) {
  return <span className={cx('badge', `badge--${tone}`, className)}>{children}</span>
}

/* ---------- SectionHeading ---------- */

interface SectionHeadingProps {
  id?: string
  eyebrow: string
  title: ReactNode
  lede?: ReactNode
  align?: 'start' | 'center'
  as?: 'h2' | 'h3'
  tone?: 'light' | 'dark'
  className?: string
  children?: ReactNode
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  lede,
  align = 'start',
  as: Heading = 'h2',
  tone = 'light',
  className,
  children,
}: SectionHeadingProps) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <div ref={ref} className={cx('section-heading reveal', `section-heading--${align}`, `section-heading--${tone}`, className)}>
      <p className="eyebrow">{eyebrow}</p>
      <Heading id={id} className="section-heading__title">
        {title}
      </Heading>
      {lede && <p className="section-heading__lede">{lede}</p>}
      {children}
    </div>
  )
}

/* ---------- Reveal ---------- */

interface RevealProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  delay?: number
}

export function Reveal({ as: Tag = 'div', delay = 0, className, style, ...rest }: RevealProps) {
  const ref = useReveal<HTMLElement>()
  return (
    <Tag
      ref={ref}
      className={cx('reveal', className)}
      style={delay ? { ...style, '--reveal-delay': `${delay}ms` } : style}
      {...rest}
    />
  )
}

/* ---------- Stars ---------- */

export function Stars({ value, outOf = 5, size = 16 }: { value: number; outOf?: number; size?: number }) {
  return (
    <span className="stars" role="img" aria-label={`Rated ${value} out of ${outOf}`}>
      {Array.from({ length: outOf }, (_, i) => (
        <Icon key={i} name="star" size={size} className={i < Math.round(value) ? 'stars__on' : 'stars__off'} />
      ))}
    </span>
  )
}
