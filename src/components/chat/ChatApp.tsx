import { useMemo, useState } from 'react'
import { useChat } from '../../hooks/useChat'
import { MOBILE_QUERY, useMediaQuery } from '../../hooks/useMediaQuery'
import { WELCOME_ID } from '../../services/chat'
import type { ChatMessage, ChatProfile } from '../../types/chat'
import { cx } from '../../utils/cx'
import { Icon } from '../ui/Icon'
import { Modal } from '../ui/Modal'
import { useToast } from '../ui/Toast'
import { ChatRail } from './ChatRail'
import { ChatThread } from './ChatThread'
import { ConversationList } from './ConversationList'
import { NewEnquiryModal } from './NewEnquiryModal'
import { ProfileGate } from './ProfileGate'
import './ChatApp.css'
import './ChatThread.css'

type StatusFilter = 'all' | 'open' | 'closed'

/** Enquiries inbox: rail · conversation list · thread (list/thread become separate views on phones). */
export function ChatApp() {
  const chat = useChat()
  const notify = useToast()
  const isMobile = useMediaQuery(MOBILE_QUERY)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [unreadOnly, setUnreadOnly] = useState(false)
  const [newOpen, setNewOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [mobileThread, setMobileThread] = useState(false)

  const lastMessages = useMemo(() => {
    const out: Record<string, ChatMessage | undefined> = {}
    for (const c of chat.conversations) {
      const list = chat.messagesById[c.id]
      out[c.id] = list?.[list.length - 1]
    }
    return out
  }, [chat.conversations, chat.messagesById])

  const visible = chat.conversations.filter((c) => {
    if (status !== 'all' && c.status !== status) return false
    if (unreadOnly && c.unread === 0) return false
    const q = query.trim().toLowerCase()
    return !q || c.subject.toLowerCase().includes(q) || c.counterpart.name.toLowerCase().includes(q)
  })

  const fail = (err: unknown) => notify({ tone: 'error', title: 'Something went wrong', message: (err as Error).message })

  const handleSend = async (text: string) => {
    if (!chat.active || !chat.profile) return
    try {
      if (chat.active.id === WELCOME_ID) {
        // Typing in the welcome thread starts a general enquiry.
        const subject = text.length > 48 ? `${text.slice(0, 45).trimEnd()}…` : text
        const c = await chat.startConversation('general', subject, chat.profile)
        await chat.send(c.id, text, chat.profile)
      } else {
        await chat.send(chat.active.id, text, chat.profile)
      }
    } catch (err) {
      fail(err)
    }
  }

  const saveProfile = async (p: ChatProfile) => {
    await chat.saveProfile(p)
    setProfileOpen(false)
    notify({ tone: 'success', title: 'Details saved', message: `Replies will go to ${p.email}.` })
  }

  const showThread = !isMobile || mobileThread

  return (
    <div className={cx('chat-app', isMobile && (mobileThread ? 'is-thread' : 'is-list'))}>
      {!isMobile && <ChatRail profile={chat.profile} unread={chat.unreadTotal} onEditProfile={() => setProfileOpen(true)} />}

      <div className="chat-app__main">
        <div className="chat-app__toolbar">
          <label className="chat-status">
            <span>Status:</span>
            <select value={status} onChange={(e) => setStatus(e.target.value as StatusFilter)}>
              <option value="all">All</option>
              <option value="open">Open</option>
              <option value="closed">Resolved</option>
            </select>
            <Icon name="chevronDown" size={14} />
          </label>
          <button
            type="button"
            className={cx('chat-bell', unreadOnly && 'is-on')}
            aria-pressed={unreadOnly}
            aria-label={`Show unread only (${chat.unreadTotal} unread)`}
            onClick={() => setUnreadOnly((v) => !v)}
          >
            <Icon name="bell" size={19} />
            {chat.unreadTotal > 0 && <span className="chat-bell__dot">{chat.unreadTotal}</span>}
          </button>
          {isMobile && (
            <button type="button" className="chat-bell" aria-label="Edit your details" onClick={() => setProfileOpen(true)}>
              <Icon name="user" size={19} />
            </button>
          )}
        </div>

        <div className="chat-app__panes">
          {(!isMobile || !mobileThread) && (
            <ConversationList
              conversations={visible}
              lastMessages={lastMessages}
              activeId={chat.activeId}
              query={query}
              onQuery={setQuery}
              onSelect={(id) => {
                void chat.select(id)
                setMobileThread(true)
              }}
              onNew={() => setNewOpen(true)}
            />
          )}

          {showThread &&
            (chat.active ? (
              <ChatThread
                conversation={chat.active}
                messages={chat.messages}
                profile={chat.profile}
                mode={chat.mode}
                onBack={() => setMobileThread(false)}
                onSend={handleSend}
                onSaveProfile={saveProfile}
                onToggleStatus={() =>
                  chat.active && void chat.setStatus(chat.active.id, chat.active.status === 'open' ? 'closed' : 'open').catch(fail)
                }
                onEmail={() => chat.active && void chat.emailConversation(chat.active.id).catch(fail)}
              />
            ) : (
              <div className="chat-thread chat-thread--empty">
                <p>{chat.loading ? 'Loading your enquiries…' : chat.error ?? 'Select an enquiry to read it.'}</p>
              </div>
            ))}
        </div>
      </div>

      <NewEnquiryModal
        open={newOpen}
        profile={chat.profile}
        onClose={() => setNewOpen(false)}
        onCreate={async ({ topic, subject, message, profile }) => {
          try {
            const c = await chat.startConversation(topic, subject, profile)
            await chat.send(c.id, message, profile)
            setMobileThread(true)
          } catch (err) {
            fail(err)
          }
        }}
      />

      <Modal open={profileOpen} onClose={() => setProfileOpen(false)} eyebrow="Your details" title="Where should we reply?" size="sm">
        <ProfileGate key={String(profileOpen)} idPrefix="chat-profile" initial={chat.profile} submitLabel="Save details" onSave={saveProfile} />
      </Modal>
    </div>
  )
}
