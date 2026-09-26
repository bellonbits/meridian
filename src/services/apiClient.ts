/**
 * Thin fetch wrapper for the Meridian API (planned: FastAPI + PostgreSQL).
 * Network submission is enabled only when VITE_API_BASE_URL is set; otherwise callers
 * use the email hand-off in `emailHandoff.ts`. There are no simulated responses.
 */

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '')

export const isApiConfigured = API_BASE_URL.length > 0

export class ApiError extends Error {
  readonly status: number
  readonly details: unknown

  constructor(message: string, status: number, details?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.details = details
  }
}

export async function apiRequest<TResponse>(
  path: string,
  { method = 'GET', body, signal }: { method?: string; body?: unknown; signal?: AbortSignal } = {},
): Promise<TResponse> {
  if (!isApiConfigured) {
    throw new ApiError('The Meridian API is not configured (VITE_API_BASE_URL).', 0)
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    signal,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  })

  const payload: unknown = await response.json().catch(() => null)

  if (!response.ok) {
    const detail =
      payload && typeof payload === 'object' && 'detail' in payload ? String((payload as { detail: unknown }).detail) : ''
    throw new ApiError(detail || `Request failed (${response.status})`, response.status, payload)
  }

  return payload as TResponse
}
