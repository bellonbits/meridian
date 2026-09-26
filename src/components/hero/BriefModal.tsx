import { useMemo, useState, type SyntheticEvent } from 'react'
import { site } from '../../data/site'
import { isApiConfigured } from '../../services/apiClient'
import { buildMailto } from '../../services/emailHandoff'
import { submitProjectBrief, toProjectPayload } from '../../services/projects'
import type { BriefContact, ProjectBriefPayload, ProjectDraft } from '../../types/project'
import type { EstimateBreakdown } from '../../types/pricing'
import { formatBriefText } from '../../utils/briefText'
import { formatMoney } from '../../utils/pricingCalculator'
import { validateContact, type ContactErrors } from '../../utils/projectValidation'
import { Button } from '../ui/Button'
import { Checkbox, TextInput } from '../ui/Form'
import { Icon } from '../ui/Icon'
import { Modal } from '../ui/Modal'
import { useToast } from '../ui/Toast'
import './BriefModal.css'

interface BriefModalProps {
  open: boolean
  onClose: () => void
  project: ProjectDraft
  estimate: EstimateBreakdown
  onSubmitted: () => void
}

type Result = { kind: 'created'; id: string } | { kind: 'handoff'; payload: ProjectBriefPayload }

const emptyContact: BriefContact = { fullName: '', email: '', workingTitle: '', integrityAcknowledged: false }

export default function BriefModal({ open, onClose, project, estimate, onSubmitted }: BriefModalProps) {
  const notify = useToast()
  const [contact, setContact] = useState(emptyContact)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<Result | null>(null)

  const update = <K extends keyof BriefContact>(key: K, value: BriefContact[K]) => {
    setContact((c) => ({ ...c, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const briefText = useMemo(() => (result?.kind === 'handoff' ? formatBriefText(result.payload) : ''), [result])

  const close = () => {
    onClose()
    if (result) {
      setResult(null)
      setContact(emptyContact)
    }
  }

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault()
    const found = validateContact(contact)
    setErrors(found)
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0]
      document.getElementById(`brief-${first}`)?.focus()
      return
    }

    const payload = toProjectPayload(project, contact)

    if (!isApiConfigured) {
      setResult({ kind: 'handoff', payload })
      return
    }

    setSubmitting(true)
    try {
      const created = await submitProjectBrief(payload)
      setResult({ kind: 'created', id: created.id })
      onSubmitted()
      notify({ tone: 'success', title: 'Brief received', message: 'A specialist will review your project shortly.' })
    } catch (error) {
      notify({ tone: 'error', title: 'We could not submit your brief', message: (error as Error).message })
    } finally {
      setSubmitting(false)
    }
  }

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(briefText)
      notify({ tone: 'success', title: 'Brief copied', message: 'Paste it into an email to our studio.' })
    } catch {
      notify({ tone: 'error', title: 'Copy failed', message: 'Select the text and copy it manually.' })
    }
  }

  if (result?.kind === 'created') {
    return (
      <Modal open={open} onClose={close} eyebrow="Brief received" title="Thank you — we’re on it." size="md">
        <div className="brief-done">
          <span className="brief-done__icon">
            <Icon name="check" size={28} strokeWidth={2} />
          </span>
          <p>
            Your reference is <strong className="mono">{result.id}</strong>. A specialist in your discipline will review
            your brief and email a written scope and confirmed quote. Nothing is charged until you approve it.
          </p>
          <Button variant="primary" onClick={close}>
            Done
          </Button>
        </div>
      </Modal>
    )
  }

  if (result?.kind === 'handoff') {
    return (
      <Modal
        open={open}
        onClose={close}
        eyebrow="Your brief is ready"
        title="Send your brief to the studio"
        description="Online submission opens with our client portal. For now, send this brief by email and a specialist will reply with a written scope."
        size="md"
        footer={
          <>
            <Button variant="secondary" icon="copy" onClick={copyBrief}>
              Copy brief
            </Button>
            <Button
              variant="success"
              icon="mail"
              href={buildMailto(`Project brief — ${result.payload.working_title || 'New project'}`, briefText)}
            >
              Email to {site.shortName}
            </Button>
          </>
        }
      >
        <pre className="brief-text" tabIndex={0} aria-label="Project brief text">
          {briefText}
        </pre>
      </Modal>
    )
  }

  return (
    <Modal
      open={open}
      onClose={close}
      eyebrow="Step 2 of 2 · Project brief"
      title="A few details before we scope your project"
      description="We use these to match you with a specialist. You approve the written scope and quote before any work begins."
      size="md"
    >
      <form className="brief" onSubmit={onSubmit} noValidate>
        <div className="brief__estimate">
          <span>Indicative estimate</span>
          <strong className="tabular">{formatMoney(estimate.finalTotal)}</strong>
        </div>

        <TextInput
          id="brief-workingTitle"
          label="Working title or topic"
          optional
          placeholder="e.g. Hybrid work and early-career wellbeing"
          value={contact.workingTitle}
          onValueChange={(v) => update('workingTitle', v)}
        />
        <div className="brief__row">
          <TextInput
            id="brief-fullName"
            label="Full name"
            autoComplete="name"
            value={contact.fullName}
            onValueChange={(v) => update('fullName', v)}
            error={errors.fullName}
          />
          <TextInput
            id="brief-email"
            label="Email"
            type="email"
            autoComplete="email"
            value={contact.email}
            onValueChange={(v) => update('email', v)}
            error={errors.email}
          />
        </div>

        <Checkbox
          id="brief-integrityAcknowledged"
          checked={contact.integrityAcknowledged}
          onChange={(v) => update('integrityAcknowledged', v)}
          error={errors.integrityAcknowledged}
        >
          I’ll use Meridian’s support in line with my institution’s academic integrity policy.
        </Checkbox>

        <Button type="submit" variant="success" size="lg" block arrow disabled={submitting}>
          {submitting ? 'Submitting…' : 'Submit project brief'}
        </Button>
        <p className="brief__note">
          <Icon name="lock" size={14} /> Shared only with the specialists assigned to your project.
        </p>
      </form>
    </Modal>
  )
}
