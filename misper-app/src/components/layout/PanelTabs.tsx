import { Users, ScrollText, BarChart2 } from 'lucide-react'
import { useMisPerStore } from '../../store'
import type { RightPanelTab } from '../../store/uiSlice'
import { SearcherPanel } from '../panels/SearcherPanel'
import { EventLogPanel } from '../panels/EventLogPanel'
import { PredictivePanel } from '../panels/PredictivePanel'

const TABS: { id: RightPanelTab; label: string; Icon: React.ElementType }[] = [
  { id: 'searchers', label: 'Searchers', Icon: Users },
  { id: 'log',       label: 'Event Log', Icon: ScrollText },
  { id: 'analytics', label: 'Analytics', Icon: BarChart2 },
]

export function PanelTabs() {
  const { rightPanelTab, setRightPanelTab } = useMisPerStore()

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700">
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setRightPanelTab(id)}
            className={`flex-1 flex items-center justify-center gap-1 py-2.5 text-xs font-medium transition-colors ${
              rightPanelTab === id
                ? 'text-police-blue-700 border-b-2 border-police-blue-700 bg-white dark:bg-gray-800 dark:text-police-blue-300 dark:border-police-blue-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-hidden">
        {rightPanelTab === 'searchers' && <SearcherPanel />}
        {rightPanelTab === 'log'       && <EventLogPanel />}
        {rightPanelTab === 'analytics' && <PredictivePanel />}
      </div>
    </div>
  )
}
