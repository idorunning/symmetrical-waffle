import L from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import { format } from 'date-fns'
import { MapPin } from 'lucide-react'
import { useMisPerStore } from '../../store'
import type { RVPoint } from '../../types'

function makeRvIcon(label: string) {
  return L.divIcon({
    className: '',
    html: `<div style="background:#b91c1c;color:white;border:2px solid white;border-radius:4px 4px 0 4px;
      padding:2px 5px;font-size:10px;font-weight:700;white-space:nowrap;box-shadow:0 2px 4px rgba(0,0,0,.4);
      transform:translateY(-100%);">${label}</div>
      <div style="width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;
      border-top:8px solid #b91c1c;margin-left:2px;"></div>`,
    iconSize: [60, 32],
    iconAnchor: [6, 32],
    popupAnchor: [24, -36],
  })
}

interface RvMarkerProps {
  rv: RVPoint
}

export function RvMarker({ rv }: RvMarkerProps) {
  const { removeRvPoint, currentUser } = useMisPerStore()

  return (
    <Marker position={[rv.position.lat, rv.position.lng]} icon={makeRvIcon(rv.label)}>
      <Popup>
        <div className="text-xs space-y-1.5 min-w-[160px]">
          <div className="flex items-center gap-1 font-semibold text-red-700">
            <MapPin className="w-3 h-3" />
            {rv.label}
          </div>
          {rv.notes && <div className="text-gray-600 italic">{rv.notes}</div>}
          <div className="text-gray-500">Placed by: {rv.placedBy}</div>
          <div className="text-gray-500">{format(new Date(rv.placedAt), 'dd/MM/yy HH:mm:ss')}</div>
          {currentUser.role !== 'Searcher' && (
            <button
              onClick={() => removeRvPoint(rv.id)}
              className="btn-danger text-xs w-full mt-1"
            >
              Remove RV
            </button>
          )}
        </div>
      </Popup>
    </Marker>
  )
}
