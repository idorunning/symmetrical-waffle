import { Circle, Popup } from 'react-leaflet'
import { useMisPerStore } from '../../store'

export function SearchRadiusLayer() {
  const { radii } = useMisPerStore()

  return (
    <>
      {radii.map((radius) => (
        <Circle
          key={radius.id}
          center={[radius.centre.lat, radius.centre.lng]}
          radius={radius.radiusMetres}
          pathOptions={{
            color: radius.colour,
            fillColor: radius.colour,
            fillOpacity: 0.06,
            weight: 2,
            dashArray: '6 4',
          }}
        >
          <Popup>
            <div className="text-xs space-y-1">
              <div className="font-semibold" style={{ color: radius.colour }}>{radius.label}</div>
              <div>Radius: {(radius.radiusMetres / 1000).toFixed(2)} km</div>
              <div>Centre: {radius.centre.lat.toFixed(5)}, {radius.centre.lng.toFixed(5)}</div>
              <div className="text-gray-500">Drawn by: {radius.drawnBy}</div>
            </div>
          </Popup>
        </Circle>
      ))}
    </>
  )
}
