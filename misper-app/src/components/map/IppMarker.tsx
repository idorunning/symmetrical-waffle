import L from 'leaflet'
import { Marker, Popup, useMap } from 'react-leaflet'
import { format } from 'date-fns'
import { useMisPerStore } from '../../store'

const IPP_ICON = L.divIcon({
  className: '',
  html: `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <polygon points="16,2 20,12 30,12 22,18 25,29 16,23 7,29 10,18 2,12 12,12" fill="#1e3a8a" stroke="white" stroke-width="1.5"/>
  </svg>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -18],
})

export function IppMarker() {
  const { activeEvent, updateIpp } = useMisPerStore()
  const map = useMap()

  if (!activeEvent) return null

  function handleDragEnd(e: L.DragEndEvent) {
    const pos = (e.target as L.Marker).getLatLng()
    updateIpp({ lat: pos.lat, lng: pos.lng })
  }

  // Centre map on IPP when it first loads
  void map

  return (
    <Marker
      position={[activeEvent.ipp.lat, activeEvent.ipp.lng]}
      icon={IPP_ICON}
      draggable
      eventHandlers={{ dragend: handleDragEnd }}
    >
      <Popup>
        <div className="text-xs space-y-1">
          <div className="font-semibold text-police-blue-800">Initial Planning Point (IPP)</div>
          <div>Lat: {activeEvent.ipp.lat.toFixed(6)}</div>
          <div>Lng: {activeEvent.ipp.lng.toFixed(6)}</div>
          <div className="text-gray-500">Created: {format(new Date(activeEvent.createdAt), 'dd/MM/yyyy HH:mm:ss')}</div>
          <div className="text-gray-500 italic">Drag marker to reposition IPP</div>
        </div>
      </Popup>
    </Marker>
  )
}
