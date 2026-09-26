import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ContactTopic } from '../data/contact'
import { contactTopics } from '../data/contact'
import { site } from '../data/site'
import { getChatClient } from '../services/chat'
import { openMailto } from '../services/emailHandoff'
import type { ChatMessage, ChatProfile, ChatSnapshot, ConversationStatus } from '../types/chat'

const POLL_MS = 15_000
const empty: ChatSnapshot = { profile: null, conversations: [], messages: {} }

/** State + actions for the enquiries inbox. Polls for replies only when the API is connected. */
export function useChat() {
  const client = getChatClient()
  const [snapshot, setSnapshot] = useState<ChatSnapshot>(empty)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    try {
      const next = await client.load()
      setSnapshot(next)
      setError(null)
      return next
    } catch (err) {
      setError((err as Error).message)
      return null
    } finally {
      setLoading(false)
    }
  }, [client])

  // Initial load, then poll for replies when the API is connected (local mode has nothing to poll).
  useEffect(() => {
    let cancelled = false
    const load = () =>
      client
        .load()
        .then((next) => {
          if (cancelled) return
          setSnapshot(next)
          setError(null)
          setActiveId((current) => current ?? next.conversations[0]?.id ?? null)
        })
        .catch((err: Error) => !cancelled && setError(err.message))
        .finally(() => !cancelled && setLoading(false))
    void load()
    const id = client.mode === 'api' ? window.setInterval(load, POLL_MS) : 0
    return () => {
      cancelled = true
      window.clearInterval(id)
    }
  }, [client])

  const select = useCallback(
    async (id: string) => {
      setActiveId(id)
      setSnapshot((s) => ({ ...s, conversations: s.conversations.map((c) => (c.id === id ? { ...c, unread: 0 } : c)) }))
      await client.markRead(id).catch(() => undefined)
    },
    [client],
  )

  const startConversation = useCallback(
    async (topic: ContactTopic, subject: string, profile: ChatProfile) => {
      const conversation = await client.startConversation(topic, subject, profile)
      await refresh()
      setActiveId(conversation.id)
      return conversation
    },
    [client, refresh],
  )

  const send = useCallback(
    async (conversationId: string, body: string, profile: ChatProfile) => {
      const optimistic: ChatMessage = {
        id: `tmp-${Date.now()}`,
        conversationId,
        author: 'visitor',
        authorName: profile.name,
        body,
        sentAt: new Date().toISOString(),
        delivery: client.mode === 'api' ? 'sent' : 'pending',
      }
      setSnapshot((s) => ({ ...s, messages: { ...s.messages, [conversationId]: [...(s.messages[conversationId] ?? []), optimistic] } }))
      try {
        await client.send(conversationId, body, profile)
      } catch (err) {
        setSnapshot((s) => ({
          ...s,
          messages: {
            ...s.messages,
            [conversationId]: (s.messages[conversationId] ?? []).map((m) => (m.id === optimistic.id ? { ...m, delivery: 'failed' } : m)),
          },
        }))
        throw err
      }
      await refresh()
    },
    [client, refresh],
  )

  const setStatus = useCallback(
    async (conversationId: string, status: ConversationStatus) => {
      await client.setStatus(conversationId, status)
      await refresh()
    },
    [client, refresh],
  )

  /** Local mode: hands the whole conversation to the visitor's email client for delivery. */
  const emailConversation = useCallback(
    async (conversationId: string) => {
      const conversation = snapshot.conversations.find((c) => c.id === conversationId)
      const messages = snapshot.messages[conversationId] ?? []
      if (!conversation) return
      const topic = contactTopics.find((t) => t.value === conversation.topic)?.label ?? ''
      const transcript = messages
        .filter((m) => m.author === 'visitor')
        .map((m) => `[${new Date(m.sentAt).toLocaleString()}] ${m.body}`)
        .join('\n\n')
      const who = snapshot.profile ? `\n\n— ${snapshot.profile.name} (${snapshot.profile.email})` : ''
      const to = conversation.topic === 'privacy' ? site.legal.privacyEmail : site.contact.email
      openMailto(`${topic}: ${conversation.subject}`, `${transcript}${who}`, to)
      await client.markEmailed(conversationId)
      await refresh()
    },
    [client, refresh, snapshot],
  )

  const active = useMemo(
    () => snapshot.conversations.find((c) => c.id === activeId) ?? null,
    [snapshot.conversations, activeId],
  )

  return {
    mode: client.mode,
    loading,
    error,
    profile: snapshot.profile,
    conversations: snapshot.conversations,
    messages: activeId ? snapshot.messages[activeId] ?? [] : [],
    messagesById: snapshot.messages,
    active,
    activeId,
    select,
    clearSelection: () => setActiveId(null),
    startConversation,
    send,
    setStatus,
    emailConversation,
    saveProfile: (p: ChatProfile) => client.saveProfile(p).then(refresh),
    unreadTotal: snapshot.conversations.reduce((n, c) => n + c.unread, 0),
  }
}

export type ChatController = ReturnType<typeof useChat>
