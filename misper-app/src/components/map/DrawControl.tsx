import { useRef, useState } from 'react'
import L from 'leaflet'
import { FeatureGroup } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'
import { useMisPerStore } from '../../store'
import type { LatLng } from '../../types'

let sectorCount = 0

export function DrawControl() {
  const { addSector, addRadius, currentUser } = useMisPerStore()
  const featureGroupRef = useRef<L.FeatureGroup>(null)
  const [, forceUpdate] = useState(0)

  if (currentUser.role === 'Searcher') return null

  function handleCreated(e: Parameters<NonNullable<React.ComponentProps<typeof EditControl>['onCreated']>>[0]) {
    const layer = e.layer

    if (layer instanceof L.Polygon && !(layer instanceof L.Circle)) {
      const latlngs = (layer.getLatLngs()[0] as L.LatLng[]).map(
        (ll): LatLng => ({ lat: ll.lat, lng: ll.lng }),
      )
      sectorCount += 1
      addSector(latlngs, `Sector ${String.fromCharCode(64 + sectorCount)}`)
    } else if (layer instanceof L.Circle) {
      const centre = layer.getLatLng()
      const radius = layer.getRadius()
      addRadius(
        { lat: centre.lat, lng: centre.lng },
        radius,
        `Search Radius ${(radius / 1000).toFixed(2)} km`,
        '#6366f1',
      )
    }

    // Remove the layer from the FeatureGroup — it is now managed by the store/React layer
    featureGroupRef.current?.removeLayer(layer)
    forceUpdate((n) => n + 1)
  }

  return (
    <FeatureGroup ref={featureGroupRef}>
      <EditControl
        position="topleft"
        onCreated={handleCreated}
        draw={{
          polygon: {
            shapeOptions: { color: '#1e3a8a', fillOpacity: 0.1 },
            showArea: true,
          },
          circle: {
            shapeOptions: { color: '#6366f1', fillOpacity: 0.05 },
            showRadius: true,
            metric: true,
          },
          rectangle: false,
          polyline: false,
          marker: false,
          circlemarker: false,
        }}
        edit={{ edit: false, remove: false }}
      />
    </FeatureGroup>
  )
}
