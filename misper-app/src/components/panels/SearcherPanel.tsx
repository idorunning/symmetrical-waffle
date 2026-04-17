import { UserPlus, MapPin } from 'lucide-react'
import { useMisPerStore } from '../../store'
import { SearcherCard } from './SearcherCard'
import { useGpsSimulator } from '../../hooks/useGpsSimulator'

export function SearcherPanel() {
  const {
    searchers,
    breadcrumbs,
    simulatorRunning,
    setSimulatorRunning,
    activeEvent,
    currentUser,
    openModal,
    setMapMode,
  } = useMisPerStore()

  useGpsSimulator()

  const deployed = searchers.filter((s) => s.status !== 'StoodDown')
  const stoodDown = searchers.filter((s) => s.status === 'StoodDown')

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-3 py-2.5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
            Searchers
            {deployed.length > 0 && (
              <span className="ml-1.5 badge bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                {deployed.length} deployed
              </span>
            )}
          </span>
          {currentUser.role !== 'Searcher' && activeEvent && (
            <button
              onClick={() => openModal('joinSearcher')}
              className="flex items-center gap-1 text-xs text-police-blue-700 dark:text-police-blue-300 hover:underline font-medium"
            >
              <UserPlus className="w-3.5 h-3.5" />
              Join
            </button>
          )}
        </div>
      </div>

      {/* Searcher list */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-3 py-2 space-y-2">
        {searchers.length === 0 && (
          <div className="text-center text-xs text-gray-400 dark:text-gray-500 py-8">
            {activeEvent ? 'No searchers have joined yet.' : 'Create a search event to begin.'}
          </div>
        )}

        {deployed.map((s) => (
          <SearcherCard
            key={s.id}
            searcher={s}
            crumbCount={breadcrumbs[s.id]?.length ?? 0}
          />
        ))}

        {stoodDown.length > 0 && (
          <>
            <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 pt-2 uppercase tracking-wide">
              Stood Down
            </div>
            {stoodDown.map((s) => (
              <SearcherCard
                key={s.id}
                searcher={s}
                crumbCount={breadcrumbs[s.id]?.length ?? 0}
              />
            ))}
          </>
        )}
      </div>

      {/* Controls */}
      {activeEvent && (
        <div className="px-3 py-3 border-t border-gray-200 dark:border-gray-700 space-y-2">
          {/* GPS Simulator toggle */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">GPS Simulator</span>
            <button
              onClick={() => setSimulatorRunning(!simulatorRunning)}
              disabled={deployed.length === 0}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                simulatorRunning ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
              } disabled:opacity-40`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                  simulatorRunning ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          {/* Drop RV button */}
          {currentUser.role !== 'Searcher' && (
            <button
              onClick={() => setMapMode('rv-drop')}
              className="btn-secondary w-full flex items-center justify-center gap-1.5 text-xs"
            >
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              Drop RV Pin
            </button>
          )}
        </div>
      )}
    </div>
  )
}
