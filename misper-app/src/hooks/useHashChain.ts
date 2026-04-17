import { useMisPerStore } from '../store'
import type { LogEntryType } from '../types'

export function useHashChain() {
  const appendLogEntry = useMisPerStore((s) => s.appendLogEntry)

  return {
    log: (type: LogEntryType, actor: string, details: string) =>
      appendLogEntry(type, actor, details),
  }
}
