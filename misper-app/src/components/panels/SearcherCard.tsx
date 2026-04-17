import { formatDistanceToNow } from 'date-fns'
import { UserMinus, Navigation } from 'lucide-react'
import { useMisPerStore } from '../../store'
import type { Searcher } from '../../types'

interface SearcherCardProps {
  searcher: Searcher
  crumbCount: number
}

const STATUS_STYLES: Record<Searcher['status'], string> = {
  Deployed:   'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  Standby:    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  StoodDown:  'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
}

export function SearcherCard({ searcher, crumbCount }: SearcherCardProps) {
  const { standDownSearcher, currentUser } = useMisPerStore()
  const canStandDown = currentUser.role !== 'Searcher' && searcher.status !== 'StoodDown'

  return (
    <div className={`p-3 rounded-lg border ${searcher.status === 'StoodDown' ? 'opacity-60 border-gray-200 dark:border-gray-700' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'}`}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: searcher.displayColour }}
          />
          <span className="font-mono font-semibold text-sm truncate text-gray-900 dark:text-gray-100">
            {searcher.callsign}
          </span>
          <span className={`badge ${STATUS_STYLES[searcher.status]}`}>
            {searcher.status}
          </span>
        </div>

        {canStandDown && (
          <button
            onClick={() => standDownSearcher(searcher.id)}
            className="flex-shrink-0 text-red-500 hover:text-red-700 transition-colors"
            title="Stand down searcher"
          >
            <UserMinus className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="mt-2 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <Navigation className="w-3 h-3" />
          <span>{crumbCount} fixes</span>
        </div>
        <span>Joined {formatDistanceToNow(new Date(searcher.joinedAt), { addSuffix: true })}</span>
      </div>

      {searcher.stoodDownAt && (
        <div className="mt-1 text-xs text-gray-400 dark:text-gray-500">
          Stood down {formatDistanceToNow(new Date(searcher.stoodDownAt), { addSuffix: true })}
        </div>
      )}
    </div>
  )
}
