import { useRef, useState, useEffect } from 'react'
import { CheckCircle, AlertTriangle, Lock } from 'lucide-react'
import { useMisPerStore } from '../../store'
import { verifyChain } from '../../utils/hashChain'
import { format } from 'date-fns'
import type { EventLogEntry } from '../../types'

const ENTRY_TYPE_COLOURS: Record<string, string> = {
  EVENT_CREATED:          'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  SEARCHER_JOINED:        'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  SEARCHER_STOOD_DOWN:    'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  IPP_SET:                'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  RV_PLACED:              'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  RV_REMOVED:             'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
  SECTOR_DRAWN:           'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
  RADIUS_DRAWN:           'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300',
  SECTOR_STATUS_CHANGED:  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  ANALYTICS_QUERIED:      'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
  MANUAL_LOG:             'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  OFFLINE_BUFFER_FLUSHED: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',
}

function LogRow({ entry, valid }: { entry: EventLogEntry; valid: boolean }) {
  const colourClass = ENTRY_TYPE_COLOURS[entry.entryType] ?? 'bg-gray-100 text-gray-600'

  return (
    <div className={`p-2.5 rounded border-l-2 ${valid ? 'border-green-400' : 'border-red-500'} bg-white dark:bg-gray-800 text-xs space-y-1`}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          <span className="font-mono text-gray-400 text-[10px]">#{entry.sequenceNumber}</span>
          <span className={`badge shrink-0 ${colourClass}`}>
            {entry.entryType.replace(/_/g, ' ')}
          </span>
        </div>
        <span className="font-mono text-gray-400 text-[10px] shrink-0" title={`Hash: ${entry.hash}`}>
          {entry.hash.slice(0, 8)}…
        </span>
      </div>
      <div className="text-gray-700 dark:text-gray-300 leading-snug">{entry.details}</div>
      <div className="flex items-center justify-between text-[10px] text-gray-400 dark:text-gray-500">
        <span>{entry.actor}</span>
        <span className="font-mono">{format(new Date(entry.deviceTimestamp), 'dd/MM/yy HH:mm:ss')}</span>
      </div>
    </div>
  )
}

export function EventLogPanel() {
  const { logEntries, appendLogEntry, currentUser } = useMisPerStore()
  const [manualEntry, setManualEntry] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const chainValid = verifyChain(logEntries)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logEntries.length])

  function handleManualEntry(e: React.FormEvent) {
    e.preventDefault()
    if (!manualEntry.trim()) return
    appendLogEntry('MANUAL_LOG', currentUser.callsign, manualEntry.trim())
    setManualEntry('')
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chain integrity header */}
      <div className={`flex items-center gap-2 px-3 py-2 text-xs font-medium ${
        chainValid
          ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-b border-green-200 dark:border-green-800'
          : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-b border-red-200 dark:border-red-800'
      }`}>
        {chainValid ? (
          <CheckCircle className="w-3.5 h-3.5" />
        ) : (
          <AlertTriangle className="w-3.5 h-3.5" />
        )}
        <span>Chain integrity: {chainValid ? 'VERIFIED' : 'COMPROMISED'}</span>
        <Lock className="w-3 h-3 ml-auto" />
        <span className="text-[10px] opacity-70">{logEntries.length} entries</span>
      </div>

      {/* Log feed */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-3 py-2 space-y-1.5">
        {logEntries.length === 0 && (
          <div className="text-center text-xs text-gray-400 dark:text-gray-500 py-8">
            No log entries yet. Create a search event to begin.
          </div>
        )}
        {logEntries.map((entry, i) => (
          <LogRow
            key={entry.id}
            entry={entry}
            valid={
              chainValid ||
              // Still show individual validity if chain has been tampered beyond this point
              (() => {
                const prev = i === 0 ? '0'.repeat(64) : logEntries[i - 1]!.hash
                return entry.prevHash === prev
              })()
            }
          />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Manual log entry */}
      <div className="px-3 py-3 border-t border-gray-200 dark:border-gray-700">
        <form onSubmit={handleManualEntry} className="flex gap-2">
          <input
            className="input-field flex-1 text-xs"
            placeholder="Add manual log entry…"
            value={manualEntry}
            onChange={(e) => setManualEntry(e.target.value)}
          />
          <button type="submit" className="btn-primary text-xs px-2.5 py-1.5">
            Add
          </button>
        </form>
      </div>
    </div>
  )
}
