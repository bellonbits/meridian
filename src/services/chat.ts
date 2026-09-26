/**
 * Chat client abstraction.
 *
 * - ApiChatClient talks to the Meridian API (planned FastAPI endpoints below) and is used when
 *   VITE_API_BASE_URL is set.
 * - LocalChatClient keeps conversations on this device only. It never fabricates replies:
 *   visitor messages stay "pending" until the visitor emails the conversation to the studio.
 *
 *   GET  /api/conversations                         → Conversation[]
 *   POST /api/conversations                         → Conversation   { topic, subject, profile }
 *   GET  /api/conversations/:id/messages            → ChatMessage[]
 *   POST /api/conversations/:id/messages            → ChatMessage    { body }
 *   POST /api/conversations/:id/read                → void
 *   POST /api/conversations/:id/status              → Conversation   { status }
 */
import type { ContactTopic } from '../data/contact'
import type { ChatMessage, ChatProfile, ChatSnapshot, Conversation, ConversationStatus } from '../types/chat'
import { readStorage, writeStorage } from '../utils/storage'
import { apiRequest, isApiConfigured } from './apiClient'

export interface ChatClient {
  readonly mode: 'api' | 'local'
  load(): Promise<ChatSnapshot>
  saveProfile(profile: ChatProfile): Promise<void>
  startConversation(topic: ContactTopic, subject: string, profile: ChatProfile): Promise<Conversation>
  send(conversationId: string, body: string, profile: ChatProfile): Promise<ChatMessage>
  markRead(conversationId: string): Promise<void>
  setStatus(conversationId: string, status: ConversationStatus): Promise<void>
  markEmailed(conversationId: string): Promise<void>
}

const uid = () => (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`)
const now = () => new Date().toISOString()

export const STUDIO = { name: 'Meridian Studio', role: 'Research enquiries' }
export const WELCOME_ID = 'welcome'

/** The one automated thread every visitor starts with. Clearly marked as automated. */
function welcomeThread(): { conversation: Conversation; messages: ChatMessage[] } {
  const t = now()
  return {
    conversation: {
      id: WELCOME_ID,
      topic: 'general',
      subject: 'Welcome to Meridian',
      status: 'open',
      counterpart: STUDIO,
      createdAt: t,
      updatedAt: t,
      unread: 1,
    },
    messages: [
      {
        id: uid(),
        conversationId: WELCOME_ID,
        author: 'studio',
        authorName: STUDIO.name,
        automated: true,
        body: 'Hi — this is the Meridian enquiries inbox. Start a new enquiry for each topic, tell us where you are in your project, and a research specialist will reply.',
        sentAt: t,
        delivery: 'sent',
      },
    ],
  }
}

/* ---------------------------------------------------------------- local */

const KEY = 'meridian:chat:v1'

class LocalChatClient implements ChatClient {
  readonly mode = 'local' as const
  private state: ChatSnapshot

  constructor() {
    const saved = readStorage<ChatSnapshot | null>(KEY, null)
    if (saved?.conversations?.length) {
      this.state = saved
    } else {
      const w = welcomeThread()
      this.state = { profile: saved?.profile ?? null, conversations: [w.conversation], messages: { [WELCOME_ID]: w.messages } }
      this.persist()
    }
  }

  private persist() {
    writeStorage(KEY, this.state)
  }

  private touch(id: string, patch: Partial<Conversation>) {
    this.state.conversations = this.state.conversations.map((c) => (c.id === id ? { ...c, ...patch } : c))
  }

  async load() {
    return structuredClone(this.state)
  }

  async saveProfile(profile: ChatProfile) {
    this.state.profile = profile
    this.persist()
  }

  async startConversation(topic: ContactTopic, subject: string, profile: ChatProfile) {
    const t = now()
    const conversation: Conversation = {
      id: uid(),
      topic,
      subject,
      status: 'open',
      counterpart: STUDIO,
      createdAt: t,
      updatedAt: t,
      unread: 0,
    }
    this.state.profile = profile
    this.state.conversations = [conversation, ...this.state.conversations]
    this.state.messages[conversation.id] = []
    this.persist()
    return conversation
  }

  async send(conversationId: string, body: string, profile: ChatProfile) {
    const message: ChatMessage = {
      id: uid(),
      conversationId,
      author: 'visitor',
      authorName: profile.name,
      body,
      sentAt: now(),
      delivery: 'pending',
    }
    this.state.messages[conversationId] = [...(this.state.messages[conversationId] ?? []), message]
    this.touch(conversationId, { updatedAt: message.sentAt })
    this.persist()
    return message
  }

  async markRead(conversationId: string) {
    this.touch(conversationId, { unread: 0 })
    this.persist()
  }

  async setStatus(conversationId: string, status: ConversationStatus) {
    this.touch(conversationId, { status })
    this.persist()
  }

  async markEmailed(conversationId: string) {
    this.state.messages[conversationId] = (this.state.messages[conversationId] ?? []).map((m) =>
      m.delivery === 'pending' ? { ...m, delivery: 'emailed' } : m,
    )
    this.persist()
  }
}

/* ------------------------------------------------------------------ api */

class ApiChatClient implements ChatClient {
  readonly mode = 'api' as const

  async load(): Promise<ChatSnapshot> {
    const profile = readStorage<ChatProfile | null>(`${KEY}:profile`, null)
    const conversations = await apiRequest<Conversation[]>('/api/conversations')
    const entries = await Promise.all(
      conversations.map(async (c) => [c.id, await apiRequest<ChatMessage[]>(`/api/conversations/${c.id}/messages`)] as const),
    )
    return { profile, conversations, messages: Object.fromEntries(entries) }
  }

  async saveProfile(profile: ChatProfile) {
    writeStorage(`${KEY}:profile`, profile)
  }

  startConversation(topic: ContactTopic, subject: string, profile: ChatProfile) {
    writeStorage(`${KEY}:profile`, profile)
    return apiRequest<Conversation>('/api/conversations', { method: 'POST', body: { topic, subject, profile } })
  }

  send(conversationId: string, body: string) {
    return apiRequest<ChatMessage>(`/api/conversations/${conversationId}/messages`, { method: 'POST', body: { body } })
  }

  async markRead(conversationId: string) {
    await apiRequest(`/api/conversations/${conversationId}/read`, { method: 'POST' })
  }

  async setStatus(conversationId: string, status: ConversationStatus) {
    await apiRequest(`/api/conversations/${conversationId}/status`, { method: 'POST', body: { status } })
  }

  async markEmailed() {
    /* Not applicable: API messages are delivered directly. */
  }
}

let client: ChatClient | null = null

export function getChatClient(): ChatClient {
  client ??= isApiConfigured ? new ApiChatClient() : new LocalChatClient()
  return client
}
