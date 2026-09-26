/** Storage access that never throws (private mode, blocked cookies, SSR). */

export function readStorage<T>(key: string, fallback: T, store: 'local' | 'session' = 'local'): T {
  try {
    const raw = (store === 'local' ? window.localStorage : window.sessionStorage).getItem(key)
    return raw === null ? fallback : (JSON.parse(raw) as T)
  } catch {
    return fallback
  }
}

export function writeStorage(key: string, value: unknown, store: 'local' | 'session' = 'local') {
  try {
    ;(store === 'local' ? window.localStorage : window.sessionStorage).setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable — non-critical */
  }
}
