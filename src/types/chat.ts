import type { ContactTopic } from '../data/contact'

export type ConversationStatus = 'open' | 'closed'
export type MessageAuthor = 'visitor' | 'studio' | 'system'
/**
 * sent     — accepted by the Meridian API
 * pending  — stored on this device only; not yet delivered to the studio
 * emailed  — handed to the visitor's email client for delivery
 * failed   — the API rejected or could not be reached
 */
export type DeliveryState = 'sent' | 'pending' | 'emailed' | 'failed'

export interface ChatProfile {
  name: string
  email: string
}

export interface ChatMessage {
  id: string
  conversationId: string
  author: MessageAuthor
  authorName: string
  body: string
  sentAt: string
  delivery: DeliveryState
  /** Automated messages are labelled as such in the UI. */
  automated?: boolean
}

export interface Conversation {
  id: string
  topic: ContactTopic
  subject: string
  status: ConversationStatus
  /** Who the visitor is talking to (a specialist once assigned). */
  counterpart: { name: string; role: string }
  createdAt: string
  updatedAt: string
  unread: number
}

export interface ChatSnapshot {
  profile: ChatProfile | null
  conversations: Conversation[]
  messages: Record<string, ChatMessage[]>
}
