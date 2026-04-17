import { useEffect } from 'react'
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'
import { useMisPerStore } from '../../store'
import { IppMarker } from './IppMarker'
import { RvMarker } from './RvMarker'
import { SearchSectorLayer } from './SearchSectorLayer'
import { SearchRadiusLayer } from './SearchRadiusLayer'
import { SearcherMarker } from './SearcherMarker'
import { BreadcrumbTrack } from './BreadcrumbTrack'
import { DrawControl } from './DrawControl'
import { MapLegend } from './MapLegend'

// Default to central England
const DEFAULT_CENTRE: [number, number] = [52.5, -1.5]
const DEFAULT_ZOOM = 12

function MapClickHandler() {
  const { mapMode, setMapMode, updateIpp, addRvPoint, activeEvent } = useMisPerStore()

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng
      if (mapMode === 'ipp-pick') {
        updateIpp({ lat, lng })
        setMapMode('normal')
      } else if (mapMode === 'rv-drop' && activeEvent) {
        const label = `RV${Date.now().toString().slice(-4)}`
        addRvPoint({ lat, lng }, label)
        setMapMode('normal')
      }
    },
  })

  return null
}

function MapCentreSync() {
  const { activeEvent } = useMisPerStore()
  const map = useMapEvents({})

  useEffect(() => {
    if (activeEvent) {
      map.setView([activeEvent.ipp.lat, activeEvent.ipp.lng], DEFAULT_ZOOM, { animate: true })
    }
  // Only re-centre when the active event ID changes (new event created)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeEvent?.id])

  return null
}

export function OperationalMap() {
  const { searchers, breadcrumbs, rvPoints, mapMode, activeEvent } = useMisPerStore()

  return (
    <div
      className={`misper-map-container ${
        mapMode !== 'normal' ? 'cursor-crosshair' : ''
      }`}
    >
      {mapMode !== 'normal' && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-[1500] bg-police-blue-800 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg pointer-events-none">
          {mapMode === 'ipp-pick' ? 'Click map to set IPP' : 'Click map to drop RV pin'}
        </div>
      )}

      <MapContainer
        center={activeEvent ? [activeEvent.ipp.lat, activeEvent.ipp.lng] : DEFAULT_CENTRE}
        zoom={DEFAULT_ZOOM}
        style={{ height: '100%', width: '100%' }}
        zoomControl
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        <MapClickHandler />
        <MapCentreSync />
        <DrawControl />
        <MapLegend />

        {activeEvent && <IppMarker />}

        {rvPoints.map((rv) => (
          <RvMarker key={rv.id} rv={rv} />
        ))}

        <SearchSectorLayer />
        <SearchRadiusLayer />

        {searchers.map((searcher) => (
          <SearcherMarker key={searcher.id} searcher={searcher} />
        ))}

        {searchers.map((searcher) => (
          <BreadcrumbTrack
            key={searcher.id}
            searcher={searcher}
            crumbs={breadcrumbs[searcher.id] ?? []}
          />
        ))}
      </MapContainer>
    </div>
  )
}
