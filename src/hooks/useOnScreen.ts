import { useEffect, useRef, useState } from 'react'

export function useOnScreen(element: Element | null) {
  const [isOnScreen, setIsOnScreen] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (!element) {
      return
    }

    if (isOnScreen) {
      observerRef.current?.disconnect()
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

    return () => observerRef.current?.disconnect()
  }, [element, isOnScreen])

  return isOnScreen
}
