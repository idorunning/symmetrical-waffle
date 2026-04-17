import type { StateCreator } from 'zustand'
import type { SearchEvent, LatLng, MisPerProfile } from '../types'
import type { BoundStore } from './index'

export interface EventSlice {
  activeEvent: SearchEvent | null
  createEvent: (
    cadReference: string,
    misper: MisPerProfile,
    ipp: LatLng,
  ) => void
  updateIpp: (position: LatLng) => void
  closeEvent: () => void
}

export const createEventSlice: StateCreator<BoundStore, [], [], EventSlice> = (set, get) => ({
  activeEvent: null,

  createEvent: (cadReference, misper, ipp) => {
    const { currentUser, appendLogEntry } = get()
    const event: SearchEvent = {
      id: crypto.randomUUID(),
      cadReference,
      misper,
      ipp,
      createdAt: new Date().toISOString(),
      createdBy: currentUser.callsign,
      isActive: true,
    }
    set({ activeEvent: event })
    appendLogEntry(
      'EVENT_CREATED',
      currentUser.callsign,
      `Search event created. CAD: ${cadReference}. MisPer: ${misper.firstName} ${misper.lastName}, ` +
        `${misper.age}y, ${misper.behaviouralCategory}. IPP: ${ipp.lat.toFixed(5)}, ${ipp.lng.toFixed(5)}.`,
    )
  },

  updateIpp: (position) => {
    const { activeEvent, currentUser, appendLogEntry } = get()
    if (!activeEvent) return
    set({ activeEvent: { ...activeEvent, ipp: position } })
    appendLogEntry(
      'IPP_SET',
      currentUser.callsign,
      `IPP updated to ${position.lat.toFixed(5)}, ${position.lng.toFixed(5)}.`,
    )
  },

  closeEvent: () => {
    const { currentUser, appendLogEntry } = get()
    appendLogEntry('MANUAL_LOG', currentUser.callsign, 'Search event concluded by Commander.')
    set({ activeEvent: null })
  },
})
