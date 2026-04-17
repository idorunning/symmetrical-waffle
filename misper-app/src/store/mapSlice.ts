import type { StateCreator } from 'zustand'
import type { SearchSector, SearchRadius, RVPoint, LatLng, SectorStatus } from '../types'
import type { BoundStore } from './index'

export interface MapSlice {
  sectors: SearchSector[]
  radii: SearchRadius[]
  rvPoints: RVPoint[]
  addSector: (polygon: LatLng[], name: string) => void
  updateSectorStatus: (sectorId: string, status: SectorStatus, assignedCallsign?: string) => void
  addRadius: (centre: LatLng, radiusMetres: number, label: string, colour: string) => void
  addRvPoint: (position: LatLng, label: string, notes?: string) => void
  removeRvPoint: (rvId: string) => void
}

export const createMapSlice: StateCreator<BoundStore, [], [], MapSlice> = (set, get) => ({
  sectors: [],
  radii: [],
  rvPoints: [],

  addSector: (polygon, name) => {
    const { currentUser, sectors, appendLogEntry } = get()
    const sector: SearchSector = {
      id: crypto.randomUUID(),
      name,
      polygon,
      status: 'Unallocated',
      drawnAt: new Date().toISOString(),
      drawnBy: currentUser.callsign,
    }
    set({ sectors: [...sectors, sector] })
    appendLogEntry('SECTOR_DRAWN', currentUser.callsign, `Sector "${name}" drawn with ${polygon.length} vertices.`)
  },

  updateSectorStatus: (sectorId, status, assignedCallsign) => {
    const { currentUser, sectors, appendLogEntry } = get()
    set({
      sectors: sectors.map((s) =>
        s.id === sectorId ? { ...s, status, assignedCallsign: assignedCallsign ?? s.assignedCallsign } : s,
      ),
    })
    const sector = sectors.find((s) => s.id === sectorId)
    appendLogEntry(
      'SECTOR_STATUS_CHANGED',
      currentUser.callsign,
      `Sector "${sector?.name ?? sectorId}" status changed to ${status}${assignedCallsign ? `, assigned to ${assignedCallsign}` : ''}.`,
    )
  },

  addRadius: (centre, radiusMetres, label, colour) => {
    const { currentUser, radii, appendLogEntry } = get()
    const radius: SearchRadius = {
      id: crypto.randomUUID(),
      label,
      centre,
      radiusMetres,
      colour,
      drawnAt: new Date().toISOString(),
      drawnBy: currentUser.callsign,
    }
    set({ radii: [...radii, radius] })
    appendLogEntry(
      'RADIUS_DRAWN',
      currentUser.callsign,
      `Search radius "${label}" drawn — ${(radiusMetres / 1000).toFixed(2)} km at ${centre.lat.toFixed(5)}, ${centre.lng.toFixed(5)}.`,
    )
  },

  addRvPoint: (position, label, notes = '') => {
    const { currentUser, rvPoints, appendLogEntry } = get()
    const rv: RVPoint = {
      id: crypto.randomUUID(),
      label,
      position,
      notes,
      placedAt: new Date().toISOString(),
      placedBy: currentUser.callsign,
    }
    set({ rvPoints: [...rvPoints, rv] })
    appendLogEntry('RV_PLACED', currentUser.callsign, `RV point "${label}" placed at ${position.lat.toFixed(5)}, ${position.lng.toFixed(5)}.`)
  },

  removeRvPoint: (rvId) => {
    const { currentUser, rvPoints, appendLogEntry } = get()
    const rv = rvPoints.find((r) => r.id === rvId)
    set({ rvPoints: rvPoints.filter((r) => r.id !== rvId) })
    appendLogEntry('RV_REMOVED', currentUser.callsign, `RV point "${rv?.label ?? rvId}" removed.`)
  },
})
