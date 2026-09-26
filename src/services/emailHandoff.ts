import { site } from '../data/site'

/**
 * Used when the API is not configured: hands the message to the visitor's own email
 * client so nothing is silently dropped or pretended to be saved.
 */
export function buildMailto(subject: string, body: string, to: string = site.contact.email) {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function openMailto(subject: string, body: string, to: string = site.contact.email) {
  window.location.href = buildMailto(subject, body, to)
}
