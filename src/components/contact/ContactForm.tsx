import { useState, type SyntheticEvent } from 'react'
import { contactTopics, type ContactTopic } from '../../data/contact'
import { routes, site } from '../../data/site'
import { isApiConfigured } from '../../services/apiClient'
import { openMailto } from '../../services/emailHandoff'
import { submitInquiry } from '../../services/projects'
import { isValidEmail } from '../../utils/projectValidation'
import { Button } from '../ui/Button'
import { Select, TextArea, TextInput } from '../ui/Form'
import { SmartLink } from '../ui/SmartLink'
import { useToast } from '../ui/Toast'
import './ContactForm.css'

type Topic = ContactTopic

interface FormState {
  name: string
  email: string
  topic: Topic
  message: string
}

const empty: FormState = { name: '', email: '', topic: 'general', message: '' }

interface ContactFormProps {
  /** Prefix for field ids so the modal and page forms never share ids. */
  idPrefix: string
  initialTopic?: Topic
  onSent?: () => void
}

/**
 * Enquiry form. Posts to /api/inquiries when the API is configured; otherwise hands the message
 * to the visitor's email client (privacy requests go to the privacy address).
 */
export function ContactForm({ idPrefix, initialTopic = 'general', onSent }: ContactFormProps) {
  const notify = useToast()
  const [form, setForm] = useState<FormState>({ ...empty, topic: initialTopic })
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [sending, setSending] = useState(false)

  const update = <K extends keyof FormState>(key: K) => (value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault()
    const next: typeof errors = {}
    if (form.name.trim().length < 2) next.name = 'Enter your name.'
    if (!isValidEmail(form.email)) next.email = 'Enter a valid email address.'
    if (form.message.trim().length < 10) next.message = 'Tell us a little more (10+ characters).'
    setErrors(next)
    const first = Object.keys(next)[0]
    if (first) {
      document.getElementById(`${idPrefix}-${first}`)?.focus()
      return
    }

    const topicLabel = contactTopics.find((t) => t.value === form.topic)?.label ?? ''

    if (!isApiConfigured) {
      const to = form.topic === 'privacy' ? site.legal.privacyEmail : site.contact.email
      openMailto(`${topicLabel} — ${form.name}`, `${form.message}\n\n— ${form.name} (${form.email})`, to)
      notify({ tone: 'info', title: 'Opening your email app', message: `Your message is addressed to ${to}.` })
      onSent?.()
      return
    }

    setSending(true)
    try {
      await submitInquiry(form)
      notify({ tone: 'success', title: 'Message sent', message: 'We’ll reply by email — usually within a few working hours.' })
      setForm({ ...empty, topic: initialTopic })
      onSent?.()
    } catch (error) {
      notify({ tone: 'error', title: 'Could not send message', message: (error as Error).message })
    } finally {
      setSending(false)
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="contact-form__row">
        <TextInput
          id={`${idPrefix}-name`}
          label="Name"
          autoComplete="name"
          value={form.name}
          onValueChange={update('name')}
          error={errors.name}
        />
        <TextInput
          id={`${idPrefix}-email`}
          label="Email"
          type="email"
          autoComplete="email"
          value={form.email}
          onValueChange={update('email')}
          error={errors.email}
        />
      </div>
      <Select id={`${idPrefix}-topic`} label="Topic" value={form.topic} options={contactTopics} onChange={update('topic')} />
      <TextArea
        id={`${idPrefix}-message`}
        label="How can we help?"
        rows={5}
        placeholder="e.g. I'm in the second year of a PhD in public health and need help choosing between two regression models…"
        value={form.message}
        onValueChange={update('message')}
        error={errors.message}
      />
      <Button type="submit" variant="primary" arrow disabled={sending} block>
        {sending ? 'Sending…' : 'Send message'}
      </Button>
      <p className="contact-form__note">
        We use your details only to reply. See our <SmartLink href={routes.privacy}>Privacy Policy</SmartLink>.
      </p>
    </form>
  )
}
