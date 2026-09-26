import type { ContactTopic } from '../../data/contact'

export const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('') || '?'

const sameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString()

/** "10:05" today, otherwise "02 Feb". */
export function shortTime(iso: string) {
  const d = new Date(iso)
  return sameDay(d, new Date())
    ? d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
    : d.toLocaleDateString(undefined, { day: '2-digit', month: 'short' })
}

export const clockTime = (iso: string) => new Date(iso).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })

export function dayLabel(iso: string) {
  const d = new Date(iso)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)
  if (sameDay(d, today)) return 'Today'
  if (sameDay(d, yesterday)) return 'Yesterday'
  return d.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })
}

/** Avatar tint per topic, so threads are distinguishable by more than text. */
export const topicTone: Record<ContactTopic, string> = {
  general: 'blue',
  scoping: 'green',
  existing: 'navy',
  consultation: 'amber',
  billing: 'rose',
  privacy: 'slate',
}
