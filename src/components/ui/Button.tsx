import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router'
import { cx } from '../../utils/cx'
import { Icon, type IconName } from './Icon'
import './Button.css'

type Variant = 'primary' | 'success' | 'secondary' | 'ghost' | 'inverse' | 'link'
type Size = 'sm' | 'md' | 'lg'

interface BaseProps {
  variant?: Variant
  size?: Size
  icon?: IconName
  /** Trailing arrow that nudges on hover. */
  arrow?: boolean
  block?: boolean
  children: ReactNode
  className?: string
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined; to?: undefined }
type AnchorProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; to?: undefined }
/** Internal route link (client-side navigation). */
type RouteProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { to: string; href?: undefined }

export function Button(props: ButtonProps | AnchorProps | RouteProps) {
  const { variant = 'primary', size = 'md', icon, arrow, block, children, className, ...rest } = props
  const classes = cx('btn', `btn--${variant}`, `btn--${size}`, block && 'btn--block', className)
  const content = (
    <>
      {icon && <Icon name={icon} size={size === 'sm' ? 16 : 18} className="btn__icon" />}
      <span className="btn__label">{children}</span>
      {arrow && <Icon name="arrowRight" size={size === 'sm' ? 16 : 18} className="btn__arrow" />}
    </>
  )

  if (typeof rest.to === 'string') {
    const { to, ...linkRest } = rest as RouteProps
    return (
      <Link to={to} className={classes} {...(linkRest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </Link>
    )
  }

  if (typeof rest.href === 'string') {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    )
  }

  const { type = 'button', ...buttonRest } = rest as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button type={type} className={classes} {...buttonRest}>
      {content}
    </button>
  )
}
