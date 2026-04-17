import { create } from 'zustand'
import { createAuthSlice } from './authSlice'
import { createUiSlice } from './uiSlice'
import { createLogSlice } from './logSlice'
import { createEventSlice } from './eventSlice'
import { createMapSlice } from './mapSlice'
import { createSearcherSlice } from './searcherSlice'
import type { AuthSlice } from './authSlice'
import type { UiSlice } from './uiSlice'
import type { LogSlice } from './logSlice'
import type { EventSlice } from './eventSlice'
import type { MapSlice } from './mapSlice'
import type { SearcherSlice } from './searcherSlice'

export type BoundStore = AuthSlice & UiSlice & LogSlice & EventSlice & MapSlice & SearcherSlice

export const useMisPerStore = create<BoundStore>()((...a) => ({
  ...createAuthSlice(...a),
  ...createUiSlice(...a),
  ...createLogSlice(...a),
  ...createEventSlice(...a),
  ...createMapSlice(...a),
  ...createSearcherSlice(...a),
}))
