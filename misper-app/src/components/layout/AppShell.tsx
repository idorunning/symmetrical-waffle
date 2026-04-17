import { TopBar } from './TopBar'
import { PanelTabs } from './PanelTabs'
import { OperationalMap } from '../map/OperationalMap'
import { SearcherPanel } from '../panels/SearcherPanel'
import { SearchEventForm } from '../forms/SearchEventForm'
import { SearcherJoinForm } from '../forms/SearcherJoinForm'
import { useMisPerStore } from '../../store'

export function AppShell() {
  const { modal, closeModal } = useMisPerStore()

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-950 overflow-hidden">
      <TopBar />

      <div className="flex flex-1 overflow-hidden" style={{ display: 'grid', gridTemplateColumns: '320px 1fr 360px' }}>
        {/* Left panel — Searcher management */}
        <aside className="flex flex-col h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-hidden">
          <SearcherPanel />
        </aside>

        {/* Centre — Operational map */}
        <main className="relative h-full overflow-hidden">
          <OperationalMap />
        </main>

        {/* Right panel — Tabbed panels */}
        <aside className="h-full overflow-hidden">
          <PanelTabs />
        </aside>
      </div>

      {/* Modal overlays */}
      {modal !== 'none' && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div onClick={(e) => e.stopPropagation()}>
            {modal === 'newEvent'     && <SearchEventForm onClose={closeModal} />}
            {modal === 'joinSearcher' && <SearcherJoinForm onClose={closeModal} />}
          </div>
        </div>
      )}
    </div>
  )
}
