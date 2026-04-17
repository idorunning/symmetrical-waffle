import { sha256 } from 'js-sha256'
import type { EventLogEntry, LogEntryType } from '../types'

export const GENESIS_HASH = '0'.repeat(64)

// Computes the chain hash for a new entry.
// Input is pipe-delimited to prevent field boundary ambiguity.
export function computeEntryHash(
  prevHash: string,
  sequenceNumber: number,
  entryType: LogEntryType,
  deviceTimestamp: string,
  actor: string,
  details: string,
): string {
  const input = `${prevHash}|${sequenceNumber}|${entryType}|${deviceTimestamp}|${actor}|${details}`
  return sha256(input)
}

// Verifies the integrity of the full chain.
// Returns true only if every entry's hash is correctly derived from its inputs and predecessor.
export function verifyChain(entries: EventLogEntry[]): boolean {
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i]!
    const expectedPrev = i === 0 ? GENESIS_HASH : (entries[i - 1]!.hash)
    if (entry.prevHash !== expectedPrev) return false
    const expectedHash = computeEntryHash(
      entry.prevHash,
      entry.sequenceNumber,
      entry.entryType,
      entry.deviceTimestamp,
      entry.actor,
      entry.details,
    )
    if (entry.hash !== expectedHash) return false
  }
  return true
}
