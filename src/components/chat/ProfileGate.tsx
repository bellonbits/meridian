import { useState, type SyntheticEvent } from 'react'
import type { ChatProfile } from '../../types/chat'
import { isValidEmail } from '../../utils/projectValidation'
import { Button } from '../ui/Button'
import { TextInput } from '../ui/Form'

interface ProfileGateProps {
  /** Unique per instance so ids never collide. */
  idPrefix: string
  initial?: ChatProfile | null
  submitLabel?: string
  onSave: (profile: ChatProfile) => void | Promise<void>
}

/** Name + email, needed so a specialist can reply. */
export function ProfileGate({ idPrefix, initial, submitLabel = 'Continue', onSave }: ProfileGateProps) {
  const [name, setName] = useState(initial?.name ?? '')
  const [email, setEmail] = useState(initial?.email ?? '')
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const next = {
      name: name.trim().length < 2 ? 'Enter your name.' : undefined,
      email: isValidEmail(email) ? undefined : 'Enter a valid email address.',
    }
    setErrors(next)
    if (next.name || next.email) return
    await onSave({ name: name.trim(), email: email.trim() })
  }

  return (
    <form className="chat-gate" onSubmit={submit} noValidate>
      <p className="chat-gate__text">Tell us who you are so a specialist can reply to you.</p>
      <div className="chat-gate__row">
        <TextInput id={`${idPrefix}-name`} label="Name" autoComplete="name" value={name} onValueChange={setName} error={errors.name} />
        <TextInput
          id={`${idPrefix}-email`}
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onValueChange={setEmail}
          error={errors.email}
        />
      </div>
      <Button type="submit" variant="primary" size="sm" arrow>
        {submitLabel}
      </Button>
    </form>
  )
}
