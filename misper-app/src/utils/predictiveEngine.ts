import { KOESTER_STATISTICS } from '../data/misperStatistics'
import { BehaviouralCategory } from '../types'
import type { MisPerProfile, PredictiveSuggestion } from '../types'

// Determines confidence based on how well the subject's age fits the category's typical population.
function deriveConfidence(category: BehaviouralCategory, age: number): 'High' | 'Medium' | 'Low' {
  switch (category) {
    case BehaviouralCategory.Dementia:
      if (age >= 65) return 'High'
      if (age >= 50) return 'Medium'
      return 'Low'
    case BehaviouralCategory.Juvenile:
      if (age <= 15) return 'High'
      if (age <= 18) return 'Medium'
      return 'Low'
    case BehaviouralCategory.Autism:
      if (age <= 20 || age >= 50) return 'High'
      return 'Medium'
    case BehaviouralCategory.Despondent:
      if (age >= 18) return 'High'
      return 'Medium'
    case BehaviouralCategory.SubstanceMisuse:
      if (age >= 16 && age <= 50) return 'High'
      if (age >= 16) return 'Medium'
      return 'Low'
    case BehaviouralCategory.MentalHealth:
      if (age >= 16 && age <= 65) return 'High'
      return 'Medium'
    case BehaviouralCategory.LostBenign:
      return 'High'
  }
}

export function generateSuggestion(profile: MisPerProfile): PredictiveSuggestion {
  const stats = KOESTER_STATISTICS.find((r) => r.category === profile.behaviouralCategory)
  if (!stats) throw new Error(`No statistics for category: ${profile.behaviouralCategory}`)

  return {
    profile,
    statistics: stats,
    p50RadiusMetres: stats.p50RadiusKm * 1000,
    p95RadiusMetres: stats.p95RadiusKm * 1000,
    confidence: deriveConfidence(profile.behaviouralCategory, profile.age),
    generatedAt: new Date().toISOString(),
  }
}
