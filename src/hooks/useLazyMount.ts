import { useState } from 'react'

/** True once `open` has ever been true — lets heavy modals mount on first use and stay mounted. */
export function useLazyMount(open: boolean): boolean {
  const [mounted, setMounted] = useState(open)
  if (open && !mounted) setMounted(true)
  return mounted
}
