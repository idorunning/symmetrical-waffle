import type { StateCreator } from 'zustand'
import type { EventLogEntry, LogEntryType } from '../types'
import { computeEntryHash, GENESIS_HASH } from '../utils/hashChain'
import type { BoundStore } from './index'

export interface LogSlice {
  logEntries: EventLogEntry[]
  appendLogEntry: (type: LogEntryType, actor: string, details: string) => void
}

export const createLogSlice: StateCreator<BoundStore, [], [], LogSlice> = (set, get) => ({
  logEntries: [],

  appendLogEntry: (type, actor, details) => {
    const existing = get().logEntries
    const sequenceNumber = existing.length + 1
    const prevHash = existing.length === 0 ? GENESIS_HASH : existing[existing.length - 1]!.hash
    const deviceTimestamp = new Date().toISOString()
    const hash = computeEntryHash(prevHash, sequenceNumber, type, deviceTimestamp, actor, details)

    const entry: EventLogEntry = {
      id: crypto.randomUUID(),
      sequenceNumber,
      entryType: type,
      deviceTimestamp,
      actor,
      details,
      prevHash,
      hash,
    }
    set({ logEntries: [...existing, entry] })
  },
})
