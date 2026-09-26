import type { AnchorHTMLAttributes } from 'react'
import { Link } from 'react-router'

/** Router link for internal paths ("/…"), plain anchor for everything else (mailto:, external, #hash). */
export function SmartLink({ href, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  if (href.startsWith('/')) return <Link to={href} {...rest} />
  return <a href={href} {...rest} />
}
