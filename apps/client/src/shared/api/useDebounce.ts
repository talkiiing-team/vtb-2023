import { MutableRefObject, useCallback, useRef } from 'react'

export function useDebounce(
  callback: (...args: any[]) => Promise<void> | void,
  delay: number,
) {
  const timer = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>

  return useCallback(
    (...args: any[]) => {
      if (timer.current) {
        clearTimeout(timer.current)
      }

      timer.current = setTimeout(() => {
        callback(...args)
      }, delay)
    },
    [callback, delay],
  )
}
