import { useState, type SyntheticEvent } from 'react'
import { contactTopics, type ContactTopic } from '../../data/contact'
import type { ChatProfile } from '../../types/chat'
import { isValidEmail } from '../../utils/projectValidation'
import { Button } from '../ui/Button'
import { Select, TextArea, TextInput } from '../ui/Form'
import { Modal } from '../ui/Modal'

interface NewEnquiryModalProps {
  open: boolean
  profile: ChatProfile | null
  onClose: () => void
  onCreate: (input: { topic: ContactTopic; subject: string; message: string; profile: ChatProfile }) => Promise<void>
}

type Errors = Partial<Record<'subject' | 'message' | 'name' | 'email', string>>

export function NewEnquiryModal({ open, profile, onClose, onCreate }: NewEnquiryModalProps) {
  const [topic, setTopic] = useState<ContactTopic>('scoping')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [busy, setBusy] = useState(false)

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const next: Errors = {}
    if (subject.trim().length < 3) next.subject = 'Add a short subject.'
    if (message.trim().length < 5) next.message = 'Write your first message.'
    if (!profile) {
      if (name.trim().length < 2) next.name = 'Enter your name.'
      if (!isValidEmail(email)) next.email = 'Enter a valid email address.'
    }
    setErrors(next)
    if (Object.keys(next).length) return
    setBusy(true)
    try {
      await onCreate({
        topic,
        subject: subject.trim(),
        message: message.trim(),
        profile: profile ?? { name: name.trim(), email: email.trim() },
      })
      setSubject('')
      setMessage('')
      onClose()
    } finally {
      setBusy(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose} eyebrow="New enquiry" title="What would you like to discuss?" size="md">
      <form className="chat-new" onSubmit={submit} noValidate>
        <Select id="chat-new-topic" label="Topic" value={topic} options={contactTopics} onChange={setTopic} />
        <TextInput
          id="chat-new-subject"
          label="Subject"
          placeholder="e.g. PhD methodology chapter"
          value={subject}
          onValueChange={setSubject}
          error={errors.subject}
          data-autofocus
        />
        {!profile && (
          <div className="chat-gate__row">
            <TextInput id="chat-new-name" label="Name" autoComplete="name" value={name} onValueChange={setName} error={errors.name} />
            <TextInput
              id="chat-new-email"
              label="Email"
              type="email"
              autoComplete="email"
              value={email}
              onValueChange={setEmail}
              error={errors.email}
            />
          </div>
        )}
        <TextArea
          id="chat-new-message"
          label="Message"
          rows={4}
          placeholder="Your stage, discipline, deadline and what you need help with…"
          value={message}
          onValueChange={setMessage}
          error={errors.message}
        />
        <Button type="submit" variant="primary" arrow block disabled={busy}>
          {busy ? 'Starting…' : 'Start enquiry'}
        </Button>
      </form>
    </Modal>
  )
}
