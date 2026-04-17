import { useState } from 'react'
import { Polyline, CircleMarker, Tooltip } from 'react-leaflet'
import { format } from 'date-fns'
import type { Searcher, Breadcrumb } from '../../types'

interface BreadcrumbTrackProps {
  searcher: Searcher
  crumbs: Breadcrumb[]
}

export function BreadcrumbTrack({ searcher, crumbs }: BreadcrumbTrackProps) {
  const [activeId, setActiveId] = useState<string | null>(null)

  if (crumbs.length < 2) return null

  const positions = crumbs.map((c) => [c.position.lat, c.position.lng] as [number, number])

  return (
    <>
      <Polyline
        positions={positions}
        pathOptions={{ color: searcher.displayColour, weight: 2, opacity: 0.75 }}
      />
      {/* Individual clickable points for timestamp interrogation */}
      {crumbs.map((crumb) => (
        <CircleMarker
          key={crumb.id}
          center={[crumb.position.lat, crumb.position.lng]}
          radius={3}
          pathOptions={{
            color: searcher.displayColour,
            fillColor: searcher.displayColour,
            fillOpacity: activeId === crumb.id ? 1 : 0.4,
            weight: 1,
          }}
          eventHandlers={{
            click: () => setActiveId(crumb.id === activeId ? null : crumb.id),
          }}
        >
          {activeId === crumb.id && (
            <Tooltip permanent direction="top" offset={[0, -6]}>
              <div className="text-xs space-y-0.5">
                <div className="font-semibold" style={{ color: searcher.displayColour }}>
                  {searcher.callsign}
                </div>
                <div className="font-mono">
                  {format(new Date(crumb.deviceTimestamp), 'dd/MM/yyyy HH:mm:ss')}
                </div>
                <div className="text-gray-500">
                  {crumb.position.lat.toFixed(6)}, {crumb.position.lng.toFixed(6)}
                </div>
                {crumb.speed !== undefined && (
                  <div className="text-gray-500">{(crumb.speed * 3.6).toFixed(1)} km/h</div>
                )}
              </div>
            </Tooltip>
          )}
        </CircleMarker>
      ))}
    </>
  )
}
