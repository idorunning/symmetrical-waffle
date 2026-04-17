import type { StateCreator } from 'zustand'
import type { Searcher, Breadcrumb } from '../types'
import { assignColour } from '../utils/colourPalette'
import { enqueueBreadcrumb } from '../utils/offlineBuffer'
import type { BoundStore } from './index'

export interface SearcherSlice {
  searchers: Searcher[]
  breadcrumbs: Record<string, Breadcrumb[]>
  simulatorRunning: boolean
  joinSearcher: (callsign: string, cadReference: string) => void
  standDownSearcher: (searcherId: string) => void
  appendBreadcrumb: (crumb: Breadcrumb) => void
  setSimulatorRunning: (running: boolean) => void
}

export const createSearcherSlice: StateCreator<BoundStore, [], [], SearcherSlice> = (set, get) => ({
  searchers: [],
  breadcrumbs: {},
  simulatorRunning: false,

  joinSearcher: (callsign, cadReference) => {
    const { currentUser, searchers, breadcrumbs, appendLogEntry } = get()
    const id = crypto.randomUUID()
    const searcher: Searcher = {
      id,
      cadReference,
      callsign,
      displayColour: assignColour(id),
      status: 'Deployed',
      joinedAt: new Date().toISOString(),
    }
    set({
      searchers: [...searchers, searcher],
      breadcrumbs: { ...breadcrumbs, [id]: [] },
    })
    appendLogEntry(
      'SEARCHER_JOINED',
      currentUser.callsign,
      `Searcher ${callsign} joined search. CAD: ${cadReference}.`,
    )
  },

  standDownSearcher: (searcherId) => {
    const { currentUser, searchers, appendLogEntry } = get()
    const searcher = searchers.find((s) => s.id === searcherId)
    if (!searcher) return
    set({
      searchers: searchers.map((s) =>
        s.id === searcherId
          ? { ...s, status: 'StoodDown', stoodDownAt: new Date().toISOString() }
          : s,
      ),
    })
    appendLogEntry(
      'SEARCHER_STOOD_DOWN',
      currentUser.callsign,
      `Searcher ${searcher.callsign} stood down.`,
    )
  },

  appendBreadcrumb: (crumb) => {
    const { breadcrumbs, searchers } = get()
    const existing = breadcrumbs[crumb.searcherId] ?? []
    set({
      breadcrumbs: {
        ...breadcrumbs,
        [crumb.searcherId]: [...existing, crumb],
      },
      searchers: searchers.map((s) =>
        s.id === crumb.searcherId
          ? { ...s, lastKnownPosition: crumb.position, lastPositionAt: crumb.deviceTimestamp }
          : s,
      ),
    })
    // Buffer to LocalStorage for offline resilience simulation
    enqueueBreadcrumb(crumb)
  },

  setSimulatorRunning: (running) => set({ simulatorRunning: running }),
})
