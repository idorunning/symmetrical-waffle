import { useMemo } from 'react'
import { BarChart2 } from 'lucide-react'
import { useMisPerStore } from '../../store'
import { generateSuggestion } from '../../utils/predictiveEngine'
import { PredictiveSuggestionCard } from './PredictiveSuggestionCard'

export function PredictivePanel() {
  const { activeEvent, addRadius, appendLogEntry, currentUser } = useMisPerStore()

  const suggestion = useMemo(() => {
    if (!activeEvent) return null
    try {
      return generateSuggestion(activeEvent.misper)
    } catch {
      return null
    }
  }, [activeEvent?.misper])

  function handlePlotRadii() {
    if (!suggestion || !activeEvent) return
    const ipp = activeEvent.ipp

    addRadius(ipp, suggestion.p50RadiusMetres, '50th Percentile Search Radius', '#3b82f6')
    addRadius(ipp, suggestion.p95RadiusMetres, '95th Percentile Search Radius', '#6366f1')

    appendLogEntry(
      'ANALYTICS_QUERIED',
      currentUser.callsign,
      `Predictive analytics queried for ${activeEvent.misper.behaviouralCategory}. ` +
        `50th pct: ${(suggestion.p50RadiusMetres / 1000).toFixed(2)} km, ` +
        `95th pct: ${(suggestion.p95RadiusMetres / 1000).toFixed(2)} km. ` +
        `Radii plotted on map.`,
    )
  }

  if (!activeEvent) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-4">
        <BarChart2 className="w-8 h-8 text-gray-300 dark:text-gray-600 mb-2" />
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Create a search event to generate predictive search parameters.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-thin">
      {/* MisPer summary */}
      <div className="px-3 py-2.5 bg-police-blue-50 dark:bg-police-blue-900/20 border-b border-police-blue-100 dark:border-police-blue-800">
        <div className="text-xs font-bold text-police-blue-800 dark:text-police-blue-200">
          {activeEvent.misper.firstName} {activeEvent.misper.lastName}
        </div>
        <div className="text-xs text-police-blue-600 dark:text-police-blue-400">
          {activeEvent.misper.age}y · {activeEvent.misper.gender} · {activeEvent.misper.behaviouralCategory}
        </div>
      </div>

      <div className="px-3 py-3">
        {suggestion ? (
          <PredictiveSuggestionCard suggestion={suggestion} onPlotRadii={handlePlotRadii} />
        ) : (
          <p className="text-xs text-red-500">Unable to generate suggestion for this profile.</p>
        )}
      </div>
    </div>
  )
}
