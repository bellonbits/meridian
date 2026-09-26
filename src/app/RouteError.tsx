import { isRouteErrorResponse, Link, useRouteError } from 'react-router'
import '../styles/tokens.css'

/** Last-resort error screen (e.g. a chunk failed to load after a deploy). */
export function RouteError() {
  const error = useRouteError()
  const message = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : 'Something went wrong loading this page.'
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '2rem', textAlign: 'center' }}>
      <div style={{ display: 'grid', gap: '1rem', maxWidth: '32rem' }}>
        <h1 style={{ fontSize: '2.4rem' }}>We couldn’t load this page.</h1>
        <p style={{ color: 'var(--ink-3)' }}>{message} Please refresh, or return to the home page.</p>
        <p>
          <Link to="/" className="btn btn--primary btn--md">
            Back to home
          </Link>
        </p>
      </div>
    </main>
  )
}
