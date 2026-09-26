/** Enquiry topics for the contact form (value = API enum). */
export const contactTopics = [
  { value: 'general', label: 'General question' },
  { value: 'scoping', label: 'Scoping a new project' },
  { value: 'existing', label: 'An existing project' },
  { value: 'consultation', label: 'Booking a consultation' },
  { value: 'billing', label: 'Quotes & billing' },
  { value: 'privacy', label: 'Privacy or data request' },
] as const

export type ContactTopic = (typeof contactTopics)[number]['value']

export const isContactTopic = (value: string | null): value is ContactTopic =>
  contactTopics.some((t) => t.value === value)
