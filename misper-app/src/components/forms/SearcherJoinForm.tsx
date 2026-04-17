import { useState } from 'react'
import { X } from 'lucide-react'
import { useMisPerStore } from '../../store'

interface SearcherJoinFormProps {
  onClose: () => void
}

export function SearcherJoinForm({ onClose }: SearcherJoinFormProps) {
  const { activeEvent, joinSearcher } = useMisPerStore()
  const [callsign, setCallsign] = useState('')
  const [error, setError]       = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!callsign.trim()) {
      setError('Callsign is required.')
      return
    }
    if (!activeEvent) {
      setError('No active search event.')
      return
    }
    joinSearcher(callsign.trim().toUpperCase(), activeEvent.cadReference)
    onClose()
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-sm">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-base font-bold text-police-blue-800 dark:text-police-blue-200">
          Join Search
        </h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="px-5 py-4 space-y-4">
        {activeEvent && (
          <div className="bg-police-blue-50 dark:bg-police-blue-900/20 rounded px-3 py-2 text-xs text-police-blue-700 dark:text-police-blue-300">
            CAD: <span className="font-mono font-bold">{activeEvent.cadReference}</span>
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Callsign *
          </label>
          <input
            className="input-field font-mono uppercase tracking-wider"
            placeholder="e.g. ALPHA-1"
            value={callsign}
            onChange={(e) => { setCallsign(e.target.value); setError('') }}
            autoFocus
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-gray-100 dark:border-gray-700">
          <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
          <button type="submit" className="btn-primary">Join Search</button>
        </div>
      </form>
    </div>
  )
}
