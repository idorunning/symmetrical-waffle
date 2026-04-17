import type { StateCreator } from 'zustand'
import type { BoundStore } from './index'

export type RightPanelTab = 'searchers' | 'log' | 'analytics'
export type ModalState = 'none' | 'newEvent' | 'joinSearcher'
export type MapMode = 'normal' | 'ipp-pick' | 'rv-drop'

export interface UiSlice {
  rightPanelTab: RightPanelTab
  modal: ModalState
  mapMode: MapMode
  setRightPanelTab: (tab: RightPanelTab) => void
  openModal: (modal: ModalState) => void
  closeModal: () => void
  setMapMode: (mode: MapMode) => void
}

export const createUiSlice: StateCreator<BoundStore, [], [], UiSlice> = (set) => ({
  rightPanelTab: 'searchers',
  modal: 'none',
  mapMode: 'normal',
  setRightPanelTab: (tab) => set({ rightPanelTab: tab }),
  openModal: (modal) => set({ modal }),
  closeModal: () => set({ modal: 'none' }),
  setMapMode: (mode) => set({ mapMode: mode }),
})
