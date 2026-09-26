import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { routes } from '../data/site'
import type { ProjectDraft } from '../types/project'
import { scrollToHash } from '../utils/scroll'

export interface ProjectPreset {
  values: Partial<ProjectDraft>
  /** Increments on every request so the same preset can be applied twice. */
  nonce: number
}

interface AppActions {
  /** Goes to the project builder (scrolling if it is on this page), optionally pre-filling fields. */
  startProject: (values?: Partial<ProjectDraft>) => void
  preset: ProjectPreset | null
  contactOpen: boolean
  openContact: () => void
  closeContact: () => void
  searchOpen: boolean
  openSearch: () => void
  closeSearch: () => void
}

const AppActionsContext = createContext<AppActions | null>(null)

export function AppActionsProvider({ children }: { children: ReactNode }) {
  const [preset, setPreset] = useState<ProjectPreset | null>(null)
  const [contactOpen, setContactOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const startProject = useCallback(
    (values?: Partial<ProjectDraft>) => {
      if (values) setPreset((prev) => ({ values, nonce: (prev?.nonce ?? 0) + 1 }))
      // Home and /start both render the builder; everywhere else, navigate to /start.
      if (pathname === routes.home || pathname === routes.start) scrollToHash('#start')
      else navigate(routes.start)
    },
    [navigate, pathname],
  )

  const value = useMemo<AppActions>(
    () => ({
      startProject,
      preset,
      contactOpen,
      openContact: () => setContactOpen(true),
      closeContact: () => setContactOpen(false),
      searchOpen,
      openSearch: () => setSearchOpen(true),
      closeSearch: () => setSearchOpen(false),
    }),
    [startProject, preset, contactOpen, searchOpen],
  )

  return <AppActionsContext.Provider value={value}>{children}</AppActionsContext.Provider>
}

// oxlint-disable-next-line react/only-export-components
export function useAppActions(): AppActions {
  const ctx = useContext(AppActionsContext)
  if (!ctx) throw new Error('useAppActions must be used within AppActionsProvider')
  return ctx
}
