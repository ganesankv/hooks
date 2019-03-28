import { useEffect, useCallback } from 'react'

import useEventCallback from './useEventCallback'

type EventHandler<T, K extends keyof DocumentEventMap> = (
  this: T,
  ev: DocumentEventMap[K]
) => any

export default function useEventListener<
  T extends Element | Document | Window,
  K extends keyof DocumentEventMap
>(
  element: T,
  event: K,
  listener: EventHandler<T, K>,
  capture: boolean = false
) {
  const handler = useEventCallback(listener)

  useEffect(() => {
    element.addEventListener(event, handler, capture)
    return () => element.removeEventListener(event, handler, capture)
  }, [])
}
