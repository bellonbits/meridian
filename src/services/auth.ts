/**
 * Client authentication (planned FastAPI endpoints). Session is an HTTP-only cookie set by the
 * API (apiRequest sends credentials). Nothing here works — or pretends to — without the API.
 *
 *   POST /api/auth/login        { email, password }  → ClientUser
 *   POST /api/auth/magic-link   { email }            → 204
 *   GET  /api/auth/me                                → ClientUser (401 if signed out)
 *   POST /api/auth/logout                            → 204
 *   GET  /api/projects                               → ClientProject[]
 */
import { apiRequest, isApiConfigured } from './apiClient'

export const accountsEnabled = isApiConfigured

export interface ClientUser {
  id: string
  name: string
  email: string
}

export interface ClientProject {
  id: string
  title: string
  status: string
  service: string
  due_date: string | null
}

export const login = (email: string, password: string) =>
  apiRequest<ClientUser>('/api/auth/login', { method: 'POST', body: { email, password } })

export const requestMagicLink = (email: string) =>
  apiRequest<void>('/api/auth/magic-link', { method: 'POST', body: { email } })

export const fetchCurrentUser = () => apiRequest<ClientUser>('/api/auth/me')

export const logout = () => apiRequest<void>('/api/auth/logout', { method: 'POST' })

export const fetchProjects = () => apiRequest<ClientProject[]>('/api/projects')
