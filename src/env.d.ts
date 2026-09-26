/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the Meridian API (e.g. the FastAPI service). Leave empty to disable network submission. */
  readonly VITE_API_BASE_URL?: string
  /** Client portal URL used by the “Sign in” link once the dashboard ships. */
  readonly VITE_PORTAL_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
