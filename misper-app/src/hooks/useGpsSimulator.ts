import { useEffect, useRef } from 'react'
import { useMisPerStore } from '../store'
import { destinationPoint, clampBearing } from '../utils/geoUtils'
import type { Breadcrumb } from '../types'

const TICK_MS = 3000
const MIN_STEP_M = 20
const MAX_STEP_M = 80

export function useGpsSimulator() {
  const {
    simulatorRunning,
    searchers,
    breadcrumbs,
    activeEvent,
  } = useMisPerStore()

  // Per-searcher bearing state held in a ref (not store — no re-render needed)
  const bearingsRef = useRef<Record<string, number>>({})

  useEffect(() => {
    if (!simulatorRunning || !activeEvent) return

    const id = setInterval(() => {
      const deployed = useMisPerStore.getState().searchers.filter((s) => s.status === 'Deployed')

      for (const searcher of deployed) {
        // Initialise bearing on first tick
        if (bearingsRef.current[searcher.id] === undefined) {
          bearingsRef.current[searcher.id] = Math.random() * 360
        }

        const crumbs = useMisPerStore.getState().breadcrumbs[searcher.id] ?? []
        const lastPos =
          crumbs.length > 0
            ? crumbs[crumbs.length - 1]!.position
            : useMisPerStore.getState().activeEvent?.ipp ?? { lat: 51.5074, lng: -0.1278 }

        // Drift bearing slightly each tick
        const drift = (Math.random() - 0.5) * 30
        const bearing = clampBearing(bearingsRef.current[searcher.id]! + drift)
        bearingsRef.current[searcher.id] = bearing

        const step = MIN_STEP_M + Math.random() * (MAX_STEP_M - MIN_STEP_M)
        const speed = step / (TICK_MS / 1000)

        const newPos = destinationPoint(lastPos, step, bearing)

        const crumb: Breadcrumb = {
          id: crypto.randomUUID(),
          searcherId: searcher.id,
          position: newPos,
          deviceTimestamp: new Date().toISOString(),
          accuracy: 3 + Math.random() * 5,
          speed,
          bearing,
        }

        useMisPerStore.getState().appendBreadcrumb(crumb)
      }
    }, TICK_MS)

    return () => clearInterval(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [simulatorRunning, activeEvent?.id])

  // Silence unused var warning — consumed via store getter in interval
  void searchers
  void breadcrumbs
}
