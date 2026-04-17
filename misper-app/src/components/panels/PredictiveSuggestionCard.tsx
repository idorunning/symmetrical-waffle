import { TrendingUp, AlertCircle, Info } from 'lucide-react'
import type { PredictiveSuggestion } from '../../types'

const CONFIDENCE_STYLES = {
  High:   'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  Low:    'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
}

interface PredictiveSuggestionCardProps {
  suggestion: PredictiveSuggestion
  onPlotRadii: () => void
}

export function PredictiveSuggestionCard({ suggestion, onPlotRadii }: PredictiveSuggestionCardProps) {
  const { statistics: s, p50RadiusMetres, p95RadiusMetres, confidence } = suggestion

  return (
    <div className="space-y-3">
      {/* Confidence + category */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4 text-police-blue-600 dark:text-police-blue-400" />
          <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{s.category}</span>
        </div>
        <span className={`badge ${CONFIDENCE_STYLES[confidence]}`}>
          {confidence} confidence
        </span>
      </div>

      {/* Statistical distances */}
      <div className="grid grid-cols-3 gap-2 text-center">
        {[
          { label: '50th Percentile', value: `${(p50RadiusMetres / 1000).toFixed(1)} km`, sub: `${Math.round(p50RadiusMetres)} m`, colour: 'text-blue-600 dark:text-blue-400' },
          { label: '95th Percentile', value: `${(p95RadiusMetres / 1000).toFixed(1)} km`, sub: `${Math.round(p95RadiusMetres)} m`, colour: 'text-indigo-600 dark:text-indigo-400' },
          { label: 'Mean Distance', value: `${s.meanDistanceKm.toFixed(1)} km`, sub: `${Math.round(s.meanDistanceKm * 1000)} m`, colour: 'text-violet-600 dark:text-violet-400' },
        ].map(({ label, value, sub, colour }) => (
          <div key={label} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2">
            <div className={`text-base font-bold ${colour}`}>{value}</div>
            <div className="text-[10px] text-gray-400 dark:text-gray-500">{sub}</div>
            <div className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight">{label}</div>
          </div>
        ))}
      </div>

      {/* Mortality / self-resolution */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-red-50 dark:bg-red-900/10 rounded px-2 py-1.5 text-center">
          <div className="text-sm font-bold text-red-700 dark:text-red-400">{s.foundDeceased}%</div>
          <div className="text-[10px] text-red-600 dark:text-red-500">Found deceased</div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/10 rounded px-2 py-1.5 text-center">
          <div className="text-sm font-bold text-green-700 dark:text-green-400">{s.selfResolution}%</div>
          <div className="text-[10px] text-green-600 dark:text-green-500">Self-resolution</div>
        </div>
      </div>

      {/* Typical environments */}
      <div>
        <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
          Typical Search Environments
        </div>
        <div className="flex flex-wrap gap-1">
          {s.typicalEnvironments.map((env) => (
            <span
              key={env}
              className="badge bg-police-blue-50 text-police-blue-700 dark:bg-police-blue-900/20 dark:text-police-blue-300"
            >
              {env}
            </span>
          ))}
        </div>
      </div>

      {/* Mobility notes */}
      <div className="bg-amber-50 dark:bg-amber-900/10 rounded-lg p-2.5 flex gap-2">
        <AlertCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">{s.mobilityNotes}</p>
      </div>

      {/* Source */}
      <div className="flex items-center gap-1 text-[10px] text-gray-400 dark:text-gray-500">
        <Info className="w-3 h-3" />
        <span>Source: {s.source}</span>
      </div>

      {/* Plot radii button */}
      <button onClick={onPlotRadii} className="btn-primary w-full text-xs">
        Plot Search Radii on Map
      </button>
    </div>
  )
}
