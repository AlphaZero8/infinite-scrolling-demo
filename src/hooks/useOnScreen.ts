import { useCallback, useEffect, useRef, useState } from 'react'

export function useOnScreen(element: Element | null) {
  const [isOnScreen, setIsOnScreen] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const cleanup = useCallback(() => {
    observerRef.current?.disconnect()
    observerRef.current = null
  }, [])

  useEffect(() => {
    if (isOnScreen) {
      cleanup()
    }
  }, [isOnScreen, cleanup])

  useEffect(() => {
    if (!element) {
      return
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setIsOnScreen(entry.isIntersecting)
      },
      {
        threshold: 1
      }
    )

    observerRef.current.observe(element)

    return cleanup
  }, [element, cleanup])

  return isOnScreen
}
