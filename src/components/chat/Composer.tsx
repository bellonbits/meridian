import { useRef, useState, type KeyboardEvent } from 'react'
import { cx } from '../../utils/cx'
import { Icon } from '../ui/Icon'

const EMOJI = ['👋', '🙂', '🙏', '👍', '✅', '📊', '📚', '📝', '⏰', '🎓', '💡', '❓']

interface ComposerProps {
  placeholder: string
  disabled?: boolean
  onSend: (text: string) => Promise<void> | void
}

/** Enter sends, Shift+Enter adds a line. Grows with content up to a limit. */
export function Composer({ placeholder, disabled, onSend }: ComposerProps) {
  const [text, setText] = useState('')
  const [emojiOpen, setEmojiOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const ref = useRef<HTMLTextAreaElement>(null)

  const resize = () => {
    const el = ref.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`
  }

  const submit = async () => {
    const body = text.trim()
    if (!body || busy || disabled) return
    setBusy(true)
    try {
      await onSend(body)
      setText('')
      requestAnimationFrame(resize)
    } finally {
      setBusy(false)
      ref.current?.focus()
    }
  }

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault()
      void submit()
    }
  }

  const insert = (emoji: string) => {
    const el = ref.current
    const start = el?.selectionStart ?? text.length
    const end = el?.selectionEnd ?? text.length
    setText(text.slice(0, start) + emoji + text.slice(end))
    setEmojiOpen(false)
    requestAnimationFrame(() => {
      el?.focus()
      el?.setSelectionRange(start + emoji.length, start + emoji.length)
    })
  }

  return (
    <div className={cx('chat-composer', disabled && 'is-disabled')}>
      <div className="chat-composer__emoji">
        <button
          type="button"
          className="chat-composer__icon"
          aria-label="Insert emoji"
          aria-expanded={emojiOpen}
          onClick={() => setEmojiOpen((v) => !v)}
          disabled={disabled}
        >
          <Icon name="smile" size={20} />
        </button>
        {emojiOpen && (
          <div className="chat-emoji" role="menu" aria-label="Emoji">
            {EMOJI.map((e) => (
              <button key={e} type="button" role="menuitem" onClick={() => insert(e)}>
                {e}
              </button>
            ))}
          </div>
        )}
      </div>
      <label className="visually-hidden" htmlFor="chat-input">
        Message
      </label>
      <textarea
        id="chat-input"
        ref={ref}
        rows={1}
        value={text}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={4000}
        onChange={(e) => {
          setText(e.target.value)
          resize()
        }}
        onKeyDown={onKeyDown}
      />
      <button
        type="button"
        className="chat-composer__icon"
        aria-label="Attach a file (available in the client portal)"
        title="File sharing arrives with the client portal — email files for now"
        disabled
      >
        <Icon name="paperclip" size={19} />
      </button>
      <button
        type="button"
        className="chat-composer__send"
        aria-label="Send message"
        onClick={() => void submit()}
        disabled={disabled || busy || !text.trim()}
      >
        <Icon name="send" size={18} />
      </button>
    </div>
  )
}
