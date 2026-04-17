import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { Radio, Shield, AlertCircle } from 'lucide-react'
import { useMisPerStore } from '../../store'
import { getQueueLength, clearQueue } from '../../utils/offlineBuffer'
import type { UserRole } from '../../types'

const ROLE_OPTIONS: UserRole[] = ['Commander', 'PolSA', 'Searcher']

export function TopBar() {
  const { activeEvent, currentUser, setCurrentUser, openModal, appendLogEntry } = useMisPerStore()
  const [clock, setClock] = useState(() => format(new Date(), 'HH:mm:ss'))
  const [bufferCount, setBufferCount] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setClock(format(new Date(), 'HH:mm:ss'))
      setBufferCount(getQueueLength())
    }, 1000)
    return () => clearInterval(id)
  }, [])

  function handleSimulateSync() {
    const count = getQueueLength()
    clearQueue()
    setBufferCount(0)
    appendLogEntry(
      'OFFLINE_BUFFER_FLUSHED',
      currentUser.callsign,
      `Offline buffer flushed — ${count} breadcrumb(s) synchronised.`,
    )
  }

  function handleRoleChange(role: UserRole) {
    setCurrentUser({ ...currentUser, role })
  }

  return (
    <header className="h-14 bg-police-blue-800 text-white flex items-center justify-between px-4 shadow-lg z-50 relative">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-police-blue-300" />
          <span className="font-bold text-base tracking-wide">MisPer C2</span>
        </div>
        {activeEvent ? (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-police-blue-300">|</span>
            <span className="font-mono text-yellow-300 font-semibold">{activeEvent.cadReference}</span>
            <span className="text-police-blue-300">|</span>
            <span className="text-white/80">
              {activeEvent.misper.firstName} {activeEvent.misper.lastName}
            </span>
            <span className="badge bg-green-600 text-white">ACTIVE</span>
          </div>
        ) : (
          <span className="text-police-blue-300 text-sm italic">No active event</span>
        )}
      </div>

      <div className="flex items-center gap-3 text-sm">
        {bufferCount > 0 && (
          <button
            onClick={handleSimulateSync}
            className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-black font-medium px-2 py-1 rounded text-xs transition-colors"
            title="Simulate backend sync — flush offline buffer"
          >
            <Radio className="w-3 h-3" />
            Buffered: {bufferCount} — Sync
          </button>
        )}

        <div className="flex items-center gap-1 text-police-blue-200">
          <AlertCircle className="w-3.5 h-3.5" />
          <select
            value={currentUser.role}
            onChange={(e) => handleRoleChange(e.target.value as UserRole)}
            className="bg-police-blue-700 text-white text-xs rounded px-1 py-0.5 border border-police-blue-600 focus:outline-none"
          >
            {ROLE_OPTIONS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <span className="text-police-blue-200 text-xs">{currentUser.callsign}</span>
        <span className="text-police-blue-300">|</span>
        <span className="font-mono text-xs text-police-blue-100">{clock}</span>

        {!activeEvent && (
          <button onClick={() => openModal('newEvent')} className="btn-primary text-xs">
            + New Event
          </button>
        )}
      </div>
    </header>
  )
}
