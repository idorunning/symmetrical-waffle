import { useEffect, useRef } from 'react'
import L from 'leaflet'
import { useMap } from 'react-leaflet'

export function MapLegend() {
  const map = useMap()
  const controlRef = useRef<L.Control | null>(null)

  useEffect(() => {
    const LegendControl = L.Control.extend({
      onAdd() {
        const div = L.DomUtil.create('div', '')
        div.innerHTML = `
          <div style="background:white;padding:8px 10px;border-radius:6px;box-shadow:0 2px 6px rgba(0,0,0,.2);font-size:11px;min-width:150px;">
            <div style="font-weight:700;margin-bottom:6px;color:#1e3a8a;">Legend</div>
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
              <svg width="14" height="14" viewBox="0 0 32 32"><polygon points="16,2 20,12 30,12 22,18 25,29 16,23 7,29 10,18 2,12 12,12" fill="#1e3a8a"/></svg>
              <span>IPP</span>
            </div>
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
              <div style="width:14px;height:14px;background:#b91c1c;border-radius:2px;"></div>
              <span>Rendezvous Point</span>
            </div>
            <div style="font-weight:600;margin:6px 0 3px;color:#374151;">Sectors</div>
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:2px;">
              <div style="width:14px;height:10px;background:#9ca3af;opacity:0.5;border:1.5px solid #9ca3af;"></div>
              <span>Unallocated</span>
            </div>
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:2px;">
              <div style="width:14px;height:10px;background:#3b82f6;opacity:0.5;border:1.5px solid #3b82f6;"></div>
              <span>Allocated</span>
            </div>
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:2px;">
              <div style="width:14px;height:10px;background:#f59e0b;opacity:0.5;border:1.5px solid #f59e0b;"></div>
              <span>Searching</span>
            </div>
            <div style="display:flex;align-items:center;gap:6px;">
              <div style="width:14px;height:10px;background:#22c55e;opacity:0.5;border:1.5px solid #22c55e;"></div>
              <span>Cleared</span>
            </div>
          </div>`
        return div
      },
    })

    const ctrl = new LegendControl({ position: 'bottomright' })
    ctrl.addTo(map)
    controlRef.current = ctrl

    return () => {
      ctrl.remove()
    }
  }, [map])

  return null
}
