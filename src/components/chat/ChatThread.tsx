import { Link } from 'react-router'
import { contactTopics } from '../../data/contact'
import { routes } from '../../data/site'
import { WELCOME_ID } from '../../services/chat'
import type { ChatMessage, ChatProfile, Conversation } from '../../types/chat'
import { Icon } from '../ui/Icon'
import { Composer } from './Composer'
import { MessageList } from './MessageList'
import { ProfileGate } from './ProfileGate'

interface ChatThreadProps {
  conversation: Conversation
  messages: ChatMessage[]
  profile: ChatProfile | null
  mode: 'api' | 'local'
  onBack: () => void
  onSend: (text: string) => Promise<void>
  onSaveProfile: (p: ChatProfile) => Promise<void>
  onToggleStatus: () => void
  onEmail: () => void
}

const quickActions = [
  { to: routes.start, label: 'Request estimate' },
  { to: routes.service('consultation'), label: 'Book consultation' },
  { to: routes.pricing, label: 'View pricing' },
]

export function ChatThread({ conversation, messages, profile, mode, onBack, onSend, onSaveProfile, onToggleStatus, onEmail }: ChatThreadProps) {
  const isWelcome = conversation.id === WELCOME_ID
  const closed = conversation.status === 'closed'
  const pending = messages.filter((m) => m.delivery === 'pending').length
  const topic = contactTopics.find((t) => t.value === conversation.topic)?.label

  return (
    <section className="chat-thread" aria-labelledby="chat-thread-title">
      <header className="chat-thread__head">
        <button type="button" className="chat-thread__back" onClick={onBack} aria-label="Back to enquiries">
          <Icon name="chevronLeft" size={20} />
        </button>
        <div className="chat-thread__titles">
          <h2 id="chat-thread-title" className="chat-thread__title">
            {conversation.subject}
          </h2>
          <p className="chat-thread__meta">
            With : {conversation.counterpart.name}
            {!isWelcome && topic && <span className="chat-thread__topic">{topic}</span>}
            {closed && <span className="chat-thread__closed">Resolved</span>}
          </p>
        </div>
        {!isWelcome && (
          <div className="chat-thread__actions">
            {mode === 'local' && messages.some((m) => m.author === 'visitor') && (
              <button type="button" className="chat-thread__action" onClick={onEmail}>
                <Icon name="mail" size={16} /> Email thread
              </button>
            )}
            <button type="button" className="chat-thread__action" onClick={onToggleStatus}>
              <Icon name={closed ? 'inbox' : 'check'} size={16} /> {closed ? 'Reopen' : 'Mark resolved'}
            </button>
          </div>
        )}
      </header>

      <MessageList conversation={conversation} messages={messages} />

      <footer className="chat-thread__foot">
        {mode === 'local' && pending > 0 && (
          <div className="chat-notice" role="status">
            <Icon name="info" size={18} />
            <p>
              <strong>
                {pending} message{pending > 1 ? 's' : ''} not delivered yet.
              </strong>{' '}
              Live chat delivery isn’t connected, so messages are saved on this device. Email the thread and a
              specialist will reply to your inbox.
            </p>
            <button type="button" className="chat-notice__btn" onClick={onEmail}>
              Email thread
            </button>
          </div>
        )}

        <div className="chat-quick">
          {quickActions.map((a) => (
            <Link key={a.to} to={a.to} className="chat-quick__chip">
              {a.label}
            </Link>
          ))}
        </div>

        {!profile ? (
          <ProfileGate idPrefix="chat-thread" onSave={onSaveProfile} submitLabel="Start chatting" />
        ) : closed ? (
          <p className="chat-thread__resolved">
            This enquiry is resolved.{' '}
            <button type="button" onClick={onToggleStatus}>
              Reopen it
            </button>{' '}
            to send another message.
          </p>
        ) : (
          <Composer
            placeholder={isWelcome ? 'Type a message to start a new enquiry…' : 'Type a message…'}
            onSend={onSend}
          />
        )}
      </footer>
    </section>
  )
}
