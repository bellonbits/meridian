import type { AnchorHTMLAttributes } from 'react'
import { scrollToHash } from '../../utils/scroll'

/** Same-page anchor that scrolls smoothly (respecting reduced motion) and moves focus to the target. */
export function AnchorLink({ href, onClick, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: `#${string}` }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        onClick?.(e)
        if (e.defaultPrevented || e.metaKey || e.ctrlKey) return
        e.preventDefault()
        scrollToHash(href)
      }}
      {...rest}
    />
  )
}
