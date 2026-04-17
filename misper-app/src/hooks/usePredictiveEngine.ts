import { useMemo } from 'react'
import { generateSuggestion } from '../utils/predictiveEngine'
import type { MisPerProfile, PredictiveSuggestion } from '../types'

export function usePredictiveEngine(profile: MisPerProfile | null): PredictiveSuggestion | null {
  return useMemo(() => {
    if (!profile) return null
    try {
      return generateSuggestion(profile)
    } catch {
      return null
    }
  }, [profile])
}
