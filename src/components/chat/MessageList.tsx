import { Fragment, useEffect, useRef } from 'react'
import type { ChatMessage, Conversation } from '../../types/chat'
import { cx } from '../../utils/cx'
import { Icon } from '../ui/Icon'
import { Avatar } from './Avatar'
import { STUDIO, WELCOME_ID } from '../../services/chat'
import { clockTime, dayLabel, topicTone } from './chatFormat'

const deliveryLabel: Record<ChatMessage['delivery'], string> = {
  sent: 'Sent',
  pending: 'Saved on this device · not delivered yet',
  emailed: 'Sent by email',
  failed: 'Not sent — check your connection',
}

export function MessageList({ conversation, messages }: { conversation: Conversation; messages: ChatMessage[] }) {
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' })
  }, [messages.length, conversation.id])

  return (
    <div className="chat-messages" role="log" aria-live="polite" aria-label={`Messages in ${conversation.subject}`} tabIndex={0}>
      {messages.length === 0 && (
        <p className="chat-messages__empty">Write your first message below — include your stage, discipline and deadline.</p>
      )}
      {messages.map((m, i) => {
        const newDay = i === 0 || dayLabel(messages[i - 1].sentAt) !== dayLabel(m.sentAt)
        const mine = m.author === 'visitor'
        return (
          <Fragment key={m.id}>
            {newDay && (
              <p className="chat-day">
                <span>{dayLabel(m.sentAt)}</span>
              </p>
            )}
            {m.author === 'system' ? (
              <p className="chat-system">{m.body}</p>
            ) : (
              <div className={cx('chat-msg', mine ? 'chat-msg--mine' : 'chat-msg--theirs')}>
                {!mine && (
                  <div className="chat-msg__who">
                    <Avatar
                      name={m.authorName}
                      tone={conversation.id === WELCOME_ID ? 'studio' : topicTone[conversation.topic]}
                      studio={m.authorName === STUDIO.name}
                      size="sm"
                    />
                    <time dateTime={m.sentAt}>{clockTime(m.sentAt)}</time>
                  </div>
                )}
                <div className="chat-msg__content">
                  {!mine && (
                    <span className="chat-msg__author">
                      {m.authorName}
                      {m.automated && <span className="chat-msg__auto">Automated</span>}
                    </span>
                  )}
                  <p className="chat-msg__bubble">{m.body}</p>
                  {mine && (
                    <span className={cx('chat-msg__status', `is-${m.delivery}`)}>
                      <time dateTime={m.sentAt}>{clockTime(m.sentAt)}</time> ·{' '}
                      {m.delivery === 'sent' || m.delivery === 'emailed' ? <Icon name="check" size={12} strokeWidth={2.4} /> : null}
                      {deliveryLabel[m.delivery]}
                    </span>
                  )}
                </div>
              </div>
            )}
          </Fragment>
        )
      })}
      <div ref={endRef} />
    </div>
  )
}
