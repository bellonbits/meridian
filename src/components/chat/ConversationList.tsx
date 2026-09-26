import { contactTopics } from '../../data/contact'
import type { ChatMessage, Conversation } from '../../types/chat'
import { cx } from '../../utils/cx'
import { Icon } from '../ui/Icon'
import { Avatar } from './Avatar'
import { shortTime, topicTone } from './chatFormat'
import { STUDIO, WELCOME_ID } from '../../services/chat'

interface ConversationListProps {
  conversations: Conversation[]
  lastMessages: Record<string, ChatMessage | undefined>
  activeId: string | null
  query: string
  onQuery: (q: string) => void
  onSelect: (id: string) => void
  onNew: () => void
}

export function ConversationList({ conversations, lastMessages, activeId, query, onQuery, onSelect, onNew }: ConversationListProps) {
  return (
    <section className="chat-list" aria-labelledby="chat-list-title">
      <div className="chat-list__head">
        <h1 id="chat-list-title" className="chat-list__title">
          Enquiries
        </h1>
        <button type="button" className="chat-list__new" onClick={onNew}>
          <Icon name="plus" size={16} strokeWidth={2} /> New
        </button>
      </div>

      <label className="chat-list__search">
        <Icon name="search" size={16} />
        <span className="visually-hidden">Search enquiries</span>
        <input type="search" placeholder="Search" value={query} onChange={(e) => onQuery(e.target.value)} />
      </label>

      {conversations.length === 0 ? (
        <p className="chat-list__empty">{query ? `No enquiries match “${query}”.` : 'No enquiries in this view.'}</p>
      ) : (
        <ul className="chat-list__items" role="list">
          {conversations.map((c) => {
            const last = lastMessages[c.id]
            const active = c.id === activeId
            const topic = contactTopics.find((t) => t.value === c.topic)?.label
            return (
              <li key={c.id}>
                <button
                  type="button"
                  className={cx('chat-card', active && 'is-active', c.status === 'closed' && 'is-closed')}
                  aria-current={active ? 'true' : undefined}
                  onClick={() => onSelect(c.id)}
                >
                  <Avatar
                    name={c.counterpart.name}
                    tone={c.id === WELCOME_ID ? 'studio' : topicTone[c.topic]}
                    studio={c.counterpart.name === STUDIO.name}
                  />
                  <span className="chat-card__body">
                    <span className="chat-card__top">
                      <span className="chat-card__subject">{c.subject}</span>
                      <time className="chat-card__time" dateTime={c.updatedAt}>
                        {shortTime(last?.sentAt ?? c.updatedAt)}
                      </time>
                    </span>
                    <span className="chat-card__bottom">
                      <span className="chat-card__preview">
                        {last ? `${last.author === 'visitor' ? 'You: ' : ''}${last.body}` : topic}
                      </span>
                      {c.unread > 0 && (
                        <span className="chat-card__badge">
                          {c.unread}
                          <span className="visually-hidden"> unread</span>
                        </span>
                      )}
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
