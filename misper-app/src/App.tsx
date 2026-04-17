import { useEffect } from 'react'
import { AppShell } from './components/layout/AppShell'
import { useMisPerStore } from './store'
import { BehaviouralCategory } from './types'

// Seed a demo event so the app is not blank on first load
function useSeedEvent() {
  const { createEvent, activeEvent } = useMisPerStore()

  useEffect(() => {
    if (activeEvent) return

    createEvent(
      'CAD-2026-04-17-001',
      {
        firstName: 'George',
        lastName: 'Hartley',
        age: 78,
        gender: 'Male',
        behaviouralCategory: BehaviouralCategory.Dementia,
        additionalNotes: 'Last seen wearing blue jacket near Tesco on High Street. Known to wander towards old home address.',
      },
      { lat: 51.5074, lng: -0.1278 }, // Central London for demo
    )
  // Only seed once
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default function App() {
  useSeedEvent()
  return <AppShell />
}
