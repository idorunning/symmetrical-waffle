import { Polygon, Popup } from 'react-leaflet'
import { useMisPerStore } from '../../store'
import type { SectorStatus } from '../../types'

const STATUS_COLOURS: Record<SectorStatus, string> = {
  Unallocated: '#9ca3af',
  Allocated:   '#3b82f6',
  Searching:   '#f59e0b',
  Cleared:     '#22c55e',
}

const STATUS_OPTIONS: SectorStatus[] = ['Unallocated', 'Allocated', 'Searching', 'Cleared']

export function SearchSectorLayer() {
  const { sectors, searchers, updateSectorStatus, currentUser } = useMisPerStore()
  const deployedSearchers = searchers.filter((s) => s.status === 'Deployed')

  return (
    <>
      {sectors.map((sector) => {
        const colour = STATUS_COLOURS[sector.status]
        return (
          <Polygon
            key={sector.id}
            positions={sector.polygon.map((p) => [p.lat, p.lng])}
            pathOptions={{ color: colour, fillColor: colour, fillOpacity: 0.2, weight: 2 }}
          >
            <Popup>
              <div className="text-xs space-y-2 min-w-[180px]">
                <div className="font-semibold text-gray-800">{sector.name}</div>
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block"
                    style={{ backgroundColor: colour }}
                  />
                  <span>{sector.status}</span>
                </div>
                {sector.assignedCallsign && (
                  <div className="text-gray-600">Assigned: {sector.assignedCallsign}</div>
                )}
                <div className="text-gray-500">Drawn by: {sector.drawnBy}</div>

                {currentUser.role !== 'Searcher' && (
                  <div className="space-y-1 pt-1 border-t border-gray-200">
                    <div className="text-gray-600 font-medium">Update status:</div>
                    <select
                      value={sector.status}
                      onChange={(e) =>
                        updateSectorStatus(sector.id, e.target.value as SectorStatus)
                      }
                      className="input-field text-xs py-1"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {deployedSearchers.length > 0 && (
                      <select
                        value={sector.assignedCallsign ?? ''}
                        onChange={(e) =>
                          updateSectorStatus(sector.id, sector.status, e.target.value || undefined)
                        }
                        className="input-field text-xs py-1"
                      >
                        <option value="">Unassigned</option>
                        {deployedSearchers.map((s) => (
                          <option key={s.id} value={s.callsign}>{s.callsign}</option>
                        ))}
                      </select>
                    )}
                  </div>
                )}
              </div>
            </Popup>
          </Polygon>
        )
      })}
    </>
  )
}
