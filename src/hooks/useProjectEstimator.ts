import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import { estimatorConfig } from '../data/pricing'
import type { ProjectDraft, ProjectErrors, ProjectField } from '../types/project'
import { calculateEstimate } from '../utils/pricingCalculator'
import { resolveDeadlineDays, validateProject } from '../utils/projectValidation'
import { readStorage, writeStorage } from '../utils/storage'

export const PROJECT_DRAFT_KEY = 'meridian:project-draft:v1'

export const initialProject: ProjectDraft = {
  academicLevel: '',
  projectType: '',
  service: '',
  subject: '',
  wordCount: estimatorConfig.words.default,
  deadline: '',
  customDeadline: '',
  citationStyle: '',
  requirements: '',
  applyFirstProjectDiscount: true,
}

type Action =
  | { type: 'set'; field: ProjectField; value: ProjectDraft[ProjectField] }
  | { type: 'merge'; values: Partial<ProjectDraft> }
  | { type: 'reset' }

function reducer(state: ProjectDraft, action: Action): ProjectDraft {
  switch (action.type) {
    case 'set':
      return state[action.field] === action.value ? state : { ...state, [action.field]: action.value }
    case 'merge':
      return { ...state, ...action.values }
    case 'reset':
      return initialProject
  }
}

/** The builder draft saved on this device (also read by the client portal). */
export function loadDraft(): ProjectDraft {
  const saved = readStorage<Partial<ProjectDraft> | null>(PROJECT_DRAFT_KEY, null)
  return saved ? { ...initialProject, ...saved } : initialProject
}

/**
 * Centralised state for the project builder: draft values, validation and the live estimate.
 * The draft is remembered on this device only, as a convenience.
 */
export function useProjectEstimator() {
  const [project, dispatch] = useReducer(reducer, undefined, loadDraft)
  const [errors, setErrors] = useState<ProjectErrors>({})

  useEffect(() => {
    const id = window.setTimeout(() => writeStorage(PROJECT_DRAFT_KEY, project), 300)
    return () => window.clearTimeout(id)
  }, [project])

  const setField = useCallback(<K extends ProjectField>(field: K, value: ProjectDraft[K]) => {
    dispatch({ type: 'set', field, value })
    setErrors((current) => {
      if (!current[field] && !(field === 'deadline' && current.customDeadline)) return current
      const next = { ...current }
      delete next[field]
      if (field === 'deadline') delete next.customDeadline
      return next
    })
  }, [])

  const merge = useCallback((values: Partial<ProjectDraft>) => {
    dispatch({ type: 'merge', values })
    setErrors((current) => {
      const next = { ...current }
      for (const key of Object.keys(values) as ProjectField[]) delete next[key]
      return next
    })
  }, [])

  const reset = useCallback(() => {
    dispatch({ type: 'reset' })
    setErrors({})
  }, [])

  /** Validates the given fields (or all), stores errors, returns true when valid. */
  const validate = useCallback(
    (fields?: readonly ProjectField[]) => {
      const found = validateProject(project, fields)
      setErrors((current) => {
        const next = { ...current }
        for (const field of fields ?? (Object.keys(project) as ProjectField[])) delete next[field]
        if (!fields || fields.includes('deadline')) delete next.customDeadline
        return { ...next, ...found }
      })
      return Object.keys(found).length === 0
    },
    [project],
  )

  const deadlineDays = resolveDeadlineDays(project)

  const estimate = useMemo(
    () =>
      calculateEstimate({
        academicLevel: project.academicLevel,
        projectType: project.projectType,
        service: project.service,
        subject: project.subject,
        wordCount: project.wordCount,
        deadlineDays,
        applyFirstProjectDiscount: project.applyFirstProjectDiscount,
      }),
    [
      project.academicLevel,
      project.projectType,
      project.service,
      project.subject,
      project.wordCount,
      deadlineDays,
      project.applyFirstProjectDiscount,
    ],
  )

  return { project, errors, estimate, setField, merge, reset, validate }
}

export type ProjectEstimator = ReturnType<typeof useProjectEstimator>
