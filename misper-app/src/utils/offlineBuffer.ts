import type { Breadcrumb } from '../types'

const STORAGE_KEY = 'misper_breadcrumb_queue'

export function enqueueBreadcrumb(crumb: Breadcrumb): void {
  const existing = dequeueAll()
  existing.push(crumb)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing))
  } catch {
    // Storage quota exceeded — silently drop oldest entry and retry
    existing.shift()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing))
  }
}

export function dequeueAll(): Breadcrumb[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Breadcrumb[]) : []
  } catch {
    return []
  }
}

export function getQueueLength(): number {
  return dequeueAll().length
}

export function clearQueue(): void {
  localStorage.removeItem(STORAGE_KEY)
}
