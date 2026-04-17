import { useState, useEffect } from 'react'
import { getQueueLength, clearQueue, dequeueAll } from '../utils/offlineBuffer'

export function useOfflineBuffer() {
  const [queueLength, setQueueLength] = useState(() => getQueueLength())

  useEffect(() => {
    const id = setInterval(() => setQueueLength(getQueueLength()), 2000)
    return () => clearInterval(id)
  }, [])

  function flushAll() {
    const items = dequeueAll()
    clearQueue()
    setQueueLength(0)
    return items
  }

  return { queueLength, flushAll }
}
