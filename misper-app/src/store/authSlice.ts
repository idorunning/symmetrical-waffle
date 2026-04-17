import type { StateCreator } from 'zustand'
import type { CurrentUser } from '../types'
import type { BoundStore } from './index'

export interface AuthSlice {
  currentUser: CurrentUser
  setCurrentUser: (user: CurrentUser) => void
}

export const createAuthSlice: StateCreator<BoundStore, [], [], AuthSlice> = (set) => ({
  currentUser: {
    id: 'user-1',
    callsign: 'CMDR-1',
    role: 'Commander',
    name: 'Cdr. Williams',
  },
  setCurrentUser: (user) => set({ currentUser: user }),
})
