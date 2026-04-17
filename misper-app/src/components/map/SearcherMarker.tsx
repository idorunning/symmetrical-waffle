import L from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import { format } from 'date-fns'
import type { Searcher } from '../../types'

function makeSearcherIcon(callsign: string, colour: string) {
  return L.divIcon({
    className: '',
    html: `<div style="background:${colour};color:white;border:2px solid white;border-radius:50%;
      width:32px;height:32px;display:flex;align-items:center;justify-content:center;
      font-size:8px;font-weight:700;box-shadow:0 2px 6px rgba(0,0,0,.4);
      text-align:center;line-height:1.1;">${callsign.slice(0, 6)}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18],
  })
}

interface SearcherMarkerProps {
  searcher: Searcher
}

export function SearcherMarker({ searcher }: SearcherMarkerProps) {
  if (!searcher.lastKnownPosition || searcher.status === 'StoodDown') return null

  return (
    <Marker
      position={[searcher.lastKnownPosition.lat, searcher.lastKnownPosition.lng]}
      icon={makeSearcherIcon(searcher.callsign, searcher.displayColour)}
    >
      <Popup>
        <div className="text-xs space-y-1">
          <div className="font-semibold" style={{ color: searcher.displayColour }}>
            {searcher.callsign}
          </div>
          <div>Status: {searcher.status}</div>
          <div>Lat: {searcher.lastKnownPosition.lat.toFixed(6)}</div>
          <div>Lng: {searcher.lastKnownPosition.lng.toFixed(6)}</div>
          {searcher.lastPositionAt && (
            <div className="text-gray-500">
              Last fix: {format(new Date(searcher.lastPositionAt), 'HH:mm:ss')}
            </div>
          )}
        </div>
      </Popup>
    </Marker>
  )
}
